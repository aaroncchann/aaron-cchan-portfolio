import { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import {
  streamPuterChat,
  isPuterAuthError,
  isPuterSignedIn,
  signInWithPuter,
} from '../services/aiService';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthRequired, setIsAuthRequired] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // Check auth state on mount
  useEffect(() => {
    setIsSignedIn(isPuterSignedIn());
  }, []);

  const handleSignIn = useCallback(async () => {
    const success = await signInWithPuter();
    if (success) {
      setIsSignedIn(true);
      setIsAuthRequired(false);
      setError(null);
    }
    return success;
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessageId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const assistantMessageId = `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      const userMessage: ChatMessage = {
        id: userMessageId,
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
        status: 'sent',
      };

      const initialAssistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        status: 'sending',
      };

      // Add user message and blank assistant message placeholder
      const updatedHistory = [...messages, userMessage];
      setMessages([...updatedHistory, initialAssistantMessage]);
      setIsTyping(true);
      setError(null);
      setIsAuthRequired(false);

      try {
        await streamPuterChat({
          prompt: trimmed,
          history: updatedHistory,
          onChunk: (chunk: string) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + chunk }
                  : msg
              )
            );
          },
          onComplete: (fullContent: string) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: fullContent, status: 'sent' }
                  : msg
              )
            );
            setIsTyping(false);
          },
          onError: (err: unknown) => {
            const authErr = isPuterAuthError(err);
            if (authErr) {
              setIsAuthRequired(true);
            }

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? {
                      ...msg,
                      status: 'error',
                      isAuthError: authErr,
                      content: authErr
                        ? 'Assistant connection required to continue. Please click the button below to connect.'
                        : (msg.content || 'Unable to complete response. Please check your connection and try again.'),
                    }
                  : msg
              )
            );
            setIsTyping(false);
          },
        });
      } catch (err) {
        console.error('Stream chat error:', err);
        const authErr = isPuterAuthError(err);
        if (authErr) {
          setIsAuthRequired(true);
          setError('Assistant authorization required.');
        } else {
          setError('Failed to receive response. Please try again.');
        }
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  const startNewConversation = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setError(null);
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setError(null);
  }, []);

  return {
    messages,
    isTyping,
    error,
    isAuthRequired,
    isSignedIn,
    sendMessage,
    startNewConversation,
    clearConversation,
    handleSignIn,
  };
}
