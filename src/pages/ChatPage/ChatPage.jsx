import { useDispatch, useSelector } from 'react-redux';
import {
  selectChats,
  selectCurrentChat,
  selectError,
  selectLoading, selectUsers,
} from '../../redux/chat/selectors.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { ChatLayout } from '../../components/layouts/Layout/ChatLayout.jsx';
import { useCallback, useEffect } from 'react';
import {
  createChats,
  fetchUserChats,
  getAllUsers,
  getUserMessages,
  sendUserMessages,
} from '../../redux/chat/operations.js';
import { Container, Stack } from 'react-bootstrap';
import css from './chat.module.css';
import UserChat from '../../components/chat/UserChat.jsx';
import PotentialChats from '../../components/chat/PotentialChats.jsx';
import { setCurrentChat, setPotentialChat } from '../../redux/chat/slice.js';
import ChatBox from '../../components/chat/ChatBox.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  const user = useSelector(selectUser); //залогіненний користувач
  const chats = useSelector(selectChats); //всі чати цього залогіненого користувача
  const users = useSelector(selectUsers); //всі зареєстровані користувачі
  const currentChat = useSelector(selectCurrentChat); //при кліку на конкретний чат в списку чатів забераємо інфу про цей чат

  //завантажуємо користувачів сортуємо хто з цих користувачів доступний для створення нового чату
  //якщо чат між ними ще не створенний
  useEffect(() => {
    const getUsers = async () => {
      await dispatch(getAllUsers());

      if (users.length > 0) {
        const pChats = users.filter((u) => {
          let isChatCreated = false;

          if (user._id === u._id) return false;

          if (chats) {
            isChatCreated = chats.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }

          return !isChatCreated;
        });

        dispatch(setPotentialChat(pChats));
      }
    };

    getUsers();
  }, [chats]);

  //отримуємо всі чати де учасником є залогінений користувач
  useEffect( () => {
    if (user._id) {
      dispatch(fetchUserChats(user._id));
    }
  }, [dispatch, user._id]);

  //отримуємо всі повідомлення вибраного чату (currentChat)
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat && currentChat._id) {
        await dispatch(getUserMessages(currentChat._id));
      }
    };

    fetchMessages();
  }, [dispatch, currentChat]);

  //створюємо чат серед користувачів, з якими чат ще не створено
  //після створення чату оновлюємо список чатів залогіненого користувача
  const createChat = useCallback(async (secondId) => {
    await dispatch(createChats({ firstId: user._id, secondId }));
    dispatch(fetchUserChats(user._id));

  }, [dispatch, user._id]);

  //передаємо в редакс (в state.chats.currentChat) вибраний нами чат, щоб потім можна було отримати повідомлення цього чату
  const updateCurrentChat = useCallback(async (chat) => {
    await dispatch(setCurrentChat(chat))
  }, [dispatch]);

  //відправляємо повідомлення в вираному чаті, передаємо 3 аргументи (саме повідомлення, хто відправляє, id чату)
  //після відправки повідомлення забираємо всі повідомлення в цьому чаті
  const sendMessage = useCallback(async (textMessage, senderId, chatId) => {
    const data = {textMessage, senderId, chatId};
    await dispatch(sendUserMessages(data));
    await dispatch(getUserMessages(chatId));
  }, []);


  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  if (isError) {
    return <div>Error loading chats: {isError}</div>;
  }

  return (
    <ChatLayout>
      <div className={css.chat}>
        <Container>
          {/*комопнента для виводу всіх користувачів з якими може бути стоврено чат (якщо він ще не створенний)*/}
          <PotentialChats onUserClick={createChat} />
          {/****/}
          {chats?.length < 1 ? null : (
            <Stack direction='horizontal' gap={4} className="align-items-start">
              <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                <UserChat chats={chats} user={user} updateCurrentChat={updateCurrentChat} />
              </Stack>
              <ChatBox user={user} currentChat={currentChat} sendMessage={sendMessage} />
            </Stack>
          )}
        </Container>
      </div>
    </ChatLayout>
  );
};

export default ChatPage;
