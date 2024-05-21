import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    fetch('http://192.168.1.7:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: name, username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.message == "Success"){
          alert(data.message)
          navigate("/login")
      }
      else{
        alert(data.message)
      } 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const isRegisterDisabled = !name || !username || !password;
  return (
    <div>
      <>
        <TextField label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
        <br /><br />
        <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <Button onClick={handleRegister} variant="outlined" disabled={isRegisterDisabled}>Register</Button>
      </>
    </div>
  );
}

export default Register;
