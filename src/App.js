import React, { useState, useEffect } from 'react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '', grade: '' });

  // Fetch students from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new student
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newStudent) => {
        setStudents([...students, newStudent]);
        setFormData({ name: '', email: '', course: '', grade: '' });
      });
  };

  // Delete student
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
      .then(() => setStudents(students.filter((s) => s.id !== id)));
  };

  return (
    <div style={styles.container}>
      <h2>Student Management System</h2>

      {/* Add Student Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
        <input name="course" placeholder="Course" value={formData.course} onChange={handleChange} style={styles.input} />
        <input name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.addButton}>Add Student</button>
      </form>

      {/* Students Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Grade</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={styles.tr}>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.email}</td>
              <td style={styles.td}>{student.course}</td>
              <td style={styles.td}>{student.grade}</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(student.id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { maxWidth: '700px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
  addButton: { gridColumn: 'span 2', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #eee', padding: '10px' },
  deleteBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
};