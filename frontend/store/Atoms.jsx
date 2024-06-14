import { atom, selector } from 'recoil'
export const senderIdAtom = atom ({
    key: "senderIdAtom",
    default : ""
})

export const currentChatState = atom({
    key: 'currentChatState',
    default: {},
  });

//   export const chatStateAtom = atom({
//     key: 'chatState', // unique ID (with respect to other atoms/selectors)
//     default: new Map() // initial state, an empty Map serialized to a string
//   });