import { puter } from '@heyputer/puter.js';
import { StreamChatOptions } from '../types/chat';
import { FLAPPY_SYSTEM_PROMPT } from './portfolioKnowledge';

/**
 * Checks if a given error indicates that Puter authentication or authorization is required.
 */
export function isPuterAuthError(error: unknown): boolean {
  if (!error) return false;
  const str = String(error).toLowerCase();
  const obj = error as Record<string, unknown>;
  const msg = String(obj?.message || obj?.error || '').toLowerCase();
  const code = String(obj?.status || obj?.code || '');

  return (
    code === '401' ||
    code === '403' ||
    str.includes('auth') ||
    str.includes('unauthorized') ||
    str.includes('sign in') ||
    str.includes('signin') ||
    str.includes('login') ||
    msg.includes('auth') ||
    msg.includes('unauthorized') ||
    msg.includes('sign in') ||
    msg.includes('signin') ||
    msg.includes('login')
  );
}

/**
 * Checks if the user is currently signed in to Puter.
 */
export function isPuterSignedIn(): boolean {
  try {
    return puter.auth.isSignedIn();
  } catch {
    return false;
  }
}

/**
 * Initiates the Puter sign-in popup flow.
 */
export async function signInWithPuter(): Promise<boolean> {
  try {
    const result = await puter.auth.signIn();
    return Boolean(result?.success || puter.auth.isSignedIn());
  } catch (err) {
    console.error('Failed to sign in:', err);
    return false;
  }
}

/**
 * Signs the user out of Puter.
 */
export function signOutPuter(): void {
  try {
    puter.auth.signOut();
  } catch (err) {
    console.error('Failed to sign out:', err);
  }
}

/**
 * Streams chat responses from Puter AI.
 */
export async function streamPuterChat({
  prompt,
  history,
  onChunk,
  onComplete,
  onError,
}: StreamChatOptions): Promise<string> {
  try {
    // Filter history to valid text messages and format for Puter
    const validHistory = history.filter(
      (m) => m.content.trim().length > 0 && m.status !== 'error'
    );

    const formattedMessages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }> = [
      { role: 'system', content: FLAPPY_SYSTEM_PROMPT },
      ...validHistory.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // Append prompt if not already the last message in history
    const lastItem = validHistory[validHistory.length - 1];
    if (!lastItem || lastItem.role !== 'user' || lastItem.content !== prompt) {
      formattedMessages.push({ role: 'user', content: prompt });
    }

    // Call Puter AI with streaming enabled
    const response = await puter.ai.chat(formattedMessages, {
      model: 'openai/gpt-6-astra',
      stream: true,
    });

    let fullContent = '';

    // Handle streaming response async iterable
    if (response && Symbol.asyncIterator in response) {
      for await (const chunk of response as AsyncIterable<{ text?: string }>) {
        if (chunk?.text) {
          fullContent += chunk.text;
          onChunk(chunk.text);
        }
      }
    } else {
      // Fallback for non-streamed response shape
      const resObj = response as { message?: { content?: string } };
      const text = resObj?.message?.content || String(response || '');
      fullContent = text;
      onChunk(text);
    }

    if (onComplete) {
      onComplete(fullContent);
    }

    return fullContent;
  } catch (error) {
    console.error('Flappy AI request error:', error);
    if (onError) {
      onError(error);
    }
    throw error;
  }
}
