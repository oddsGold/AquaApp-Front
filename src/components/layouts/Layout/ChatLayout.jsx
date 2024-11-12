import css from './ChatLayout.module.css';

export const ChatLayout = ({children}) => {
  return (
    <div className={css.chatWrapper}>
      {children}
    </div>
  );
};
