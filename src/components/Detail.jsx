import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Detail() {
  const [forecastData, setForecastData] = useState(null);
  const [futureForecastData, setFutureForecastData] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityId = searchParams.get('cityId');
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchData = async (reqValue) => {
      const baseUrl = 'https://hiring-test.a2dweb.com';
      const endpoint = `/${reqValue}/${cityId}`;
      const url = `${baseUrl}${endpoint}`;
  
      try {
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await res.json();
        return data.DATA;
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        return null;
      }
    };
  
    const fetchDataForToday = async () => {
      try {
        const todayData = await fetchData('/view-small-forecast');
        setForecastData(todayData[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataForFuture = async () => {
      try {
        const futureData = await fetchData('/view-other-forecast');
        setFutureForecastData(futureData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataForToday();
    fetchDataForFuture();
  }, [cityId, token]);



  const handleBack = () => {
    // history.goBack();
  };

  return (
    <div className="App">
      <h2>Today</h2>

      {forecastData && (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(forecastData || {}).map(([key, value]) => (
              <tr key={key}>
                <td>{value.time}</td>
                <td>{value.temperature}</td>
                <td>{value.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Next Forecast</h2>

      {futureForecastData && (
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(futureForecastData || {}).map(([key, value]) => (
              <tr key={key}>
                <td>{value.temperature}</td>
                <td>{value.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handleBack}>Back to Login</button>
    </div>
  );
}

export default Detail;
