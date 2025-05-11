import React, {useState} from 'react'
import './App.css'

import SolareLogo from './assets/solare.svg'
import SolartLogo from './assets/solart.svg'
import CamionLogo from './assets/camion.svg'

import RotatingText from './blocks/TextAnimations/RotatingText/RotatingText.jsx';
import GradientText from "./blocks/TextAnimations/GradientText/GradientText.jsx";
import Skills from "./Skill_list.jsx";
import Tools from "./Tools_list.jsx";

import GithubData from "./stats/GitHubData.jsx";
import CoffeeData from "./stats/CoffeeData.jsx";
import ProjectsData from "./stats/ProjectsData.jsx";

import ScrollReveal from "./blocks/custom/ScrollReveal.jsx";
import ShinyText from "./blocks/TextAnimations/ShinyText/ShinyText.jsx";
import Squares from "./blocks/Backgrounds/Squares/Squares.jsx";
import SpotlightCard from "./blocks/Components/SpotlightCard/SpotlightCard.jsx";
import StarBorder from "./blocks/Animations/StarBorder/StarBorder.jsx";


function App() {
    return (
        <>
            {/* HOME */}
            <div className="flex flex-row mx-auto w-3/5 justify-between mb-24">
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
            <div className="flex flex-col w-3/5 mx-auto mb-20">
                <ScrollReveal>
                    <div className="flex flex-row items-center mb-5">
                        <div className="w-1/12 me-5">
                            <div className="w-[75px] h-[75px] bg-[#7C49D6] flex items-center justify-center rounded">
                                <img src={SolareLogo} alt="Logo"
                                     className="w-[32px] h-[32px] hover:scale-125 hover:rotate-12 transition-transform duration-300"/>
                            </div>
                        </div>

                        <p className="text-[24px] font-medium  text-[#BBB9BE] text-left">
                            I'm a passionate <strong>French developer</strong> who takes delight in building complex
                            systems and crafting
                            elegant algorithms, illustrating visuals, or designing immersive experiences.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="flex flex-row items-center mb-5">
                        <div className="w-1/12 me-5">
                            <div className="w-[75px] h-[75px] bg-[#F12D2D] flex items-center justify-center rounded">
                                <img src={CamionLogo} alt="Logo"
                                     className="w-[32px] h-[32px] hover:scale-125 hover:rotate-12 transition-transform duration-300"/>
                            </div>
                        </div>

                        <p className="text-[24px] font-medium  text-[#BBB9BE] text-left">
                            I develop <strong>fullstack</strong> applications using technologies like Java, JavaScript,
                            PHP, and SQL,
                            building everything from responsive front-end interfaces to solid, scalable back-end
                            systems.
                        </p>
                    </div>
                </ScrollReveal>
                <ScrollReveal>
                    <div className="flex flex-row items-center mb-5">
                        <div className="w-1/12 me-5">
                            <div className="w-[75px] h-[75px] bg-[#FB6B00] flex items-center justify-center rounded">
                                <img src={SolartLogo} alt="Logo"
                                     className="w-[32px] h-[32px] hover:scale-125 hover:rotate-12 transition-transform duration-300"/>
                            </div>
                        </div>

                        <p className="text-[24px] font-medium  text-[#BBB9BE] text-left">
                            On the creative side, I'm deeply passionate about design. I'm also the creator of <strong>Solart
                            Studio</strong>, a pixel art commission platform where I create detailed illustrations using
                            Aseprite.
                        </p>
                    </div>
                </ScrollReveal>
            </div>


            <div className="flex flex-col w-3/5 mx-auto mb-20">
                <SpotlightCard className="bg-[#1D1A26]" spotlightColor="rgba(251, 107, 0, 0.2)">

                    <div className="mb-5">
                        <img src={SolartLogo} alt="Logo"
                             className="w-[40px]"/>
                    </div>

                    <h5 className="text-[24px] font-semibold text-white">Solart Studio</h5>
                    <span className="text-[18px] font-light text-[#BBB9BE]">
                        Solart Studio features a Discord-based ticketing system that allows users to request pixel art commissions through an intuitive interface.
                        The system ensures a smooth and organized workflow by automatically creating a private thread for each request, enabling direct communication
                        and status tracking between the client and the artist.
                    </span>

                    <StarBorder
                        as="button"
                        className="focus:outline-none focus:ring-0 focus-visible:ring-0"
                        inClassName="from-[#1D1A26] to-[#322012] border border-[#4C2C13]"
                        color="#FB6B00"
                        speed="5s"
                    >
                        Visit Solart Studio
                    </StarBorder>
                </SpotlightCard>
            </div>


        </>
    )
}

export default App
