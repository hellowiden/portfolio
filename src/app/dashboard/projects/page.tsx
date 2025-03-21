// src/app/dashboard/projects/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from '@/app/components/SearchInput/SearchInput';

interface Project {
  _id: string;
  name: string;
  link?: string;
  createdAt: string;
  completedAt?: string;
  description?: string;
  image?: string;
  tags?: string[];
}

export default function ProjectsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    link: '',
    createdAt: '',
    completedAt: '',
    description: '',
    image: '',
    tags: [],
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Error fetching projects');
      const data = await res.json();

      const sortedProjects = data.projects.sort((a: Project, b: Project) => {
        const dateA = new Date(
          a.createdAt.split('-').reverse().join('-')
        ).getTime();
        const dateB = new Date(
          b.createdAt.split('-').reverse().join('-')
        ).getTime();
        return dateB - dateA;
      });

      setProjects(sortedProjects);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchProjects();
  }, [isAdmin, fetchProjects]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, createdAt, description } = formData;

    if (!name || !createdAt || !description) {
      alert('Name, createdAt (date), and description are required.');
      return;
    }

    try {
      const url = editingProjectId
        ? `/api/projects/${editingProjectId}`
        : '/api/projects';
      const method = editingProjectId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error saving project');

      setFormData({
        name: '',
        link: '',
        createdAt: '',
        completedAt: '',
        description: '',
        image: '',
        tags: [],
      });
      setEditingProjectId(null);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProjectId(project._id);
    setFormData(project);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting project');
      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="grid gap-6 p-4">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={projects}
        onFilter={setFilteredProjects}
      />

      <form
        onSubmit={handleSubmit}
        className="grid bg-zinc-200 dark:bg-zinc-800 gap-2 border border-light rounded-md p-4"
      >
        <label>
          Name:
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Link:
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Created At:
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="createdAt"
            value={formData.createdAt || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Completed At (optional):
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="completedAt"
            value={formData.completedAt || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            className="border border-light rounded p-1 w-full"
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (comma separated):
          <input
            className="border border-light rounded p-1 w-full"
            type="text"
            name="tags"
            value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              }))
            }
          />
        </label>

        <button
          type="submit"
          className="p-2 border rounded bg-white dark:bg-black hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600"
        >
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      <table className="w-full rounded border-light">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-light rounded">Name</th>
            <th className="p-2 border border-light rounded">Link</th>
            <th className="p-2 border border-light rounded">Created At</th>
            <th className="p-2 border border-light rounded">Completed At</th>
            <th className="p-2 border border-light rounded">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className="p-2 border border-light rounded">
                {project.name}
              </td>
              <td className="p-2 border border-light rounded">
                {project.link}
              </td>
              <td className="p-2 border border-light rounded">
                {project.createdAt}
              </td>
              <td className="p-2 border border-light rounded">
                {project.completedAt || 'Ongoing'}
              </td>
              <td className="p-2 border border-light rounded flex gap-2">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="grid items-center p-2 text-sm border rounded transition bg-red-500 hover:bg-red-600 border-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-800"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
