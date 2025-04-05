// src/app/dashboard/projects/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import Button from '@/app/components/Button/Button';

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
    fetchProjects();
  }, [fetchProjects]);

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

  const inputClass =
    'border border-primary-200 rounded p-1 w-full bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50 dark:border-secondary-700';

  return (
    <div className="grid gap-6 p-4 text-primary-900 dark:text-secondary-50">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={projects}
        onFilter={setFilteredProjects}
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-2 p-4 rounded-md border border-primary-200 bg-primary-100 dark:border-secondary-700 dark:bg-secondary-800"
      >
        <label>
          Name:
          <input
            className={inputClass}
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Link:
          <input
            className={inputClass}
            type="text"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Created At:
          <input
            className={inputClass}
            type="text"
            name="createdAt"
            value={formData.createdAt || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Completed At (optional):
          <input
            className={inputClass}
            type="text"
            name="completedAt"
            value={formData.completedAt || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            className={inputClass}
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            className={inputClass}
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (comma separated):
          <input
            className={inputClass}
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

        <Button type="submit" variant="primary" size="md">
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </Button>
      </form>

      <table className="w-full rounded border border-primary-200 dark:border-secondary-700">
        <thead className="bg-primary-200 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50">
          <tr>
            <th className="p-2 border border-primary-200 dark:border-secondary-700">
              Name
            </th>
            <th className="p-2 border border-primary-200 dark:border-secondary-700">
              Link
            </th>
            <th className="p-2 border border-primary-200 dark:border-secondary-700">
              Created At
            </th>
            <th className="p-2 border border-primary-200 dark:border-secondary-700">
              Completed At
            </th>
            <th className="p-2 border border-primary-200 dark:border-secondary-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className="p-2 border border-primary-200 dark:border-secondary-700">
                {project.name}
              </td>
              <td className="p-2 border border-primary-200 dark:border-secondary-700">
                {project.link}
              </td>
              <td className="p-2 border border-primary-200 dark:border-secondary-700">
                {project.createdAt}
              </td>
              <td className="p-2 border border-primary-200 dark:border-secondary-700">
                {project.completedAt || 'Ongoing'}
              </td>
              <td className="p-2 border border-primary-200 dark:border-secondary-700 flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  variant="ghost"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(project._id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
