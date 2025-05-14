import React from "react";

import Aseprite from '../../assets/tools/Aseprite.svg';
import DataGrip from '../../assets/tools/DataGrip.svg';
import Figma from '../../assets/tools/Figma.svg';
import Git from '../../assets/tools/Git.svg';
import Intellij from '../../assets/tools/IntelliJ IDEA.svg';
import PhpStorm from '../../assets/tools/PhpStorm.svg';
import VisualStudioCode from '../../assets/tools/Visual Studio Code.svg';
import Webstorm from '../../assets/tools/WebStorm.svg';

const tools = [
    { name: "Aseprite", logo: Aseprite },
    { name: "Figma", logo: Figma },
    { name: "Git", logo: Git },
    { name: "IntelliJ IDEA", logo: Intellij },
    { name: "PhpStorm", logo: PhpStorm },
    { name: "DataGrip", logo: DataGrip },
    { name: "Webstorm", logo: Webstorm },
    { name: "Visual Studio Code", logo: VisualStudioCode },
];

const Tools = () => {
    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#100e15] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#100e15] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll_reverse gap-12 w-max">
                {[...tools, ...tools].map((lang, index) => (
                    <div key={index} className="flex items-center m-3">
                        <img src={lang.logo} alt={lang.name} className="w-[40px] me-2" />
                        <p className="text-[20px] text-[#BBB9BE] whitespace-nowrap">{lang.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tools;
