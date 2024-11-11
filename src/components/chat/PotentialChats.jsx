import { useSelector } from 'react-redux';
import { selectOnlineUsers, selectPotentialChats } from '../../redux/chat/selectors.js';

function PotentialChats({ onUserClick }) {
  const potentialChats = useSelector(selectPotentialChats);
  const onlineUsers = useSelector(selectOnlineUsers);

  return (
    <div className='all-users'>
      {potentialChats && potentialChats.map((u) => {
        console.log(u);
        return (
          <div
            className='single-user'
            key={u._id}
            onClick={() => onUserClick(u._id)}
          >
            <div className='single-user-img'>
              <img src={u.avatar} alt='' />
            </div>
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
