//src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import Button from '@/app/components/Button/Button';

type StatType = {
  users: number;
  onlineUsers: number;
  messages: number;
  projects: number;
  experiences: number;
};

type TrendType = {
  label: string;
  path: string;
  current: number;
  previous: number;
  data: { value: number }[];
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

  const trendMock = (key: keyof StatType, current: number): TrendType => {
    const previous = Math.max(0, current - Math.floor(current * 0.25));
    const path = key === 'users' ? '' : `/${key}`;
    const label = key === 'users' ? 'Users' : capitalize(key);
    const data = Array.from({ length: 7 }).map(() => ({
      value: Math.floor(current * (0.8 + Math.random() * 0.4)),
    }));

    return { label, path, current, previous, data };
  };

  const trends = Object.entries(stats)
    .filter(([key]) => key !== 'onlineUsers')
    .map(([key, value]) => trendMock(key as keyof StatType, value));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm">
            System summary with trends and insights.
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
        />
        {trends.map((trend) => (
          <TrendCard key={trend.label} trend={trend} />
        ))}
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string | number;
  subtext?: string;
}) => (
  <div className="bg-primary-100 dark:bg-secondary-800 border border-primary-200 dark:border-secondary-700 rounded-xl p-4 shadow-sm flex flex-col gap-1">
    <span className="text-sm font-medium text-muted-foreground">{title}</span>
    <span className="text-3xl font-bold">{value}</span>
    {subtext && (
      <span className="text-xs text-muted-foreground">{subtext}</span>
    )}
  </div>
);

const TrendCard = ({ trend }: { trend: TrendType }) => {
  const diff = trend.current - trend.previous;
  const percentNum = trend.previous > 0 ? (diff / trend.previous) * 100 : 0;
  const percentStr = percentNum.toFixed(1);
  const isPositive = diff >= 0;

  return (
    <Link href={`/dashboard${trend.path}`}>
      <div className="cursor-pointer bg-primary-100 dark:bg-secondary-800 border border-primary-200 dark:border-secondary-700 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-muted-foreground">
            {trend.label}
          </div>
          <div
            className={`text-sm font-semibold ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? '+' : '-'}
            {Math.abs(parseFloat(percentStr))}%
          </div>
        </div>
        <div className="text-3xl font-bold">{trend.current}</div>
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={trend.data}>
            <Tooltip contentStyle={{ display: 'none' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={2}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
