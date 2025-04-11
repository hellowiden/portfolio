// src/app/dashboard/experiences/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import Button from '@/app/components/Button/Button';

interface Experience {
  _id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  type: 'work' | 'education';
}

const emptyExperience: Partial<Experience> = {
  title: '',
  location: '',
  date: '',
  description: '',
  image: '',
  tags: [],
  type: 'work',
};

export default function ExperiencesDashboard() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] =
    useState<Partial<Experience>>(emptyExperience);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      const res = await fetch('/api/experiences');
      if (!res.ok) throw new Error('Error fetching experiences');
      const data = await res.json();
      setExperiences(data.experiences);
      setFilteredExperiences(data.experiences);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const resetForm = () => {
    setFormData(emptyExperience);
    setEditingExpId(null);
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
    if (!formData.title) {
      alert('Title is required.');
      return;
    }

    try {
      const res = await fetch(
        editingExpId ? `/api/experiences/${editingExpId}` : '/api/experiences',
        {
          method: editingExpId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error('Error saving experience');
      resetForm();
      await fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExpId(exp._id);
    setFormData(exp);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting experience');
      await fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    'border border-primary-200 bg-primary-50 text-primary-900 rounded p-1 w-full dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-50';

  const cellClass = 'p-2 border border-primary-200 dark:border-secondary-700';

  return (
    <div className="grid gap-6 p-4 text-primary-900 dark:text-secondary-50">
      <h1 className="text-2xl font-bold">Manage Experiences</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={experiences}
        onFilter={setFilteredExperiences}
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-2 border border-primary-200 dark:border-secondary-700 p-4 rounded bg-primary-100 dark:bg-secondary-800"
      >
        {(
          [
            { label: 'Title', name: 'title' },
            { label: 'Location', name: 'location' },
            { label: 'Date', name: 'date' },
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

        <label>
          Type:
          <select
            className={inputClass}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="work">Work</option>
            <option value="education">Education</option>
          </select>
        </label>

        <Button type="submit" variant="primary" size="md">
          {editingExpId ? 'Update Experience' : 'Create Experience'}
        </Button>
      </form>

      <table className="w-full border border-primary-200 dark:border-secondary-700">
        <thead className="bg-primary-200 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50">
          <tr>
            {['Title', 'Location', 'Date', 'Actions'].map((col) => (
              <th key={col} className={cellClass}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredExperiences.map((exp) => (
            <tr
              key={exp._id}
              className="border-b border-primary-200 dark:border-secondary-700"
            >
              <td className={cellClass}>{exp.title}</td>
              <td className={cellClass}>{exp.location}</td>
              <td className={cellClass}>{exp.date}</td>
              <td className={cellClass}>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleEdit(exp)}
                    variant="ghost"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(exp._id)}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
