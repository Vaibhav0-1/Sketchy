"use client"
export function AuthPage({isSignin} : {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-lg shadow-lg">
            
            <div>
            <input type="text" placeholder="Username" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
            </div>

            <div>
            <input type="password" placeholder="Password" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
            </div>
            
            <button onClick={() => {

            }}> {isSignin ? "Signin" : "Signup"}</button>
        </div>
    </div>
}