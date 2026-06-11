import React, { useState } from 'react';

function FoodApp() {
  // 1. READ: State สำหรับเก็บรายการอาหารในตะกร้า
  const [cart, setCart] = useState([
    { id: 1, name: 'ข้าวกะเพราไก่', price: 50, quantity: 1 },
    { id: 2, name: 'ชานมไข่มุก', price: 40, quantity: 2 },
  ]);

  // State สำหรับฟอร์มเพิ่มเมนูใหม่
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // 2. CREATE: ฟังก์ชันเพิ่มเมนูใหม่เข้าตะกร้า
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newItem = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      name: newName,
      price: Number(newPrice),
      quantity: 1,
    };

    setCart([...cart, newItem]);
    setNewName('');
    setNewPrice('');
  };

  // 3. UPDATE: ฟังก์ชันเพิ่ม/ลดจำนวนสินค้า
  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          // ถ้าลดจนเหลือ 0 ให้คงไว้ที่ 1 (หรือจะให้ลบออกไปเลยก็ได้)
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // 4. DELETE: ฟังก์ชันลบเมนูออกจากตะกร้า
  const handleDeleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // คำนวณราคารวมทั้งหมด
  const totalTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🍔 แอปสั่งอาหารระบบ CRUD</h2>

      {/* ฟอร์มเพิ่มเมนู (CREATE) */}
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="ชื่ออาหาร"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ราคา"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          required
          style={{ marginLeft: '10px', width: '80px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>เพิ่มลงตะกร้า</button>
      </form>

      {/* แสดงรายการอาหาร (READ) */}
      <h3>🛒 ตะกร้าสินค้าของคุณ</h3>
      {cart.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                maxWidth: '450px',
              }}
            >
              <div>
                <strong>{item.name}</strong> - {item.price} บาท
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* ปุ่มอัปเดตจำนวน (UPDATE) */}
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>

                {/* ปุ่มลบสินค้า (DELETE) */}
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ maxWidth: '450px', margin: '20px 0' }} />
      <h3>💰 ราคารวมทั้งหมด: {totalTotalPrice} บาท</h3>
    </div>
  );
}

export default FoodApp;