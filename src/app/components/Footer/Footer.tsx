// src/app/components/Footer/Footer.tsx

/* ─────────── File Path: src/components/layout/footer.tsx ─────────── */
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Code,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);

  return (
    <footer className="w-full border-t bg-background border-border">
      {showInfo && (
        <aside className="grid md:grid-cols-[1fr_1fr] items-start">
          <div className="bg-muted border-r h-full p-4">
            {/* Portfolio Tech Stack Card */}
            <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Code size={18} />
                  Portfolio Tech Stack
                </h3>
              </div>
              <div className="p-6 pt-0 text-sm">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Built by Marcus Widén in under 3 weeks using Next.js,
                  TypeScript, Tailwind CSS, and Framer Motion. A modern,
                  responsive portfolio showcasing clean design and smooth
                  interactions.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Deployed on Vercel</span>
                </div>
              </div>
              <div className="grid items-center p-6 pt-0 text-xs text-muted-foreground grid-cols-[auto_auto] gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-xs">Malmö, Sweden</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} />
                  <span className="text-xs">Contact via portfolio</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted h-full p-4">
            {/* Documentation & Links Card */}
            <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <ExternalLink size={18} />
                  Documentation
                </h3>
              </div>
              <div className="p-6 pt-0 text-sm space-y-2">
                <Link
                  href="/legal"
                  className="block underline underline-offset-2 cursor-pointer hover:text-primary transition-colors"
                >
                  Legal Information
                </Link>
                <p className="text-muted-foreground text-xs mt-3">
                  Interested in collaboration or have questions? Feel free to
                  explore the portfolio and reach out!
                </p>
              </div>
              <div className="flex items-center p-6 pt-0"></div>
            </div>
          </div>
        </aside>
      )}
      {/* Bottom Bar */}
      <div className="border-border p-4 grid grid-cols-[1fr_auto] items-center text-sm">
        <p>
          &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
          reserved.
        </p>
        <button
          onClick={toggleShowInfo}
          aria-expanded={showInfo}
          className="grid grid-flow-col auto-cols-max items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
          {showInfo ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>
    </footer>
  );
}
