import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
    const [forecasts, setForecasts] = useState();

    const client = axios.create({
      baseURL: "http://192.168.200.200:30000/weatherforecast"
    });

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server. V3.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        await client.get().then((response) => {
          setForecasts(response.data);
        })
    }
}

export default App
