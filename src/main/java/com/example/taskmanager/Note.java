package com.example.taskmanager;

public class Note {
    private Integer id;
    private String title;
    private String description;

    public Note(Integer i, String t, String d) {
        this.id = i;
        this.title = t;
        this.description = d;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String newTitle) {
        this.title = newTitle;
    }

    public void setDescription(String newDescription) {
        this.description = newDescription;
    }

    @Override
    public String toString() {
        return "Note {\n" +
                "  id: " + id + ",\n" +
                "  title: '" + title + "',\n" +
                "  description: '" + description + "'\n" +
                "}";
    }

    @Override
    public boolean equals(Object obj) {
        // Same object in memory → they are equal
        if (this == obj) return true;

        // If the other object is null or not a Note → not equal
        if (obj == null || getClass() != obj.getClass()) return false;

        // Now we safely cast and compare IDs
        Note otherNote = (Note) obj;

        // If both IDs are non-null and equal → the Notes are equal
        return id != null && id.equals(otherNote.id);
    }

    @Override
    public int hashCode() {
        // If id is not null, use its hashCode
        if (id != null) {
            return id.hashCode();
        } else {
            return 0;
        }
    }
}
