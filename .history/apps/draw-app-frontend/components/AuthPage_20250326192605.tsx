"use client"
export function AuthPage({isSignin} : {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-lg shadow-lg">

        <div className="p-2">
            <input type="text" placeholder="Email" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
        </div>

        <div className="p-2">
            <input type="password" placeholder="Password" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="pt-2">
            <button onClick={() => {

            }}> {isSignin ? "Signin" : "Signup"}</button>
            </div>
        </div>
    </div>
}