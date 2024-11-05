import { useSelector } from 'react-redux';
import { selectOnlineUsers, selectPotentialChats } from '../../redux/chat/selectors.js';

function PotentialChats({ onUserClick }) {
  const potentialChats = useSelector(selectPotentialChats);
  const onlineUsers = useSelector(selectOnlineUsers);

  return (
    <div className='all-users'>
      {potentialChats && potentialChats.map((u) => {
        return (
          <div
            className='single-user'
            key={u._id}
            onClick={() => onUserClick(u._id)}
          >
            {u.name}
            <span className={
              onlineUsers?.some((user) => user?.userId === u._id)
                ? 'user-online'
                : 'user-offline'
            }></span>
          </div>
        );
      })}
    </div>
  );
}

export default PotentialChats;
