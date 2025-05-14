import React, {useEffect, useState} from 'react'
import './assets/css/App.css'

import SolareLogo from './assets/solare.svg'

import SolartLogo from './assets/projects/solart.svg'
import CamionLogo from './assets/projects/camion.svg'
import SmpcLogo from './assets/projects/smpc.svg'
import KlaxonLogo from './assets/projects/klaxon.svg'
import CroustoLogo from './assets/projects/crousto.svg'
import GithubLogo from './assets/contacts/github.svg'
import Linkedin from './assets/contacts/linkedin.svg'

import RotatingText from './blocks/TextAnimations/RotatingText/RotatingText.jsx';
import GradientText from "./blocks/TextAnimations/GradientText/GradientText.jsx";
import Skills from "./page/list/Skill_list.jsx";
import Tools from "./page/list/Tools_list.jsx";

import GithubData from "./stats/GitHubData.jsx";
import CoffeeData from "./stats/CoffeeData.jsx";
import ProjectsData from "./stats/ProjectsData.jsx";

import ScrollReveal from "./blocks/custom/ScrollReveal.jsx";
import ShinyText from "./blocks/TextAnimations/ShinyText/ShinyText.jsx";
import Squares from "./blocks/Backgrounds/Squares/Squares.jsx";
import SpotlightCard from "./blocks/Components/SpotlightCard/SpotlightCard.jsx";
import StarBorder from "./blocks/Animations/StarBorder/StarBorder.jsx";
import PersoBlock from "./page/PersoBlock.jsx";
import ProjectBlock from "./page/ProjectBlock.jsx";
import LoadingScreen from "./page/LoadingScreen.jsx";
import DarkMode from "./page/DarkMode.jsx";


