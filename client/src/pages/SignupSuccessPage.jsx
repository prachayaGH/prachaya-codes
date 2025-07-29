function SignupSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-white">emoji correct</p>
      <h1 className="text-white">Registration success</h1>
      {/* ถ้ามาจาก article ให้ไปที่ /post/:postId */}
      {/* ถ้ามาจาก landing page ให้ไปที่ "/" */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Continue</button>
    </div>
  );
}

export default SignupSuccessPage;