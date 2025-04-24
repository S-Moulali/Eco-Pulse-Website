import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from "../firebase"; // Make sure this path is correct

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { title, description, category, location } = formData;

    if (!title || !description || !category || !location) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "reports"), {
        ...formData,
        createdAt: Timestamp.now()
      });
      alert("✅ Report submitted!");
      setFormData({ title: '', description: '', category: '', location: '' });
    } catch (err) {
      console.error("Error submitting report:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Report an Issue</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select category</option>
        <option value="pollution">Pollution</option>
        <option value="waste">Waste</option>
        <option value="tree">Tree Cutting</option>
      </select>
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
