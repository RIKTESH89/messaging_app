// chatUtils.js
import { useRecoilState } from 'recoil';
import { chatStateAtom } from '../../store/Atoms';

// Helper functions to serialize and deserialize the Map
const serializeMap = (map) => JSON.stringify(Array.from(map.entries()));
const deserializeMap = (str) => new Map(JSON.parse(str));

export const useChatUtils = () => {
  const [serializedChatState, setSerializedChatState] = useRecoilState(chatStateAtom);
  const chatState = deserializeMap(serializedChatState);

  const addChat = (senderId, receiverId) => {
    chatState.set(senderId, receiverId);
    chatState.set(receiverId, senderId);
    setSerializedChatState(serializeMap(chatState));
  };

  const removeChat = (senderId, receiverId) => {
    chatState.delete(senderId);
    chatState.delete(receiverId);
    setSerializedChatState(serializeMap(chatState));
  };

  return { addChat, removeChat, chatState };
};
