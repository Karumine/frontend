import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSave }) => {
    const [fullName, setFullName] = useState(user ? user.fullName : '');
    const [nickname, setNickname] = useState(user ? user.nickname : '');
    const [birthDate, setBirthDate] = useState(user ? user.birthDate : '');
    const [age, setAge] = useState(user ? user.age : '');
    const [gender, setGender] = useState(user ? user.gender : '');

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setNickname(user.nickname || '');
            setBirthDate(user.birthDate || '');
            setAge(user.age || '');
            setGender(user.gender || '');
        }
        console.log('asdasd');

    }, [user]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { fullName, nickname, birthDate, age, gender };

        if (user) {
            // Update existing user
            axios.put(`http://localhost:5000/api/user/${user.id}`, newUser)
                .then(response => {
                    onSave(response.data);
                    resetForm();
                })
                .catch(error => console.log(error))
        } else {
            // Add new user
            axios.post('http://localhost:5000/api/user', newUser)
                .then(response => {
                    onSave(response.data)
                    resetForm();
                })
                .catch(error => console.log(error))
        }

    };


    const disabled = !fullName || !nickname || !birthDate || !age || gender === 'Select';

    const resetForm = () => {
        setFullName('');
        setNickname('');
        setBirthDate('');
        setAge('');
        setGender('');
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
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => {
                    // ตรวจสอบให้แน่ใจว่าเป็นตัวเลข
                    const newAge = e.target.value;
                    if (/^\d*$/.test(newAge)) {
                        setAge(newAge);
                    }
                }}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Select">gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <button type="submit" disabled={disabled}>
                {user ? 'อัพเดท' : 'เพิ่ม'} </button>
        </form>
    );
};

export default UserForm;