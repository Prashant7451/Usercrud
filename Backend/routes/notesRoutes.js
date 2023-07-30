const express = require("express");
const { getNotes, createNote, updateNote ,getNoteById , deleteNote} = require("../controllers/notesController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.route("/").get(auth, getNotes);
router.route("/create").post(auth, createNote);
router.route("/:id").get(getNoteById);
router.route("/:id").put(auth, updateNote);
router.route("/:id").delete(auth, deleteNote);


module.exports = router;
