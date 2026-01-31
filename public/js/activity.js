/**
 * API Activity Log Panel
 * Shows real-time API calls for workshop demonstration
 */

(function() {
  'use strict';

  let isOpen = false;
  let autoRefresh = true;
  let refreshInterval = null;
  let lastTimestamp = null;
  let totalCalls = 0;

  const REFRESH_RATE = 2000; // 2 seconds

  // DOM elements
  const panel = () => document.getElementById('activity-panel');
  const toggleBtn = () => document.getElementById('activity-toggle');
  const closeBtn = () => document.getElementById('activity-close');
  const clearBtn = () => document.getElementById('activity-clear');
  const autoRefreshCheckbox = () => document.getElementById('activity-auto-refresh');
  const activityList = () => document.getElementById('activity-list');
  const activityBadge = () => document.getElementById('activity-badge');
  const activityStats = () => document.getElementById('activity-stats');
  const activityRateLimit = () => document.getElementById('activity-rate-limit');

  function togglePanel() {
    isOpen = !isOpen;
    const p = panel();
    if (p) {
      p.classList.toggle('open', isOpen);
    }

    if (isOpen) {
      // Reset badge when opening
      const badge = activityBadge();
      if (badge) badge.textContent = '0';
      totalCalls = 0;

      if (autoRefresh) {
        startAutoRefresh();
      }
      fetchActivity();
    } else {
      stopAutoRefresh();
    }
  }

  function closePanel() {
    isOpen = false;
    const p = panel();
    if (p) p.classList.remove('open');
    stopAutoRefresh();
  }

  function startAutoRefresh() {
    stopAutoRefresh();
    refreshInterval = setInterval(fetchActivity, REFRESH_RATE);
  }

  function stopAutoRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  }

  async function fetchActivity() {
    try {
      let url = '/api/activity?limit=50';
      if (lastTimestamp && autoRefresh) {
        url += `&since=${encodeURIComponent(lastTimestamp)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch activity');

      const data = await res.json();

      // Update rate limit display
      const rateLimit = activityRateLimit();
      if (rateLimit && data.rateLimit) {
        rateLimit.textContent = `Rate: ${data.rateLimit.max}/${data.rateLimit.windowMs / 1000}s`;
      }

      // Update stats
      const stats = activityStats();
      if (stats) {
        stats.textContent = `${data.total} calls logged`;
      }

      // If we're fetching since a timestamp, prepend new entries
      if (lastTimestamp && data.entries.length > 0) {
        prependEntries(data.entries);
        // Update badge if panel is closed
        if (!isOpen) {
          const badge = activityBadge();
          if (badge) {
            totalCalls += data.entries.length;
            badge.textContent = totalCalls > 99 ? '99+' : totalCalls;
          }
        }
      } else if (!lastTimestamp) {
        // Initial load - render all
        renderEntries(data.entries);
      }

      // Update last timestamp
      if (data.entries.length > 0) {
        lastTimestamp = data.entries[0].timestamp;
      }

    } catch (err) {
      console.error('Activity fetch error:', err);
    }
  }

  function renderEntries(entries) {
    const list = activityList();
    if (!list) return;

    if (entries.length === 0) {
      list.innerHTML = '<div class="activity-empty">No API calls yet</div>';
      return;
    }

    list.innerHTML = entries.map(entryToHtml).join('');
  }

  function prependEntries(entries) {
    const list = activityList();
    if (!list) return;

    // Remove empty state if present
    const empty = list.querySelector('.activity-empty');
    if (empty) empty.remove();

    // Prepend new entries
    const html = entries.map(entryToHtml).join('');
    list.insertAdjacentHTML('afterbegin', html);

    // Keep only last 50 entries in DOM
    const items = list.querySelectorAll('.activity-item');
    if (items.length > 50) {
      for (let i = 50; i < items.length; i++) {
        items[i].remove();
      }
    }

    // Highlight new entries
    entries.forEach(e => {
      const el = list.querySelector(`[data-id="${e.id}"]`);
      if (el) {
        el.classList.add('new');
        setTimeout(() => el.classList.remove('new'), 1000);
      }
    });
  }

  function entryToHtml(entry) {
    const methodClass = getMethodClass(entry.method);
    const statusClass = getStatusClass(entry.status);
    const time = new Date(entry.timestamp).toLocaleTimeString();

    return `
      <div class="activity-item" data-id="${entry.id}">
        <span class="activity-time">${time}</span>
        <span class="activity-method ${methodClass}">${entry.method}</span>
        <span class="activity-path" title="${escapeHtml(entry.path)}">${truncatePath(entry.path)}</span>
        <span class="activity-status ${statusClass}">${entry.status}</span>
        <span class="activity-duration">${entry.duration}ms</span>
      </div>
    `;
  }

  function getMethodClass(method) {
    const classes = {
      'GET': 'method-get',
      'POST': 'method-post',
      'PATCH': 'method-patch',
      'PUT': 'method-put',
      'DELETE': 'method-delete'
    };
    return classes[method] || '';
  }

  function getStatusClass(status) {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return '';
  }

  function truncatePath(path) {
    if (path.length > 40) {
      return path.substring(0, 37) + '...';
    }
    return path;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function clearActivity() {
    lastTimestamp = null;
    const list = activityList();
    if (list) {
      list.innerHTML = '<div class="activity-empty">No API calls yet</div>';
    }
  }

  function init() {
    // Toggle button
    const toggle = toggleBtn();
    if (toggle) {
      toggle.addEventListener('click', togglePanel);
    }

    // Close button
    const close = closeBtn();
    if (close) {
      close.addEventListener('click', closePanel);
    }

    // Clear button
    const clear = clearBtn();
    if (clear) {
      clear.addEventListener('click', clearActivity);
    }

    // Auto-refresh checkbox
    const autoRefreshCb = autoRefreshCheckbox();
    if (autoRefreshCb) {
      autoRefreshCb.addEventListener('change', (e) => {
        autoRefresh = e.target.checked;
        if (autoRefresh && isOpen) {
          startAutoRefresh();
        } else {
          stopAutoRefresh();
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel();
      }
    });

    // Start background polling for badge updates (every 5 seconds)
    setInterval(() => {
      if (!isOpen) {
        fetchActivity();
      }
    }, 5000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
