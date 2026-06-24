export function buildAssistantMessage(text) {
  return { role: 'ai', text };
}

export function buildUserMessage(text) {
  return { role: 'user', text };
}

export function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}
