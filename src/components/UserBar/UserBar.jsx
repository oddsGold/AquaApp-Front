import { useLayoutEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";

export default function UserBar() {
  const [isShow, setIsShow] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(null);
  const buttonRef = useRef(null);

  const handlClick = () => {
    if (!isShow) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, [isShow]);

  return (
    <div className={css.wrapUserBar}>
      <button
        ref={buttonRef}
        className={css.button}
        type="button"
        onClick={handlClick}
      >
        User name
        <div className={css.wrapAvatar}>
          <img
            className={css.imgAvatar}
            src="../../../public/avatar.jpg"
            alt="User's Avatar"
          />
        </div>
        <div className={css.wrapIcon}>
          {isShow ? (
            <Icon id="chevron-up" className={css.icon} />
          ) : (
            <Icon id="chevron-down" className={css.icon} />
          )}
        </div>
      </button>
      {isShow && (
        <UserBarPopover
          style={{
            width: popoverWidth !== null ? `${popoverWidth}px` : "auto",
          }}
        />
      )}
    </div>
  );
}
