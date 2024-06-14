"use client"
import { Heading } from '@/components/Heading';
import { InputComponentLikeFirstName } from '@/components/InputComponentLikeFirstName';
import { SignButton } from '@/components/SignButton';
import { SubHeading } from '@/components/SubHeading';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {BottomWarning} from '@/components/BottomWarning'
import { NavBar } from '@/components/Navbar';

export default function Signin() {
    const router = useRouter();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return (
      <div>
        <NavBar special={"signin"}></NavBar>

        <div className="bg-white h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-gray-100 rounded-lg text-center mx-4 mb-16">
                <Heading>Sign in</Heading>
                <SubHeading>Enter your Credentials to access your account</SubHeading>
                <InputComponentLikeFirstName name={'Username'} placeholder={'Username'} onChange={function(e){setUsername(e.target.value)}}/>
                <InputComponentLikeFirstName name={'Password'} placeholder={'Password' }onChange={function(e){setPassword(e.target.value)}}/>
                <SignButton onClick={async () => {
                      const res = await signIn("credentials", {
                        username : username,
                        password : password,
                        redirect: false,
                    });
                    if(res && !res.error){
                    router.push("/chatting")
                    }
                    else{
                      router.push("/signup")
                    }
                  }}>Sign in</SignButton>
                  <BottomWarning Warning={"Don't have an account?"} page={"signup"}></BottomWarning>
              </div>
        </div>
      </div>
      </div>
    )
}