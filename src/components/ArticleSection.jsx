import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { blogPosts } from "@/data/blogPosts"
import { useState } from "react";

export function ArticleSection() {
    const categories = ["Highlight", "Cat", "Inspiration", "General"];
    const [selectedCategory,setSelectedCategory] = useState("Highlight")
    const filterArticle = blogPosts.filter(article => article.category === selectedCategory)
    return (
        <>
            {/* Header */}
            <div className="text-center pt-20">
                <h3 className="sub-heading">Blog</h3>
                <hr className="hidden lg:block w-1/2 mx-auto border-white"/>
            </div>
            {/* Article Navbar */}
            <div className='flex flex-row justify-between h-[80px] items-center pt-12 md:px-42'>
                <div className='lg:flex gap-15 hidden'>
                    {categories.map((category) => (
                        <button 
                            key={category} 
                            disabled = {selectedCategory === category }
                            className={
                                `${selectedCategory === category 
                                ? "bg-[#458cfe37] text-[#458cfe] px-5 py-1 underline" 
                                : "text-white underline px-5 py-1"}`
                            }
                            onClick={() => setSelectedCategory(category)}  
                        >{category}</button>
                    ))}
                </div>
                <div className="lg:w-1/4 w-full md:mx-0 mx-20 gap-4 flex flex-col items-center">  
                    <Input type="text" placeholder="Serch" className="h-[40px] text-white"/>
                    <div className="lg:hidden w-full">
                        <p className=" mb-2">Category</p>
                        {/* Dropdown menu */}
                        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                            <SelectTrigger className="w-full text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                {categories.map((category) => (
                                    <SelectItem 
                                        key={category} 
                                        value={category}
                                        disabled = {selectedCategory === category}
                                        className={
                                            `${selectedCategory === category 
                                            ? "text-[#458cfe] border-[#458cfe37] border-2" 
                                            : ""}`
                                        }
                                        
                                    >{category}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {/* BlogCard */}
            <div className="lg:mt-10 md:mt-20 mt-20">
                {filterArticle.map((posts) => (
                    <BlogCard
                        key={posts.id}
                        post = {posts}
                    />
                ))}
            </div>
        </>
    )
}

export function BlogCard(props) {
    return (
        <div className="flex flex-col-reverse justify-between py-6 px-10 my-8 lg:flex-row bg-[#181818] lg:mx-35 mx-15 lg:gap-8 ">
            <div className="mt-5 lg:mt-0">
                <p className="text-primary mb-4 bg-pink-500 w-20 text-center rounded-2xl text-[12px] h-6 content-center">{props.post.category}</p>
                <p className="text-secondary text-sm">-------{props.post.date}</p>
                <a href="#">
                    <h2 className="text-blue-400 mt-1">{props.post.topic}</h2>
                </a>
                <p className="text-primary mt-3 text-sm">{props.post.description}</p>
            </div>
            <div className="lg:w-[300px] lg:h-auto flex-shrink-0">
                <a href="#">
                    <img src={props.post.image} alt="" className="w-full h-auto aspect-[5/3] object-cover rounded-[30px]"/>
                </a>
            </div>
        </div>
    )
}







