"use server"

import prisma from "@/db"

import { z } from "zod";

// Define the Zod schema
const userSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(/^[a-zA-Z]+$/, "Username must not contain numbers or special characters"), // Regex for no numbers and only alphabets
  password: z.string()
    .min(6, "Password must be at least 6 characters long"),
  email: z.string()
    .email("Invalid email address")
});

export async function signup(username:string, password:string,email:string) {
  const validationResult = userSchema.safeParse({ username, password, email });

  if (!validationResult.success) {
    // Handle validation errors
    console.error(validationResult.error);
    // alert("Wrong Input format")
    throw new Error("Invalid input data");
  }

  // Destructure the validated data
  const { username: validUsername, password: validPassword, email: validEmail } = validationResult.data;

  // Proceed with the database operation
  const user = await prisma.user.create({
    data: {
      username: validUsername,
      password: validPassword,
      email: validEmail
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