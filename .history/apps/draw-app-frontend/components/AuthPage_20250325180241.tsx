export function AuthPage({isSignin} : {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-lg shadow-lg">
            <input type="text" placeholder="Username" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Password" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
            <button className="w-full p-2 m-2 bg-blue-500 text-white rounded-lg">Sign in</button>
            <div className="flex justify-center items-center">
                <span>{isSignin ? "Don't have an account?" : "Already have an account?"}</span>
                <a href="#" className="text-blue-500 underline">{isSignin ? "Sign up" : "Sign in"}</a>
                
            </div>
        </div>

    </div>
}