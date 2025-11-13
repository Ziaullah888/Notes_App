import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white flex justify-between p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex flex-col justify-between">
            <h3 className="font-semibold text-lg mb-2 text-black/90 tracking-wide">{note.title}</h3>
            <p className="text-gray-700 mb-2">{note.content}</p>
            <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex flex-col justify-between items-center ml-4 space-y-3">
            <button
              onClick={() => onEdit(note)}
              className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition duration-200"
            >
              <FaRegEdit size={20} />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="text-red-500 hover:text-red-700 transform hover:scale-110 transition duration-200"
            >
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCard;
