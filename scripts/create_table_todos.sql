CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    checklist_id INTEGER NOT NULL,
    CONSTRAINT checklist_todo_fk FOREIGN KEY(checklist_id)
    REFERENCES checklists(id)
);