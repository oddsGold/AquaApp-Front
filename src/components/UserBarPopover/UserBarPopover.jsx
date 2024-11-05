import BaseModal from '../BaseModal/BaseModal';
import MainModal from '../MainModal/MainModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import Icon from '../Icon/Icon';
import css from './UserBarPopover.module.css';
import { Link } from 'react-router-dom';
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function UserBarPopover({
  style,
  isOpenSettingsModal,
  openSettingsModal,
  closeSettingsModal,
  isOpenLogOutModal,
  openLogOutModal,
  closeLogOutModal,
}) {
  return (
    <div className={css.wrapper} style={style}>
      <button className={css.btnSet} type="button" onClick={openSettingsModal}>
        <div className={css.wrapIcon}>
          <Icon id="settings" className={css.icon} />
        </div>
        Settings
      </button>
      <button className={css.btnSet} type="button">
        <div className={css.wrapIcon}>
          <IoChatboxEllipsesOutline className={css.icon} />
        </div>
        <Link to="/chats">Chats</Link>
      </button>
      <button className={css.btnLogOut} type="button" onClick={openLogOutModal}>
        <div className={css.wrapIcon}>
          <Icon id="log-out" className={css.iconLog} />
        </div>
        Log Out
      </button>
      <MainModal
        isOpen={isOpenSettingsModal}
        onRequestClose={closeSettingsModal}
      >
        <UserSettingsModal onRequestClose={closeSettingsModal} />
      </MainModal>
      <BaseModal isOpen={isOpenLogOutModal} onRequestClose={closeLogOutModal}>
        <LogOutModal onRequestClose={closeLogOutModal} />
      </BaseModal>
    </div>
  );
}
