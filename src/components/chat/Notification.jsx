import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../../redux/socket/selectors.js';
import { selectChats, selectUsers } from '../../redux/chat/selectors.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { unreadNotificationsFunc } from '../../helpers/unreadNotifications.js';
import moment from 'moment';

function Notification() {
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

  console.log("un", unreadNotifications);
  console.log("mn", modifiedNotifications);


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
          <div className="mark-as-read">
            Mark all as read
          </div>
        </div>
        {modifiedNotifications?.length === 0 ? <span>No notification yet...</span> : null}
        {modifiedNotifications && modifiedNotifications.map((n, index) => {
          return (
            <div key={index} className={n.isRead ? 'notification' : 'notification not-read'}>
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