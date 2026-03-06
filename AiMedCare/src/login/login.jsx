import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-180 px-4">
      {/* LOGIN */}
      {isLogin && (
        <div
          className="w-400 max-w-4xl h-130 rounded-3xl shadow-xl overflow-hidden
                        flex flex-col md:flex-row
                        bg-gradient-to-r from-blue-500 to-blue-500 md:via-white md:via-50% md:to-white "
        >
          {/* INFO */}
          <div
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                          text-center p-8 md:p-12"
          >
            <h1 className="text-3xl font-extrabold font-serif mb-2">
              AI MEDCARE CHATBOT
            </h1>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Our Application
            </h2>
            <p className="text-lg">Please Sign In to continue</p>
          </div>

          {/* LOGIN FORM */}
          <form
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                           p-8 md:p-12 bg-white md:bg-transparent"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">SIGN IN</h1>

            <input
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
            />

            <input
              type="password"
              className="w-full mb-2 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />

            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                Sign In
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}

      {/* REGISTER */}
      {!isLogin && (
        <div
          className="w-400 max-w-4xl h-130 rounded-3xl shadow-xl overflow-hidden
           flex flex-col md:flex-row
           bg-blue-500
           md:bg-gradient-to-r md:from-white md:via-white md:via-50% md:to-blue-550"


        >
          {/* REGISTER FORM */}
          <form
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                           p-8 md:p-12 bg-white md:bg-transparent"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">SIGN UP</h1>

            <input
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
            />

            <input
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-bluen-500"
              placeholder="Enter Email"
            />

            <input
              type="password"
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign In
              </button>

              <button className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                
                Sign Up
              </button>
            </div>
          </form>

          {/* INFO */}
          <div
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                          text-center p-8 md:p-12"
          >
            <h1 className="text-3xl font-extrabold font-serif mb-2">
              AI MEDCARE CHATBOT
            </h1>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Our Application
            </h2>
            <p className="text-lg">Please Sign up to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}
