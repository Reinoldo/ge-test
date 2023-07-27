"use client";

interface CardProps {
    country?: string;
    sigla?: string;
    cityName: string;
    latitude?: number;
    longitude?: number;
    rank?: number;
}
export const Card: React.FC<CardProps> = ({ country, sigla, cityName, latitude, longitude, rank }) => {
    return (
        <div className='w-64 flex flex-col rounded-lg  shadow-md mx-4 my-5 '>
            <div className='font-extrabold text-lg px-4'>{cityName}</div>
            <div className='flex flex-row px-4 py-2 text-[#3E4958]'>
                <div className='pr-2'>{rank} stars</div>
                <div className=''>
                    {country} - {sigla}
                </div>
            </div>
            <div className='px-4 py-2 text-[#3E4958] font-extralight'>
                <div>Coordenadas:</div>
                <div className='flex flex-col'>
                    <div>Latitude: {latitude}</div>
                    <div>Longitude: {longitude}</div>
                </div>
                <div></div>
            </div>
        </div>
    );
};
