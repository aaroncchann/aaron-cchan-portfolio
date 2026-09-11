import React, { useState, useRef, useEffect } from 'react';
import { ActiveScreen } from '../types';
import { PORTFOLIO_INFO, SUGGESTED_PROMPTS } from '../data/portfolioData';
import { useChat } from '../hooks/useChat';
import { FlappyAvatar } from './FlappyAvatar';
import { ExternalLink, Mail } from 'lucide-react';

interface FlappyAIScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact: () => void;
}

export const FlappyAIScreen: React.FC<FlappyAIScreenProps> = ({ onNavigate, onOpenContact }) => {
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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize input textarea
  useEffect(() => {
    if (textareaRef.current) {
      if (!inputText) {
        textareaRef.current.style.height = '';
      } else {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
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

  // Helper to render styled, clickable links for web destinations and emails
  const renderLink = (url: string, labelText?: string, key?: string | number) => {
    let cleanUrl = url.trim();
    let trailing = '';
    // Strip trailing punctuation outside of URL
    while (cleanUrl.length > 0 && /[.,;:!?)]$/.test(cleanUrl)) {
      trailing = cleanUrl.slice(-1) + trailing;
      cleanUrl = cleanUrl.slice(0, -1);
    }

    const isEmail = cleanUrl.startsWith('mailto:');
    const label = labelText || cleanUrl.replace(/^mailto:/, '');

    return (
      <React.Fragment key={key}>
        <a
          href={cleanUrl}
          target={isEmail ? undefined : '_blank'}
          rel={isEmail ? undefined : 'noopener noreferrer'}
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 my-0.5 rounded-md bg-[#1c1f30] hover:bg-[#262938] border border-[#3b82f6]/30 hover:border-[#c084fc]/60 text-[#adc6ff] hover:text-white transition-all text-xs sm:text-sm font-medium break-all align-baseline group/link shadow-sm"
        >
          <span>{label}</span>
          {isEmail ? (
            <Mail className="w-3 h-3 text-[#c084fc] group-hover/link:text-white shrink-0 opacity-90" />
          ) : (
            <ExternalLink className="w-3 h-3 text-[#3b82f6] group-hover/link:text-[#c084fc] shrink-0 opacity-90" />
          )}
        </a>
        {trailing}
      </React.Fragment>
    );
  };

  // Helper to parse bold (**text**), inline code (`code`), markdown links, and URLs
  const formatInlineText = (text: string): React.ReactNode => {
    const tokenRegex = /(\[[^\]]+\]\((?:https?:\/\/|mailto:)[^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`|(?:https?:\/\/|mailto:)[^\s<>()"']+)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, i) => {
      if (!part) return null;

      // Markdown link: [Label](url)
      const mdLinkMatch = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)$/);
      if (mdLinkMatch) {
        const rawLabel = mdLinkMatch[1].replace(/^\*\*|\*\*$/g, '');
        const url = mdLinkMatch[2];
        return renderLink(url, rawLabel, i);
      }

      // Bold text: **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        // Check if bold wraps a markdown link: **[Label](url)**
        const innerMdLink = inner.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)$/);
        if (innerMdLink) {
          return renderLink(innerMdLink[2], innerMdLink[1], i);
        }
        return (
          <strong key={i} className="font-semibold text-white">
            {formatInlineText(inner)}
          </strong>
        );
      }

      // Inline code: `code`
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

      // Raw URL: https://... or mailto:...
      if (part.startsWith('http://') || part.startsWith('https://') || part.startsWith('mailto:')) {
        return renderLink(part, undefined, i);
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
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8 min-h-[calc(100vh-5rem)] flex flex-col justify-between">
        {/* Ambient Luminous Flares */}
        <div className="absolute top-8 left-1/4 w-96 h-96 rounded-full bg-[#9333ea]/10 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-16 right-10 w-80 h-80 rounded-full bg-[#3b82f6]/15 blur-3xl pointer-events-none -z-10"></div>

        {/* Top Sub-Header & Live Endpoint Status Rail */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#262938]/40">
          <div className="flex items-center gap-4">
            <FlappyAvatar size="md" showGlow />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sora text-lg text-white font-semibold">Flappy AI</span>
                <span className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Assistant
                </span>
              </div>
              <span className="text-xs text-[#9ca3af]">
                Personal AI Portfolio Assistant • Portfolio Intelligence Interface
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#9ca3af] hover:text-white transition-all flex items-center gap-1.5"
                title="Clear conversation history"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            )}

            <button
              onClick={startNewConversation}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#9333ea]/20 to-[#3b82f6]/20 hover:from-[#9333ea]/30 hover:to-[#3b82f6]/30 border border-[#c084fc]/30 text-xs font-semibold text-[#c084fc] hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              title="Start a new conversation"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>New Chat</span>
            </button>

            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#11131c] shadow-sm border border-[#262938]/60 text-xs">
              <div className="flex items-center gap-1.5 text-[#9ca3af]">
                <span className="material-symbols-outlined text-sm text-[#3b82f6]">shield</span>
                <span>Verified Portfolio Grounding</span>
              </div>
              <span className="text-[#374151]">/</span>
              <div className="flex items-center gap-1.5 text-[#9ca3af]">
                <span className="material-symbols-outlined text-sm text-[#f472b6]">location_on</span>
                <span>{PORTFOLIO_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Split-Console (35% Left Sidebar / 65% Right Conversation Canvas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* LEFT SIDEBAR (lg:col-span-5) */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            {/* Flappy AI Profile Card */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#262938]/60 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <FlappyAvatar size="lg" showGlow />
                  <div className="flex flex-col">
                    <span className="font-sora text-base text-white tracking-tight font-semibold">
                      Flappy AI
                    </span>
                    <span className="text-xs text-[#c084fc] font-medium">
                      Personal AI Portfolio Assistant
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Ready
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Flappy AI is Aaron Cchan's personal portfolio guide, designed to introduce visitors to his projects, Android apps and games, development skills, and collaboration opportunities.
              </p>

              <div className="bg-[#151722]/80 rounded-xl p-3 border border-[#262938]/60 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                  <span className="material-symbols-outlined text-sm text-[#c084fc]">info</span>
                  <span>About Flappy AI</span>
                </div>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  Powered by client-side intelligence and grounded in verified portfolio data to help visitors explore Aaron's work.
                </p>
              </div>
            </div>

            {/* Suggested Questions Matrix */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#262938]/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c084fc] text-lg">
                    psychology_alt
                  </span>
                  <span className="font-sora text-xs text-white uppercase tracking-wider font-semibold">
                    Suggested Questions Matrix
                  </span>
                </div>
                <span className="text-[10px] text-[#adc6ff] bg-[#1c1f30] px-2 py-0.5 rounded font-mono">
                  Click to ask
                </span>
              </div>

              <p className="text-xs text-[#9ca3af]">
                Interact directly with Flappy AI by selecting verified prompts:
              </p>

              <div className="flex flex-col gap-2 mt-1">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSendMessage(prompt.title)}
                    className="group text-left p-3 rounded-xl bg-[#151722]/80 hover:bg-[#1c1f30] border border-[#262938]/50 hover:border-[#c084fc]/40 transition-all flex items-start gap-2.5"
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
                      <span className="text-[11px] text-[#9ca3af] mt-0.5">
                        {prompt.subtitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Guidance Topics */}
            <div className="bg-[#11131c]/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-[#262938]/60 flex flex-col gap-3">
              <span className="font-sora text-xs text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#3b82f6]">menu_book</span>
                Portfolio Guidance Topics
              </span>

              <div className="flex flex-col gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-[#151722]/60 border border-[#262938]/40 flex flex-col gap-1">
                  <span className="font-sora text-xs text-[#c084fc] font-semibold">AI Projects:</span>
                  <span className="text-[#9ca3af]">
                    Flappy – Personal AI (natural conversations &amp; engaging interactive experiences)
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#151722]/60 border border-[#262938]/40 flex flex-col gap-1">
                  <span className="font-sora text-xs text-[#3b82f6] font-semibold">
                    Android Apps (Personal Projects — Not yet published):
                  </span>
                  <span className="text-[#9ca3af]">
                    EMI Buddy, Help SOS, Notepad, Screen Recorder
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#151722]/60 border border-[#262938]/40 flex flex-col gap-1">
                  <span className="font-sora text-xs text-[#f472b6] font-semibold">
                    Android Games (Personal Projects — Not yet published):
                  </span>
                  <span className="text-[#9ca3af]">
                    Blueffy Bird, Clash of Fruit
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#151722]/60 border border-[#262938]/40 flex flex-wrap gap-2 text-xs pt-1">
                  <button
                    onClick={() => onNavigate('skills')}
                    className="px-2.5 py-1 rounded bg-[#1c1f30] text-white hover:text-[#c084fc] font-sora font-semibold transition-colors"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => onNavigate('projects')}
                    className="px-2.5 py-1 rounded bg-[#1c1f30] text-white hover:text-[#3b82f6] font-sora font-semibold transition-colors"
                  >
                    Projects
                  </button>
                  <button
                    onClick={onOpenContact}
                    className="px-2.5 py-1 rounded bg-[#1c1f30] text-white hover:text-[#f472b6] font-sora font-semibold transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONVERSATION AREA (lg:col-span-7) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {/* Chat History Feed */}
            <div className="flex flex-col gap-6 min-h-[500px]">
              {/* Default Welcome Card when no messages have been sent yet */}
              {messages.length === 0 && (
                <div className="flex items-start gap-3 max-w-3xl">
                  <div className="shrink-0 mt-0.5">
                    <FlappyAvatar size="md" showGlow />
                  </div>

                  <div className="flex flex-col gap-3.5 bg-[#11131c]/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl rounded-tl-sm border border-[#262938]/60 shadow-xl flex-1">
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
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors"
                      >
                        Android Apps &amp; Games
                      </button>
                      <button
                        onClick={() => handleSendMessage("What featured projects has Aaron built?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors"
                      >
                        Featured Projects
                      </button>
                      <button
                        onClick={() => handleSendMessage("What skills and technologies does Aaron work with?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors"
                      >
                        Skills &amp; Capabilities
                      </button>
                      <button
                        onClick={() => handleSendMessage("How can I get in touch with Aaron for a project?")}
                        className="px-3 py-1.5 rounded-lg bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 text-xs font-semibold text-[#adc6ff] hover:text-white transition-colors"
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

                    <div className="flex flex-col gap-3 bg-[#11131c]/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl rounded-tl-sm border border-[#262938]/60 shadow-xl flex-1">
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

            {/* Sleek Desktop Composer Input Bar (Sticky Bottom) */}
            <div className="sticky bottom-6 mt-4 flex flex-col gap-2">
              <div className="relative bg-[#11131c]/95 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl border border-[#262938]/70 focus-within:border-[#c084fc]/50 transition-all">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center sm:items-end gap-2 px-2"
                >
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    placeholder={isTyping ? "Flappy AI is formulating response..." : "Ask Flappy AI about Aaron's projects, apps, games, skills..."}
                    className="flex-1 bg-transparent py-2 sm:py-3 px-2 text-xs sm:text-sm text-white placeholder:text-[#9ca3af] focus:outline-none resize-none min-h-[56px] sm:min-h-[44px] max-h-[140px] leading-snug sm:leading-normal"
                  />

                  <div className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#151722] text-[10px] text-[#9ca3af] border border-[#262938]/40 font-mono mb-2">
                    <span>Enter</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all mb-0 sm:mb-1 shrink-0 ${
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
              <div className="flex items-center justify-between px-3 text-xs text-[#9ca3af]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                  <span>Flappy AI • Personal AI Portfolio Assistant for Aaron Cchan (Diphu, Assam)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#3b82f6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Verified Portfolio Grounding</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
