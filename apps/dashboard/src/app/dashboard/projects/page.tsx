// src/app/dashboard/projects/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@portfolio/ui/components/SearchInput/SearchInput';
import Button from '@portfolio/ui/components/Button/Button';

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

const emptyProject: Partial<Project> = {
  name: '',
  link: '',
  createdAt: '',
  completedAt: '',
  description: '',
  image: '',
  tags: [],
};

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Partial<Project>>(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Error fetching projects');
      const data = await res.json();
      const sorted = data.projects.sort(
        (a: Project, b: Project) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProjects(sorted);
      setFilteredProjects(sorted);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const resetForm = () => {
    setFormData(emptyProject);
    setEditingProjectId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, createdAt, description } = formData;
    if (!name || !createdAt || !description) {
      alert('Name, createdAt, and description are required.');
      return;
    }

    try {
      const res = await fetch(
        editingProjectId
          ? `/api/projects/${editingProjectId}`
          : '/api/projects',
        {
          method: editingProjectId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error('Error saving project');
      resetForm();
      await fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProjectId(project._id);
    setFormData(project);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting project');
      await fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    'border border-primary-200 rounded p-1 w-full bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50 dark:border-secondary-700';

  const tableCellClass =
    'p-2 border border-primary-200 dark:border-secondary-700';

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
        {(
          [
            { label: 'Name', name: 'name' },
            { label: 'Link', name: 'link' },
            { label: 'Created At', name: 'createdAt' },
            { label: 'Completed At', name: 'completedAt' },
            { label: 'Image URL', name: 'image' },
            { label: 'Tags (comma separated)', name: 'tags' },
          ] as const
        ).map(({ label, name }) => (
          <label key={name}>
            {label}:
            <input
              className={inputClass}
              type="text"
              name={name}
              value={
                Array.isArray(formData[name])
                  ? (formData[name] as string[]).join(', ')
                  : formData[name] ?? ''
              }
              onChange={handleChange}
            />
          </label>
        ))}

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

        <Button type="submit" variant="primary" size="md">
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </Button>
      </form>

      <table className="w-full rounded border border-primary-200 dark:border-secondary-700">
        <thead className="bg-primary-200 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50">
          <tr>
            {['Name', 'Link', 'Created At', 'Completed At', 'Actions'].map(
              (col) => (
                <th key={col} className={tableCellClass}>
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className={tableCellClass}>{project.name}</td>
              <td className={tableCellClass}>{project.link}</td>
              <td className={tableCellClass}>{project.createdAt}</td>
              <td className={tableCellClass}>
                {project.completedAt || 'Ongoing'}
              </td>
              <td className={`${tableCellClass} flex gap-2`}>
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
