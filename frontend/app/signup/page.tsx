"use client"

import { Heading } from "@/components/Heading";
import { SubHeading } from "@/components/SubHeading";
import { InputComponentLikeFirstName} from "@/components/InputComponentLikeFirstName"
import { BottomWarning } from "@/components/BottomWarning";
import {SignButton} from "@/components/SignButton"
import axios from 'axios'
import { useState } from "react";
import { signup } from "@/app/actions/user"
import { useRouter } from 'next/navigation';
import { NavBar } from "@/components/Navbar";

export default function Signup(){
 const [ username, setUserName ] = useState("");
 const [ email, setemail ] = useState("");
 const [ password,setPassword ] = useState("");
 const router = useRouter();

    return (
        <div>
                    <NavBar special={"signup"}></NavBar>

            <div className="bg-white h-screen flex justify-around">
            <div className="flex flex-col justify-around">
                <div className="bg-gray-100 rounded-lg text-center mx-4 mb-16">
                    <Heading>Sign up</Heading>
                    <SubHeading>Enter your Credentials to access your account</SubHeading>
                    <InputComponentLikeFirstName onChange={function(e){setUserName(e.target.value)}} name={"Username"} placeholder={"Riktesh"}></InputComponentLikeFirstName>
                    <InputComponentLikeFirstName onChange={function(e){setemail(e.target.value)}} name={"Email"} placeholder={"random@gmail.com"}></InputComponentLikeFirstName>
                    <InputComponentLikeFirstName onChange={function(e){setPassword(e.target.value)}} name={"Password"} placeholder={"123456789"}></InputComponentLikeFirstName>
                    <SignButton onClick={async function(){
                        const response = await signup(username, password,email);
                        // alert("Signup Succesful")
                        router.push("/signin")
                    }}>Sign up</SignButton>
                    <BottomWarning Warning={"Already have an account?"} page={"signin"}></BottomWarning>
                </div>
            </div>
        </div>
        </div>
    )
}