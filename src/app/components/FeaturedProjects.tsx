// components/FeaturedProjects.tsx
'use client';

import Image from 'next/image'; // or plain <img> if you're not in Next.js
import Link from 'next/link';

const projects = [
    {
        title: 'GrindMate.AI',
        description: 'LeetCode tracker meets AI mentor — built with React + Rails.',
        image: '/images/grindmate.png',
        link: '/projects/grindmate',
    },
    {
        title: 'GitStory',
        description: 'A visual GitHub repo explorer with DAG-based commit graphs.',
        image: '/images/gitstory.png',
        link: '/projects/gitstory',
    },
    {
        title: 'Notion Clone',
        description: 'A markdown-rich, draggable block editor with AI integration.',
        image: '/images/notion-clone.png',
        link: '/projects/notion-clone',
    },
];

export default function FeaturedProjects() {
    return (
        <section id="featured-projects-section" className="min-h-screen relative top-0 left-0 w-full py-20 bg-gray-900 text-white">
            <div className="text-center mb-16">
                <h2 className="text-6xl font-bold mb-4">Featured Projects</h2>
                <p className="text-xl text-gray-300">Built with code, creativity, and a lot of caffeine ☕</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
                {projects.map((project, i) => (
                    <Link key={i} href={project.link} className="group relative overflow-hidden rounded-2xl shadow-lg">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-72 object-cover transform group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                            <p className="text-gray-300 mt-2">{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
