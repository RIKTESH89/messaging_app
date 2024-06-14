import {useRouter} from "next/navigation"
export function NavBar({special}){

const router = useRouter();

const fill="bg-gray-700 hover:bg-gray-900 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
let classh="",classin="",classup=""
if(special=="Home"){
    classh="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"+"border rounded-full flex flex-row justify-center items-center text-white text-xs sm:text-xl"
    classin=" rounded-full flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
    classup=" rounded-full flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
}else if(special=="signin"){
    classin=fill+"border rounded-full flex flex-row justify-center items-center text-white text-xs sm:text-xl"
    classup=" rounded-full  flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
    classh=" rounded-full flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
}else if(special=="signup"){
    classup=fill+"border rounded-full flex flex-row justify-center items-center text-white text-xs sm:text-xl"
    classin=" rounded-full  flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
    classh=" rounded-full flex flex-row justify-center items-center text-gray-500 text-xs sm:text-xl"
}   

    return (
        <div>
            <div className="grid grid-cols-6 pt-5 m-0 px-0 pb-4 border">
                <div className="col-span-3 text-xl md:text-3xl font-bold pl-4">Chatting App</div>
                <div className="col-end-7 col-span-3 md:col-end-7 md:col-span-2 lg:col-end-7 lg:col-span-1 grid grid-cols-3 gap-4 font-medium md:text-lg mx-0 sm:px-1">
                <button onClick={function(){router.push("/signin")}} className={classin}>Signin</button>
                <button onClick={function(){router.push("/signup")}} className={classup}>Signup</button>
                <button onClick={function(){router.push("/")}} className={classh}>Home</button>
                </div>
            </div>
        </div>
    )
}