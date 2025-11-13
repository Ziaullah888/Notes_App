const noteModels = require("../models/noteModels");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = await noteModels.create({
      title,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getNotes = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const total = await noteModels.countDocuments(query);
    const notes = await noteModels
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit) 
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      total,
      page,
      pages: Math.ceil(total / limit),
      data: notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const byIdNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const byIdNote = await noteModels.findById(id);
    if (!byIdNote) {
      res.status(404).json({
        success: true,
        message: "ID not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched By ID successfully",
      data: byIdNote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const updateNote = await noteModels.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Note updated successfully",
      data: updateNote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const noteID = await noteModels.findById(id);
    if (!noteID) {
      res.status(404).json({
        success: false,
        message: "ID note found!",
      });
    }

    const deletedNote = await noteModels.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createNote, getNotes, byIdNotes, updateNotes, deleteNotes };
