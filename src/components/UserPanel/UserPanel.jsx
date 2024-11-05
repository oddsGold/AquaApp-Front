import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors.js';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx';

export default function UserPanel() {
  const userName  = useSelector(selectUserName);

  return (
    <>
      <div className={css.wrapper}>
        <p className={css.textUser}>
          Hello, <span className={css.textUserName}>{userName ? userName : "User"}!</span>
        </p>
        <UserBar />
      </div>
    </>
  );
}
