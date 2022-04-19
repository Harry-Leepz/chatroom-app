const chatroom = new Chatroom("general", "harry");

chatroom.getChats((data) => {
  console.log(data);
});
