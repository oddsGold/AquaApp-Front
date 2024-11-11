import { useSelector } from 'react-redux';
import { selectMessages, selectNewMessage } from '../redux/chat/selectors.js';
import { selectNotifications } from '../redux/socket/selectors.js';
import { useEffect } from 'react';
import { dispatch } from 'react-hot-toast/src/core/store.js';
import { getUserMessages } from '../redux/chat/operations.js';

export const useFetchLatestMessage = (chat) => {
  const newMessage = useSelector(selectNewMessage);
  const notifications = useSelector(selectNotifications);
  const messages = useSelector(selectMessages);
  console.log(messages);

  useEffect(() => {

  }, [newMessage,notifications]);
}