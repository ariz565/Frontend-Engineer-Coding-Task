import { useState } from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tileLayer from "../utils/titleLayer";
import L from "leaflet"; // Same as `import * as L from 'leaflet'` with webpack
import "leaflet/dist/leaflet.css";
import { fetchGlobalData, fetchCountryData } from "./api";

const center = [52.22977, 21.01178] as any;

function customMarkerIcon(color: any) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path fill="#${color}" stroke="#fff" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

const LeafletMap = () => {
  const [markerData, setMarkerData] = useState([]);
  const {
    data: globalData,
    error: globalError,
    isLoading: globalLoading,
  } = useQuery("getGlobalData", fetchGlobalData);
  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
  } = useQuery("getCountryData", fetchCountryData);

  if (globalError) return <div>Failed to fetch global data</div>;
  if (globalLoading || countryLoading) return <div>Loading...</div>;

  if (countryError) return <div>Failed to fetch country data</div>;

  return (
    <div>
      <MapContainer
        className="map"
        center={center}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer {...tileLayer} />

        {countryData &&
          countryData.map(
            (
              { country, countryInfo, active, deaths, recovered }: any,
              index: any
            ) => (
              <Marker
                key={index}
                position={[countryInfo.lat, countryInfo.long]}
                icon={customMarkerIcon("B2022F")}
              >
                <Popup>
                  <p className="text-[#323232] font-semibold">{country}</p>
                  <p className="text-yellow-500 text-xs">
                    Active: <span className="font-medium">{active}</span>
                  </p>
                  <p className="text-red-600 text-xs">
                    Deaths: <span className="font-medium">{deaths}</span>
                  </p>
                  <p className="text-green-600 text-xs">
                    Recovered: <span className="font-medium">{recovered}</span>
                  </p>
                </Popup>
              </Marker>
            )
          )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
