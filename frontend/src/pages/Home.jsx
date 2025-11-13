import { useEffect, useState } from "react";
import { getNotes } from "../api/notes";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import { deleteNote } from "../api/notes";
import Search from "../components/Search";
import NoteCard from "../components/NoteCard";
import PrevButton from "../components/PrevButton";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.refresh) {
      fetchNotes();
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state]);

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted successfully!");
      fetchNotes();
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes(search, page, 9);
      console.log(data);
      setNotes(data.data || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      setError("Failed to load notes. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, page]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <div>
          <button
            onClick={() => navigate("/add")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-green-600 hover:shadow-md"
          >
            Add New Note
          </button>
        </div>
        <div>
          <Search search={search} setSearch={setSearch} setPage={setPage} />
        </div>
      </div>

      {editingNote && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80">
          <EditNote
            note={editingNote}
            onClose={() => setEditingNote(null)}
            onNoteUpdated={fetchNotes}
          />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black/90 tracking-wide drop-shadow-sm">
        All Notes
      </h2>

      <div className="grow">
        {notes.length === 0 ? (
          <p className="text-gray-600 text-center">No notes found.</p>
        ) : (
          <NoteCard notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <PrevButton setPage={setPage} page={page} totalPages={totalPages} />
    </div>
  );
};

export default Home;
