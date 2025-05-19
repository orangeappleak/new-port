import abilities from '../data/abilityData.json';
import PinSection from './PinSection';
import AnimatedContainer from './AnimatedComponent';
import OrbitText from './OrbitText';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Abilities = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = containerRef.current;

        if (!obs) return;

        gsap.registerPlugin(ScrollTrigger);

        // Ensure element has an initial background
        gsap.set(obs, { backgroundColor: "#ffffff" });

        gsap.to(obs, {
            backgroundColor: "#000000",
            ease: "none",
            scrollTrigger: {
                trigger: obs,
                start: "top center",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        // Clean up
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section ref={containerRef} id="abilities-section" className="relativew-full bg-white h-auto">
            <div id="abilities-section-wrapper">
                <div id="abilities-section-text" className="px-5 md:px-10">
                    <h1 className="text-black text-[clamp(48px,15vw,200px)] jersey">Abilities</h1>
                </div>

                <div id="abilities-section-content" className="flex flex-col">
                    {abilities.map((ability, index) => (
                        <div key={index}>
                            <PinSection
                                key={index}
                                triggerId={`#ability-${index}`}
                                start="top top"
                                endTrigger="#abilities-section"
                                end="bottom bottom"
                                pinSpacing={false}
                                markers={false}
                                className="relative flex"
                                style={{ height: 'calc(var(--vh-locked, 1vh) * 150)' }}
                            >
                                <div id={`ability-${index}`} className="flex justify-center items-center w-screen" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>

                                    {/* AnimatedContainer */}
                                    <AnimatedContainer
                                        tag="div"
                                        triggerId={`#ability-${index}`}
                                        start="top bottom"
                                        end="center center"
                                        fromVars={{ opacity: 1, width: '50%', height: '50%' }}
                                        toVars={{ opacity: 1, width: '100%', height: '100%', ease: 'sine.inOut(2)', scrollTrigger: { scrub: 1 } }}
                                        scrub={1}
                                        className={`relative flex justify-center items-center will-change-transform bg-black overflow-hidden`}
                                    >
                                        {/* Center Title */}
                                        <h1 className="text-white text-[clamp(48px,20vw,300px)] jersey z-10 absolute">
                                            {ability.title}
                                        </h1>
                                        {/* Orbit Text Container */}

                                        <OrbitText
                                            text={ability.frontendSkills ? ability.frontendSkills.join('✦') : ability.skills.join('✦')}
                                            orbitId={`orbit-text-${index}`}
                                            speed={20}
                                            direction="counterclockwise"
                                            textStyle={`text-xl md:text-4xl ${ability.frontendSkills ? 'text-orange-400/20' : 'text-white/20'
                                                }`}
                                        />

                                        <OrbitText
                                            text={ability.backendSkills ? ability.backendSkills.join('✦') : ability.skills.join('✦')}
                                            orbitId={`orbiting-text-${index + 1}`}
                                            speed={15}
                                            direction="clockwise"
                                            textStyle={`text-3xl md:text-5xl ${ability.backendSkills ? 'text-red-400/40' : 'text-white/40'
                                                }`}
                                        />s
                                    </AnimatedContainer>
                                </div>
                            </PinSection>
                            <div id={`skills-content-wrapper-${index}`} className='relative flex-row justify-center items-center top-0 left-0 w-full h-screen flex md:py-18 md:px-10'>
                                <div id="skills-content-item-left-wrapper" className='flex-1 h-full w-full overflow-hidden flex items-center justify-center'>


                                    <div id="skill-content-wrapper" className='flex-1 flex items-start justify-center w-full h-full'>
                                        <div id="skill-content" className='w-1/2 p-20 rounded-2xl flex flex-col items-center bg-black/50 justify-center backdrop-invert'>
                                            <h1 className='text-white font-bold text-center text-6xl'>{ability.leftSectionHeading}</h1>
                                        </div>
                                    </div>
                                    <div id="skill-content-wrapper" className='flex-1 flex items-end justify-center w-full h-full'>
                                        <div id="skill-content" className='w-1/2 p-20 rounded-2xl  flex flex-col items-center justify-center bg-black/50 backdrop-invert'>
                                            <h1 className='text-white text-center font-bold text-6xl'>{ability.rightSectionHeading}</h1>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                    ))}
                </div >
            </div>
        </section>
    );
};

export default Abilities;
