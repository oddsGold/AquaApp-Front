import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentRecipient,
  selectLoading,
  selectMessages, selectNewMessage,
} from '../../redux/chat/selectors.js';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from "react-input-emoji";
import { BsSend } from "react-icons/bs";
import { getCompanionUserInfo, getUserMessages } from '../../redux/chat/operations.js';
import { setCurrentRecipient } from '../../redux/chat/slice.js';
import socketService from '../../services/socket-service.js';

function ChatBox({ user, currentChat, sendMessage }) {
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef(null);

  const isLoading = useSelector(selectLoading);

  const messages = useSelector(selectMessages);
  const recipientUser = useSelector(selectCurrentRecipient);
  const newMessage = useSelector(selectNewMessage);
  const previousChatId = useRef(null);


  useEffect(() => {
    if(currentChat) {
      const recipientId = currentChat.members.find((id) => id !== user._id);

      socketService.emit("sendMessage", {...newMessage, recipientId});
    }
  }, [currentChat, dispatch, newMessage]);

  useEffect(() => {
    socketService.on("getMessage", (response) => {

      console.log("response.chatId", response);

      if(currentChat?._id !== response.chatId) return

      dispatch({ type: 'chat/addMessage', payload: response });

      dispatch(getUserMessages(currentChat._id));
    });

    return () => {
      socketService.off("getMessage");
    }
  }, [currentChat, dispatch]);

  useEffect(() => {
    const fetchRecipientInfo = async () => {
      // перевіряємо чи змінився поточний чат
      if (currentChat && currentChat._id !== previousChatId.current) {
        // отримуємо ID отримувача повідомлення
        const recipientId = currentChat.members.find((id) => id !== user._id);
        if (recipientId) {
          // Надсилаємо запит на отримання інформації про одержувача
          const response = await dispatch(getCompanionUserInfo(recipientId));

          // Диспатчімо дані одержувача після виконання запиту
          await dispatch(setCurrentRecipient(response.payload));
        }
        // Оновлюємо попередній ID чату
        previousChatId.current = currentChat._id;
      }
    };

    fetchRecipientInfo();
  }, [currentChat, user._id, recipientUser?._id, dispatch]);

  // Завантажуємо повідомлення з локального сховища, коли оновлюється recipientUser
  useEffect(() => {
    if (recipientUser) {
      const storedMessage = localStorage.getItem(recipientUser.user._id);
      if (storedMessage) {
        setTextMessage(storedMessage);
      } else {
        setTextMessage("");
      }
    }
  }, [recipientUser]);

  // Зберігаємо текст повідомлення у локальному сховищі
  useEffect(() => {
    if (recipientUser) {
      localStorage.setItem(recipientUser.user._id, textMessage);
    }
  }, [textMessage, recipientUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  if (!recipientUser) {
    return (
      <p style={{ textAlign: 'center', width: '100%' }}>No conversation selected yet...</p>
    );
  }

  const handleSendMessage = async () => {
    if (textMessage.trim()) {
      await sendMessage(textMessage, user._id, currentChat._id);
      setTextMessage("");
      localStorage.removeItem(recipientUser.user._id);
    }
  };

  if (isLoading) {
    return (
      <p style={{ textAlign: 'center', width: '100%' }}>Chat loading...</p>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.user.name || 'No recipient'}</strong>
      </div>
      <Stack gap={3} className='messages'>
        {Array.isArray(messages.messages) && messages.messages.length > 0 ? (
          messages.messages.map((message) => (
            <Stack key={message._id}
                   className={`${message.senderId === user._id ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}`}>
              <span>{message.text}</span>
              <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
            </Stack>
          ))
        ) : (
          <p>No messages available.</p>
        )}
        <div ref={messagesEndRef} />
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,.2)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button className="sent-btn" onClick={handleSendMessage}>
          <BsSend />
        </button>
      </Stack>
    </Stack>
  );
}

export default ChatBox;
