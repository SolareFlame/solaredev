import React from 'react';
import InfoIcon from '../assets/icons/info.svg?react';

const InfoBlock = ({info = "No data"}) => (

    <div className="absolute group inline-block top-0 right-3">
        <InfoIcon
            className="w-[25px] text-white opacity-20 hover:opacity-100 transition-all duration-300 cursor-pointer"
        />

        <div className="absolute top-full mt-2 right-0 bg-background text-white text-xs rounded px-2 py-1
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10
            w-[250px] whitespace-normal break-words">
            {info}
        </div>

    </div>
);

export default InfoBlock;