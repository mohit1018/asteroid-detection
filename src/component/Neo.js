import React, { useState,useEffect } from "react";
import "./styles.css";
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';


Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);


const Neo = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [neoData, setNeoData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});
  

  


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'NEO detections',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of NEO detections',
        },
        min: 0,
        suggestedMax: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
 
  
  
  useEffect(() => {
    setChartData(data);
  }, []);
    

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    props.setProgress(30)
    

    // setLoading(true);
    props.setProgress(60)
    
    setError(null);

    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=w5frUPMOyLwotdglPfiE52Zvy5DV5WckYmtckjkM`
      );
      props.setProgress(85)
      const data = await response.json();
      setNeoData(data.near_earth_objects[startDate]);
      props.setProgress(100)
      // setLoading(false);
    } catch (error) {
      setError(error.message);
      props.setProgress(100)
      // setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter a start date and end date to detect NEOs</h2>
      <body>
        <form onSubmit={handleSubmit}>
          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />

          <label htmlFor="endDate">End date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />

          {/* <input type="submit" disabled={loading} value="Submit" /> */}
          <input type="submit"  value="Submit" />
          {/* {loading ? "Loading..." : ""} */}
        </form>
      </body>

      {error && <div>Error: {error}</div>}

      {neoData.length > 0 && (
        <div>
          <h2>NEOs detected on {startDate}</h2>
          <ul>
            {neoData.map((neo) => (
              <li key={neo.id}>
                {neo.name} (
                {neo.close_approach_data[0].miss_distance.kilometers} km away)
                <Line data={chartData} options={options} />

              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default Neo;