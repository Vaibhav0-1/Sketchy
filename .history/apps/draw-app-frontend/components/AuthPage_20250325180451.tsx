export function AuthPage({isSignin} : {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-lg shadow-lg">
            <input type="text" placeholder="Username" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />

            <input type="password" placeholder="Password" className="w-full p-2 m-2 border border-gray-300 rounded-lg" />
            
            <button
        </div>
    </div>
}