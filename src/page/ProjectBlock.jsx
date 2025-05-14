import StarBorder from "../blocks/Animations/StarBorder/StarBorder.jsx";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard.jsx";
import ScrollReveal from "../blocks/custom/ScrollReveal.jsx";

import {hexToRgba} from "../utils/colors.js";
import InfoBlock from "./InfoBlock.jsx";

const ProjectBlock = ({
                          logo,
                          title,
                          description,
                          link,
                          color = "solart",
                          info = null,
                      }) => {

    const VARIANTS = {
        solart: {
            icon: 'from-solart-background to-solart-tertiary border border-solart-secondary',
            card: 'bg-solart-background border-solart-border',
            color: '#FB6B00',
        },
        camion: {
            icon: 'from-camion-background to-camion-tertiary border border-camion-secondary',
            card: 'bg-camion-background border-camion-border',
            color: '#F12D2D',
        },
        smpc: {
            icon: 'from-smpc-background to-smpc-tertiary border border-smpc-secondary',
            card: 'bg-smpc-background border-smpc-border',
            color: '#49D69B',
        },
        klaxon: {
            icon: 'from-klaxon-background to-klaxon-tertiary border border-klaxon-secondary',
            card: 'bg-klaxon-background border-klaxon-border',
            color: '#B53EFF',
        },
        crousto: {
            icon: 'from-crousto-background to-crousto-tertiary border border-crousto-secondary',
            card: 'bg-crousto-background border-crousto-border',
            color: '#FAAF18',
        },
    };

    const CURRENT = VARIANTS[color];

    return (
        <ScrollReveal>
            <SpotlightCard className={CURRENT.card} spotlightColor={hexToRgba(CURRENT.color, 0.2)}>
                <div className="grid grid-rows-[auto_auto_1fr_auto] h-full gap-4">
                    {/* Logo */}
                    <div className="flex flex-row justify-between">
                        <img src={logo} alt="Logo" className="w-[40px]"/>
                        {info && <InfoBlock info={info} />}
                    </div>

                    {/* Title */}
                    <h5 className="text-[24px] font-semibold text-white">{title}</h5>

                    {/* Description */}
                    <span className="text-[18px] font-light text-[#BBB9BE] block">
          {description}
        </span>

                    {/* Button */}
                    <div>
                        <StarBorder
                            as="a"
                            className="cursor-pointer"
                            onClick={() => (window.location.href = link)}
                            inClassName={CURRENT.icon}
                            color={CURRENT.color}
                            speed="5s"
                        >
                            Check {title}
                        </StarBorder>
                    </div>
                </div>
            </SpotlightCard>
        </ScrollReveal>
    );

};

export default ProjectBlock;
