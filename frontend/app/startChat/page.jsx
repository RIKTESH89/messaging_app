// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState, useRef } from 'react';
// import { useSession } from "next-auth/react";
// import { getPrevMsg } from "@/app/actions/user"
// import { useRecoilValue, useRecoilState } from 'recoil';
// import { senderIdAtom } from '@/store/Atoms';
// import { currentChatState } from '@/store/Atoms';
// import { useRouter } from 'next/navigation';
// import { msgCreate } from '@/app/actions/user';


// export default function StartChat() {
//     const [seflmsg, setselfmsg] = useState("");
//     const [chathistory, setchathistory] = useState([]);
//     const [incommingmsg, setincommingmsg] = useState("");
//     const [socket, setSocket] = useState(null);
//     const searchParams = useSearchParams();
//     const recieverId = searchParams.get('recieverId')
//     const username = searchParams.get('user');
//     const [sender, setSender] = useRecoilState(senderIdAtom)
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [chatState, setChatState] = useRecoilState(currentChatState);
//     const [chatHistory, setchatHistory] = useState([])
//     const bottomRef = useRef(null);

//     useEffect(() => {
//         if (status === "authenticated" && session?.user?.id) {
//             setSender(session.user.id);
//         } else if (status === "unauthenticated") {
//             router.push("/signin");
//         }
//     }, [status, session, setSender, router]);

//     useEffect(() => {
//         if (sender && recieverId) {
//             const fetchChats = async () => {
//                 const chats = await getPrevMsg(sender, recieverId);
//                 setchatHistory(chats);
//             };
//             fetchChats();
//         }
//     }, [sender, recieverId]);

//     useEffect(() => {
//         if (sender && recieverId) {
//             const newSocket = new WebSocket('wss://messaging-app-idpa.onrender.com');
//             newSocket.onopen = () => {
//                 console.log("sockets are open now")
//                 console.log(chatState[recieverId])
//                 newSocket.send(JSON.stringify({ type: "signup", id: parseInt(sender), sid: parseInt(sender), rid: parseInt(recieverId) }));
//             }

//             newSocket.onmessage = (message) => {
//                 const parsedata = JSON.parse(message.data);
//                 const { sendmessage } = parsedata;
//                 if (sendmessage) {
//                     setincommingmsg(sendmessage);
//                     setchathistory((prevHistory) => [...prevHistory, { id: "1", senderId: session.user.id, body: sendmessage, recieverId: recieverId, createdAt: gettime() }]);
//                 }

//             }
//             setSocket(newSocket);
//             return function () {
//                 newSocket.close();
//             };
//         }
//     }, [sender, recieverId, chatState, session?.user?.id])

//     function createtime(time) {
//         const dateTime = new Date(time);
//         const formattedDate = dateTime.toLocaleDateString(); // Formats the date part
//         const formattedTime = dateTime.toLocaleTimeString(); // Formats the time part
//         return `${formattedDate} ${formattedTime}`;
//     }
//     function gettime() {
//         const now = new Date();
//         return now.toISOString(); // Output: current time in HH:MM:SS format
//     }

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [chathistory, chatHistory]);

//     return (
//         <div>
//             <div>
//                 <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0">
//                     <div className="w-screen flex flex-row justify-between p-4">
//                         <div className="flex items-center space-x-3 rtl:space-x-reverse">
//                             <svg className="absolute w-12 h-12 text-gray-400 -left-1 relative w-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
//                             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{username}</span>
//                         </div>
//                         <div className="flex flex-row items-center justify-end  dark:text-white mr-4">
//                             <button onClick={() => { router.push("/chatting") }}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//             <div >
//                 {chatHistory.map((value, index) => (
//                     <div key={index} className={session?.user?.id === value.senderId ? "flex items-start gap-2.5 justify-end" : "flex items-start gap-2.5"}>
//                         <div className="flex flex-col gap-1 w-full max-w-[320px] ">
//                             <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                                 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{createtime(value.createdAt)}</span>
//                             </div>
//                             <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
//                                 <p className="text-sm font-normal text-gray-900 dark:text-white">{value.body}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="mb-20">
//                 {chathistory.map((msg, index) => (
//                     <div key={index}>
//                         <div className={msg.id != "1" ? "flex items-start gap-2.5 justify-end" : "flex items-start gap-2.5"}>
//                             <div className="flex flex-col gap-1 w-full max-w-[320px] ">
//                                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{createtime(msg.createdAt)}</span>
//                                 </div>
//                                 <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
//                                     <p className="text-sm font-normal text-gray-900 dark:text-white">{msg.body}</p>
//                                 </div>
//                                 {msg.id != "1" ? <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> : null}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div ref={bottomRef}></div>
//             <div className="flex items-center px-1.5 py-2 bg-gray-50 dark:bg-gray-700 fixed inset-x-0 bottom-0 p-10">
//                 <input className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setselfmsg(e.target.value)} value={seflmsg} type="text" placeholder="message" />
//                 <button className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600" onClick={async () => {
//                     if (recieverId && session?.user?.id) {
//                         const msgId = await msgCreate(session.user.id, recieverId, seflmsg);
//                         socket?.send(JSON.stringify({ type: "message", sid: parseInt(session.user.id), rid: parseInt(recieverId), text: seflmsg }));
//                     }

