"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { Features } from "@/app/page";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  center?: number[];
  places?: Features[];
};

const ZOOM_IN = 6;
const ZOOM_OUT = 4;
let BRAZIL_LAT_LONG = [-14.235, -51.9253]

export const Map: React.FC<MapProps> = ({ center, places }) => {
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  if (places?.length != 0) {
    BRAZIL_LAT_LONG[0] = places ? places[0].properties.latitude : 0;
    BRAZIL_LAT_LONG[1] = places ? places[0].properties.longitude : 0;
  }
  const zoom = places && (places.length > 10 || places.length === 0) ? ZOOM_OUT : ZOOM_IN;

  return (
    <MapContainer
      center={[BRAZIL_LAT_LONG[0], BRAZIL_LAT_LONG[1]]}
      zoom={zoom}
      className="h-[80vh] rounded-lg"
    >
      <TileLayer attribution={attribution} url={url} />
      {places?.map(({ properties }) => {
        return (
          <Marker
            key={`${properties.adm1name}-${properties.geonameid}`}
            position={[properties.latitude, properties.longitude]}
            title={properties.name}
          />
        );
      })}
      ;
    </MapContainer>
  );
};
