import React from "react";
import { updateNote } from "../api/notes";
import toast from "react-hot-toast";

const EditNote = ({ note, onClose, onNoteUpdated }) => {
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateNote(note._id, { title, content });
      toast.success("Note updated successfully!");
      onNoteUpdated(); 
      onClose();       
    } catch (err) {
      setError("Failed to update note.");
      toast.error("Failed to update note. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 mb-2 w-full rounded resize-none"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 hover:bg-gray-600 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNote;
