import { useState, useRef, useEffect } from 'react'

const ADK_URL = '/api' // Proxied to http://127.0.0.1:8000
const APP_NAME = 'erp-assistant'
const USER_ID = 'workshop-user'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  // Create session on mount
  useEffect(() => {
    createSession()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const createSession = async () => {
    try {
      const response = await fetch(`${ADK_URL}/apps/${APP_NAME}/users/${USER_ID}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const data = await response.json()
      setSessionId(data.id)
      setError(null)
    } catch (err) {
      setError('Failed to connect to agent. Make sure ADK server is running on port 8000.')
      console.error('Session creation failed:', err)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${ADK_URL}/run_sse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_name: APP_NAME,
          user_id: USER_ID,
          session_id: sessionId,
          new_message: {
            role: 'user',
            parts: [{ text: userMessage }]
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Read SSE stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let agentResponse = ''
      let toolCalls = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              // Extract text from model response
              if (data.content?.parts) {
                for (const part of data.content.parts) {
                  if (part.text) {
                    agentResponse = part.text
                  }
                  if (part.functionCall) {
                    toolCalls.push(part.functionCall.name)
                  }
                }
              }
            } catch (e) {
              // Skip non-JSON lines
            }
          }
        }
      }

      // Add agent response to messages
      if (agentResponse) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: agentResponse,
          tools: toolCalls.length > 0 ? toolCalls : null
        }])
      }

    } catch (err) {
      setError('Failed to send message. Check console for details.')
      console.error('Send message failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleNewChat = () => {
    setMessages([])
    createSession()
  }

  return (
    <div className="app">
      <header className="header">
        <h1>עוזר ERP חכם</h1>
        <button onClick={handleNewChat} className="new-chat-btn">
          שיחה חדשה
        </button>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>שלום! אני העוזר החכם למערכת ה-ERP</h2>
              <p>אפשר לשאול אותי על:</p>
              <ul>
                <li>לקוחות והזמנות</li>
                <li>חשבוניות ותשלומים</li>
                <li>מלאי ומוצרים</li>
                <li>ניתוח עסקי</li>
              </ul>
              <p className="example">לדוגמה: "מי הלקוחות שחייבים לנו כסף?"</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {msg.tools && (
                  <div className="tool-indicator">
                    שימוש בכלים: {msg.tools.join(', ')}
                  </div>
                )}
                <div className="message-text">{msg.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="הקלד הודעה..."
            disabled={isLoading || !sessionId}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !sessionId || !input.trim()}
            className="send-btn"
          >
            שלח
          </button>
        </div>
      </div>

      <footer className="footer">
        <span>ADK Workshop 2026</span>
        <span className={`status ${sessionId ? 'connected' : 'disconnected'}`}>
          {sessionId ? 'מחובר' : 'מתחבר...'}
        </span>
      </footer>
    </div>
  )
}

export default App
