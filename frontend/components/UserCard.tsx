'use client'

import { useRouter } from 'next/navigation';
import { useRecoilValue,useRecoilState } from 'recoil';
import { senderIdAtom,currentChatState } from '@/store/Atoms';
import React , { useEffect } from 'react';
import { useChatUtils } from '@/app/actions/Chatutils';

interface User {
    username: string;
    email: string;
    id: number;
    password: string;
}
interface Props {
    value: User;
}



export function UserCard({ value }: Props){
    const router = useRouter();
    const sender = useRecoilValue(senderIdAtom)
    const [chatstate,setchatState] = useRecoilState(currentChatState)
    // const { addChat, removeChat, chatState } = useChatUtils();

    return(
        <div className="flex items-center justify-between border p-3 my-3 bg-gray-200 hover:bg-gray-400">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mx-3 mt-0.5">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                </svg>
                <div className="text-xl">{value.username}</div>
            </div>
            
            <button onClick={function(){
                const recieverId = (value.id).toString();
                setchatState((prevChat:any) => ({
                    ...prevChat,
                    [sender]: recieverId,
                  }));
                console.log(chatstate);
                router.push("/startChat?"+"recieverId="+value.id+"&user="+value.username);
            }} className="flex items-center justify-center rounded-md  font-medium text-center text-white w-1/4 sm:w-1/6 py-2 mx-3  bg-gray-700 hover:bg-gray-900 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300">Chat</button>
        </div>
    )
}