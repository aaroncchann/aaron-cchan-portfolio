import React, { useState, useEffect } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { WEB3FORMS_CONFIG } from '../config/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

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
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setValidationError(null);
    setErrorMessage(null);
    setSubmitSuccess(false);
    onClose();
  };

  const handleReset = () => {
    setValidationError(null);
    setErrorMessage(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setValidationError('Please provide your name/organization, email, and project brief.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    const accessKey = WEB3FORMS_CONFIG.accessKey;
    if (!accessKey) {
      setErrorMessage(
        'Web3Forms access key is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY in your .env file.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: trimmedName,
          email: trimmedEmail,
          replyto: trimmedEmail,
          message: trimmedMessage,
          subject: `Portfolio Collaboration Message from ${trimmedName}`,
          from_name: `${trimmedName} (Aaron Cchan Portfolio)`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage(
          data.message || 'Unable to transmit message. Please try again or email directly.'
        );
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setErrorMessage('A network error occurred. Please check your internet connection or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Get in Touch with Aaron Cchan"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto overflow-x-hidden rounded-3xl bg-[#11131c] border border-[#262938] shadow-2xl p-6 md:p-8 flex flex-col gap-6 text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#9333ea]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded-full bg-[#9333ea]/15 text-[#c084fc] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse"></span>
              Direct Inquiries
            </div>
            <h3 className="font-sora text-xl md:text-2xl font-bold tracking-tight">
              Get in Touch with Aaron Cchan
            </h3>
            <p className="text-xs text-[#9ca3af]">
              Open for projects, collaborations, and mobile app testing from Diphu, Assam.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl bg-[#1c1f30] text-[#9ca3af] hover:text-white border border-[#262938] hover:border-[#c084fc]/40 transition-all cursor-pointer"
            aria-label="Close Contact Modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Email Display Bar (Clickable mailto link with Active status) */}
        <a
          href={`mailto:${PORTFOLIO_INFO.email}`}
          className="p-3.5 rounded-2xl bg-[#151722] hover:bg-[#1c1f30] border border-[#262938]/60 hover:border-[#c084fc]/50 flex items-center justify-between gap-3 group transition-all"
          title={`Email Aaron directly at ${PORTFOLIO_INFO.email}`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="material-symbols-outlined text-[#c084fc] text-xl group-hover:scale-105 transition-transform">
              alternate_email
            </span>
            <span className="text-xs md:text-sm font-mono text-[#9ca3af] group-hover:text-white transition-colors truncate">
              {PORTFOLIO_INFO.email}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Available
          </span>
        </a>

        {/* Inquiry Form or Submission Success Confirmation */}
        {submitSuccess ? (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#151722] border border-[#262938] flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-[#3b82f6]/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div className="flex flex-col gap-1.5 max-w-sm">
              <h4 className="font-sora text-base font-semibold text-white">
                Message Transmitted Successfully
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Thank you for reaching out! Your inquiry has been sent directly to Aaron Cchan. A response will be delivered to your email shortly.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1 w-full">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#9ca3af] hover:text-white bg-[#1c1f30] hover:bg-[#24283c] border border-[#262938] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#9333ea] to-[#3b82f6] shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {validationError && (
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-amber-400 shrink-0">warning</span>
                <span>{validationError}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-red-400 shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#9ca3af] font-medium">Your Name / Organization</label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera or Acme Labs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151722] border border-[#262938] text-[16px] md:text-xs text-white placeholder:text-[#9ca3af] focus:outline-none focus:border-[#c084fc] disabled:opacity-50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#9ca3af] font-medium">Your Email</label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151722] border border-[#262938] text-[16px] md:text-xs text-white placeholder:text-[#9ca3af] focus:outline-none focus:border-[#c084fc] disabled:opacity-50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#9ca3af] font-medium">Project Brief / Message</label>
              <textarea
                required
                disabled={isSubmitting}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell Aaron about your AI chatbot, web app, or Android project..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#151722] border border-[#262938] text-[16px] md:text-xs text-white placeholder:text-[#9ca3af] focus:outline-none focus:border-[#c084fc] resize-none disabled:opacity-50 transition-colors"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-2 py-3 rounded-xl font-sora text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-[#9333ea] to-[#3b82f6] shadow-lg transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:shadow-xl hover:brightness-110 cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Transmit Collaboration Message</span>
                </>
              ) : (
                'Transmit Collaboration Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
