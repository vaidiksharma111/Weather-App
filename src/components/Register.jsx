import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Register() {
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const baseUrl = 'https://hiring-test.a2dweb.com';
    const signupEndpoint = '/create-user';
    const url = `${baseUrl}${signupEndpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="App">
      <h2>This is register page</h2>

      {response && response.status ? (
        <div>
          <p>Your account has been registered successfully!</p>
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </div>
      ) : (
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />

          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />

          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
