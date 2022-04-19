// dom queries
const chatList = document.querySelector(".chat-list");

// new chat instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "harry");

// get chats and render templates
chatroom.getChats((data) => chatUI.render(data));
