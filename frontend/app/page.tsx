"use client"
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/Navbar";
import Image from "next/image";
import MyIcon from '@/public/home.svg'; // Import SVG as a component

export default function Home() {
  const router = useRouter();
  return (
    <div>
        <NavBar special={"Home"}></NavBar>
        <div className="bg-white h-screen flex justify-around">
            <div className="flex flex-col justify-around">
                <div className="rounded-lg text-left pl-5 pb-20 sm:pt-16 sm:pl-32 sm:pr-20 sm:mb-60">
                    <div className="text-gray-400 text-6xl sm:text-8xl font-light">SECURE</div>
                    <div className="text-gray-800 text-7xl sm:text-8xl font-medium mb-8">Messages</div>
                    <div className="text-lg sm:text-xl pl-2 pr-24 pb-8 font-light">Stay connected effortlessly with our messaging app. Enjoy instant, secure chats and real-time updates for seamless communication.</div>
                    <button onClick={function(){
                      router.push("/signup")
                      }} className="text-2xl text-white px-8 ml-2 py-3 font-medium rounded-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300">
                        Get Started
                    </button>
                </div>
            </div>
            <Image
              priority
              height={3200}
              src={MyIcon}
              alt="Follow us on Twitter"
              className="hidden sm:block"
            />
        </div>
    {/* </div> */}
    </div>
  );
}