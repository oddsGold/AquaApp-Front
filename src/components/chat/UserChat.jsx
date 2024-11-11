import useFetchRecipientUser from '../../hooks/useFetchRecipient.js';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import { selectMessages, selectOnlineUsers, selectUserChat } from '../../redux/chat/selectors.js';
import { selectNotifications } from '../../redux/socket/selectors.js';
import { unreadNotificationsFunc } from '../../helpers/unreadNotifications.js';
import { useCallback } from 'react';
import { updateNotification } from '../../redux/socket/slice.js';

function UserChat({ chats, user, updateCurrentChat }) {
  const dispatch = useDispatch();
  useFetchRecipientUser(chats, user);
  const recipientUsers = useSelector(selectUserChat);
  const onlineUsers = useSelector(selectOnlineUsers);
  const notifications = useSelector(selectNotifications);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const messages = useSelector(selectMessages);

  // Сортируем чаты по времени создания (createdAt), чтобы порядок оставался сталым
  const sortedChats = recipientUsers?.slice().sort((a, b) => {
    const chatA = chats.find(chat => chat.members.includes(a._id));
    const chatB = chats.find(chat => chat.members.includes(b._id));
    return new Date(chatA.createdAt) - new Date(chatB.createdAt);
  });

  // Выбор чата с определённым собеседником из списка
  // Обновляем текущий активный чат
  const handleChatClick = (recipientUser) => {
    const relatedChat = chats.find(chat =>
      chat.members.includes(user._id) && chat.members.includes(recipientUser._id),
    );

    if (relatedChat) {
      updateCurrentChat(relatedChat);
    }
  };

  const markThisUserNotificationAsRead = useCallback((thisUserNotification, notification) => {
    const mNotification = notification.map((el) => {
      let notification;

      thisUserNotification.forEach((n) => {
        if (n.senderId === el.senderId) {
          notification = { ...n, isRead: true };
        } else {
          notification = el;
        }
      });

      return notification;
    });

    dispatch(updateNotification(mNotification));
  }, []);

  return (
    <div>
      {sortedChats && sortedChats.length > 0 ? (
        sortedChats.map((recipientUser) => {
          const isOnline = onlineUsers?.some((user) => user.userId === recipientUser._id);

          const thisUserNotification = unreadNotifications?.filter(
            n => n.senderId === recipientUser._id,
          );

          return (
            <div onClick={() => handleChatClick(recipientUser)} key={recipientUser._id}>
              <Stack
                direction='horizontal' gap={3}
                className='user-card align-items-center p-2 justify-content-between'
                role='button'
                onClick={() => {
                  if (thisUserNotification?.length !== 0) {
                    markThisUserNotificationAsRead(thisUserNotification, notifications);
                  }
                }}
              >
                <div className='d-flex'>
                  <div className='me-2 b-avatar'>
                    <img src={recipientUser.avatar} alt='Avatar' className='avatar' />
                    <div className={isOnline ? 'user-online' : 'user-offline'}></div>
                  </div>
                  <div className='text-content'>
                    <div className='name'>{recipientUser.name}</div>
                    <div className='text'>Text message</div>
                  </div>
                </div>
                <div className='d-flex flex-column align-items-end'>
                  <div className='date'>
                    12/12/2023
                  </div>
                  <div className={thisUserNotification?.length > 0 ? 'this-user-notifications' : ''}>
                    {thisUserNotification?.length > 0 ? thisUserNotification?.length : ''}
                  </div>
                </div>
              </Stack>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserChat;
