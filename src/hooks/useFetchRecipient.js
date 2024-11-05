import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCompanionUserInfo } from '../redux/chat/operations.js';

// інформації про кожного співрозмовника
// поточного користувача у його чатах
function useFetchRecipientUser(chats, user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!chats || chats.length === 0 || !user?._id) return;

    chats.forEach(chat => {
      const recipientId = chat.members.find((id) => id !== user._id);
      if (recipientId) {
        dispatch(getCompanionUserInfo(recipientId));
      }
    });
  }, [dispatch, chats, user._id]);
}

export default useFetchRecipientUser;
