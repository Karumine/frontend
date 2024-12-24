import React from 'react';
import UserList from './UserList';
import './App.css';  // นำเข้าไฟล์ CSS ที่สร้างไว้

function App() {
    return (
        <div className="App">
            <h1>User Management</h1>
            <UserList />
        </div>
    );
}

export default App;
