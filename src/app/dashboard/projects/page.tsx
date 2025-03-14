// src/app/dashboard/projects/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  name: string;
  link?: string;
  date?: string;
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

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    link: '',
    date: '',
    description: '',
    image: '',
    tags: [],
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Fetch all projects
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Error fetching projects');
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchProjects();
  }, [isAdmin, fetchProjects]);

  // Update form state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, date, description } = formData;

    // The schema requires name, date, and description
    if (!name || !date || !description) {
      alert('Name, date, and description are required.');
      return;
    }

    try {
      if (editingProjectId) {
        // Update existing
        const res = await fetch(`/api/projects/${editingProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Error updating project');
      } else {
        // Create new
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Error creating project');
      }

      // Reset form
      setFormData({
        name: '',
        link: '',
        date: '',
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

  // Edit button
  const handleEdit = (project: Project) => {
    setEditingProjectId(project._id);
    setFormData(project);
  };

  // Delete
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
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      {/* CREATE / UPDATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid bg-zinc-200 dark:bg-zinc-800 gap-2 border border-light rounded-md p-4"
      >
        <label>
          Name:
          <input
            className="border border-light rounded-md p-1 w-full"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Link:
          <input
            className="border border-light rounded-md p-1 w-full"
            type="text"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            className="border border-light rounded-md p-1 w-full"
            type="text"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            className="border border-light rounded-md p-1 w-full"
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            className="border border-light rounded-md p-1 w-full"
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (comma separated):
          <input
            className="border border-light rounded-md p-1 w-full"
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
          className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
        >
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      {/* PROJECTS LIST */}
      <table className="w-full border border-light rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-light rounded-md">Name</th>
            <th className="p-2 border border-light rounded-md">Link</th>
            <th className="p-2 border border-light rounded-md">Date</th>
            <th className="p-2 border border-light rounded-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className="p-2 border border-light rounded-md">
                {project.name}
              </td>
              <td className="p-2 border border-light rounded-md">
                {project.link}
              </td>
              <td className="p-2 border border-light rounded-md">
                {project.date}
              </td>
              <td className="p-2 border border-light rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
