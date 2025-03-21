// src/app/dashboard/experiences/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@/app/components/SearchInput/SearchInput';

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

export default function ExperiencesDashboard() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    location: '',
    date: '',
    description: '',
    image: '',
    tags: [],
    type: 'work',
  });
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      const res = await fetch('/api/experiences');
      if (!res.ok) throw new Error('Error fetching experiences');
      const data = await res.json();
      setExperiences(data.experiences);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  useEffect(() => {
    setFilteredExperiences(experiences);
  }, [experiences]);

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
    if (!formData.title) {
      alert('Title is required.');
      return;
    }

    try {
      const method = editingExpId ? 'PUT' : 'POST';
      const url = editingExpId
        ? `/api/experiences/${editingExpId}`
        : '/api/experiences';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error saving experience');

      setFormData({
        title: '',
        location: '',
        date: '',
        description: '',
        image: '',
        tags: [],
        type: 'work',
      });
      setEditingExpId(null);
      await fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExpId(experience._id);
    setFormData(experience);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting experience');
      await fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6 p-4">
      <h1 className="text-2xl font-bold">Manage Experiences</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={experiences}
        onFilter={setFilteredExperiences}
      />

      <form onSubmit={handleSubmit} className="grid gap-2 border p-4 rounded">
        <label>
          Title:
          <input
            className="border p-1 w-full"
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            className="border p-1 w-full"
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            className="border p-1 w-full"
            type="text"
            name="date"
            value={formData.date || ''}
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
        <label>
          Type:
          <select
            className="border p-1 w-full"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="work">Work</option>
            <option value="education">Education</option>
          </select>
        </label>

        <button
          type="submit"
          className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
        >
          {editingExpId ? 'Update Experience' : 'Create Experience'}
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExperiences.map((exp) => (
            <tr key={exp._id} className="border-b">
              <td className="p-2 border">{exp.title}</td>
              <td className="p-2 border">{exp.location}</td>
              <td className="p-2 border">{exp.date}</td>
              <td className="p-2 border">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="grid items-center p-2 text-sm border rounded transition bg-red-500 hover:bg-red-600 border-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-800"
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
