import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            history.push('/')
            alert('you are already loggged in!')
        } else {
        }
    }, [])

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
        console.log('salee',data)
        if(data.user){
            localStorage.setItem('token',data.user);
            alert('login successfull')
            history.push('/')
        }else{
            alert('please check your username and password')
        }

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handle}>
              
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder="Email"
                />
                <br /> <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder="Password"
                />
                <br />

                <input
                    type="submit"
                    value="Login"
                />

            </form>

        </div>

    )
}
export default Login;