import { useNavigate } from "react-router-dom"

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen gap-10">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16"
                className="text-primary"
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>
            </div>
            <h1 className="text-primary text-3xl">Page Not Found</h1>
            <button 
                onClick={() => navigate("/")}
                className="bg-blue-500 text-primary px-6 py-2 hover:bg-blue-600"
                >Go To Homepage</button>
        </div>
    )
}

export default NotFoundPage