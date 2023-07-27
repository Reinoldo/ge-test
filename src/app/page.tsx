"use client";

import dynamic from "next/dynamic";
import { IoSearchOutline } from "react-icons/io5";
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
export default function Home() {
    const [geoBrasilData, setGeoBrasilData] = useState<GeoDataProps[]>();
    const [places, setPlaces] = useState<Features[]>();

    const Map = dynamic(() => import("./components/Map/index").then((map) => map.Map), { ssr: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson"
                );
                const data = response.data;

                const brasil = data?.features.filter((item: { properties: { adm0_a3: string } }) => {
                    return item.properties.adm0_a3 === "BRA";
                });
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

        console.log(places);

        setPlaces(places);
    };

    return (
        <main className=''>
            <div className='flex p-4 md:mx-10 transition-all'>
                <Input id='location' register={register} required />
                <Button icon={IoSearchOutline} label='' onClick={handleSubmit(onSubmit)} />
            </div>

            <div className='flex flex-col sm:flex-col md:flex-row bg-neutral-50'>
                <div>
                    <div className='px-4 md:mx-10 mx-2 transition-all'>
                        {places ? (places?.length === 1 ? `${places?.length} Item` : `${places?.length} Items`) : null}
                    </div>
                    <div className='font-bold text-3xl p-4 md:mx-10 mx-2 transition-all'>Features</div>
                    <div className='w-1/3  mx-2 md:mx-10 transition-all'>
                        {places
                            ? places.map((place) => {
                                  return (
                                      <Card
                                          key={`${place.properties.adm1name}-${place.properties.geonameid}`}
                                          cityName={place.properties.name}
                                          country={place.properties.adm0name}
                                          sigla={place.properties.iso_a2}
                                          rank={place.properties.rank_max}
                                          latitude={place.properties.latitude}
                                          longitude={place.properties.longitude}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>

                <div className='sm:w-full md:w-3/4 p-10'>
                    <Map places={places} />
                </div>
            </div>
        </main>
    );
}
