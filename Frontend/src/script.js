 const socket = io("http://localhost:8080/", {
        transports: ["websocket"]  //to avoid cors
    });

   const page_url = window.location.href

   

    const currentUrl = window.location.href;
console.log(currentUrl)
    const url = new URL(currentUrl);
    const searchParams = new URLSearchParams(url.search);
    const ROOM_ID = searchParams.get('roomId');


    const videoGrid = document.getElementById('video-grid')

    const myPeer = new Peer();

    const myVideo = document.createElement('video')
    myVideo.muted = true

    const peers = {}
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        addVideoStream(myVideo, stream)

        myPeer.on('call', call => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })
        })

        socket.on('user-connected', userId => {
            connectToNewUser(userId, stream)
        })

        const toggleVideoButton = document.getElementById('toggle-video-button');
        toggleVideoButton.addEventListener('click', toggleVideoStream);

        function toggleVideoStream() {
            const videoTrack = stream.getVideoTracks()[0];

            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                myVideo.srcObject.getVideoTracks()[0].enabled = false;
                toggleVideoButton.innerHTML =  '<i class="uil uil-video-slash"></i>';
            } else {
                videoTrack.enabled = true;
                myVideo.srcObject.getVideoTracks()[0].enabled = true;
                toggleVideoButton.innerHTML = '<i class="uil uil-video"></i>';
            }
        }

        const toggleAudioButton = document.getElementById('toggle-audio-button');

        toggleAudioButton.addEventListener('click', toggleAudio);

        function toggleAudio() {
            const audioTrack = stream.getAudioTracks()[0];

            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                
                toggleAudioButton.innerHTML = `<i class="uil uil-microphone-slash"></i>`;
            } else {
                audioTrack.enabled = true;
                toggleAudioButton.innerHTML = `<i class="uil uil-microphone"></i>`;
            }
        }
    }).catch((err) => {
        console.log(err);
    });





    socket.on('user-disconnected', userId => {
        if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
        socket.emit('join-room', ROOM_ID, id)
    })

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
            video.remove()
        })

        peers[userId] = call
    }

    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        videoGrid.append(video)
    }



    function redirectToDashboard() {
        window.location.href = './patient.html';
    }