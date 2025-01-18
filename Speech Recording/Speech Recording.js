// // Select elements
// const startRecordingBtn = document.getElementById("start-recording");
// const stopRecordingBtn = document.getElementById("stop-recording");
// const playRecordingBtn = document.getElementById("play-recording");
// const outputText = document.getElementById("output-text");
// const audioPlayer = document.getElementById("audio-player");

// // MediaRecorder variables
// let mediaRecorder;
// let audioChunks = [];
// let audioURL;

// // Track recording state
// let isRecording = false;

// // Start recording button functionality
// startRecordingBtn.addEventListener("click", () => {
//   startRecording();
// });

// // Stop recording button functionality
// stopRecordingBtn.addEventListener("click", () => {
//   stopRecording();
// });

// // Play the recorded audio
// playRecordingBtn.addEventListener("click", () => {
//   if (audioURL) {
//     audioPlayer.src = audioURL; // Set audio source to the recorded file
//     audioPlayer.play(); // Play the recording
//   } else {
//     alert("Please record something first!");
//   }
// });

// // Start recording the audio
// function startRecording() {
//   isRecording = true;
//   startRecordingBtn.disabled = true; // Disable Start Recording button
//   stopRecordingBtn.disabled = false; // Enable Stop Recording button
//   playRecordingBtn.disabled = true; // Disable Play button while recording

//   // Start capturing audio using MediaRecorder
//   navigator.mediaDevices.getUserMedia({ audio: true })
//     .then((stream) => {
//       mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.ondataavailable = (event) => {
//         audioChunks.push(event.data);
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         audioURL = URL.createObjectURL(audioBlob); // Create a URL for the recorded audio
//         playRecordingBtn.disabled = false; // Enable Play button after recording is done
//         audioChunks = []; // Clear the audio chunks array
//       };

//       mediaRecorder.start();
//     })
//     .catch((error) => {
//       console.error('Error accessing microphone: ', error);
//       alert("Please allow microphone access to record audio.");
//     });
// }

// // Stop recording the audio
// function stopRecording() {
//   isRecording = false;
//   startRecordingBtn.disabled = false; // Enable Start Recording button
//   stopRecordingBtn.disabled = true; // Disable Stop Recording button
//   mediaRecorder.stop(); // Stop MediaRecorder
// }

// Select elements
const startRecordingBtn = document.getElementById("start-recording");
const stopRecordingBtn = document.getElementById("stop-recording");
const playRecordingBtn = document.getElementById("play-recording");
const outputText = document.getElementById("output-text");
const audioPlayer = document.getElementById("audio-player");
const feedbackContainer = document.getElementById("feedback-container");

// MediaRecorder variables
let mediaRecorder;
let audioChunks = [];
let audioURL;

// Track recording state
let isRecording = false;

// Start recording button functionality
startRecordingBtn.addEventListener("click", () => {
  startRecording();
});

// Stop recording button functionality
stopRecordingBtn.addEventListener("click", () => {
  stopRecording();
});

// Play the recorded audio
playRecordingBtn.addEventListener("click", () => {
  if (audioURL) {
    audioPlayer.src = audioURL; // Set audio source to the recorded file
    audioPlayer.play(); // Play the recording
  } else {
    alert("Please record something first!");
  }
});

// Start recording the audio
function startRecording() {
  isRecording = true;
  startRecordingBtn.disabled = true; // Disable Start Recording button
  stopRecordingBtn.disabled = false; // Enable Stop Recording button
  playRecordingBtn.disabled = true; // Disable Play button while recording

  // Start capturing audio using MediaRecorder
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioURL = URL.createObjectURL(audioBlob); // Create a URL for the recorded audio
        playRecordingBtn.disabled = false; // Enable Play button after recording is done
        audioChunks = []; // Clear the audio chunks array

        // Analyze the audio for feedback
        analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
    })
    .catch((error) => {
      console.error("Error accessing microphone: ", error);
      alert("Please allow microphone access to record audio.");
    });
}

// Stop recording the audio
function stopRecording() {
  isRecording = false;
  startRecordingBtn.disabled = false; // Enable Start Recording button
  stopRecordingBtn.disabled = true; // Disable Stop Recording button
  mediaRecorder.stop(); // Stop MediaRecorder
}

// Analyze audio and give feedback
function analyzeAudio(audioBlob) {
  // Simulate clarity evaluation
  const clarityScore = Math.random(); // Replace with actual analysis logic
  let feedback = "";
  let stars = "";

  if (clarityScore > 0.8) {
    feedback = "Excellent clarity! 😊🎉";
    stars = "⭐⭐⭐⭐⭐";
  } else if (clarityScore > 0.5) {
    feedback = "Good clarity! 🙂";
    stars = "⭐⭐⭐⭐";
  } else {
    feedback = "Needs improvement. 😟";
    stars = "⭐⭐⭐";
  }

  // Display feedback
  feedbackContainer.innerHTML = `
    <p>${feedback}</p>
    <p>${stars}</p>
  `;
}
