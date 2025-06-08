// src/app/components/Footer/Footer.tsx

'use client';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-700 opacity-90" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 backdrop-blur-sm border-t border-primary-300/50 dark:border-secondary-600/50">
        {/* Toggle Button Section */}
        <div className="w-full px-6 sm:px-8 py-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="group relative px-6 py-3 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm border border-primary-200 dark:border-secondary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2 text-primary-900 dark:text-secondary-100 font-medium">
              {isVisible ? (
                <>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Hide Details
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Show Details
                </>
              )}
            </span>
          </Button>
        </div>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 sm:px-8 pb-8">
            {/* Main Content Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Tech Stack Card */}
              <div className="group bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 border border-primary-200/50 dark:border-secondary-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-primary-900 dark:text-secondary-50">
                    Tech Stack
                  </h4>
                </div>
                <p className="text-sm text-primary-700 dark:text-secondary-300 leading-relaxed">
                  Built by{' '}
                  <span className="font-semibold text-primary-900 dark:text-secondary-100">
                    Marcus Widén
                  </span>{' '}
                  in under 3 weeks using Next.js, TypeScript, Tailwind CSS, and
                  Framer Motion
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary-600 dark:text-secondary-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Deployed on Vercel
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="group bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 border border-primary-200/50 dark:border-secondary-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-primary-900 dark:text-secondary-50">
                    Documentation
                  </h4>
                </div>
                <Link href="/legal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start p-3 bg-primary-100/50 dark:bg-secondary-700/50 rounded-lg hover:bg-primary-200/50 dark:hover:bg-secondary-600/50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Legal Information
                  </Button>
                </Link>
              </div>

              {/* Connect Card */}
              <div className="group bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm rounded-2xl p-6 border border-primary-200/50 dark:border-secondary-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-primary-900 dark:text-secondary-50">
                    Connect
                  </h4>
                </div>
                <p className="text-sm text-primary-700 dark:text-secondary-300">
                  Interested in collaboration or have questions? Feel free to
                  reach out!
                </p>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-primary-300/30 dark:border-secondary-600/30 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-primary-700 dark:text-secondary-300 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  &copy; {currentYear} Marcus Widén — Personal Portfolio. All
                  rights reserved.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-600 dark:text-secondary-400">
                  <span>Made with</span>
                  <svg
                    className="w-4 h-4 text-red-500 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>in Sweden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