//                     setchathistory((prevHistory) => [...prevHistory, { id: "", senderId: session.user.id, body: seflmsg, recieverId: searchParams, createdAt: gettime() }]);
//                     setselfmsg("");

//                 }}><svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
//                         <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
//                     </svg></button>
//             </div>
//         </div>
//     )
// }




'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { getPrevMsg } from "@/app/actions/user";
import { useRecoilState } from 'recoil';
import { senderIdAtom, currentChatState } from '@/store/Atoms';
import { useRouter } from 'next/navigation';
import { msgCreate } from '@/app/actions/user';

function StartChatContent() {
    const [selfmsg, setSelfMsg] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [chathistory,setchathistory] = useState([]);
    const [incomingMsg, setIncomingMsg] = useState("");
    const [socket, setSocket] = useState(null);
    const searchParams = useSearchParams();
    const recieverId = searchParams.get('recieverId');
    const username = searchParams.get('user');
    const [sender, setSender] = useRecoilState(senderIdAtom);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [chatState, setChatState] = useRecoilState(currentChatState);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            setSender(session.user.id);
        } else if (status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status, session, setSender, router]);

    useEffect(() => {
        if (sender && recieverId) {
            const fetchChats = async () => {
                const chats = await getPrevMsg(sender, recieverId);
                setChatHistory(chats);
            };
            fetchChats();
        }
    }, [sender, recieverId]);

    useEffect(() => {
        if (sender && recieverId) {
            const newSocket = new WebSocket('wss://messaging-app-idpa.onrender.com');
            newSocket.onopen = () => {
                console.log("sockets are open now");
                console.log(chatState[recieverId]);
                newSocket.send(JSON.stringify({ type: "signup", id: parseInt(sender), sid: parseInt(sender), rid: parseInt(recieverId) }));
            }

            newSocket.onmessage = (message) => {
                const parsedData = JSON.parse(message.data);
                const { sendmessage } = parsedData;
                if (sendmessage) {
                    setIncomingMsg(sendmessage);
                    setchathistory((prevHistory) => [
                        ...prevHistory,
                        {
                            id: "1",
                            senderId: session.user.id,
                            body: sendmessage,
                            recieverId: recieverId,
                            createdAt: getTime()
                        }
                    ]);
                }
            }
            setSocket(newSocket);
            return function () {
                newSocket.close();
            };
        }
    }, [sender, recieverId, chatState, session?.user?.id]);

    function createTime(time) {
        const dateTime = new Date(time);
        const formattedDate = dateTime.toLocaleDateString(); // Formats the date part
        const formattedTime = dateTime.toLocaleTimeString(); // Formats the time part
        return `${formattedDate} ${formattedTime}`;
    }

    function getTime() {
        const now = new Date();
        return now.toISOString(); // Output: current time in HH:MM:SS format
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div>
            <div>
                <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0">
                    <div className="w-screen flex flex-row justify-between p-4">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1 relative w-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{username}</span>
                        </div>
                        <div className="flex flex-row items-center justify-end dark:text-white mr-4">
                            <button onClick={() => { router.push("/chatting") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
            {
                chatHistory.map(({ senderId, body, createdAt, id }, index) => (
                    <div key={id} className={`flex items-start gap-2.5 ${sender === senderId ? "justify-end" : ""}`}>
                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{createTime(createdAt)}</span>
                            </div>
                            <div className={`flex flex-col leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl ${sender !== senderId ? "bg-gray-100 dark:bg-gray-700" : "bg-blue-100 dark:bg-blue-700"}`}>
                                <p className="text-sm font-normal text-gray-900 dark:text-white">{body}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

            </div>
            <div className="mb-20">
                {chathistory.map((msg, index) => (
                    <div key={index}>
                        <div className={msg.id !== "1" ? "flex items-start gap-2.5 justify-end" : "flex items-start gap-2.5"}>
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{createTime(msg.createdAt)}</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">{msg.body}</p>
                                </div>
                                {msg.id !== "1" ? <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={bottomRef}></div>
            <div className="flex items-center px-1.5 py-2 bg-gray-50 dark:bg-gray-700 fixed inset-x-0 bottom-0 p-10">
                <input className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSelfMsg(e.target.value)} value={selfmsg} type="text" placeholder="message" />
                <button className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600" onClick={async () => {
                    if (recieverId && sender) {
                        setSelfMsg("");
                        const msgId = await msgCreate(sender, recieverId, selfmsg);
                        socket?.send(JSON.stringify({ type: "message", sid: parseInt(session.user.id), rid: parseInt(recieverId), text: selfmsg }));
                        }
                        
                        setchathistory((prevHistory) => [...prevHistory, { id: "", senderId: session.user.id, body: selfmsg, recieverId: recieverId, createdAt: getTime() }]);

                }}><svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg></button>
            </div>
        </div>
    );
}

export default function StartChat() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StartChatContent />
        </Suspense>
    );
}
