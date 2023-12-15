import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [cityId, setCityId] = useState();
  const [token, setToken] = useState();
  const history = useHistory();
  const [cityList, setCityList] = useState([]);

  const handleLogin = async () => {
    const baseUrl = 'https://hiring-test.a2dweb.com';
    const loginEndpoint = '/login';
    const url = `${baseUrl}${loginEndpoint}`;

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      setResponse(data);
      setToken(data.token);
      setCityId(data.liveWeather.cityId);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    if (token) {
      const fetchCityList = async () => {
        const baseUrl = 'https://hiring-test.a2dweb.com';
        const cityListEndpoint = '/city-list';
        const url = `${baseUrl}${cityListEndpoint}`;

        try {
          const cityListRes = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const cityListData = await cityListRes.json();
          setCityList(cityListData.list);
        } catch (error) {
          console.error('Error fetching city list:', error);
        }
      };

      fetchCityList();
    }
  }, [token]);

  const handleForecast = () => {
    history.push(`/detail?cityId=${cityId}&token=${token}`);
  };


  return (
    <div className="App">
      <div className="center-container">
        {!response && (

          <div className="box">
            <h1>A2D</h1>
            <h2>Forecasting</h2>
            <p className='subtitle'>Enter your email address and password</p>
            <div className="input">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
          </div>

        )}
        {response && (
          <div className='box'>

            {response.liveWeather && (
              <div>
                <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
                  <option value="" disabled>
                    Select a city
                  </option>
                  {cityList.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <div className='small-box'>
                  <p>Today, {getCurrentDate()}</p>
                  <div className='weather-info'>
                    <div className='left-info'>
                      <i className="fas fa-cloud"></i> {/* Cloud icon */}
                      <div className='temperature'>
                        <h1>{response.liveWeather.temperature}°</h1>
                        <h2>{response.liveWeather.condition}</h2>
                      </div>
                    </div>
                    <div className='right-info'>
                      <p>Time: {response.liveWeather.time}</p>
                      <p>Max Temperature: {response.liveWeather.maxTemperature}</p>
                      <p>Min Temperature: {response.liveWeather.minTemperature}</p>
                      <p>Wind Speed: {response.liveWeather.windSpeed}</p>
                      <p>Humidity: {response.liveWeather.humidity}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <button onClick={handleForecast} className='forecast'>Forecast</button>

          </div>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Login;


