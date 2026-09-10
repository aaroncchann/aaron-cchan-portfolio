import React, { useState, useRef, useEffect } from 'react';
import { ActiveScreen } from '../types';
import { PORTFOLIO_INFO, SUGGESTED_PROMPTS } from '../data/portfolioData';
import { useChat } from '../hooks/useChat';
import { FlappyAvatar } from './FlappyAvatar';

interface FlappyAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact: () => void;
}

export const FlappyAIModal: React.FC<FlappyAIModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    isTyping,
    error,
    isAuthRequired,
    sendMessage,
    startNewConversation,
    clearConversation,
    handleSignIn,
  } = useChat();

  // Prevent background portfolio page from scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Scroll to bottom when new messages arrive or typing status changes
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Auto-resize input textarea
  useEffect(() => {
    if (textareaRef.current) {
      if (!inputText) {
        textareaRef.current.style.height = '';
      } else {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 130)}px`;
      }
    }
  }, [inputText]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    sendMessage(text);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNavigateAndClose = (screen: ActiveScreen) => {
    onClose();
    setTimeout(() => {
      onNavigate(screen);
    }, 100);
  };

  const handleContactAndClose = () => {
    onClose();
    setTimeout(() => {
      onOpenContact();
    }, 100);
  };

  // Helper to format inline bold and code
  const formatInlineText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-[#1c1f30] text-[#c084fc] text-xs font-mono border border-[#262938]/60"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Helper to format multi-line assistant text with paragraphs, bullet lists, and code blocks
  const renderFormattedContent = (content: string, isSending?: boolean) => {
    if (!content && isSending) {
      return (
        <div className="flex items-center gap-2 text-[#c084fc] py-1 text-xs font-mono">
          <span>Formulating response</span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-bounce"></span>
          </span>
        </div>
      );
    }

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="my-2.5 p-3.5 bg-[#08090f] border border-[#262938] rounded-xl overflow-x-auto text-xs font-mono text-[#c084fc]"
            >
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        elements.push(
          <li key={`li-${index}`} className="ml-4 list-disc text-[#f9fafb] text-xs sm:text-sm leading-relaxed my-0.5">
            {formatInlineText(bulletText)}
          </li>
        );
        return;
      }

      if (!line.trim()) {
        elements.push(<div key={`space-${index}`} className="h-2" />);
        return;
      }

      elements.push(
        <p key={`p-${index}`} className="text-[#f9fafb] text-xs sm:text-sm leading-relaxed my-0.5">
          {formatInlineText(line)}
          {isSending && index === lines.length - 1 && (
            <span className="inline-block w-1.5 h-3.5 ml-1 translate-y-0.5 bg-[#c084fc] animate-pulse rounded-sm" />
          )}
        </p>
      );
    });

    return elements;
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 md:p-3 lg:p-4 bg-black/80 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Flappy AI Assistant"
    >
      {/* Ambient background glow flares */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9333ea]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3b82f6]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Full-Height Modal Container */}
      <div
        className="relative w-full h-full md:h-[calc(100dvh-1.5rem)] lg:h-[calc(100dvh-2rem)] max-w-7xl flex flex-col bg-[#0d0f17]/95 md:bg-[#0d0f17]/90 backdrop-blur-2xl md:rounded-3xl border-0 md:border border-[#262938]/80 shadow-[0_0_80px_rgba(0,0,0,0.85),0_0_40px_rgba(147,51,234,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Rail */}
        <header className="shrink-0 h-16 md:h-18 px-4 sm:px-6 md:px-8 border-b border-[#262938]/60 flex items-center justify-between gap-3 bg-[#0a0b12]/75 backdrop-blur-md">
          {/* Left: Identity & Status */}
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <FlappyAvatar size="md" showGlow />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-sora text-base md:text-lg text-white font-semibold truncate">
                  Flappy AI
                </span>
                <span className="text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden sm:inline">Active</span> Assistant
                </span>
              </div>
              <span className="text-xs text-[#9ca3af] truncate hidden sm:inline">
                Personal AI Portfolio Assistant • Grounded in verified portfolio facts
              </span>
            </div>
          </div>

          {/* Right: Controls & Prominent Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#9ca3af] hover:text-white transition-all flex items-center gap-1"
                title="Clear conversation history"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              onClick={startNewConversation}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9333ea]/20 to-[#3b82f6]/20 hover:from-[#9333ea]/30 hover:to-[#3b82f6]/30 border border-[#c084fc]/30 text-xs font-semibold text-[#c084fc] hover:text-white transition-all flex items-center gap-1 shadow-sm"
              title="Start a new conversation"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span className="hidden xs:inline">New Chat</span>
            </button>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#11131c] border border-[#262938]/60 text-xs text-[#9ca3af]">
              <span className="material-symbols-outlined text-sm text-[#f472b6]">location_on</span>
              <span>{PORTFOLIO_INFO.location}</span>
            </div>

            {/* Clear Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c1f30] hover:bg-[#262938] text-[#9ca3af] hover:text-white border border-[#262938] hover:border-[#c084fc]/50 transition-all group shadow-sm ml-1"
              aria-label="Close Flappy AI Assistant"
            >
              <span className="text-xs font-medium hidden sm:inline">Close</span>
              <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform duration-200">
                close
              </span>
              <span className="hidden lg:inline text-[10px] font-mono text-[#9ca3af] bg-[#151722] px-1.5 py-0.5 rounded border border-[#262938]/60">
                Esc
              </span>
            </button>
          </div>
        </header>

        {/* Modal Body: Split Console on Desktop, Full-Height Canvas on Mobile/Tablet */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT SIDEBAR (Desktop lg:flex, hidden on smaller screens) */}
          <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-[#262938]/60 p-5 overflow-y-auto custom-scrollbar gap-5 bg-[#0a0b12]/40 shrink-0">
            {/* Assistant Profile Card */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-[#262938]/60 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FlappyAvatar size="md" showGlow />
                  <div className="flex flex-col">
                    <span className="font-sora text-sm text-white font-semibold">
                      Flappy AI
                    </span>
                    <span className="text-[11px] text-[#c084fc] font-medium">
                      Personal Portfolio Assistant
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                  Ready
                </span>
              </div>

              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Flappy AI is Aaron Cchan's personal portfolio assistant, built to guide visitors through his projects, Android apps and games, development skills, and collaboration opportunities.
              </p>
            </div>

            {/* Suggested Questions Matrix */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-[#262938]/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c084fc] text-base">
                    psychology_alt
                  </span>
                  <span className="font-sora text-xs text-white uppercase tracking-wider font-semibold">
                    Suggested Questions
                  </span>
                </div>
                <span className="text-[10px] text-[#adc6ff] bg-[#1c1f30] px-2 py-0.5 rounded font-mono">
                  Click to ask
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-1">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSendMessage(prompt.title)}
                    className="group text-left p-2.5 rounded-xl bg-[#151722]/80 hover:bg-[#1c1f30] border border-[#262938]/50 hover:border-[#c084fc]/40 transition-all flex items-start gap-2.5"
                  >
                    <span
                      className={`material-symbols-outlined text-base mt-0.5 group-hover:translate-x-0.5 transition-transform ${
                        prompt.color === 'primary'
                          ? 'text-[#c084fc]'
                          : prompt.color === 'secondary'
                          ? 'text-[#3b82f6]'
                          : 'text-[#f472b6]'
                      }`}
                    >
                      {prompt.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-sora text-xs text-white group-hover:text-[#c084fc] transition-colors font-medium">
                        {prompt.title}
                      </span>
                      <span className="text-[10px] text-[#9ca3af] mt-0.5">
                        {prompt.subtitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Guidance Topics */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#262938]/60 flex flex-col gap-2.5">
              <span className="font-sora text-xs text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#3b82f6]">menu_book</span>
                Quick Navigation
              </span>

              <p className="text-[11px] text-[#9ca3af]">
                Jump directly to portfolio sections while chatting:
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <button
                  onClick={() => handleNavigateAndClose('skills')}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1f30] text-[#adc6ff] hover:text-[#c084fc] font-sora font-semibold transition-colors border border-[#262938]/60 hover:border-[#c084fc]/30"
                >
                  Skills
                </button>
                <button
                  onClick={() => handleNavigateAndClose('projects')}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1f30] text-[#adc6ff] hover:text-[#3b82f6] font-sora font-semibold transition-colors border border-[#262938]/60 hover:border-[#3b82f6]/30"
                >
                  Projects
                </button>
                <button
                  onClick={() => handleNavigateAndClose('android')}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1f30] text-[#adc6ff] hover:text-[#38bdf8] font-sora font-semibold transition-colors border border-[#262938]/60 hover:border-[#38bdf8]/30"
                >
                  Android Apps
                </button>
                <button
                  onClick={handleContactAndClose}
                  className="px-2.5 py-1 rounded-lg bg-[#1c1f30] text-[#adc6ff] hover:text-[#f472b6] font-sora font-semibold transition-colors border border-[#262938]/60 hover:border-[#f472b6]/30"
                >
                  Contact
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONVERSATION CANVAS (flex-1) */}
          <main className="flex-1 flex flex-col min-h-0 h-full relative bg-[#08090f]/50">
            {/* Scrollable Message Stream */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 space-y-4 custom-scrollbar">
              {/* Default Welcome Card when empty */}
              {messages.length === 0 && (
                <div className="flex items-start gap-3 max-w-3xl">
                  <div className="shrink-0 mt-0.5">
                    <FlappyAvatar size="md" showGlow />
                  </div>

                  <div className="flex flex-col gap-3 bg-[#11131c]/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl rounded-tl-sm border border-[#262938]/60 shadow-xl flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-sora text-sm text-white font-semibold">
                          Flappy AI
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#9333ea]/15 text-[11px] font-sora font-semibold text-[#c084fc] border border-[#9333ea]/30">
                          Portfolio Guide
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9ca3af] font-mono">Ready</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#f9fafb] leading-relaxed">
                      Hello! I am Flappy AI, Aaron Cchan's personal portfolio assistant. I can answer questions about Aaron's work with verified facts: his projects, native Android apps, games, development skills, services, and how to get in touch. What would you like to know?
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#262938]/40">
                      <button
                        onClick={() => handleSendMessage("Tell me about Aaron's Android apps and games.")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors text-left"
                      >
                        Android Apps &amp; Games
                      </button>
                      <button
                        onClick={() => handleSendMessage("What featured projects has Aaron built?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors text-left"
                      >
                        Featured Projects
                      </button>
                      <button
                        onClick={() => handleSendMessage("What skills and technologies does Aaron work with?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors text-left"
                      >
                        Skills &amp; Capabilities
                      </button>
                      <button
                        onClick={() => handleSendMessage("How can I get in touch with Aaron for a project?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors text-left"
                      >
                        Contact &amp; Collaboration
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Conversation Message Stream */}
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                const isSending = msg.status === 'sending';
                const isError = msg.status === 'error';

                if (isUser) {
                  return (
                    <div
                      key={msg.id}
                      className="flex items-start justify-end gap-3 ml-auto max-w-2xl"
                    >
                      <div className="flex flex-col gap-1 bg-gradient-to-r from-[#9333ea] via-purple-700 to-[#3b82f6] text-white p-4 rounded-2xl rounded-tr-sm shadow-lg border border-purple-400/20">
                        <span className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                          {msg.content}
                        </span>
                        <span className="text-[10px] text-purple-200 self-end opacity-80 font-mono">
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#9333ea]/30 flex items-center justify-center shrink-0 mt-1 shadow-sm border border-[#9333ea]/40">
                        <span className="material-symbols-outlined text-[#adc6ff] text-lg">
                          person
                        </span>
                      </div>
                    </div>
                  );
                }

                // Assistant Message Bubble
                return (
                  <div key={msg.id} className="flex items-start gap-3 max-w-3xl">
                    <div className="shrink-0 mt-0.5">
                      <FlappyAvatar size="md" showGlow={isSending} />
                    </div>

                    <div className="flex flex-col gap-3 bg-[#11131c]/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl rounded-tl-sm border border-[#262938]/60 shadow-xl flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-sora text-sm text-white font-semibold">
                            Flappy AI
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#9333ea]/15 text-[11px] font-sora font-semibold text-[#c084fc] border border-[#9333ea]/30">
                            {isError ? 'Notice' : 'Assistant'}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#9ca3af] font-mono">
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      </div>

                      {/* Render formatted content */}
                      <div className="space-y-1">
                        {renderFormattedContent(msg.content, isSending)}
                      </div>

                      {/* Assistant Authorization Handler */}
                      {msg.isAuthError && (
                        <div className="pt-2 border-t border-[#262938]/60 flex items-center justify-between gap-3">
                          <span className="text-xs text-amber-300">
                            Authentication required to proceed with queries.
                          </span>
                          <button
                            onClick={handleSignIn}
                            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#9333ea] to-[#3b82f6] text-white text-xs font-semibold shadow-md hover:brightness-110 transition-all"
                          >
                            Connect Assistant
                          </button>
                        </div>
                      )}

                      {/* Copy Action for completed responses */}
                      {msg.content && !isSending && !isError && (
                        <div className="pt-2 border-t border-[#262938]/40 flex items-center justify-end">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#9ca3af] hover:text-[#c084fc] transition-colors py-0.5 px-2 rounded hover:bg-[#151722]"
                            title="Copy response"
                          >
                            <span className="material-symbols-outlined text-sm">
                              {copiedId === msg.id ? 'check' : 'content_copy'}
                            </span>
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Error notification banner if global error occurs */}
              {error && !messages.some((m) => m.isAuthError) && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-amber-400">warning</span>
                    <span>{error}</span>
                  </div>
                  {isAuthRequired && (
                    <button
                      onClick={handleSignIn}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#9333ea] to-[#3b82f6] text-white text-xs font-semibold shadow-sm"
                    >
                      Connect Assistant
                    </button>
                  )}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && !messages.some((m) => m.role === 'assistant' && m.status === 'sending' && !m.content) && (
                <div className="flex items-start gap-3 max-w-3xl">
                  <div className="shrink-0 mt-0.5">
                    <FlappyAvatar size="md" showGlow />
                  </div>
                  <div className="bg-[#11131c]/95 p-4 rounded-2xl rounded-tl-sm border border-[#262938]/60 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs text-[#9ca3af] ml-1 font-mono">Flappy is formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Composer Input Bar (Docked Bottom) */}
            <div className="shrink-0 p-3 sm:p-4 border-t border-[#262938]/60 bg-[#0d0f17]/95 backdrop-blur-xl flex flex-col gap-2">
              <div className="relative bg-[#11131c]/95 rounded-2xl p-2 shadow-2xl border border-[#262938]/70 focus-within:border-[#c084fc]/50 transition-all">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center sm:items-end gap-2 px-1 sm:px-2"
                >
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    placeholder={
                      isTyping
                        ? 'Flappy AI is formulating response...'
                        : "Ask Flappy AI about Aaron's projects, apps, games, skills..."
                    }
                    className="flex-1 bg-transparent py-2 sm:py-2.5 px-2 text-xs sm:text-sm text-white placeholder:text-[#9ca3af] focus:outline-none resize-none min-h-[56px] sm:min-h-[40px] max-h-[130px] leading-snug sm:leading-normal"
                  />

                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-[#151722] text-[10px] text-[#9ca3af] border border-[#262938]/40 font-mono mb-1.5">
                    <span>Enter</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all mb-0 sm:mb-0.5 shrink-0 ${
                      inputText.trim() && !isTyping
                        ? 'bg-gradient-to-r from-[#9333ea] to-[#3b82f6] text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_28px_rgba(147,51,234,0.7)] transform hover:scale-105 cursor-pointer'
                        : 'bg-[#1c1f30] text-[#9ca3af]/40 border border-[#262938]/40 cursor-not-allowed'
                    }`}
                    title="Send message to Flappy AI"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isTyping ? 'hourglass_top' : 'send'}
                    </span>
                  </button>
                </form>
              </div>

              {/* Grounding Trust Bar */}
              <div className="flex items-center justify-between px-2 text-[11px] text-[#9ca3af]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                  <span className="truncate">Flappy AI • Personal Assistant for Aaron Cchan ({PORTFOLIO_INFO.location})</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#3b82f6] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Verified Grounding</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
