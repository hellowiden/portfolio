'use client';

export default function LegalPage() {
  return (
    <div className="grid gap-6 place-items-center transition bg-white  text-black ">
      {/* Title */}
      <div className="w-full p-8 rounded-md border ">
        <h1
          className="text-2xl font-bold text-center"
          aria-label="Legal Information Page"
        >
          Legal Information
        </h1>
      </div>

      {/* Table of Contents */}
      <div className="w-full p-8 rounded-md border ">
        <nav aria-label="Table of Contents for Legal Information">
          <ul className="list-disc  ">
            <li>
              <a href="#legal-terms" className="hover:underline transition">
                Legal Terms
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="hover:underline transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms-of-service"
                className="hover:underline transition"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#dispute-resolution"
                className="hover:underline transition"
              >
                Dispute Resolution
              </a>
            </li>
            <li>
              <a
                href="#limitation-liability"
                className="hover:underline transition"
              >
                Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#indemnification" className="hover:underline transition">
                Indemnification
              </a>
            </li>
            <li>
              <a href="#termination" className="hover:underline  transition">
                Termination
              </a>
            </li>
            <li>
              <a
                href="#third-party-services"
                className="hover:underline transition"
              >
                Third-Party Services
              </a>
            </li>
            <li>
              <a href="#cookie-policy" className="hover:underline transition">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#accessibility" className="hover:underline  transition">
                Accessibility Statement
              </a>
            </li>
            <li>
              <a href="#data-retention" className="hover:underline transition">
                Data Retention Policy
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="hover:underline  transition"
              >
                Intellectual Property
              </a>
            </li>
            <li>
              <a href="#modifications" className="hover:underline  transition">
                Modifications to the Agreement
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline  transition">
                Responsible Publisher
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Legal Content */}
      <div className="w-full p-8 rounded-md border  ">
        <div className="space-y-6">
          <section id="legal-terms">
            <h2 className="text-xl font-semibold text-black ">Legal Terms</h2>
            <p className="leading-relaxed">
              By accessing or using this website, you agree to comply with all
              applicable laws and regulations. Unauthorized activities,
              including hacking, data scraping, or other misuse, are prohibited
              and may result in legal consequences.
            </p>
          </section>

          <section id="privacy-policy">
            <h2 className="text-xl font-semibold ">Privacy Policy</h2>
            <p className="leading-relaxed">
              We respect your privacy and are committed to protecting it.
              Information such as IP addresses, browser details, visited pages,
              and timestamps is collected to monitor performance, improve user
              experience, and ensure security. We do not share your information
              with third parties except when required by law.
            </p>
          </section>

          <section id="terms-of-service">
            <h2 className="text-xl font-semibold">Terms of Service</h2>
            <p className="leading-relaxed">
              By using this website, you agree to the terms and conditions
              outlined here. Prohibited activities or posting content that
              violates laws may result in suspension or termination of your
              access.
            </p>
          </section>

          <section id="dispute-resolution">
            <h2 className="text-xl font-semibold">Dispute Resolution</h2>
            <p className="leading-relaxed">
              Any disputes arising from the use of this website will be governed
              by the laws of the State of New York. Disputes must be resolved
              through binding arbitration, and users waive the right to
              participate in class-action lawsuits.
            </p>
          </section>

          <section id="limitation-liability">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p className="leading-relaxed">
              The Service Provider is not responsible for damages, including
              loss of profits or data, resulting from the use of this website.
              Liability is limited to the amount paid for services, where
              applicable.
            </p>
          </section>
          <section id="indemnification">
            <h2 className="text-xl font-semibold">Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold the Service Provider harmless from
              any claims, damages, or losses arising from your use of the
              website or your breach of these terms.
            </p>
          </section>
          <section id="termination">
            <h2 className="text-xl font-semibold">Termination</h2>
            <p className="leading-relaxed">
              The Service Provider may terminate accounts or restrict access at
              its sole discretion, especially in cases of non-compliance with
              these terms.
            </p>
          </section>
          <section id="third-party-services">
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p className="leading-relaxed">
              This website may include links to third-party services for your
              convenience. We are not responsible for the accuracy, content, or
              reliability of external websites or services.
            </p>
          </section>
          <section id="cookie-policy">
            <h2 className="text-xl font-semibold">Cookie Policy</h2>
            <p className="leading-relaxed">
              We use cookies to enhance website functionality, analyze site
              performance, and improve your experience. By continuing to use
              this website, you agree to our use of cookies as described in our
              Cookie Policy.
            </p>
          </section>
          <section id="accessibility">
            <h2 className="text-xl font-semibold">Accessibility Statement</h2>
            <p className="leading-relaxed">
              We are committed to making this website accessible to all users.
              If you encounter any barriers, please contact us so we can assist
              you and address the issue promptly.
            </p>
          </section>
          <section id="data-retention">
            <h2 className="text-xl font-semibold">Data Retention Policy</h2>
            <p className="leading-relaxed">
              We retain user data only for as long as necessary to fulfill its
              intended purpose. Data is securely stored and regularly reviewed
              for deletion. If you wish to have your data deleted, please
              contact our support team.
            </p>
          </section>
          <section id="intellectual-property">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, images, and code, is
              protected under intellectual property laws. Unauthorized use,
              reproduction, or distribution is prohibited.
            </p>
          </section>
          <section id="modifications">
            <h2 className="text-xl font-semibold">
              Modifications to the Agreement
            </h2>
            <p className="leading-relaxed">
              We may update these terms at any time. Continued use of the
              website after changes are made indicates your acceptance of the
              revised terms.
            </p>
          </section>
          <section id="contact">
            <h2 className="text-xl font-semibold">Responsible Publisher</h2>
            <p className="leading-relaxed">
              The responsible publisher for this website is Marcus Widén. For
              inquiries, please contact us using the information provided on
              this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
