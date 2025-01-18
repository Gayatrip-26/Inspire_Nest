const startRecordingBtn = document.getElementById("start-recording");
const stopRecordingBtn = document.getElementById("stop-recording");
const playRecordingBtn = document.getElementById("play-recording");
const nextChallengeBtn = document.getElementById("next-challenge");
const uploadStoryBtn = document.getElementById("upload-story");
const cameraView = document.getElementById("camera-view");
const recordedVideo = document.getElementById("recorded-video");
const feedbackContainer = document.getElementById("feedback-container");

let mediaRecorder;
let chunks = [];
let isRecording = false;
let currentStoryIndex = 0;

const stories = [
  {
    title: "Elephant and Mouse",
    text: "Once upon a time, there was an elephant and a mouse...",
    video: "https://www.youtube.com/embed/KLk6PnaeApI",
  },
  {
    title: "Lion and Rabbit",
    text: "There was a lion and a rabbit who were unlikely friends...",
    video: "https://www.youtube.com/embed/TXxTojykO4A",
  },
];

// Function to change the story
function changeStory() {
  const story = stories[currentStoryIndex];
  document.getElementById("story-title").textContent = story.title;
  document.getElementById("story-text").textContent = story.text;
  document.getElementById("story-video").src = story.video;
}

// Start video stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    cameraView.srcObject = stream;
    window.stream = stream;
  })
  .catch((error) => {
    alert("Camera and microphone access is required!");
    console.error(error);
  });

// Start recording
startRecordingBtn.addEventListener("click", () => {
  isRecording = true;
  chunks = [];
  const options = { mimeType: "video/webm" };
  mediaRecorder = new MediaRecorder(window.stream, options);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    recordedVideo.src = URL.createObjectURL(blob);
    playRecordingBtn.disabled = false;
    nextChallengeBtn.disabled = false;
    uploadStoryBtn.disabled = false;
  };

  mediaRecorder.start();
  startRecordingBtn.disabled = true;
  stopRecordingBtn.disabled = false;
  feedbackContainer.innerHTML = "Recording started...";
});

// Stop recording
stopRecordingBtn.addEventListener("click", () => {
  isRecording = false;
  mediaRecorder.stop();
  window.stream.getTracks().forEach((track) => track.stop()); // Turn off camera
  startRecordingBtn.disabled = false;
  stopRecordingBtn.disabled = true;
  feedbackContainer.innerHTML = "Recording stopped.";
});

// Play the recorded video
playRecordingBtn.addEventListener("click", () => {
  recordedVideo.play();
});

// Handle next challenge
nextChallengeBtn.addEventListener("click", () => {
  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
  changeStory();
  feedbackContainer.innerHTML = "Moving to the next story...";
});

// Handle story upload
uploadStoryBtn.addEventListener("click", () => {
  alert("Story uploaded successfully!");
  // Add logic to upload the current story (e.g., save it to a database or a file)
});
