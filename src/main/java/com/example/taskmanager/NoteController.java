package com.example.taskmanager;

import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;

@RestController
public class NoteController {
    private Integer counter = 0;
    private HashMap<Integer, Note> map;

    public NoteController() {
        this.map = new HashMap<>();
    }

    private synchronized Integer getNextId() {
        counter++;
        return counter;
    }

    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note) {
        Integer id = getNextId();
        Note newNote = new Note(id, note.getTitle(), note.getDescription());
        this.map.put(id, newNote);
        return newNote;
    }

    @GetMapping("/notes")
    public Collection<Note> readNotes() {
        return map.values();
    }

    @GetMapping("/notes/{id}")
    public Note readNoteById(@PathVariable int id) {
        return map.get(id);
    }

    @PutMapping("/notes/{id}")
    public void updateNote(@PathVariable int id, @RequestBody Note note) {
        Note oldNote = map.get(id);
        oldNote.setTitle(note.getTitle());
        oldNote.setDescription(note.getDescription());
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable int id) {
        map.remove(id);
    }
}
