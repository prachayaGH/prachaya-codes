import {techStacks, tools} from "../data/techSkills"
import { useState } from "react";
import profileAboutMe from '@/assets/IMG/profileAboutMe.png'

export function AboutMeSection() {
    return (
        <>
            <div className="bg-[#181818] text-center lg:mx-35 mt-30 mx-15 ">
                <h3 className="sub-heading text-start px-6 py-2">About Me -----------------------------</h3>

                <div className="lg:flex lg:flex-row flex flex-col items-center justify-center px-20 pb-10 gap-10">
                    <img src={profileAboutMe} alt={profileAboutMe}
                    className="w-xs"/>
                    <p className="w-full text-start text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, ipsam? Dolor tempore officiis totam, quas esse eligendi odio sunt. Explicabo officia non laborum alias? Possimus commodi exercitationem veniam quibusdam in.</p>
                </div>
            </div>
            <div className="my-10">
                <h3 className="sub-heading lg:mx-40 mx-15">---------- Skills</h3>
                <TechSkills />
            </div>
        </>
    )
}


export function TechSkills() {
    const [selectedSkill, setSelectedSkill] = useState("Tech Stacks");
    const skills = selectedSkill === "Tech Stacks" ? techStacks : tools;

    return (
        <div className="">
            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6 lg:mx-40 mt-4 mx-15">
                <button 
                    className={`${selectedSkill === "Tech Stacks" ? "bg-[#458cfe37] text-[#458cfe] px-5 py-1 underline" : "text-white underline px-5 py-1"}`}
                    onClick={() => setSelectedSkill("Tech Stacks")}
                >
                    Tech Stacks
                </button>
                <button 
                    className={`${selectedSkill === "Tools" ? "bg-[#458cfe37] text-[#458cfe] px-5 py-1 underline" : "text-white underline px-5 py-1"}`}
                    onClick={() => setSelectedSkill("Tools")}
                >
                    Tools
                </button>
            </div>
            
            {/* Display items */}
            <div className="lg:grid lg:grid-cols-4 grid grid-cols-2 gap-8 lg:mx-40 mx-15">
                {skills.map((skill) => (
                    <SkillCard 
                        key={skill.id}
                        post={skill}
                    />
                ))}
            </div>
        </div>
    )
}

function SkillCard(props) {
    return (
        <div className="border-blue-600 border-2 p-5 w-full flex gap-6 items-center">
            <img src={props.post.image} alt="" className="w-[40px]"/>
            <p className="text-primary">{props.post.name}</p>
        </div>
    )
}