function App() {

    return (
        <>
            <DarkMode/>
            {/* HOME */}
            <div className="flex flex-row mx-auto w-3/5 justify-between mb-24" id="home">
                <div className="flex flex-col w-3/6">
                    <div className="flex flex-row">
                        <h5 className="text-[20px] font-regular text-[#BBB9BE]">Hi, I'm&nbsp;</h5>
                        <ShinyText text="Solare" disabled={false} speed={3} className="text-[20px] font-regular"/>
                    </div>

                    <RotatingText
                        texts={['Developer', 'Pixel Artist', 'Game Designer', 'IT Student']}
                        mainClassName="text-[48px] font-semibold"
                        staggerFrom={"last"}
                        initial={{y: "100%"}}
                        animate={{y: 0}}
                        exit={{y: "-120%"}}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{type: "spring", damping: 30, stiffness: 400}}
                        rotationInterval={3000}
                    />
                </div>

                <div className="flex flex-col w-3/6">
                    <div>
                        <p className="text-[24px] font-medium text-[#BBB9BE]">
                            I build engaging digital experiences through{" "}

                            <GradientText
                                colors={["#FB6B00", "#FB6B00", "#F12D2D", "#7C49D6", "#7C49D6"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="text-[24px] font-medium"
                            >
                                fullstack
                            </GradientText>

                            {" "}development, blending code,
                            creativity, and structured thinking.
                        </p>
                    </div>
                </div>
            </div>

            {/* TOOLSET */}
            <div className="flex flex-col mx-auto w-3/5 justify-between mb-20">
                <Skills/>
                <Tools/>
            </div>


            {/* STATS */}
            <div className="flex flex-col w-3/5 mx-auto mb-20">
                <h5 className="text-[24px] font-medium text-[#BBB9BE] text-center">This year...</h5>
                <div className="flex flex-row justify-between">

                    <div className="flex flex-col w-1/3 text-center">
                        <CoffeeData/>
                        <h5 className="text-[24px] font-medium text-[#BBB9BE]">liters of coffee drunk</h5>
                    </div>

                    <div className="flex flex-col w-1/3 text-center">
                        <GithubData username={"solareflame"}/>
                        <h5 className="text-[24px] font-medium text-[#BBB9BE]">contributions</h5>
                    </div>

                    <div className="flex flex-col w-1/3 text-center">
                        <ProjectsData/>
                        <h5 className="text-[24px] font-medium text-[#BBB9BE]">projects in progress</h5>
                    </div>
                </div>
            </div>


            {/* WHO I AM ? */}
            <div className="flex flex-col w-3/5 mx-auto mb-20" id="about">
                <PersoBlock
                    bgColor="bg-[#7C49D6]"
                    logo={SolareLogo}
                    text={
                        <>
                            I'm a passionate <strong>French developer</strong> who takes delight in building complex
                            systems and crafting
                            elegant algorithms, illustrating visuals, or designing immersive experiences.
                        </>
                    }
                />
                <PersoBlock
                    bgColor="bg-[#F12D2D]"
                    logo={CamionLogo}
                    text={
                        <>
                            I develop <strong>fullstack</strong> applications using technologies like Java, JavaScript,
                            PHP, and SQL,
                            building everything from responsive front-end interfaces to solid, scalable back-end
                            systems.
                        </>
                    }
                />
                <PersoBlock
                    bgColor="bg-[#FB6B00]"
                    logo={SolartLogo}
                    text={
                        <>
                            On the creative side, I'm deeply passionate about design. I'm also the creator of <strong>Solart
                            Studio</strong>, a pixel art commission platform where I create detailed illustrations using
                            Aseprite.
                        </>
                    }
                />
            </div>

            {/* PROJECTS */}
            <div className="flex flex-col w-3/5 mx-auto mb-20" id="projects">
                <h5 className="text-[48px] font-semibold mb-5">Projects</h5>

                <ProjectBlock
                    logo={SolartLogo}
                    title="Solart Studio"
                    description={
                        <>
                            Solart Studio features a Discord-based ticketing system that allows users to request pixel
                            art commissions through an intuitive interface.
                            The system ensures a smooth and organized workflow by automatically creating a private
                            thread for each request, enabling direct communication
                            and status tracking between the client and the artist.
                        </>
                    }
                    link="https://github.com/Solart-Studio"
                />


                <div className="flex flex-row gap-5 mt-5">
                    <div className="flex flex-col w-1/2">
                        <ProjectBlock
                            logo={CamionLogo}
                            title="Camion"
                            description={
                                <>
                                    CAMION is a modular Discord bot that streams music from YouTube Music.
                                    It supports full queue control, playback commands and features a clean interface
                                    using Discord embeds.
                                </>
                            }
                            info={
                                <>
                                    <h5>Langages and technologies used:</h5>
                                    JavaScript, NodeJS, Discord.js, FFmpeg, yt-dlp
                                </>
                            }
                            link="https://github.com/SolareFlame/camion"
                            color="camion"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <ProjectBlock
                            logo={SmpcLogo}
                            title="SMP Core"
                            description={
                                <>
                                    SMP Core is a Minecraft plugin that adds gameplay restrictions, blocks certain
                                    dimensions, and fixes economic issues to extend the life of SMP servers.
                                    It’s designed to slow down progression and keep multiplayer worlds balanced and
                                    engaging over time.
                                </>
                            }
                            info={
                                <>
                                    <h5>Langages and technologies used:</h5>
                                    Java, Paper & Spigot API, MySQL, Gradle
                                </>
                            }
                            link="https://github.com/SolareFlame/smpc"
                            color="smpc"
                        />
                    </div>
                </div>


                <div className="flex flex-row gap-5 mt-5">
                    <div className="flex flex-col w-1/2">
                        <ProjectBlock
                            logo={KlaxonLogo}
                            title="Klaxon"
                            description={
                                <>
                                    Klaxon is a private online radio platform built with Laravel, React, and osSRS
                                    (WebRTC, MP3).
                                    It offers customizable queues, user profiles, and secure streaming with token-based
                                    authentication, ensuring high-quality and scalable broadcasts.
                                </>
                            }
                            info={
                                <>
                                    <h5>Langages and technologies used:</h5>
                                    PHP, Laravel, React, Javascript, SRS, ReactBits, MariaDB, Nginx
                                </>
                            }
                            link="https://github.com/SolareFlame/klaxon"
                            color="klaxon"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <ProjectBlock
                            logo={CroustoLogo}
                            title="Crousto"
                            description={
                                <>
                                    Crousto is a Discord bot that fetches and posts daily menus from Crous Lorraine
                                    restaurants.
                                    It can display menus on request or automatically send them every day to a designated
                                    channel.
                                </>
                            }
                            info={
                                <>
                                    <h5>Langages and technologies used:</h5>
                                    JavaScript, NodeJS, Discord.js
                                </>
                            }
                            link="https://github.com/SolareFlame/croustoV2"
                            color="crousto"
                        />
                    </div>
                </div>

            </div>

            {/* CONTACTS */}
            <div className="flex flex-col w-3/5 mx-auto mb-20" id="contact">
                <h5 className="text-[48px] font-semibold mb-5">Contacts</h5>

                <button type="button"
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4
                        focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600
                        dark:hover:bg-purple-700 dark:focus:ring-purple-900">

                    <img src={GithubLogo} className={"w-5 h-5 inline-block mr-2"} alt="Github Logo"/>
                    Github Profile
                </button>

            </div>
        </>
    )
}

export default App
