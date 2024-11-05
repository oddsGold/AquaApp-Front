import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectToken, selectUser } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import socketService from '../../services/socket-service.js';
import { setOnlineUsers } from '../../redux/chat/slice.js';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) return;

    socketService.connect();

    socketService.emit("addNewUser", user._id);

    socketService.on("getOnlineUsers", (response) => {
      dispatch(setOnlineUsers(response));
    });

    return () => {
      socketService.off("getOnlineUsers");
      socketService.disconnect();
    };
  }, [dispatch, user]);

  return isLoggedIn || token ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
