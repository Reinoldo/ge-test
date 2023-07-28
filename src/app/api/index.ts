import axios from "axios";

export const getGeoData = async () => {
  const data = await axios.get(
    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson",
  );
  console.log(data.data);
};
