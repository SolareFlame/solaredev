import StarBorder from "../blocks/Animations/StarBorder/StarBorder.jsx";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard.jsx";
import ScrollReveal from "../blocks/custom/ScrollReveal.jsx";

import { hexToRgba } from "../utils/colors.js";
import InfoBlock from "./InfoBlock.jsx";
import Squares from "../blocks/Backgrounds/Squares/Squares.jsx";

const ProjectBlock = ({
                          logo : Logo,
                          title,
                          description,
                          link,
                          color = "solart",
                          info = null,
                      }) => {
    const VARIANTS = {
        solart: {
            icon:
                "from-solart-background to-solart-tertiary border border-solart-secondary " +
                "dark:from-solart-dark-background dark:to-solart-dark-tertiary dark:border dark:border-solart-dark-secondary",

            card:
                "bg-solart-background border-solart-border " +
                "dark:bg-solart-dark-background dark:border-solart-dark-border",

            color: "#FB6B00",
        },
        camion: {
            icon:
                "from-camion-background to-camion-tertiary border border-camion-secondary " +
                "dark:from-camion-dark-background dark:to-camion-dark-tertiary dark:border dark:border-camion-dark-secondary",
            card:
                "bg-camion-background border-camion-border " +
                "dark:bg-camion-dark-background dark:border-camion-dark-border",
            color: "#F12D2D",
        },
        smpc: {
            icon:
                "from-smpc-background to-smpc-tertiary border border-smpc-secondary " +
                "dark:from-smpc-dark-background dark:to-smpc-dark-tertiary dark:border dark:border-smpc-dark-secondary",
            card:
                "bg-smpc-background border-smpc-border " +
                "dark:bg-smpc-dark-background dark:border-smpc-dark-border",
            color: "#49D69B",
        },
        klaxon: {
            icon:
                "from-klaxon-background to-klaxon-tertiary border border-klaxon-secondary " +
                "dark:from-klaxon-dark-background dark:to-klaxon-dark-tertiary dark:border dark:border-klaxon-dark-secondary",
            card:
                "bg-klaxon-background border-klaxon-border " +
                "dark:bg-klaxon-dark-background dark:border-klaxon-dark-border",
            color: "#B53EFF",
        },
        crousto: {
            icon:
                "from-crousto-background to-crousto-tertiary border border-crousto-secondary " +
                "dark:from-crousto-dark-background dark:to-crousto-dark-tertiary dark:border dark:border-crousto-dark-secondary",
            card:
                "bg-crousto-background border-crousto-border " +
                "dark:bg-crousto-dark-background dark:border-crousto-dark-border",
            color: "#FAAF18",
        },
    };
    const CURRENT = VARIANTS[color];

    return (
        <ScrollReveal>
            <SpotlightCard
                className={CURRENT.card}
                spotlightColor={hexToRgba(CURRENT.color, 0.2)}
            >
                <div className="grid grid-rows-[auto_auto_1fr_auto] h-full gap-4">
                    {/* Logo */}
                    <div className="flex flex-row justify-between">
                        <Logo className="w-[40px] h-[40px] text-textday dark:text-[#BBB9BE]" />
                        {info && <InfoBlock info={info} />}
                    </div>

                    {/* Title */}
                    <h5 className="text-[24px] font-semibold text-textday dark:text-[#BBB9BE]">
                        {title}
                    </h5>

                    {/* Description */}
                    <span className="text-[18px] font-light text-textday dark:text-[#BBB9BE] block">
            {description}
          </span>

                    {/* Button */}
                    <div>
                        <StarBorder
                            as="a"
                            className="cursor-pointer"
                            onClick={() => (window.location.href = link)}
                            inClassName={CURRENT.icon + " text-textday dark:text-[#BBB9BE]"}
                            color={CURRENT.color}
                            speed="5s"
                        >
                            <p className="text-textday dark:text-[#BBB9BE]">Check {title}</p>
                        </StarBorder>
                    </div>
                </div>
            </SpotlightCard>
        </ScrollReveal>
    );
};

export default ProjectBlock;
