// src/app/dashboard/projects/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

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

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    location: '',
    date: '',
    description: '',
    image: '',
    tags: [],
    type: 'work',
  });
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null
  );

  // Fetch all experiences (admin only)
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
    if (isAdmin) fetchExperiences();
  }, [isAdmin, fetchExperiences]);

  // Update form state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update experience
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, location, date, description, type } = formData;
    if (!title || !location || !date || !description || !type) {
      alert('All fields are required.');
      return;
    }

    try {
      if (editingExperienceId) {
        // Update existing
        const res = await fetch(`/api/experiences/${editingExperienceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Error updating experience');
      } else {
        // Create new
        const res = await fetch('/api/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Error creating experience');
      }

      setFormData({
        title: '',
        location: '',
        date: '',
        description: '',
        image: '',
        tags: [],
        type: 'work',
      });
      setEditingExperienceId(null);
      await fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit button
  const handleEdit = (experience: Experience) => {
    setEditingExperienceId(experience._id);
    setFormData(experience);
  };

  // Delete experience
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

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="p-4 grid gap-6">
      <h1 className="text-2xl font-bold">Manage Experiences</h1>

      {/* CREATE / UPDATE FORM */}
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
            placeholder="e.g., August 2023 - June 2025"
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
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          {editingExperienceId ? 'Update Experience' : 'Create Experience'}
        </button>
      </form>

      {/* EXPERIENCE LIST */}
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
          {experiences.map((experience) => (
            <tr key={experience._id} className="border-b">
              <td className="p-2 border">{experience.title}</td>
              <td className="p-2 border">{experience.location}</td>
              <td className="p-2 border">{experience.date}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience._id)}
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
