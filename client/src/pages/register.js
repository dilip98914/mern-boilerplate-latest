import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

function Register(){
    const [name,setName]=useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history=useHistory()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            history.push('/')
            alert('you are already loggged in!')
        } else {
        }
    }, [])

    async function handle(e){
        e.preventDefault();
        const res=await fetch('http://localhost:1337/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,email,password
            })
        })
        const data=await res.json()
        if(data.status=='ok'){
            history.push('/login')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handle}>
                <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type='text'
                    placeholder="Name"
                />
                <br/>
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
                    value="Register"
                />

            </form>
        
        </div>

    )
}
export default Register;