import axios from "axios";

export const getNotes = async (search = "", page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/notes/all?search=${search}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return { notes: [], totalPages: 1 };
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/notes/create",
      note
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const updateNote = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/notes/update/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/notes/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};
