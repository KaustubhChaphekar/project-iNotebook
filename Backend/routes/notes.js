const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// Route 1 :get all the notes :GET "/api/notes/fetchallnotes" . login require
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// Route 2 :add new  notes :POST "/api/notes/addnotes" . login require
router.post('/addnotes', fetchUser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 charater").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        // if there are errors , return bad request and the errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const notes = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await notes.save();

        res.json(savedNotes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// Route 3 :Update  notes :POST "/api/notes/addnotes" . login require
router.put('/updatenotes/:id', fetchUser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 charater").isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    try {

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find a note to be updated and update it 
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})


// Route 4 :delete a existing  notes :DELETE "/api/notes/deletenotes" . login require
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        //find a note to be deleted and delete it 
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only user owns this notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router;