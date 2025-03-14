// src/app/dashboard/projects/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
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
    date: '',
    description: '',
    image: '',
    link: '',
    tags: [],
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Fetch all projects (admin only)
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, date, description } = formData;
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

      setFormData({
        name: '',
        date: '',
        description: '',
        image: '',
        link: '',
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

  // Delete project
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
    <div className="p-4 grid gap-6">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      {/* CREATE / UPDATE FORM */}
      <form onSubmit={handleSubmit} className="grid gap-2 border p-4 rounded">
        <label>
          Name:
          <input
            className="border p-1 w-full"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            className="border p-1 w-full"
            type="date"
            name="date"
            value={formData.date?.toString().split('T')[0] || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            className="border p-1 w-full"
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            className="border p-1 w-full"
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Link (GitHub, live, etc.):
          <input
            className="border p-1 w-full"
            type="text"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (comma separated):
          <input
            className="border p-1 w-full"
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
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      {/* PROJECT LIST */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className="p-2 border">{project.name}</td>
              <td className="p-2 border">
                {new Date(project.date).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-3 py-1 border rounded text-red-500 hover:bg-gray-200"
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
