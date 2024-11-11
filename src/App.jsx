import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './components/layouts/SharedLayout/SharedLayout';
import { lazy, useEffect } from 'react';
import RestrictedRoute from './components/permissions/RestrictedRoute';
import PrivateRoute from './components/permissions/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './redux/auth/operations.js';
import { selectIsRefreshing, selectToken } from './redux/auth/selectors.js';
import Loader from './components/Loader/Loader.jsx';
import ChatPage from './pages/ChatPage/ChatPage.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleAuthRedirect from './components/LoginForm/GoogleAuthRedirect.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx'),
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) return;

    const refreshAndFetchUserInfo = async () => {
      await dispatch(getUserInfo());
    };

    refreshAndFetchUserInfo();
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />
          }
        />
        <Route
          path="/confirm-oauth"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<GoogleAuthRedirect  />} />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute redirectTo="/signin" component={<ChatPage />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
