import {useState} from 'react'
import SolareLogo from './assets/solare.svg'
import './App.css'
import {VscHome, VscArchive, VscAccount, VscSettingsGear} from 'react-icons/vsc';

import Dock from './blocks/Components/Dock/Dock.jsx';
import RotatingText from './blocks/TextAnimations/RotatingText/RotatingText.jsx';
import DecryptedText from "./blocks/TextAnimations/DecryptedText/DecryptedText.jsx";
import PixelCard from "./blocks/Components/PixelCard/PixelCard.jsx";
import LetterGlitch from "./blocks/Backgrounds/LetterGlitch/LetterGlitch.jsx";
import Carousel from "./blocks/Components/Carousel/Carousel.jsx";


const items = [
    {icon: <VscHome size={18}/>, label: 'Home', onClick: () => alert('Home!')},
    {icon: <VscArchive size={18}/>, label: 'Archive', onClick: () => alert('Archive!')},
    {icon: <VscAccount size={18}/>, label: 'Profile', onClick: () => alert('Profile!')},
    {icon: <VscSettingsGear size={18}/>, label: 'Settings', onClick: () => alert('Settings!')},
];


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a>
                    <img src={SolareLogo} className="logo" alt="Solare logo"/>
                </a>
            </div>
            <h5>Hi, I'm Solare</h5>

            <RotatingText
                texts={['Developer', 'Pixel Artist', 'Game Designer']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />

            <div style={{ marginTop: '4rem' }}>
                <DecryptedText
                    text="I build engaging digital experiences through fullstack development, blending code, creativity, and structured thinking."
                    animateOn="view"
                    revealDirection="center"
                />
            </div>


            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />

            <PixelCard variant="orange">
                <h5>Solart Studio</h5>
            </PixelCard>

            <LetterGlitch
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
            />

            <div style={{ height: '600px', position: 'relative' }}>
                <Carousel
                    baseWidth={300}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                />
            </div>

        </>
    )
}

export default App
