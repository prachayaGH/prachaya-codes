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
        <div className="primary-color p-3  flex flex-col gap-1">
            <img src={props.post.image} alt="" />
            <p className="text-primary text-center">{props.post.topic}</p>
            <p className="text-primary text-center text-sm">{props.post.description}</p>
            <p className="text-third text-[12px]">{props.post.techStack}</p>
            <div className="text-end">
                <a href={props.post.github} className="text-primary">#</a>
                <a href={props.post.link} className="text-primary">#</a>
            </div>
        </div>
    )
}