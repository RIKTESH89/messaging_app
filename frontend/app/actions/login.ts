"use server"

import prisma from "@/db"

export async function login(username: string, password: string) {
    // should add zod validation here
    
    const user = await prisma.user.findUnique({
        where: {
            username : username,
            password : password
        },
        select : {
            id : true,
            username : true
        }
    })
    if(user){
    return user;
    }
    else{
        return 0;
    }
}