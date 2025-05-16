'use client';


import { motion } from 'framer-motion';
import Image from 'next/image';
import projects from '../data/projectData.json';



export default function FeaturedProjects() {
    return (
        <section
            id="featured-projects-section"
            className="relative w-full h-full flex flex-col box-border px-4 md:px-10"
        >
            {projects.map((project, i) => (
                <div
                    key={i}
                    className="relative h-auto md:p-20 w-full flex mb-10 md:mb-0 justify-center items-center"
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="group w-full h-full md:rounded-4xl flex justify-center items-center ">
                            <ProjectImage index={i} image={project.image} title={project.title} description={project.description} tools={project.tools} />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}


type ProjectProps = {
    index: number;
    image: string;
    title: string;
    description: string;
    tools: string[];
};

const ProjectImage = ({
    index,
    image,
    title,
    description,
    tools,
}: ProjectProps) => {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:w-2/3 w-full locked-screen-60 md:h-auto md:border-2 md:border-black backdrop-blur-xs bg-transparent md:p-20 flex justify-center rounded-4xl items-center relative"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 1 },
            }}
        >
            <div className="w-full h-full flex flex-col md:flex-row justify-between relative">

                {/* Project Number */}
                <div className='w-full hidden md:flex flex-row justify-between'>
                    <motion.div
                        initial={{ opacity: 1, x: 0, rotateZ: 0 }}
                        variants={{
                            rest: { opacity: 1, x: 0, rotateZ: 0 },
                            hover: { opacity: 1, x: -100, rotateZ: -15 },
                        }}
                        className="flex-1 relative text-[200px] flex justify-start items-center font-bold"
                    >
                        <h1 className="text-black absolute text-xl md:text-[400px] font-bold">
                            {index + 1}
                        </h1>
                    </motion.div>

                    {/* Project Title */}
                    <motion.h1
                        initial={{ opacity: 1, x: 0, rotateZ: 0 }}
                        variants={{
                            rest: { opacity: 1, x: 0, rotateZ: 0 },
                            hover: { opacity: 1, x: 100, rotateZ: 15 },
                        }}
                        className="text-black flex-1 flex-wrap text-lg text-right md:text-5xl font-bold"
                    >
                        {title}
                    </motion.h1>
                </div>


                {/* Floating Card for Desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 0, rotateZ: 0 }}
                    variants={{
                        rest: { opacity: 0, y: 0, rotateZ: 0, pointerEvents: 'none' },
                        hover: { opacity: 1, y: -80, rotateZ: 5, pointerEvents: 'auto' },
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black bg-white bg-opacity-90 p-4 md:p-6 rounded-xl shadow-xl w-[350px] flex-col gap-y-3 z-10"
                >
                    <img src={image} alt={`${title} preview`} className="w-full h-[200px] object-cover rounded-md" />

                    <div className="flex flex-wrap gap-2 text-xs">
                        {tools.map((tool, i) => (
                            <span key={i} className="bg-black text-white px-2 py-1 rounded-full">
                                {tool}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm text-black leading-snug">{description}</p>
                </motion.div>

                {/* Inline Card for Mobile */}
                <div className="flex md:hidden relative flex-col h-full gap-y-3 bg-white bg-opacity-90 p-4 rounded-xl shadow-xl w-full">
                    <img src={image} alt={`${title} preview`} className="w-full h-[200px] object-cover rounded-md" />
                    <h1 className='text-black text-xl font-bold'>{title}</h1>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {tools.map((tool, i) => (
                            <span key={i} className="bg-black text-white px-2 py-1 rounded-full">
                                {tool}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm text-black leading-snug">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};
