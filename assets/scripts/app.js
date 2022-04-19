// dom queries
const chatList = document.querySelector(".chat-list");

// new chat instances
const chatUI = new ChatUI(list);
const chatroom = new Chatroom("general", "harry");

// get chats and render templates
chatroom.getChats((data) => {
  console.log(data);
});
