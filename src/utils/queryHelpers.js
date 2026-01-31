// Simplified OData query parameter parser

function parseFilter(filterStr, data) {
  if (!filterStr) return data;

  // Split on ' and ' and ' or ' (case insensitive)
  const orGroups = filterStr.split(/\s+or\s+/i);

  return data.filter(item => {
    return orGroups.some(group => {
      const conditions = group.split(/\s+and\s+/i);
      return conditions.every(condition => evaluateCondition(condition.trim(), item));
    });
  });
}

function evaluateCondition(condition, item) {
  // Match patterns like: FIELD eq 'value', FIELD gt 100, FIELD ne 'X'
  const match = condition.match(/^(\w+)\s+(eq|ne|gt|ge|lt|le)\s+(.+)$/i);
  if (!match) return true;

  const [, field, op, rawValue] = match;
  const itemValue = item[field];
  if (itemValue === undefined) return false;

  // Parse value - strip quotes if string
  let value = rawValue.trim();
  if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
    value = value.slice(1, -1);
  } else if (!isNaN(value)) {
    value = Number(value);
  }

  switch (op.toLowerCase()) {
    case 'eq': return itemValue == value;
    case 'ne': return itemValue != value;
    case 'gt': return itemValue > value;
    case 'ge': return itemValue >= value;
    case 'lt': return itemValue < value;
    case 'le': return itemValue <= value;
    default: return true;
  }
}

function parseOrderBy(orderByStr, data) {
  if (!orderByStr) return data;

  const parts = orderByStr.trim().split(/\s+/);
  const field = parts[0];
  const direction = (parts[1] || 'asc').toLowerCase();

  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

function applySelect(selectStr, data) {
  if (!selectStr) return data;

  const fields = selectStr.split(',').map(f => f.trim());
  return data.map(item => {
    const selected = {};
    fields.forEach(f => {
      if (item[f] !== undefined) {
        selected[f] = item[f];
      }
    });
    return selected;
  });
}

function applyPagination(data, top, skip) {
  let result = data;
  if (skip) {
    result = result.slice(Number(skip));
  }
  if (top) {
    result = result.slice(0, Number(top));
  }
  return result;
}

function applyQuery(data, query) {
  let result = [...data];

  // Apply $filter
  if (query.$filter) {
    result = parseFilter(query.$filter, result);
  }

  // Apply $orderby
  if (query.$orderby) {
    result = parseOrderBy(query.$orderby, result);
  }

  // Apply $skip and $top
  result = applyPagination(result, query.$top, query.$skip);

  // Apply $select
  if (query.$select) {
    result = applySelect(query.$select, result);
  }

  return result;
}

module.exports = { applyQuery, parseFilter, parseOrderBy, applySelect, applyPagination };
