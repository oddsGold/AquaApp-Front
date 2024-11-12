import { useSelector } from 'react-redux';
import { selectNewMessage } from '../redux/chat/selectors.js';
import { selectNotifications } from '../redux/socket/selectors.js';
import { useEffect, useState } from 'react';
import { getMessages } from '../api/chat.js';

function useFetchLatestMessage(chats) {
  const newMessage = useSelector(selectNewMessage);
  const notifications = useSelector(selectNotifications);
  const [latestMessages, setLatestMessages] = useState([]);

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const latestMsgs = await Promise.all(
        chats.map(async (chat) => {
          const response = await getMessages(chat?._id);
          const messages = response?.data?.data?.messages;
          const lastMessage = messages?.length > 0 ? messages[messages.length - 1] : null;
          return { chatId: chat._id, lastMessage };
        })
      );
      setLatestMessages(latestMsgs);
    };

    fetchLatestMessages();
  }, [newMessage, notifications]);

  // console.log(latestMessages);
  return { latestMessages };
}

export default useFetchLatestMessage;
