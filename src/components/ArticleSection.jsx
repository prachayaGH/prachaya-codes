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

export function ArticleSection() {
    return (
        <>
            {/* Header */}
            <div className="text-center pt-20">
                <h3 className="text-white text-4xl lg:mb-5 md:mb-18 mb-12">Blog</h3>
                <hr className="hidden lg:block w-1/2 mx-auto border-white"/>
            </div>
            {/* Article Navbar */}
            <div className='flex flex-row justify-between h-[80px] items-center pt-12 md:px-42'>
                <div className='lg:flex gap-15 hidden '>
                    <a href="#" id="article-menu">Tech Stacks</a>
                    <a href="#" id="article-menu">Tool</a>
                    <a href="#" id="article-menu">Inspiration</a>
                    <a href="#" id="article-menu">Ganeral</a>
                </div>
                <div className="lg:w-1/4 w-full md:mx-0 mx-20 gap-4 flex flex-col items-center">  
                    <Input type="text" placeholder="Serch" className="h-[40px]"/>
                    <div className="lg:hidden w-full">
                        <p className="text-white mb-2">Category</p>
                        {/* Dropdown menu */}
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {/* Article */}
            <div className="lg:mt-10 md:mt-20 mt-20">
            <Article date="----March 14,2025" topic="หัวข้อเกี่ยวกับการเขียนโค้ด" description="// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum assumenda asperiores molestias mollitia, enim id eveniet laboriosam ipsam laborum exercitationem fugit temporibus, consequuntur consequatur maiores veniam numquam eligendi fuga porro!"/>
            <Article date="----March 14,2025" topic="หัวข้อเกี่ยวกับการเขียนโค้ด" description="// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum assumenda asperiores molestias mollitia, enim id eveniet laboriosam ipsam laborum exercitationem fugit temporibus, consequuntur consequatur maiores veniam numquam eligendi fuga porro!"/>
            <Article date="----March 14,2025" topic="หัวข้อเกี่ยวกับการเขียนโค้ด" description="// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum assumenda asperiores molestias mollitia, enim id eveniet laboriosam ipsam laborum exercitationem fugit temporibus, consequuntur consequatur maiores veniam numquam eligendi fuga porro!"/>
            </div>
        </>
    )
}

export function Article({date,topic,description}) {
    return (
        <div className="flex flex-col-reverse py-6 px-10 my-8 lg:flex-row bg-[#181818] lg:mx-35 mx-15 lg:gap-8 ">
            <div className="mt-5">
                <p className="text-gray-400">{date}</p>
                <p className="text-blue-400 ">{topic}</p>
                <p className="text-white mt-3">{description}</p>
            </div>
            <div>
                <img src="\public\IMG\blog-code.jpg" alt="" className="lg:w-[700px] rounded-[30px]"/>
            </div>
        </div>
    )
}




