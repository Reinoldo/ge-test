"use client";

import dynamic from "next/dynamic";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Card } from "./components/Card";
import { upperCaseState } from "./helpers";

export type Properties = {
  adm0name: string; // nome do pais
  iso_a2: string; // sigla iso, ex: BR
  adm0_a3: string; // sigla pais, ex: BRA
  adm1name: string; // estado
  latitude: number;
  longitude: number;
  geonameid: number;
  name: string;
  rank_max: number;
};
export type Features = {
  type: string;
  properties: Properties;
  gemoetry: {};
};

type GeoDataProps = {
  type: string;
  features: Features;
};

const BRAZIL_SIGLA = "BRA";

export default function Home() {
  const [geoBrasilData, setGeoBrasilData] = useState<GeoDataProps[]>();
  const [places, setPlaces] = useState<Features[]>();

  const Map = dynamic(
    () => import("./components/Map/index").then((map) => map.Map),
    { ssr: false },
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson",
        );
        const data = response.data;

        const brasil = data?.features.filter(
          (item: { properties: { adm0_a3: string } }) => {
            return item.properties.adm0_a3 === BRAZIL_SIGLA;
          },
        );
        setGeoBrasilData(brasil);
        setPlaces(brasil);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const state = upperCaseState(data.location);

    const places: any = geoBrasilData?.filter((item: any) => {
      return item.properties.adm1name === state;
    });

    setPlaces(places);
  };

  return (
    <main className="">
      <div className="flex p-4 transition-all md:mx-10">
        <Input id="location" register={register} required />
        <Button
          icon={IoSearchOutline}
          label=""
          onClick={handleSubmit(onSubmit)}
        />
      </div>

      <div className="flex flex-col bg-neutral-50 sm:flex-col md:flex-row">
        <div>
          <div className="mx-2 px-4 transition-all md:mx-10">
            {places
              ? places?.length === 1
                ? `${places?.length} Item`
                : `${places?.length} Items`
              : null}
          </div>
          <div className="mx-2 p-4 text-3xl font-bold transition-all md:mx-10">
            Features
          </div>
          <div className="mx-2 w-1/3 transition-all md:mx-10">
            {places
              ? places.map((place) => {
                  return (
                    <Card
                      key={`${place.properties.adm1name}-${place.properties.geonameid}`}
                      cityName={place.properties.name}
                      country={place.properties.adm0name}
                      sigla={place.properties.iso_a2}
                      rank={place.properties.rank_max}
                      latitude={place?.properties?.latitude}
                      longitude={place?.properties?.longitude}
                      icon={FaStar}
                    />
                  );
                })
              : null}
          </div>
        </div>

        <div className="p-10 sm:w-full md:w-3/4">
          <Map places={places} />
        </div>
      </div>
    </main>
  );
}
