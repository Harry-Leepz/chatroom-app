class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
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
    this.chats
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
}

const chatroom = new Chatroom("general", "harry");

chatroom.getChats((data) => {
  console.log(data);
});
