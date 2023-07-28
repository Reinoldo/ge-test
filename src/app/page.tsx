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
import { Container } from "./components/Container";
import Pagination from '@mui/material/Pagination';

type Properties = {
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

const BRAZIL_SIGLA = "BRA";

export default function Home() {
  const [geoBrazilData, setGeoBrazilData] = useState<Features[]>();
  const [places, setPlaces] = useState<Features[]>(); 
  const [currentPage, setCurrentPage] = useState(1);

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
        const brazilData = data?.features.filter((item: any) => {
          return item.properties.adm0_a3 === BRAZIL_SIGLA;
        });
        setGeoBrazilData(brazilData);
        setPlaces(brazilData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      location: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const state = upperCaseState(data.location);
    if (!state) return setPlaces(geoBrazilData);   

    const placesFiltered: any = geoBrazilData?.filter((item: any) => {
      return item.properties.adm1name === state;
    });    
    setPlaces(placesFiltered);
  };

  return (
    <Container>
      <div className="flex py-4 transition-all">
        <Input
          onKeyDown={handleSubmit(onSubmit)}
          id="location"
          register={register}
          errors={errors}
        />
        <Button icon={IoSearchOutline} label="" onClick={handleSubmit(onSubmit)} />
      </div>
      <div className="flex flex-col bg-neutral-50 sm:flex-col md:flex-row">
        <div>
          <div className="mx-2 mt-2 px-4 text-sm text-neutral-500 transition-all md:mx-10">
            {places
              ? places?.length === 1
                ? `${places?.length} Item`
                : `${places?.length} Items`
              : null}
          </div>
          <div className="mx-2 mb-10 px-4 text-3xl font-extrabold  text-[#3E4958] transition-all md:mx-10">
            Features
          </div>
          <div className="mx-2 w-1/3 transition-all md:mx-10">
            {places
              ? places
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((place) => {
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
            
              
              {places && places.length > 4 ? (                
                <Pagination className="w-80" size='large' count={Math.floor(places.length/3 + 1)} shape="rounded" onChange={(event,page)=>setCurrentPage(page)} /> 
              ): null}
            
          </div>
        </div>
        <div className="p-3 sm:w-full md:w-3/4 md:p-10">
          <Map places={places} />
        </div>
      </div>
    </Container>
  );
}
