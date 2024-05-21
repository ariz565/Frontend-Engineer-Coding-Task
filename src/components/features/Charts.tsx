import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../constants/Layout";
import LeafletMap from "../services/LeafletMap";
import ApexChart from "../services/ApexChart";

// Define the structure of the data points
interface DataPoint {
  x: number;
  y: number;
}

const Charts = () => {
  // State to track which content is displayed (true for Line Graph, false for Leaflet Map)
  const [content, setContent] = useState(true);

  // Function to toggle between Line Graph and Leaflet Map
  const toggle = () => {
    setContent(!content);
  };

  // State variables to hold COVID-19 data
  const [cases, setCases] = useState<DataPoint[]>([]);
  const [deaths, setDeaths] = useState<DataPoint[]>([]);
  const [recovered, setRecovered] = useState<DataPoint[]>([]);

  // Function to fetch COVID-19 historical data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const { cases, deaths, recovered } = response.data;

      // Map data into arrays of objects with x (timestamp) and y (value) properties
      const casesDataPoints: DataPoint[] = Object.entries(cases).map(
        ([date, value]) => ({
          x: new Date(date).getTime(),
          y: value as number,
        })
      );
      const deathsDataPoints: DataPoint[] = Object.entries(deaths).map(
        ([date, value]) => ({
          x: new Date(date).getTime(),
          y: value as number,
        })
      );
      const recoveredDataPoints: DataPoint[] = Object.entries(recovered).map(
        ([date, value]) => ({
          x: new Date(date).getTime(),
          y: value as number,
        })
      );

      // Set the state variables with the fetched data
      setCases(casesDataPoints);
      setDeaths(deathsDataPoints);
      setRecovered(recoveredDataPoints);

      // Log the fetched data for debugging
      console.log(casesDataPoints, deathsDataPoints, recoveredDataPoints);
    } catch (error) {
      // Log any errors that occur during data fetching
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Fetch data whenever content changes
  useEffect(() => {
    fetchData();
  }, [content]);

  return (
    <div className="flex lg:flex-row flex-col">
      <Sidebar />
      <div className="lg:w-[1190px] w-full flex flex-col justify-center items-center">
        {/* Conditional rendering based on the content state */}
        {!content ? (
          // Render Line Graph option when content is false
          <div className="flex items-center gap-5">
            <p className="p-4 text-base text-indigo-500 uppercase cursor-pointer font-medium">
              Line Graph
            </p>
            <p
              className="p-4 text-base text-primary uppercase cursor-pointer font-medium"
              onClick={toggle}
            >
              Leaflet Map
            </p>
          </div>
        ) : (
          // Render Leaflet Map option when content is true
          <div className="flex items-center gap-5">
            <p
              className="p-4 text-base text-primary uppercase cursor-pointer font-medium"
              onClick={toggle}
            >
              Line Graph
            </p>
            <p className="p-4 text-base text-indigo-500 uppercase cursor-pointer font-medium">
              Leaflet Map
            </p>
          </div>
        )}

        {/* Conditional rendering based on the content state */}
        {!content ? (
          // Render Line Graph when content is false
          <div className="w-full">
            {/* Render LineChart component (not implemented) */}
            {/* <LineChart cases={cases} deaths={deaths} recovered={recovered} /> */}
            <ApexChart cases={cases} deaths={deaths} recovered={recovered} />
          </div>
        ) : (
          // Render Leaflet Map when content is true
          <>
            <LeafletMap />
          </>
        )}
      </div>
    </div>
  );
};

export default Charts;
