import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithGoogle, getUserInfo } from '../../redux/auth/operations';

const GoogleAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const googleLogIn = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');

      if(code) {
        await dispatch(loginWithGoogle({code})).unwrap();
        await dispatch(getUserInfo()).unwrap();
      }
    }
    googleLogIn();
  }, [location, navigate, dispatch]);

  return <p>Authorizing...</p>;
};

export default GoogleAuthRedirect;
