// script.js
const socket = io(); // Connect to the signaling server

// Get the local video and remote video elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let peerConnection;

// Get access to the local video and audio streams
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localStream = stream;
    localVideo.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing media devices:', error);
  });

// Send signaling message to establish a video call
function sendSignal(message) {
  socket.emit('signal', message);
}

// Handle signaling messages received from the server
socket.on('signal', (message) => {
  handleSignal(message);
});

// Handle signaling messages
function handleSignal(message) {
  if (message.type === 'offer') {
    createPeerConnection();
    peerConnection.setRemoteDescription(new RTCSessionDescription(message));

    // Create and send answer
    peerConnection
      .createAnswer()
      .then((answer) => {
        peerConnection.setLocalDescription(answer);
        sendSignal(answer);
      })
      .catch((error) => {
        console.error('Error creating answer:', error);
      });
  } else if (message.type === 'answer') {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === 'candidate') {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate,
    });
    peerConnection.addIceCandidate(candidate);
  }
}

// Create a new RTCPeerConnection
function createPeerConnection() {
  peerConnection = new RTCPeerConnection();

  // Add local stream to the peer connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // Set up event listeners for ICE candidate and negotiation needed
  peerConnection.addEventListener('icecandidate', handleICECandidate);
  peerConnection.addEventListener('negotiationneeded', handleNegotiationNeeded);
  peerConnection.addEventListener('track', handleTrack);
}

// Handle ICE candidate events
function handleICECandidate(event) {
  if (event.candidate) {
    sendSignal({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
    });
  }
}

// Handle negotiation needed event
function handleNegotiationNeeded() {
  peerConnection
    .createOffer()
    .then((offer) => {
      peerConnection.setLocalDescription(offer);
      sendSignal(offer);
    })
    .catch((error) => {
      console.error('Error creating offer:', error);
    });
}

// Handle remote tracks being added to the peer connection
function handleTrack(event) {
  const stream = event.streams[0];
  remoteVideo.srcObject = stream;
}
