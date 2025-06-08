//src/app/contact/page.tsx

'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
} from 'lucide-react';

interface BudgetOption {
  value: string;
  label: string;
  icon: string;
}

interface ContactReason {
  value: string;
  label: string;
  color: string;
  description: string;
}

const budgetOptions: BudgetOption[] = [
  { value: 'under_3000', label: 'Under $3,000', icon: '💰' },
  { value: '3000_4500', label: '$3,000 - $4,500', icon: '💵' },
  { value: '4500_6000', label: '$4,500 - $6,000', icon: '💸' },
  { value: '6000_8000', label: '$6,000 - $8,000', icon: '🏆' },
  { value: '8000_plus', label: 'Over $8,000', icon: '✨' },
];

const contactReasons: ContactReason[] = [
  {
    value: 'job_offer',
    label: 'Job Offers',

    color: 'from-blue-500 to-purple-600',
    description: "Let's discuss opportunities",
  },
  {
    value: 'issues',
    label: 'Issues',

    color: 'from-red-500 to-pink-600',
    description: 'Need help with something?',
  },
  {
    value: 'general',
    label: 'General Conversations',

    color: 'from-green-500 to-teal-600',
    description: 'Just want to chat',
  },
];

const placeholders: Record<string, string> = {
  job_offer:
    'Tell me about the role, requirements, and what excites you about this opportunity...',
  issues:
    "Describe the challenge you're facing. The more details, the better I can help...",
  general: "What's on your mind? I'd love to hear your thoughts and ideas...",
};

interface CustomDropdownProps {
  value: string;
  options: BudgetOption[] | ContactReason[];
  onChange: (value: string) => void;
  type?: 'default' | 'budget' | 'reason';
}

function CustomDropdown({
  value,
  options,
  onChange,
  type = 'default',
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-left text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {type === 'budget' &&
              selectedOption &&
              'icon' in selectedOption && (
                <span className="text-xl">{selectedOption.icon}</span>
              )}
            <span className="font-medium">
              {selectedOption ? selectedOption.label : 'Select an option...'}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full p-4 text-left text-gray-800 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {type === 'budget' && 'icon' in option && (
                  <span className="text-xl">{option.icon}</span>
                )}
                <div>
                  <div className="font-medium">{option.label}</div>
                  {'description' in option && option.description && (
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  )}
                </div>
              </div>
              {value === option.value && (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ${
            i <= currentStep
              ? 'w-8 bg-gradient-to-r from-purple-400 to-blue-400'
              : 'w-2 bg-white/30'
          }`}
        />
      ))}
    </div>
  );
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

function AnimatedButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}: AnimatedButtonProps) {
  const baseClasses =
    'px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-600',
    secondary:
      'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30',
    ghost: 'text-white/80 hover:text-white hover:bg-white/10',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    message: '',
    budget: '',
    reason: '',
  });
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const getStepCount = () => (formData.reason === 'job_offer' ? 4 : 3);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (formData.reason !== 'job_offer' && step === 0) {
      setStep(2); // Skip budget step for non-job offers
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (formData.reason !== 'job_offer' && step === 2) {
      setStep(0); // Go back to reason step for non-job offers
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (formData.message.trim().length < 10) {
      setStatus('Message must be at least 10 characters.');
      return;
    }

    setLoading(true);
    setStatus('Sending your message...');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('Message sent successfully! 🎉');
      setFormData({ message: '', budget: '', reason: '' });
      setStep(0);
    } catch {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = (reason: string) => {
    return placeholders[reason] || 'Enter your message...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Let&apos;s Connect
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Get In Touch</h1>
          <p className="text-white/70 text-lg">
            I&apos;d love to hear from you. Let&apos;s start a conversation.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          <StepIndicator currentStep={step} totalSteps={getStepCount()} />

          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Let&apos;s Start - What Brings You Here?
                </h2>
                <p className="text-white/70">
                  Choose the option that best describes your inquiry
                </p>
              </div>

              <CustomDropdown
                value={formData.reason}
                options={contactReasons}
                onChange={(value: string) => handleChange('reason', value)}
                type="reason"
              />

              <div className="flex justify-center">
                <AnimatedButton
                  onClick={nextStep}
                  disabled={!formData.reason}
                  className="flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </div>
            </div>
          )}

          {step === 1 && formData.reason === 'job_offer' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Let&apos;s talk budget 💰
                </h2>
                <p className="text-white/70">
                  What&apos;s your project budget range?
                </p>
              </div>

              <CustomDropdown
                value={formData.budget}
                options={budgetOptions}
                onChange={(value: string) => handleChange('budget', value)}
                type="budget"
              />

              <div className="flex justify-between">
                <AnimatedButton
                  onClick={prevStep}
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </AnimatedButton>
                <AnimatedButton
                  onClick={nextStep}
                  disabled={!formData.budget}
                  className="flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Tell me more ✨
                </h2>
                <p className="text-white/70">
                  Share the details of your{' '}
                  {formData.reason === 'job_offer' ? 'project' : 'inquiry'}
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder={getPlaceholder(formData.reason)}
                  rows={6}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 resize-none transition-all duration-300 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20"
                />
                <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                  {formData.message.length}/500
                </div>
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  onClick={prevStep}
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </AnimatedButton>
                <AnimatedButton
                  onClick={nextStep}
                  disabled={!formData.message || formData.message.length < 10}
                  className="flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Ready to send? 🚀
                </h2>
                <p className="text-white/70">Review and submit your message</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Type:</h3>
                  <p className="text-white/80">
                    {
                      contactReasons.find((r) => r.value === formData.reason)
                        ?.label
                    }
                  </p>
                </div>
                {formData.budget && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Budget:</h3>
                    <p className="text-white/80">
                      {
                        budgetOptions.find((b) => b.value === formData.budget)
                          ?.label
                      }
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white mb-2">Message:</h3>
                  <p className="text-white/80 max-h-32 overflow-y-auto">
                    {formData.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  onClick={prevStep}
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </AnimatedButton>
              </div>
            </div>
          )}

          {status && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-medium ${
                status.includes('successfully') || status.includes('🎉')
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : status.includes('Sending')
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {status}
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-white/50 text-sm">
          <p>Usually respond within 24 hours ⚡</p>
        </div>
      </div>
    </div>
  );
}
