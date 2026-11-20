const socket = io();

let currentRoom = "general";
let username = localStorage.getItem("yumechat_username") || "Гость";

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const usernameElement = document.getElementById("username");

if (usernameElement) {
  usernameElement.textContent = username;
}

socket.on("connect", () => {
  socket.emit("join", {
    room: currentRoom,
    username
  });
});

function joinRoom(room) {
  currentRoom = room;

  socket.emit("leave-room");
  socket.emit("join", {
    room,
    username
  });

  if (messages) messages.innerHTML = "";
}

function sendMessage() {
  const text = messageInput?.value.trim();

  if (!text) return;

  socket.emit("message", { text });
  messageInput.value = "";
}

sendButton?.addEventListener("click", sendMessage);

messageInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") sendMessage();
});

socket.on("message", (data) => {
  if (!messages) return;

  const item = document.createElement("div");
  item.className = "message";

  const name = document.createElement("strong");
  name.textContent = data.username + ": ";

  const text = document.createElement("span");
  text.textContent = data.text;

  item.append(name, text);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("notice", (text) => {
  if (!messages) return;

  const item = document.createElement("div");
  item.className = "notice";
  item.textContent = text;
  messages.appendChild(item);
});

function changeUsername() {
  const newName = prompt("Как тебя называть?", username);

  if (!newName || !newName.trim()) return;

  username = newName.trim().slice(0, 24);
  localStorage.setItem("yumechat_username", username);

  if (usernameElement) {
    usernameElement.textContent = username;
  }

  joinRoom(currentRoom);
}

function searchMessages() {
  const query = prompt("Что найти?");
  if (!query || !messages) return;

  const items = messages.querySelectorAll(".message");

  items.forEach((item) => {
    item.style.display = item.textContent
      .toLowerCase()
      .includes(query.toLowerCase())
      ? ""
      : "none";
  });
}

function addRoom() {
  const room = prompt("Название комнаты?");
  if (!room || !room.trim()) return;

  joinRoom(room.trim().toLowerCase().replace(/\s+/g, "-"));
}

function sendEmoji() {
  const emoji = prompt("Введи эмодзи:");
  if (emoji && messageInput) {
    messageInput.value += emoji;
    messageInput.focus();
  }
}

function startCall(type) {
  alert("Звонки пока находятся в разработке 🌸");
}

function uploadFile() {
  alert("Загрузка файлов пока находится в разработке 🌸");
}
