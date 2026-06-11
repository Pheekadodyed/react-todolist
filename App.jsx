import React, { useState } from 'react';

function App() {
  // 1. State สำหรับเก็บรายการ Todo ทั้งหมด (Read)
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนเขียน React', completed: false },
    { id: 2, text: 'ฝึกใช้ useState', completed: false }
  ]);

  // State สำหรับเก็บค่าที่พิมพ์ในช่อง Input (Create / Update)
  const [inputText, setInputText] = useState('');
  
  // State สำหรับเช็คว่ากำลังอยู่ในโหมดแก้ไขรายการไหนอยู่
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  // --- 2. CREATE: ฟังก์ชันเพิ่มรายการใหม่ ---
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // ป้องกันการเพิ่มค่าว่าง

    const newTodo = {
      id: Date.now(), // ใช้ Timestamp เป็น ID ชั่วคราว
      text: inputText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputText(''); // ล้างช่องกรอกเงิน
  };

  // --- 3. DELETE: ฟังก์ชันลบรายการ ---
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    
    // ถ้าลบตัวที่กำลังแก้ไขอยู่ ให้ยกเลิกโหมดแก้ไขด้วย
    if (isEditing && currentTodoId === id) {
      setIsEditing(false);
      setInputText('');
    }
  };

  // --- 4. UPDATE (Part 1): ฟังก์ชันกดเพื่อเตรียมแก้ไข ---
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodoId(todo.id);
    setInputText(todo.text); // ดึงข้อความเดิมมาใส่ในช่อง Input
  };

  // --- 4. UPDATE (Part 2): ฟังก์ชันบันทึกการแก้ไขข้อความ ---
  const handleUpdateTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === currentTodoId) {
        return { ...todo, text: inputText };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodoId(null);
    setInputText('');
  };

  // --- 4. UPDATE (Part 3): ฟังก์ชันสลับสถานะ ทำเสร็จ/ยังไม่เสร็จ (Toggle Complete) ---
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>My Todo List (CRUD)</h2>

      {/* ฟอร์มสำหรับ Create และ Update */}
      <form onSubmit={isEditing ? handleUpdateTodo : handleAddTodo}>
        <inpu   t
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="เพิ่มรายการใหม่..."
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
          {isEditing ? 'อัปเดต' : 'เพิ่ม'}
        </button>
        {isEditing && (
          <button 
            type="button" 
            onClick={() => { setIsEditing(false); setInputText(''); }}
            style={{ marginLeft: '5px', padding: '8px' }}
          >
            ยกเลิก
          </button>
        )}
      </form>

      {/* รายการ Todo (Read) */}
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px', 
              borderBottom: '1px solid #ccc' 
            }}
          >
            <div>
              {/* ปุ่ม Checkbox สำหรับ Update สถานะ completed */}
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => handleToggleComplete(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </div>

            <div>
              {/* ปุ่มเรียกฟังก์ชัน Edit */}
              <button 
                onClick={() => handleEditClick(todo)}
                style={{ marginRight: '5px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                แก้ไข
              </button>
              {/* ปุ่มเรียกฟังก์ชัน Delete */}
              <button 
                onClick={() => handleDeleteTodo(todo.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p style={{ color: 'gray' }}>ไม่มีรายการงานที่ต้องทำ</p>}
    </div>
  );
}

export default App;