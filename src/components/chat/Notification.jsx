import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications } from '../../redux/socket/selectors.js';
import { selectChats, selectUsers } from '../../redux/chat/selectors.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { unreadNotificationsFunc } from '../../helpers/unreadNotifications.js';
import moment from 'moment';
import { clearNotifications, updateNotification } from '../../redux/socket/slice.js';
import { setCurrentChat } from '../../redux/chat/slice.js';

function Notification() {
  const dispatch = useDispatch();
  const [isOpen ,setIsOpen] = useState(false);
  const notifications = useSelector(selectNotifications);
  const chats = useSelector(selectChats);
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = users.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.name,
    }
  });

  //видалити всі нотифікації
  const markAllNotificationsAsRead = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  const markNotificationAsRead = useCallback((n, notifications) => {
    //у методі markNotificationAsRead шукає чат, пов'язаний з повідомленням,
    //і намагається знайти конкретний чат, в якому беруть участь обидва користувачі -
    // поточний користувач і відправник повідомлення
    const desiredChat = chats.find(chat => {
      const chatMembers = [user._id, n.senderId];
      return chat?.members.every((member) => chatMembers.includes(member));
    });

    const updatedNotification = notifications.map(el => {
      if (el.senderId === n.senderId) {
        return { ...el, isRead: true };
      }
      return el;
    });

    if (updatedNotification) {
      dispatch(updateNotification(updatedNotification));
    }

    dispatch(setCurrentChat(desiredChat));
    setIsOpen(false);
  }, [])

  return (
    <div className='notifications'>
      <div className='notifications-icon' onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
             className="bi bi-chat-square-fill" viewBox="0 0 16 16">
          <path
            d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        </svg>
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen && (<div className='notifications-box'>
        <div className='notifications-header'>
          <h3>Notification</h3>
          <div className="mark-as-read" onClick={markAllNotificationsAsRead}>
            Clear all notifications
          </div>
        </div>
        {modifiedNotifications?.length === 0 ? <span>No notification yet...</span> : null}
        {modifiedNotifications && modifiedNotifications.map((n, index) => {
          return (
            <div
              key={index}
              className={n.isRead ? 'notification' : 'notification not-read'}
              onClick={() => markNotificationAsRead(n, notifications)}
            >
              <span>{`${n.senderName} send you a new message`}</span>
              <span className="notification-time">{moment(n.date).calendar()}</span>
            </div>
          )
        })}
      </div>)}
    </div>
  );
}

export default Notification;