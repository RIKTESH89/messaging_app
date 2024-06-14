import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import {login} from '@/app/actions/login'
import prisma from "@/db";

export const NEXT_AUTH_CONFIG = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
            const user = await prisma.user.findUnique({
                where: {
                    username : credentials.username,
                    password : credentials.password
                },
                select : {
                    id : true,
                    username : true
                }
            })
            console.log(user);
                if(user){
              return {
                  id: user.id.toString(),
                  username:credentials.username
              };
                }
                else{
                    return null;
                }
          }, 
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.username = user.username;
            console.log(token.uid,user.id);
        }
        return token;
        },
        redirect : async ({ url, baseUrl }:any) => {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
            console.log(session.user)
              session.user.id = token.uid
              session.user.username = token.username;
          }
          return session
      }
    },
    pages: {
        signIn: '/signin',
        chat: '/chat'
    }
  }