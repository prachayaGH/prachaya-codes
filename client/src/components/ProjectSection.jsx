import { ProjectData } from "@/data/projectData";

export function ProjectSection() {
    return (
        <div className="pt-20">
            <h1 className="sub-heading text-center">Project</h1>
            <h2 className="text-primary text-center">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h2>
            <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 grid grid-cols-1 gap-3 lg:mx-35 mx-15 my-10">
                {ProjectData.map((project) => (
                    <ProjectCard 
                    key={project.id}
                    post = {project}
                    />
                ))}
            </div>
            
        </div>
    )
}

export function ProjectCard (props) {
    return (
        <div className="primary-color p-3 flex flex-col gap-1 hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col justify-between h-full">
            <a href={props.post.link} className="cursor-pointer"> 
                <img src={props.post.image} alt="project" className="lg:h-46 lg:mx-auto"/>
                <p className="text-primary text-center mt-2">{props.post.topic}</p>
                <p className="text-primary text-center text-sm mt-2">{props.post.description}</p>
                <p className="text-third text-[12px] mt-3">{props.post.techStack}</p>
            </a>
            <div className="text-end flex justify-end gap-3 mt-2">
                <a href={props.post.github} className="text-[12px] text-gray-300 underline">Github</a>
                <a href={props.post.link} className="text-[12px] text-gray-300 underline">Website</a>
            </div>
            </div>
        </div>
    )
}