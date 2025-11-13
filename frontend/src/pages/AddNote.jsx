import React from "react";
import { createNote } from "../api/notes";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createNote({ title, content });
      toast.success("Note added successfully!");
      setTitle("");
      setContent("");
      navigate("/", { state: { refresh: true } });
    } catch (err) {
      setError("Failed to add note. Please try again.");
      toast.error("Failed to add note. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded mb-6 w-[80%] mx-auto hover:shadow-black/50 transition"
    >
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="
    w-full 
    p-3 
    h-14 
    border border-gray-300 
    rounded-lg 
    shadow-sm 
    focus:border-amber-500 
    focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50
    transition 
    duration-200 
    ease-in-out
    outline-none
  "
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        rows={10}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 my-4 border border-gray-300 rounded-lg shadow-sm  focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none resize-none"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className=" bg-amber-500 text-black px-6 py-3 rounded-lg font-medium shadow-sm disabled:opacity-50 hover:bg-amber-600 hover:shadow-md outline-none transition duration-200"
      >
        {loading ? "Adding..." : "Add Note"}
      </button>
      <button
        onClick={() => navigate('/')}
        type="button"
        className="ml-4 bg-gray-400 text-black px-6 py-3 rounded-lg font-medium shadow-sm disabled:opacity-50 hover:bg-gray-500 hover:shadow-md outline-none transition duration-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default AddNote;
