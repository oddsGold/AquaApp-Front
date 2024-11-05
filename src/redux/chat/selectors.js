export const selectChats = (state) => state.chats.data.chats;
export const selectCurrentChat = (state) => state.chats.currentChat;
export const selectMessages = (state) => state.chats.messages;
export const selectLoading = state => state.chats.loading;
export const selectError = state => state.chats.error;
export const selectUserChat = state => state.chats.chat.users
export const selectUsers = state => state.chats.users;
export const selectPotentialChats = state => state.chats.potentialChats;
export const selectCurrentRecipient = state => state.chats.currentRecipient;
export const selectOnlineUsers = state => state.chats.onlineUsers;