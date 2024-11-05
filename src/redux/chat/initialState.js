export const CHAT_INITIAL_STATE = {
  data: {
    chats: [] //список всіх чатів де учасником є залогінений користувач
  },
  chat: {
    users: [] //інформації про кожного співрозмовника поточного користувача у його чатах
  },
  users: [],
  potentialChats: [], //список всіх користувачів з якими може бути створений чат
  currentChat: null, //вибраний чат в списку створених чатів
  currentRecipient: null, //поле для поточного отримувача
  onlineUsers: [], //онлайн користувачі
  messages: [],
  draftMessages: {},
  isLoading: false,
  isError: null,
};
