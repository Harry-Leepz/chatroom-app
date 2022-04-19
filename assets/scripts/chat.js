class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // save chat document
    const response = await this.chats.add(chat);
    return response;
  }
  // real time event listener to check for updates
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update the ui
            callback(change.doc.data());
          }
        });
      });
  }

  // currently a placeholder to store and retrieve username from local storage
  updateUsername(username) {
    this.username = username;
  }

  // update the chatroom
  updateChatroom(room) {
    this.room = room;
    // check to see if unsub has a value, if not run the function
    // and un-subscribe from listening to changes taking place in the old chat room
    if (this.unsub) {
      this.unsub();
    }
  }
}

const chatroom = new Chatroom("general", "harry");

chatroom.getChats((data) => {
  console.log(data);
});

setTimeout(() => {
  chatroom.updateChatroom("gaming");
  chatroom.updateUsername("Luigi");
  chatroom.getChats((data) => {
    console.log(data);
  });
  chatroom.addChat("Aloha");
}, 3000);
