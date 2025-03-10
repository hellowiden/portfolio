'use client';

const sections = [
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
];

export default function LegalPage() {
  return (
    <div className="grid gap-6">
      <nav
        aria-label="Table of Contents for Legal Information"
        className="grid gap-2"
      >
        <h2 className="text-xl font-semibold dark:text-white">Contents</h2>
        <ul className="grid gap-1 text-zinc-700 dark:text-zinc-300">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a
                className="text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                href={`#${id}`}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="grid gap-4">
        {sections.map(({ id, title, content }) => (
          <section key={id} id={id} className="grid gap-2">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
              {title}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300">{content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
