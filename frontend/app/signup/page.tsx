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
 const [ errorWarning ,seterrorWarning ] = useState(false);
 const router = useRouter();

    return (
        <div>
                    <NavBar special={"signup"}></NavBar>

            <div className="bg-white sm:h-screen flex justify-around">
            <div className="flex flex-col justify-around">
            {errorWarning ? <div className="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Wrong Inputs!</span> Fill in correct details to sign up.
            </div>: null}
                <div className="bg-gray-100 rounded-lg text-center mx-4 sm:mb-16">
                    <Heading>Sign up</Heading>
                    <SubHeading>Enter your Credentials to access your account</SubHeading>
                    <InputComponentLikeFirstName onChange={function(e){setUserName(e.target.value)}} name={"Username"} placeholder={"Riktesh"} value={username}></InputComponentLikeFirstName>
                    <InputComponentLikeFirstName onChange={function(e){setemail(e.target.value)}} name={"Email"} placeholder={"random@gmail.com"} value={email}></InputComponentLikeFirstName>
                    <InputComponentLikeFirstName onChange={function(e){setPassword(e.target.value)}} name={"Password"} placeholder={"123456789"} value={password}></InputComponentLikeFirstName>
                    <SignButton onClick={async function(){
                        try{
                            const response = await signup(username, password,email);
                        router.push("/signin")
                        }catch(err){
                            seterrorWarning(true);
                            setPassword("");
                            setUserName("");
                            setemail("");
                        }
                        // alert("Signup Succesful")
                    }}>Sign up</SignButton>
                    <BottomWarning Warning={"Already have an account?"} page={"signin"}></BottomWarning>
                </div>
            </div>
        </div>
        </div>
    )
}