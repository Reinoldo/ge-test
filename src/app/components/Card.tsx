"use client";

import { IconType, IconContext } from "react-icons";

interface CardProps {
  country?: string;
  sigla?: string;
  cityName: string;
  latitude?: number;
  longitude?: number;
  rank?: number;
  icon?: IconType;
}

export const Card: React.FC<CardProps> = ({
  country,
  sigla,
  cityName,
  latitude,
  longitude,
  rank,
  icon: Icon,
}) => {
  return (
    <div className="mx-4 my-5 flex w-64 flex-col rounded-lg shadow-md shadow-neutral-300 hover:shadow-indigo-500/40 ">
      <div className="px-4 pt-4 text-lg font-extrabold text-[#3E4958]">
        {cityName}
      </div>
      <div className="flex flex-row px-4 py-2 text-[#3E4958]">
        <div className="flex justify-center pr-2 align-middle">
          <div className="flex pr-1.5 align-baseline">
            {Icon && (
              <IconContext.Provider
                value={{
                  color: "#F6C002",
                  style: { verticalAlign: "baseline" },
                }}
              >
                <Icon size={18} />
              </IconContext.Provider>
            )}
          </div>
          <div className="text-center">{rank}</div>
        </div>
        <div className="">
          {country} - {sigla}
        </div>
      </div>
      <div className="px-4 py-2 font-extralight text-[#3E4958]">
        <div>Coordenadas:</div>
        <div className="flex flex-col">
          <div>Latitude: {latitude},</div>
          <div>Longitude: {longitude}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
