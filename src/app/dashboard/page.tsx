//src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/Button/Button';

type StatType = {
  users: number;
  messages: number;
  projects: number;
  experiences: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<StatType>({
    users: 0,
    messages: 0,
    projects: 0,
    experiences: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoints = ['users', 'messages', 'projects', 'experiences'];
      const responses = await Promise.all(
        endpoints.map((endpoint) => fetch(`/api/${endpoint}`))
      );

      if (responses.some((res) => !res.ok))
        throw new Error('One or more API calls failed');

      const data = await Promise.all(responses.map((res) => res.json()));

      setStats({
        users: data[0]?.users?.length || 0,
        messages: data[1]?.messages?.length || 0,
        projects: data[2]?.projects?.length || 0,
        experiences: data[3]?.experiences?.length || 0,
      });
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to fetch stats. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-full grid gap-6 bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg">Welcome to the admin dashboard.</p>

      <Button
        variant="primary"
        size="md"
        onClick={fetchStats}
        disabled={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh Stats'}
      </Button>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <StatCard
            key={key}
            title={`Total ${capitalize(key)}`}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-primary-100 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 p-6 rounded grid grid-rows-2 gap-2 place-items-center">
    <h2 className="text-md font-semibold">{title}</h2>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
