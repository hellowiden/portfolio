'use client';

import { usePathname } from 'next/navigation';

interface User {
  name: string;
  email: string;
  roles: string[];
}

interface Project {
  name: string;
  description?: string;
  tags?: string[];
}

interface Message {
  userName: string;
  userEmail: string;
  message: string;
  reason: string;
}

interface Experience {
  title: string;
  location: string;
  tags: string[];
  type: string;
}

type SearchData = User | Project | Message | Experience;

interface SearchInputProps<T extends SearchData> {
  value: string;
  onChange: (value: string) => void;
  data: T[];
  onFilter: (filtered: T[]) => void;
}

export default function SearchInput<T extends SearchData>({
  value,
  onChange,
  data,
  onFilter,
}: SearchInputProps<T>) {
  const pathname = usePathname();

  const filterData = (query: string) => {
    const q = query.toLowerCase();
    let result: T[] = [];

    if (pathname.includes('/users')) {
      result = data.filter((item) => {
        const user = item as User;
        return (
          user.name?.toLowerCase().includes(q) ||
          user.email?.toLowerCase().includes(q) ||
          user.roles?.some((r) => r.toLowerCase().includes(q))
        );
      });
    } else if (pathname.includes('/projects')) {
      result = data.filter((item) => {
        const project = item as Project;
        return (
          project.name?.toLowerCase().includes(q) ||
          project.description?.toLowerCase().includes(q) ||
          project.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    } else if (pathname.includes('/messages')) {
      result = data.filter((item) => {
        const msg = item as Message;
        return (
          msg.userName?.toLowerCase().includes(q) ||
          msg.userEmail?.toLowerCase().includes(q) ||
          msg.message?.toLowerCase().includes(q) ||
          msg.reason?.toLowerCase().includes(q)
        );
      });
    } else if (pathname.includes('/experiences')) {
      result = data.filter((item) => {
        const exp = item as Experience;
        return (
          exp.title?.toLowerCase().includes(q) ||
          exp.location?.toLowerCase().includes(q) ||
          exp.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    onFilter(result);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => {
        const query = e.target.value;
        onChange(query);
        filterData(query);
      }}
      className="border border-light dark:border-dark p-2 rounded w-1/3 bg-white dark:bg-zinc-800 dark:text-white"
    />
  );
}
