const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel.js");


const getNotes = asyncHandler(async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(notes);

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Something went Wrong" });

    }
});

const createNote = asyncHandler(async (req, res) => {

    const { title, content, category } = req.body;

    if (!title || !content || !category) {

        res.status(400).json({ message: "Please Fill all Feilds" });
    } else {

        const newNote = new Note({
            user: req.user._id,
            title: title,
            content: content,
            category: category
        })

        try {

            await newNote.save();
            res.status(201).json(newNote);

        } catch (error) {

            console.log(error);
            res.status(500).json({ message: "Something went Wrong" });

        }
    }
});

const updateNote = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const { title, content, category } = req.body;
    const note = await Note.findById(id);


    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "You Canont perform this Action" })
    } else {

        const newNote = {
            user: req.user._id,
            title: title,
            content: content,
            category: category
        }

        try {

            await Note.findByIdAndUpdate(id, newNote, { new: true });
            res.status(200).json(newNote);

        } catch (error) {

            console.log(error);
            res.status(500).json({ message: "Something went Wrong" });

        }
    }
});

const getNoteById = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const oneNote = await Note.findById(id);

    if (oneNote) {
        res.json(oneNote);
    } else {
        res.status(404).json({ message: "Note Not Found" })
    }

});

const deleteNote = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const note = await Note.findById(id);
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "You Canont perform this Action" })
    } else {
        try {

            const note = await Note.findByIdAndRemove(id);
            res.status(202).json(note);

        } catch (error) {

            console.log(error);
            res.status(500).json({ message: "Note not Found" });

        }
    }

});

module.exports = { getNotes, createNote, updateNote, deleteNote, getNoteById };