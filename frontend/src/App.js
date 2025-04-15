import { useEffect, useState } from "react";

function App() {
    const [notes, setNotes] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedNote, setSelectedNote] = useState(null);
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/notes")
            .then((res) => res.json())
            .then((data) => setNotes(data))
            .catch((err) => console.error("Error fetching notes:", err));
    }, []);

    const handleCreateNote = () => {
        const newNote = { title: newTitle, description: newDescription };

        fetch("http://localhost:8080/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
            .then((res) => res.json())
            .then((createdNote) => {
                setNotes((prev) => [...prev, createdNote]);
                setNewTitle("");
                setNewDescription("");
            })
            .catch((err) => console.error("Error creating note:", err));
    };

    const handleViewNote = (id) => {
        fetch(`http://localhost:8080/notes/${id}`)
            .then((res) => res.json())
            .then((data) => setSelectedNote(data))
            .catch((err) => console.error("Error fetching note:", err));
    };

    const handleStartEdit = (note) => {
        setEditingNote({ ...note });
    };

    const handleUpdateNote = () => {
        fetch(`http://localhost:8080/notes/${editingNote.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editingNote)
        })
            .then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((n) => (n.id === editingNote.id ? editingNote : n))
                );
                setEditingNote(null);
            })
            .catch((err) => console.error("Error updating note:", err));
    };

    const handleDeleteNote = (id) => {
        fetch(`http://localhost:8080/notes/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
                if (selectedNote && selectedNote.id === id) setSelectedNote(null);
                if (editingNote && editingNote.id === id) setEditingNote(null);
            })
            .catch((err) => console.error("Error deleting note:", err));
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>My Notes 📝</h1>

            {/* Create Note Form */}
            <div style={{ marginBottom: "2rem" }}>
                <input
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <br />
                <button onClick={handleCreateNote}>Add Note</button>
            </div>

            {/* Note List */}
            {notes.map((note) => (
                <div key={note.id} style={{ marginBottom: "1rem" }}>
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                    <button onClick={() => handleViewNote(note.id)}>View</button>
                    <button onClick={() => handleStartEdit(note)}>Edit</button>
                    <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                    <hr />
                </div>
            ))}

            {/* View Note */}
            {selectedNote && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Selected Note</h2>
                    <p><strong>ID:</strong> {selectedNote.id}</p>
                    <p><strong>Title:</strong> {selectedNote.title}</p>
                    <p><strong>Description:</strong> {selectedNote.description}</p>
                </div>
            )}

            {/* Edit Note */}
            {editingNote && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Edit Note</h2>
                    <input
                        value={editingNote.title}
                        onChange={(e) =>
                            setEditingNote({ ...editingNote, title: e.target.value })
                        }
                    />
                    <br />
                    <textarea
                        value={editingNote.description}
                        onChange={(e) =>
                            setEditingNote({ ...editingNote, description: e.target.value })
                        }
                    />
                    <br />
                    <button onClick={handleUpdateNote}>Save</button>
                </div>
            )}
        </div>
    );
}

export default App;






