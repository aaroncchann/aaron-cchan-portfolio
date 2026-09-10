export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  isAuthError?: boolean;
}

export interface StreamChatOptions {
  prompt: string;
  history: ChatMessage[];
  onChunk: (chunk: string) => void;
  onComplete?: (fullContent: string) => void;
  onError?: (error: unknown) => void;
}
