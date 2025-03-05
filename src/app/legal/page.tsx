'use client';

export default function LegalPage() {
  return (
    <div className="grid gap-6 place-items-center transition bg-white dark:bg-black text-black dark:text-white">
      {/* Title */}
      <div className="w-full p-8 rounded-md border border-light dark:border-dark bg-white10 dark:bg-black10">
        <h1
          className="text-2xl font-bold text-black dark:text-white text-center"
          aria-label="Legal Information Page"
        >
          Legal Information
        </h1>
      </div>

      {/* Table of Contents */}
      <div className="w-full p-8 rounded-md border border-light dark:border-dark bg-white10 dark:bg-black10">
        <nav aria-label="Table of Contents for Legal Information">
          <ul className="list-disc pl-6 text-black10 dark:text-white10">
            <li>
              <a
                href="#legal-terms"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Legal Terms
              </a>
            </li>
            <li>
              <a
                href="#privacy-policy"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms-of-service"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#dispute-resolution"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Dispute Resolution
              </a>
            </li>
            <li>
              <a
                href="#limitation-liability"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Limitation of Liability
              </a>
            </li>
            <li>
              <a
                href="#indemnification"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Indemnification
              </a>
            </li>
            <li>
              <a
                href="#termination"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Termination
              </a>
            </li>
            <li>
              <a
                href="#third-party-services"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Third-Party Services
              </a>
            </li>
            <li>
              <a
                href="#cookie-policy"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Cookie Policy
              </a>
            </li>
            <li>
              <a
                href="#accessibility"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Accessibility Statement
              </a>
            </li>
            <li>
              <a
                href="#data-retention"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Data Retention Policy
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Intellectual Property
              </a>
            </li>
            <li>
              <a
                href="#modifications"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Modifications to the Agreement
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:underline text-green hover:text-green/80 transition"
              >
                Responsible Publisher
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Legal Content */}
      <div className="w-full p-8 rounded-md border border-light dark:border-dark bg-white10 dark:bg-black10">
        <div className="space-y-6">
          <section id="legal-terms">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Legal Terms
            </h2>
            <p className="text-base text-black10 dark:text-white10 leading-relaxed">
              By accessing or using this website, you agree to comply with all
              applicable laws and regulations. Unauthorized activities,
              including hacking, data scraping, or other misuse, are prohibited
              and may result in legal consequences.
            </p>
          </section>

          <section id="privacy-policy">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Privacy Policy
            </h2>
            <p className="text-base text-black10 dark:text-white10 leading-relaxed">
              We respect your privacy and are committed to protecting it.
              Information such as IP addresses, browser details, visited pages,
              and timestamps is collected to monitor performance, improve user
              experience, and ensure security. We do not share your information
              with third parties except when required by law.
            </p>
          </section>

          <section id="terms-of-service">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Terms of Service
            </h2>
            <p className="text-base text-black10 dark:text-white10 leading-relaxed">
              By using this website, you agree to the terms and conditions
              outlined here. Prohibited activities or posting content that
              violates laws may result in suspension or termination of your
              access.
            </p>
          </section>

          <section id="dispute-resolution">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Dispute Resolution
            </h2>
            <p className="text-base text-black10 dark:text-white10 leading-relaxed">
              Any disputes arising from the use of this website will be governed
              by the laws of the State of New York. Disputes must be resolved
              through binding arbitration, and users waive the right to
              participate in class-action lawsuits.
            </p>
          </section>

          <section id="limitation-liability">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-base text-black10 dark:text-white10 leading-relaxed">
              The Service Provider is not responsible for damages, including
              loss of profits or data, resulting from the use of this website.
              Liability is limited to the amount paid for services, where
              applicable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
