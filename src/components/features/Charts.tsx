import axios from "axios";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Sidebar from "../constants/Sidebar";
import LeafletMap from "../services/LeafletMap";
import ApexChart from "../services/ApexChart";

const Charts = () => {
  const [content, setContent] = useState(true);

  const toggle = () => {
    setContent(!content);
  };

  // Used the useQuery hook to fetch data from the URL and destructures the result into data, error, and isLoading variables.
  // const {
  //   data: data,
  //   error: error,
  //   isLoading: isLoading,
  // } = useQuery("getGraphData", async () => {
  //   const res = await fetch(
  //     "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  //   );
  //   return res.json();
  // });

  // console.log(data, "line graph data using react query");

  const [cases, setCases] = useState([] as any);
  const [deaths, setDeaths] = useState([] as any);
  const [recovered, setRecovered] = useState([] as any);

  const getData = async () => {
    axios // fetches data from the URL and sets the data to the respective state variables.
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => {
        let { cases, deaths, recovered } = response.data;

        // The data is then mapped to an array of objects with x and y properties.
        let casesDataPoints = [] as any;
        let deathsDataPoints = [] as any;
        let recoveredDataPoints = [] as any;

        let date = new Date();

        Object.entries(cases).map((item) => {
          let date = new Date(item[0]);
          casesDataPoints.push([date.getTime(), item[1]]);
        });

        Object.entries(deaths).map((item) => {
          let date = new Date(item[0]);
          deathsDataPoints.push([date.getTime(), item[1]]);
        });

        Object.entries(recovered).map((item) => {
          let date = new Date(item[0]);
          recoveredDataPoints.push([date.getTime(), item[1]]);
        });

        setCases(casesDataPoints);
        setDeaths(deathsDataPoints);
        setRecovered(recoveredDataPoints);

        console.log(casesDataPoints);
        console.log(deathsDataPoints);
        // console.log(recoveredDataPoints);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // if (error) {
  //   return <p>Error occured</p>;
  // }
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex lg:flex-row flex-col">
      <Sidebar />
      <div className="lg:w-[1190px] w-full flex flex-col justify-center items-center">
        {!content ? (
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
          <div className="flex items-center gap-5">
            <p
              className="p-4 text-base text-primary uppercase cursor-pointer font-medium"
              onClick={toggle}
            >
              Line Graph
            </p>
            <p className="p-4 text-base text-indigo-500 uppercase ursor-pointer font-medium">
              Leaflet Map
            </p>
          </div>
        )}

        {!content ? (
          <div className="w-full">
            {/* <LineChart cases={cases} deaths={deaths} recovered={recovered} /> */}
            <ApexChart cases={cases} deaths={deaths} recovered={recovered} />
          </div>
        ) : (
          <>
            <LeafletMap />
          </>
        )}
      </div>
    </div>
  );
};

export default Charts;
