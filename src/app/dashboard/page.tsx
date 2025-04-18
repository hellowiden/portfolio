//src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/Button/Button';

type StatType = {
  users: number;
  onlineUsers: number;
  messages: number;
  projects: number;
  experiences: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<StatType>({
    users: 0,
    onlineUsers: 0,
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

      if (responses.some((res) => !res.ok)) {
        throw new Error('One or more API calls failed');
      }

      const data = await Promise.all(responses.map((res) => res.json()));

      setStats({
        users: data[0]?.users?.length || 0,
        onlineUsers: data[0]?.onlineUsers || 0,
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm">
            View system stats and refresh data as needed.
          </p>
        </div>
        <Button onClick={fetchStats} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </Button>
      </div>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Users Online"
          value={`${stats.onlineUsers}/${stats.users}`}
          subtext="Online / Total"
          highlight
        />
        <StatCard title="Messages" value={stats.messages} />
        <StatCard title="Projects" value={stats.projects} />
        <StatCard title="Experiences" value={stats.experiences} />
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  subtext,
  highlight = false,
}: {
  title: string;
  value: number | string;
  subtext?: string;
  highlight?: boolean;
}) => (
  <div className="bg-primary-100 dark:bg-secondary-800 border border-primary-200 dark:border-secondary-700 rounded-xl p-4 shadow-sm flex flex-col gap-1">
    <span className="text-sm font-medium text-muted-foreground">{title}</span>
    <span
      className={`text-3xl font-bold ${
        highlight ? 'text-green-600 dark:text-green-400' : ''
      }`}
    >
      {value}
    </span>
    {subtext && (
      <span className="text-xs text-muted-foreground">{subtext}</span>
    )}
  </div>
);
