import React, { useState } from 'react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '', grade: '' });
  const [showDetails, setShowDetails] = useState(false);

  // Updates form state as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to add student locally and display details
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Add new student to local array
    const newStudent = { id: Date.now(), ...formData };
    setStudents([...students, newStudent]);

    // Clear form inputs and reveal student details
    setFormData({ name: '', email: '', course: '', grade: '' });
    setShowDetails(true);
  };

  // Function to delete student locally
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Student Management System</h2>

      {/* Input Form */}
      <form onSubmit={handleAddStudent} style={styles.form}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
        <input name="course" placeholder="Course" value={formData.course} onChange={handleChange} style={styles.input} />
        <input name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.addButton}>Add</button>
      </form>

      {/* Student Details Section (Visible only after clicking Add) */}
      {showDetails && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Grade</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={styles.td}>{student.name}</td>
                <td style={styles.td}>{student.email}</td>
                <td style={styles.td}>{student.course}</td>
                <td style={styles.td}>{student.grade}</td>
                <td style={styles.td}>
                  <button onClick={() => handleDeleteStudent(student.id)} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
  addButton: { gridColumn: 'span 2', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #eee', padding: '10px' },
  deleteBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
};