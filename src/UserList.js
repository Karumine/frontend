import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); //State สำหรับย่อ-ขยาย

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
        console.log(refresh, 'ตอก');
    }, [refresh]);


    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/user/${id}`)
            .then(response => {
                setRefresh(true)
                //setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.log(error))
            .finally(setRefresh(false))
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsCollapsed(true);
    };

    const handleSave = (user) => {
        if (selectedUser) {
            setUsers(users.map(u => (u.id === user.id ? user : u)));
        } else {
            // เพิ่ม user ใหม่
            setUsers([...users, user]);
        }
        
        setSelectedUser(null);
        setIsCollapsed(false); //ขยายแท็บ users
    };


    return (
        <div className="user-container">
            <div className="user-form-container">
                <h2>User Form</h2>
                <UserForm user={selectedUser} onSave={handleSave} />
            </div>

            <div className={`user-list-container ${isCollapsed ? 'collapsed' : ''}`}>
                {!isCollapsed ? (
                    <>
                        <h2>Users</h2>
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    <div>
                                        {user.fullName} ({user.nickname}) - {user.age} ปี, {user.gender}
                                    </div>
                                    <div>
                                        <button onClick={() => handleEdit(user)}>แก้ไข</button>
                                        <button onClick={() => handleDelete(user.id)}>ลบ</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default UserList;
