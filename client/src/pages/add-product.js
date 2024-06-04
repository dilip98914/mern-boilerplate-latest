import { useState } from "react";
import { useHistory } from "react-router-dom";
// import jwt from 'jsonwebtoken'

export default function() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    async function handle(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await res.json()
        console.log('salee', data)
        if (data.user) {
            localStorage.setItem('token', data.user);
            alert('login successfull')
            history.push('/')
        } else {
            alert('please check your username and password')
        }

    }

    return (
        <div>
            <h1>Products</h1>

        </div>

    )
}