import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Aditi Sankpal', email: 'aditi@gmail.com' }
  ]);
  const [editingUserId, setEditingUserId] = useState(null);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'drink water', completed: false },
    { id: 2, title: 'Submit assignment', completed: true },
    { id: 3, title: 'plant trees', completed: false }
  ]);
  const [taskTitle, setTaskTitle] = useState('');

  const updateUser = (e, id) => {
    e.preventDefault();
    const form = e.target;
    setUsers(users.map(user =>
      user.id === id ? { ...user, name: form.name.value, email: form.email.value } : user
    ));
    setEditingUserId(null);
  };

  const deleteUser = (id) => setUsers(users.filter(user => user.id !== id));

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const addTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: taskTitle,
        completed: false
      }]);
      setTaskTitle('');
    }
  };

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Aditi's Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile Section */}
        <section className="card profile-section">
          <h2>Profile</h2>
          <ul className="profile-list">
            {users.map(user => (
              <li key={user.id}>
                {editingUserId === user.id ? (
                  <form onSubmit={(e) => updateUser(e, user.id)} className="edit-form">
                    <input name="name" defaultValue={user.name} required />
                    <input name="email" defaultValue={user.email} required />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={() => setEditingUserId(user.id)}>Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Task Manager Section */}
        <section className="card task-section">
          <h2>Task Manager</h2>
          <form onSubmit={addTask} className="form">
            <input
              type="text"
              placeholder="New Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <button type="submit">Add Task</button>
          </form>
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Statistics Section */}
        <section className="card stats-section">
          <h2>Statistics</h2>
          <p><strong>Total Tasks:</strong> {tasks.length}</p>
          <p><strong>Completed:</strong> {completed}</p>
          <p><strong>Pending:</strong> {pending}</p>
        </section>
      </div>
    </div>
  );
}

export default App;
