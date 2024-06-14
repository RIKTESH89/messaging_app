"use server"

import prisma from "@/db"

export async function signup(username:string, password:string,email:string) {
    // should add zod validation here
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email:email
        }
    });

    console.log(user.id);

    return user.id
}

export async function msgCreate( senderId:string, recieverId:string, text:string) {
  // should add zod validation here
  const msgId = await prisma.message.create({
      data: {
          senderId: senderId,
          recieverId: recieverId,
          body: text
      }
  });


  return msgId
}

export async function getUsersByFilter(filter: string, username: string) {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          username: {
            startsWith: filter,
          },
        },
        {
          username: {
            not: username,
          },
        },
      ],
    },
  });
  return users;
}


  export async function getPrevMsg(sid:string,rid:string){
    const messages = await prisma.message.findMany({
      where: {
        
          
            OR: [
              {
                AND: [
                  { senderId: sid },
                  { recieverId: rid },
                ],
              },
              {
                AND: [
                  { senderId: rid },
                  { recieverId: sid },
                ],
              },
            ],
          },
      
    });
    
    
    return messages;
  }

  export async function delAccount(username:string) {
    const user = await prisma.user.delete({
      where: {
        username: username
      }
    })
    return user;
  }