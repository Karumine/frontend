import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    }, [users]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/user/${id}`)
            .then(response => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.log(error));
    };

    const handleSave = (user) => {
        setSelectedUser(null);
        setUsers([...users, user]);
    };

    return (
        <div className="user-container">
            <div className="user-form-container">
                <h2>User Form</h2>
                <UserForm user={selectedUser} onSave={handleSave} />
            </div>
            <div className="user-list-container">
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <div className="user-info">
                                {user.fullName} ({user.nickname}) - {user.age} years old, {user.gender}
                            </div>
                            <div>
                                <button onClick={() => setSelectedUser(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserList;
