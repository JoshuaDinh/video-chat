const socket = io("/");
const videoGrid = document.getElementById("video-grid");

const peer = new Peer(undefined, {
  host: "localhost",
  port: "3001",
  path: "/",
});

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);
  });

const myVideo = document.createElement("video");
myVideo.muted = true;

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

socket.on("user-connected", (userId) => {
  console.log(userId);
});

// Creates video stream / visual media & audio
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
