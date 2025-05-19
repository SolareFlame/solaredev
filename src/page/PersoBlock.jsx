import React from "react";
import ScrollReveal from "../blocks/custom/ScrollReveal.jsx";

const PersoBlock = ({ bgColor, logo: Logo, text }) => (
    <ScrollReveal>
        <div className="flex flex-col xl:flex-row items-center xl:items-start mb-5 gap-4">
            <div className="w-full xl:w-1/12 mb-4 xl:mb-0">
                <div className={`w-[75px] h-[75px] ${bgColor} flex items-center justify-center rounded mx-auto xl:mx-0`}>
                    <Logo className="w-[32px] h-[32px] hover:scale-125 hover:rotate-12 transition-transform duration-300" />
                </div>
            </div>
            <div className="flex-1 text-center xl:text-left">
                <p className="text-[20px] xl:text-[24px] font-medium text-textday dark:text-[#BBB9BE]">
                    {text}
                </p>
            </div>
        </div>
    </ScrollReveal>
);

export default PersoBlock;