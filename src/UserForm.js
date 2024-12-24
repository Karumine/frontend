import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSave }) => {
    const [fullName, setFullName] = useState(user ? user.fullName : '');
    const [nickname, setNickname] = useState(user ? user.nickname : '');
    const [birthDate, setBirthDate] = useState(user ? user.birthDate : '');
    const [age, setAge] = useState(user ? user.age : '');
    const [gender, setGender] = useState(user ? user.gender : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { fullName, nickname, birthDate, age, gender };

        if (user) {
            // Update existing user
            axios.put(`http://localhost:5000/api/user/${user.id}`, newUser)
                .then(response => onSave(response.data))
                .catch(error => console.log(error));
        } else {
            // Add new user
            axios.post('http://localhost:5000/api/user', newUser)
                .then(response => onSave(response.data))
                .catch(error => console.log(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="date"
                placeholder="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Select">เลือกเพศ</option>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
            </select>
            <button type="submit">{user ? 'Update' : 'Add'} User</button>
        </form>
    );
};

export default UserForm;
