// Select elements
const startRecordingBtn = document.getElementById("start-recording");
const buttons = document.querySelectorAll(".word-button");
const sentenceBox = document.getElementById("sentence");
const speakButton = document.getElementById("speak-button");
const clearButton = document.getElementById("clear-button");

// Initialize Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  outputText.textContent = "Listening... Speak now!";
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  outputText.textContent = `You said: ${transcript}`;
};

// Start recording voice
startRecordingBtn.addEventListener("click", () => {
  recognition.start();
});
// Add word to sentence when button is clicked
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const word = button.textContent;
    sentenceBox.textContent += word + " ";
  });
});

// Speak the sentence aloud
speakButton.addEventListener("click", () => {
  const sentence = sentenceBox.textContent.trim();
  if (sentence) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Please add some words first!");
  }
});

// Clear the sentence
clearButton.addEventListener("click", () => {
  sentenceBox.textContent = "";
});
