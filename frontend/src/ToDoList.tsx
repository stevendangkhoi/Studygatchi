import { useState } from "react";
import "./App.css";
import { TASK_HP_RECOVERY, TASK_REWARD } from "./studyState";
import type { StudyTask } from "./studyState";

interface Props {
  items: StudyTask[];
  onAdd: (name: string) => void;
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function ToDoList({ items, onAdd, onComplete, onRemove }: Props) {
  const [newItem, setNewItem] = useState("");

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newItem.trim()) return;

    onAdd(newItem.trim());
    setNewItem("");
  };

  return (
    <div>
      <div className="todolist-logo">
        <h1>Goober To Do List</h1>
      </div>
      <p>Complete a task to earn ${TASK_REWARD} and restore up to {TASK_HP_RECOVERY} HP.</p>

      <form className="Add-item" onSubmit={addItem}>
        <input
          type="text"
          aria-label="New task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="todolist-addItem" type="submit">
          Add
        </button>
      </form>

      <ul
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.id} className="todolist-item">
            <div className="wrapper">
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                name={item.name}
                checked={item.completed}
                disabled={item.completed}
                onChange={() => onComplete(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.name}</label>
            </div>
            <button
              className="todolist-trashbutton"
              onClick={() => onRemove(item.id)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
