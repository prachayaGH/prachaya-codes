import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ArticleSection() {
    const categories = ["Highlight", "Cat", "Inspiration", "General"];
    const [selectedCategory, setSelectedCategory] = useState("Highlight");
    const [search, setSearch] = useState("");
    // เก็บข้อมูลการกึง API จากการคลิกเลือก category
    const [dataBlogPost, setDataBlogPost] = useState([]);
    // เก็บข้อมูลการกึง API จาก serach
    const [searchResult,setSearchResult] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const limit = 6; // จำนวนบทความต่อหน้า
    
    // ดึงข้อมูลจาก API
    const getData = async (page = 1, append = false) => {
        setIsLoading(true);
        try {
            // กำหนด URL ตาม Category
            const url =
                selectedCategory === "Highlight"
                    ? `http://localhost:4001/posts?page=${page}&limit=${limit}`
                    : `http://localhost:4001/posts?category=${selectedCategory}&page=${page}&limit=${limit}`;

            const response = await axios.get(url);
            const newPosts = response.data.data;

            // รวมบทความใหม่กับบทความเดิม (ถ้า append = true)
            setDataBlogPost((prevPosts) => (append ? [...prevPosts, ...newPosts] : newPosts));

            // ตรวจสอบว่ามีบทความให้โหลดเพิ่มหรือไม่
            setHasMore(response.data.nextPage <= response.data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // โหลดข้อมูลเมื่อ Category เปลี่ยน
    useEffect(() => {
        setCurrentPage(1); // รีเซ็ตหน้า
        setHasMore(true); // รีเซ็ตสถานะการโหลด
        getData(1); // โหลดข้อมูลหน้าแรก
    }, [selectedCategory]);

    // โหลดบทความเพิ่มเติม
    const loadMore = () => {
        if (hasMore && !isLoading) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            getData(nextPage, true); // โหลดข้อมูลหน้าใหม่และเพิ่มต่อท้าย
        }
    };

    const handleSearch = async(text) => {
        setSearch(text)
        if(text.length > 0) {
            try {
                const response = await axios.get(`http://localhost:4001/posts?keyword=${search}`)
                setSearchResult(response.data.data)
            } catch (error) {
                console.error("Search error:", error);
            }
        } else {
            setSearchResult([])
        }
    }

    return (
        <>
            {/* Header */}
            <div className="text-center pt-20">
                <h3 className="sub-heading">Blog</h3>
                <hr className="hidden lg:block w-1/2 mx-auto border-white" />
            </div>

            {/* Article Navbar */}
            <div className="flex flex-row justify-between h-[80px] items-center pt-12 md:px-42">
                {/* Category Buttons */}
                <div className="lg:flex gap-5 hidden">
                    {categories.map((category) => (
                        <button
                            key={category}
                            disabled={selectedCategory === category}
                            className={`cursor-pointer ${
                                selectedCategory === category
                                    ? "primary-button"
                                    : "secondary-button"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="lg:w-1/3 w-full md:mx-0 mx-[15%] gap-4 flex flex-col items-center">
                    <Input
                        type="text"
                        placeholder="Search"
                        className="h-[40px] text-primary"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResult.length > 0 && (
                        <div className="absolute bg-white shadow-lg mt-12 rounded-md mx-[15%] md:mx-0">
                            {searchResult.map((post) => (
                                <div
                                    key={post.id}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    {post.title}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Dropdown  mobile*/}
                    <div className="lg:hidden w-full">
                        <p className="mb-2">Category</p>
                        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                            <SelectTrigger className="w-full text-primary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories.map((category) => (
                                        <SelectItem 
                                            key={category} 
                                            value={category}
                                            disabled = {selectedCategory === category }               
                                            >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Blog Cards */}
            <div className="lg:mt-10 md:mt-20 mt-20">
                {dataBlogPost.map((post) => (
                    <BlogCard key={post.id} post={post} navigate={navigate}/>
                ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-10">
                {isLoading && <p className="text-primary">Loading...</p>}
                {hasMore && !isLoading && (
                    <button
                        onClick={loadMore}
                        className="bg-blue-500 text-primary px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        View More
                    </button>
                )}
                {!hasMore && <p className="text-fourth mt-4">No more articles to load.</p>}
            </div>
        </>
    );
}

export function BlogCard({ post , navigate}) {
    const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div 
        onClick={() => navigate(`/post/${post.id}`)} 
        className="flex flex-col-reverse justify-between py-6 px-10 my-8 lg:flex-row primary-color lg:mx-35 mx-15 lg:gap-8 cursor-pointer">
            <div className="mt-5 lg:mt-0">
                <p className="text-primary category-box mb-4">
                    {post.categories?.name} 
                    {/* เชื่อมไปอีก table */}
                </p>
                <p className="text-fourth text-sm">{formattedDate}</p>
                <div>
                    <h2 className="text-third mt-1 cursor-pointer">{post.title}</h2>
                </div>
                <p className="text-primary mt-3 text-sm">{post.description}</p>
            </div>
            <div className="lg:w-[300px] lg:h-auto flex-shrink-0">
                <a href="#">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto aspect-[5/3] object-cover rounded-[30px]"
                    />
                </a>
            </div>
        </div>
    );
}