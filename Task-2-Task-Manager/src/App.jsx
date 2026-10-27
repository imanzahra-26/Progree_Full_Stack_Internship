import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('datheon-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(null); // Tracks which task is being edited

  useEffect(() => {
    localStorage.setItem('datheon-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Helper to assign emojis based on task keywords
  const getEmoji = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('study') || lower.includes('read') || lower.includes('learn') || lower.includes('book')) return '📚';
    if (lower.includes('work') || lower.includes('code') || lower.includes('project') || lower.includes('build')) return '💻';
    if (lower.includes('buy') || lower.includes('shop') || lower.includes('groceries')) return '🛒';
    if (lower.includes('gym') || lower.includes('run') || lower.includes('workout')) return '🏋️';
    if (lower.includes('eat') || lower.includes('food') || lower.includes('cook')) return '🍔';
    if (lower.includes('call') || lower.includes('email') || lower.includes('meet')) return '📞';
    if (lower.includes('clean') || lower.includes('home') || lower.includes('wash')) return '🧹';
    return '📌'; // Default pin emoji
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (isEditing) {
      // If editing, update the existing task
      setTasks(tasks.map(t => t.id === isEditing ? { ...t, text: input } : t));
      setIsEditing(null);
    } else {
      // If adding, create a new task
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }
    setInput('');
  };

  const startEdit = (task) => {
    setIsEditing(task.id);
    setInput(task.text);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-wrapper">
      <div className="glass-card">
        <div className="header">
          <h1>Task Manager</h1>
          <p>Stay organized and get things done.</p>
        </div>

        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={isEditing ? "Editing task..." : "What needs to be done?"}
            autoFocus
          />
          <button type="submit" className={`add-btn ${isEditing ? 'save-mode' : ''}`}>
            {isEditing ? 'Save' : '+ Add'}
          </button>
          {isEditing && (
             <button type="button" className="cancel-btn" onClick={() => { setIsEditing(null); setInput(''); }}>
               ✖
             </button>
          )}
        </form>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <label className="task-content">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)} 
                />
                <span className="custom-checkbox"></span>
                <span className="task-emoji">{getEmoji(task.text)}</span>
                <span className="task-text">{task.text}</span>
              </label>
              
              <div className="action-buttons">
                {/* Edit Button */}
                <button onClick={() => startEdit(task)} className="edit-btn" title="Edit Task">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                {/* Delete Button */}
                <button onClick={() => deleteTask(task.id)} className="delete-btn" title="Delete Task">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        {tasks.length === 0 && (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}