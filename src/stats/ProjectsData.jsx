import CountUp from "../blocks/TextAnimations/CountUp/CountUp.jsx";

const ProjectsData = () => {
    const total = Number(import.meta.env.VITE_NB_PROJ) || 0;

    return (
        <CountUp
            from={0}
            to={total}
            separator=","
            duration={1}
            className="text-[48px] font-semibold"
        />
    )
};

export default ProjectsData;
