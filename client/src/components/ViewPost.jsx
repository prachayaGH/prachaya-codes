import axios from "axios";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import profileAboutme from "@/assets/IMG/profileAboutme.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Linkedin } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X, Loader2, SmilePlus, Copy, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { use } from "react";

export default function ViewPost() {
  const param = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/posts/${param.postId}`
      );
      console.log(response.data.data.categories.name
);
      setPost(response.data.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      navigate("*");
    }
  };

  useEffect(() => {
    getPosts();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedContent = post?.content?.replace(/\\n/g, '\n') || '';

  return (
    <div className="max-w-7xl mx-auto space-y-8 container text-primary md:px-8 pb-20 md:pb-28 md:pt-12 lg:pt-25">
      <div className="space-y-4 md:px-4">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-[550px]"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8">
          <article className="px-4">
            <div className="flex">
              <span className="text-primary category-box mb-4 ">
                {post.categories?.name || null}
              </span>
              <span className="px-3 py-1 text-fourth text-sm">
                {formattedDate}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-4 mb-10">{post.description}</p>
            <div className="markdown">
                <ReactMarkdown>{formattedContent}</ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden px-4">
            <AuthorBio />
          </div>

          <Share
            likesAmount={post.likes_count}
            setDialogState={setIsAlertOpen}
          />
          <Comment setDialogState={setIsAlertOpen} />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio />
          </div>
        </div>
      </div>
      <CreateAccountModal
        dialogState={isAlertOpen}
        setDialogState={setIsAlertOpen}
      />
    </div>
  );
}

function Share({ likesAmount, setDialogState }) {
  const shareLink = encodeURI(window.location.href);
  return (
    <div className="md:px-4 text-primary">
      <div className="primary-color py-4 px-8 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        <button
          onClick={() => setDialogState(true)}
          className="bi bi-heart flex items-center justify-center space-x-2 py-3 gap-1"
        >
          <span className="flex items-center">{likesAmount}</span>
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast.custom((t) => (
                <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="flex flex-1 items-center justify-center space-x-2 px-8 py-3"
          >
            <Copy className="w-5 h-5 text-primary" />
            <span className="text-primary">Copy</span>
          </button>
          <div className="flex flex-row gap-5 px-">
            <a
              href={`https://www.facebook.com/share.php?u=${shareLink}`}
              target="_blank"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
              target="_blank"
              className=""
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`https://www.twitter.com/share?&url=${shareLink}`}
              target="_blank"
              className="bi bi-twitter-x h-6 w-6"
            >
                
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({ setDialogState }) {
const param = useParams();
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [commentFromData, setCommentFromData] = useState([])
  const handleSendComment = (e) => {
    e.preventDefault();
    if (!comment.trim) {
      setIsError(true);
    } else {
      setIsError(false);
      console.log("Comment submitted:", comment);
    }
  };

  // สร้าง API post comment ส่งไปที่ backend

  // API get comment ทั้งหมด
  // const getComment = async () => {
  //   try {
  //       const response = await axios.get(`http://localhost:4001/posts/${param.postId}/comments`)
  //       setCommentFromData(response.data.data)
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getComment();
  // }, []);
  return (
    <div>
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-xl">Comment</h3>
        <form className="space-y-2 relative" onSubmit={handleSendComment}>
          <textarea
            value={comment}
            onFocus={() => {
              setIsError(false);
              setDialogState(true);
            }}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What are your thoughts?"
            className={`w-full p-4 h-24 border-1 border-gray-500 ${
              isError ? "border-red-500" : ""
            }`}
          />
          {isError && (
            <p className="text-red-500 text-sm absolute">
              Please type something before sending.
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 text-primary secondary-color rounded-full hover:bg-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6 px-4">
        {/* เปลี่ยนไปดึงจาก table comment */}
        {commentFromData.map((comment, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={comment.image}
                    alt={comment.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col items-start justify-between">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                </div>
              </div>
              <p className=" text-gray-600">{comment.comment}</p>
              {index < commentFromData.length - 1 && (
                <hr className="border-gray-300 my-4" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function AuthorBio() {
  return (
    <div className="primary-color rounded-3xl p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            src={profileAboutme}
            alt="Thompson P."
            className="object-cover w-16 h-16"
          />
        </div>
        <div>
          <p className="text-sm">Author</p>
          <h3 className="text-2xl font-bold">Thompson P.</h3>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="text-primary space-y-4">
        <p>
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p>
          When I&apos;m not writing, I spend time volunteering at my local
          animal shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

function CreateAccountModal({ dialogState, setDialogState }) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg w-52"
        >
          Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-muted-foreground">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
          >
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
