import { redirect } from 'next/navigation';

export default function DashboardIndex() {
  const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL;

  if (marketingUrl) {
    redirect(marketingUrl);
  }

  return (
    <div className="grid place-items-center min-h-screen p-6 text-primary-900 dark:text-secondary-50">
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm">
          Set <code className="font-mono">NEXT_PUBLIC_MARKETING_URL</code> to
          redirect back to the marketing site.
        </p>
      </div>
    </div>
  );
}
