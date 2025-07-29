function SignupSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="white" width={400} height={400}>
        <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7C411.4 265.5 408 250.7 396.8 243.6C385.6 236.5 370.8 240 363.7 251.2L302.3 349.5L275.3 313.5C267.3 302.9 252.3 300.7 241.7 308.7C231.1 316.7 228.9 331.7 236.9 342.3L284.9 406.3C289.6 412.6 297.2 416.2 305.1 415.9C313 415.6 320.2 411.4 324.4 404.6L404.4 276.6z"/>
        </svg>
      <h1 className="text-green-400 text-2xl">Registration success!</h1>
      {/* ถ้ามาจาก article ให้ไปที่ /post/:postId */}
      {/* ถ้ามาจาก landing page ให้ไปที่ "/" */}
      <button 
        onClick={() => window.location.href = "/login"}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer">
        Continue
      </button>
    </div>
  );
}

export default SignupSuccessPage;