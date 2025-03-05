'use client';

export default function LegalPage() {
  return (
    <div className="grid gap-6 p-6 text-zinc-900 bg-zinc-100 min-h-screen">
      {/* Title */}
      <header className="grid gap-2">
        <h1 className="text-3xl font-bold" aria-label="Legal Information Page">
          Legal Information
        </h1>
      </header>

      {/* Table of Contents */}
      <nav
        aria-label="Table of Contents for Legal Information"
        className="grid gap-2"
      >
        <h2 className="text-xl font-semibold">Contents</h2>
        <ul className="grid gap-1 text-zinc-700">
          {[
            { id: 'legal-terms', label: 'Legal Terms' },
            { id: 'privacy-policy', label: 'Privacy Policy' },
            { id: 'terms-of-service', label: 'Terms of Service' },
            { id: 'dispute-resolution', label: 'Dispute Resolution' },
            { id: 'limitation-liability', label: 'Limitation of Liability' },
            { id: 'indemnification', label: 'Indemnification' },
            { id: 'termination', label: 'Termination' },
            { id: 'third-party-services', label: 'Third-Party Services' },
            { id: 'cookie-policy', label: 'Cookie Policy' },
            { id: 'accessibility', label: 'Accessibility Statement' },
            { id: 'data-retention', label: 'Data Retention Policy' },
            { id: 'intellectual-property', label: 'Intellectual Property' },
            { id: 'modifications', label: 'Modifications to the Agreement' },
            { id: 'contact', label: 'Responsible Publisher' },
          ].map((item) => (
            <li key={item.id}>
              <a
                className="text-zinc-600 hover:text-zinc-800"
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Legal Content */}
      <main className="grid gap-4">
        {[
          {
            id: 'legal-terms',
            title: 'Legal Terms',
            content:
              'By accessing or using this website, you acknowledge and agree to comply with all applicable laws and regulations. Unauthorized activities, including hacking, data extraction, and any form of misuse, are strictly prohibited and may result in legal action.',
          },
          {
            id: 'privacy-policy',
            title: 'Privacy Policy',
            content:
              'We are committed to protecting your privacy. Data such as IP addresses, browser details, and site interactions are collected solely for security, analytical, and operational purposes. Personal information will not be shared unless legally required.',
          },
          {
            id: 'terms-of-service',
            title: 'Terms of Service',
            content:
              'Use of this website constitutes acceptance of these terms. Any breach, including but not limited to illegal activities or violations of our content policies, may result in restricted access or termination of service.',
          },
          {
            id: 'dispute-resolution',
            title: 'Dispute Resolution',
            content:
              'All disputes arising from website use shall be governed by the laws of the State of New York and must be resolved through binding arbitration. Class-action lawsuits are expressly waived.',
          },
          {
            id: 'limitation-liability',
            title: 'Limitation of Liability',
            content:
              'The Service Provider is not liable for any direct, indirect, incidental, or consequential damages, including but not limited to loss of data or revenue, arising from the use of this website.',
          },
          {
            id: 'indemnification',
            title: 'Indemnification',
            content:
              'Users agree to indemnify and hold harmless the Service Provider against any claims, damages, or legal expenses arising from misuse of this website or violations of these terms.',
          },
          {
            id: 'termination',
            title: 'Termination',
            content:
              'The Service Provider reserves the right to terminate access to this website at its sole discretion, particularly in cases of policy violations.',
          },
          {
            id: 'third-party-services',
            title: 'Third-Party Services',
            content:
              'This website may contain links to external services. We do not endorse, control, or assume liability for third-party content, policies, or practices.',
          },
          {
            id: 'cookie-policy',
            title: 'Cookie Policy',
            content:
              'Cookies are used to enhance website performance and user experience. Continued use of this website constitutes consent to our cookie policy.',
          },
          {
            id: 'accessibility',
            title: 'Accessibility Statement',
            content:
              'We strive to make this website accessible. If you experience any difficulties, please contact us for assistance.',
          },
          {
            id: 'data-retention',
            title: 'Data Retention Policy',
            content:
              'User data is retained only as necessary. Requests for data removal should be directed to our support team.',
          },
          {
            id: 'intellectual-property',
            title: 'Intellectual Property',
            content:
              'All website content, including text, images, and code, is protected by intellectual property laws. Unauthorized reproduction or distribution is prohibited.',
          },
          {
            id: 'modifications',
            title: 'Modifications to the Agreement',
            content:
              'We reserve the right to modify these terms at any time. Continued use of this website signifies acceptance of any updates.',
          },
          {
            id: 'contact',
            title: 'Responsible Publisher',
            content:
              'The responsible publisher of this website is Marcus Widén. For inquiries, please contact us through the provided channels.',
          },
        ].map((section) => (
          <section key={section.id} id={section.id} className="grid gap-2">
            <h2 className="text-2xl font-semibold text-zinc-800">
              {section.title}
            </h2>
            <p className="text-zinc-700">{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
