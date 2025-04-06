import axios from "axios"
import { useState , useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import profileAboutme from '@/assets/IMG/profileAboutme.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Linkedin, Instagram} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"

function ViewPostPage () {
    const param = useParams()
    const [post,setPost] = useState({})
    const [isLogin,setIsLogin] = useState(false)
    const [isAlertOpen,setIsAlertOpen] = useState(false)
    const [commentText,setCommentText] = useState("")
    const getPosts = async () => {
        try {
            const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${param.postId}`)
            setPost(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPosts()
        window.scrollTo(0, 0);
    },[])

    const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleLike = () => {
        if(!isLogin) {
            setIsAlertOpen(true)
        } else {
            console.log("like")
        }
    }

    const handleCopy = () => {
        const link = `${window.location.origin}/post/${param.postId}`; // สร้างลิงก์บทความ
        navigator.clipboard.writeText(link) // คัดลอกลิงก์ไปยัง Clipboard
            .then(() => {
                toast.success("Link copied to clipboard!"); // แสดงข้อความแจ้งเตือน
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
                toast.error("Failed to copy link.");
            });
    };

    const handleShare = (platform) => {
        const link = `${window.location.origin}/post/${param.postId}`;
        let shareUrl = "";
        switch (platform) {
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/share.php?u=${encodeURIComponent(link)}`; // Instagram ไม่มี API สำหรับแชร์โดยตรง
                break;
            default:
                return;
        }

        window.open(shareUrl, "_blank");
    }

    return (
        // content section
        <div className="flex flex-col justify-center text-primary pt-25 mx-[12%]">
            <img src={post.image} alt={post.image} className="h-[550px] object-cover"/>
            <div className="flex flex-row gap-10">
                <div className="w-2/3">
                    <div className="flex flex-row gap-5 pt-8">
                        <p className="text-primary category-box mb-4 ">{post.category}</p>
                        <p className="text-fourth text-sm">{formattedDate}</p>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <p className="my-5">{post.description}</p>
                        <div className="markdown">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                        
                    </div>

                    {/* like and share section*/}
                    <div className="primary-color rounded-2xl flex flex-row justify-between p-5 my-10">
                        <button onClick={handleLike}><i className="bi bi-heart"></i> 123</button>
                        <div className="flex flex-row gap-5">
                            <button onClick={handleCopy}><i className="bi bi-copy"></i> Copy</button>
                            <button onClick={() => handleShare("facebook")}><i className="bi bi-facebook"></i></button>
                            <button onClick={() => handleShare("linkedin")}><Linkedin /></button>
                            <button onClick={() => handleShare("twitter")}><i className="bi bi-twitter-x"></i></button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl">Comment</h2>
                        <textarea 
                            name="text" id="" 
                            placeholder="What are your thoughts?"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full mt-5 h-[100px] border-1 border-gray-500"
                            ></textarea>
                        <div className="flex justify-end">
                            <button 
                                className=""
                                onClick={handleLike}
                                >Send</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mt-10">
                        <div className="flex gap-3">
                            <img src={profileAboutme} alt="" className="w-[50px]"/>
                            <div>
                                <h2 className="text-[18px]">Author</h2>
                                <p className="text-[12px]">16 September 2024 at 18.30</p>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias saepe nemo voluptatem debitis autem aspernatur blanditiis optio ducimus laboriosam esse perspiciatis minima unde, adipisci est, tempora fuga! Commodi, atque et.</p>
                        <hr />
                    </div>
                </div>
                <div className="w-1/3 p-6 mt-10 h-1/3 rounded-2xl primary-color">
                    <div className="flex flex-row items-center gap-4 mb-5">
                        <img src={profileAboutme} alt={profileAboutme} className="w-1/3"/>
                        <div>
                            <p>Author</p>
                            <h2 className="text-2xl font-bold">{post.author}</h2>
                        </div>
                    </div>
                    <hr />
                    <p className="mt-5">
                        I am a pet enthusiast and freelance writer who specializes 
                        in animal behavior and care. With a deep love for cats, 
                        I enjoy sharing insights on feline companionship and wellness.
                    </p>
                    <p className="mt-5">
                        When I'm not writing, I spend time volunteering at my local animal shelter, 
                        helping cats find loving homes.</p>
                </div>  

                {/* Alert  */}
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <div className="flex">
                        <AlertDialogContent>
                            <button
                                onClick={() => setIsAlertOpen(false)}
                                className="absolute right-4 top-4 text-fourth hover:text-gray-700"
                            >
                                X
                            </button>
                            <AlertDialogHeader className="flex flex-col items-center text-center">
                                <AlertDialogTitle className="text-center">
                                    Create an account to continue
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col items-center">
                                <div className="flex flex-col items-center w-full">
                                <div className="mt-6 mb-4">
                                    <Button
                                        onClick=""
                                        className="bg-black text-primary rounded-full py-2 px-8 w-48 font-medium"
                                    >
                                        Create account
                                    </Button>
                                </div>
                                <div className="text-sm mt-4">
                                    Already have an account?{" "}
                                    <button
                                        onClick=""
                                        className="text-secondary font-bold underline hover:no-underline"
                                    >
                                        Log in
                                    </button>
                                </div>

                                </div>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </div>
                </AlertDialog>
            </div>
        </div>
    )
}

export default ViewPostPage