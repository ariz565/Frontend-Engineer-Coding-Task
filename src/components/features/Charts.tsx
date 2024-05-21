import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../constants/Sidebar";
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

  // State variables to hold COVID-19 data
  const [cases, setCases] = useState<DataPoint[]>([]);
  const [deaths, setDeaths] = useState<DataPoint[]>([]);
  const [recovered, setRecovered] = useState<DataPoint[]>([]);

  // Function to fetch COVID-19 historical data
  const getData = async () => {
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

      setCases(casesDataPoints);
      setDeaths(deathsDataPoints);
      setRecovered(recoveredDataPoints);

      console.log(casesDataPoints, deathsDataPoints, recoveredDataPoints);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  return (
    <div className="flex lg:flex-row flex-col">
      <Sidebar />
      <div className="lg:w-[1190px] w-full flex flex-col justify-center items-center">
        <div className="flex items-center gap-5">
          <p
            className={`p-4 text-base uppercase cursor-pointer font-medium ${
              content ? "text-indigo-500" : "text-primary"
            }`}
            onClick={() => setContent(true)}
          >
            Line Graph
          </p>
          <p
            className={`p-4 text-base uppercase cursor-pointer font-medium ${
              !content ? "text-indigo-500" : "text-primary"
            }`}
            onClick={() => setContent(false)}
          >
            Leaflet Map
          </p>
        </div>

        {content ? (
          <div className="w-full">
            <ApexChart cases={cases} deaths={deaths} recovered={recovered} />{" "}
            {/* Render ApexChart if content is true */}
          </div>
        ) : (
          <LeafletMap />
        )}
      </div>
    </div>
  );
};

export default Charts;
