import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Priority = { id: number; title: string; category: 'Teaching' | 'Design' | 'Admin'; done: boolean };

const initialPriorities: Priority[] = [
  { id: 1, title: 'Prepare class slides', category: 'Teaching', done: false },
  { id: 2, title: 'Review Figma design', category: 'Design', done: true },
  { id: 3, title: 'Send workshop reminder', category: 'Admin', done: true },
  { id: 4, title: 'Plan the next lesson', category: 'Teaching', done: false },
];

const categoryClass: Record<Priority['category'], string> = {
  Teaching: 'teaching', Design: 'design', Admin: 'admin',
};

function CheckMark() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.2 8.2 3.1 3.1 6.5-6.6" /></svg>;
}

function App() {
  const [priorities, setPriorities] = useState(initialPriorities);
  const completed = priorities.filter((item) => item.done).length;

  function togglePriority(id: number) {
    setPriorities((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  return (
    <main className="page-shell">
      <section className="focus-card" aria-label="Daily focus">
        <header className="greeting">
          <div className="eyebrow">THURSDAY · 8 OCTOBER</div>
          <h1>Good morning,<br className="mobile-break" /> Bhavina</h1>
          <p className="date">Thursday, 8 October</p>
        </header>

        <section className="progress-panel" aria-label={`Today's progress: ${completed} of ${priorities.length} tasks complete`}>
          <div className="progress-copy">
            <span>Today’s progress</span>
            <strong>{completed} of {priorities.length}</strong>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={priorities.length}>
            <span style={{ width: `${(completed / priorities.length) * 100}%` }} />
          </div>
        </section>

        <section className="priority-section">
          <div className="section-heading">
            <h2>Your priorities</h2>
          </div>
          <div className="priority-list">
            {priorities.map((item) => (
              <button
                className={`priority-card${item.done ? ' is-done' : ''}`}
                key={item.id}
                type="button"
                aria-pressed={item.done}
                onClick={() => togglePriority(item.id)}
              >
                <span className="check-circle"><CheckMark /></span>
                <span className="priority-content">
                  <span className="priority-title">{item.title}</span>
                  <span className={`category ${categoryClass[item.category]}`}>{item.category}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
