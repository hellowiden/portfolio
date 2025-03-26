//src/app/components/SearchInput/SearchInput.tsx

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

const filters = {
  '/users': (item: SearchData, q: string) => {
    const { name, email, roles } = item as User;
    return (
      name?.toLowerCase().includes(q) ||
      email?.toLowerCase().includes(q) ||
      roles?.some((r) => r.toLowerCase().includes(q))
    );
  },
  '/projects': (item: SearchData, q: string) => {
    const { name, description, tags } = item as Project;
    return (
      name?.toLowerCase().includes(q) ||
      description?.toLowerCase().includes(q) ||
      tags?.some((t) => t.toLowerCase().includes(q))
    );
  },
  '/messages': (item: SearchData, q: string) => {
    const { userName, userEmail, message, reason } = item as Message;
    return (
      userName?.toLowerCase().includes(q) ||
      userEmail?.toLowerCase().includes(q) ||
      message?.toLowerCase().includes(q) ||
      reason?.toLowerCase().includes(q)
    );
  },
  '/experiences': (item: SearchData, q: string) => {
    const { title, location, tags } = item as Experience;
    return (
      title?.toLowerCase().includes(q) ||
      location?.toLowerCase().includes(q) ||
      tags?.some((t) => t.toLowerCase().includes(q))
    );
  },
};

export default function SearchInput<T extends SearchData>({
  value,
  onChange,
  data,
  onFilter,
}: SearchInputProps<T>) {
  const pathname = usePathname();

  const filterData = (query: string) => {
    const q = query.toLowerCase();
    const filterKeys = Object.keys(filters) as Array<keyof typeof filters>;
    const match = filterKeys.find((key) => pathname.includes(key));
    const filterFn = match ? filters[match] : () => false;
    onFilter(data.filter((item) => filterFn(item, q)));
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
      className="border border-[#E3E3E3] dark:border-[#191919] p-2 rounded w-1/3 bg-[#FFFFFF] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
    />
  );
}
