import React from "react";

import Bootstrap from './assets/skills/Bootstrap.svg';
import CSS3 from './assets/skills/CSS3.svg';
import Discordjs from './assets/skills/Discord.js.svg';
import HTML5 from './assets/skills/HTML5.svg';
import Java from './assets/skills/Java.svg';
import JavaScript from './assets/skills/JavaScript.svg';
import MySQL from './assets/skills/MySQL.svg';
import Nodejs from './assets/skills/Node.js.svg';
import PHP from './assets/skills/PHP.svg';
import ReactLogo from './assets/skills/React.svg';
import Tailwind from './assets/skills/Tailwind CSS.svg';

const skills = [
    { name: "Java", logo: Java },
    { name: "PHP", logo: PHP },
    { name: "MySQL", logo: MySQL },
    { name: "JavaScript", logo: JavaScript },
    { name: "Node.js", logo: Nodejs },
    { name: "Discord.js", logo: Discordjs },
    { name: "HTML5", logo: HTML5 },
    { name: "CSS3", logo: CSS3 },
    { name: "Tailwind CSS", logo: Tailwind },
    { name: "Bootstrap", logo: Bootstrap },
    { name: "React", logo: ReactLogo },
];


const Skills = () => {
    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#100e15] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#100e15] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll gap-12 w-max">
                {[...skills, ...skills].map((lang, index) => (
                    <div key={index} className="flex items-center m-3">
                        <img src={lang.logo} alt={lang.name} className="w-[40px] me-2" />
                        <p className="text-[20px] text-[#BBB9BE] whitespace-nowrap">{lang.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
