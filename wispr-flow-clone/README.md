# 🎙️ WisprFlow – Voice to Text Desktop Application

WisprFlow is a cross-platform desktop speech-to-text application built using React + Tauri.
It records microphone audio, visualizes waveforms in real time, sends audio to a Rust backend, and uses Deepgram for accurate transcription with a typing animation effect.

# 📌 Table of Contents

  • Architecture Overview
  
  • Tech Stack
  
  • Project Structure
  
  • Data Flow
  
  • Setup Instructions
  
  • Key Design Decisions
  
  • Security Considerations
  
  • Known Limitations
  
  • Future Improvements

# 🏗️ Architecture Overview

<img width="919" height="667" alt="image" src="https://github.com/user-attachments/assets/77a169d8-1bdc-4265-b1e2-024112f3024d" />


# 🛠️ Tech Stack

  ## Frontend 
  • React + Vite
  
  • Web Audio API
  
  • MediaRecorder API
  
  • HTML Canvas (waveform)
  
  • CSS (custom styling)

  ## Backend
  • Tauri
  
  • Rust
  
  • Deepgram Speech-to-Text API

 # 📁 Project Structure

<img width="691" height="492" alt="image" src="https://github.com/user-attachments/assets/eecf00e8-ba03-4a37-b7a1-2c3e0f29fae6" />


# 🔄 Data Flow

  1. User clicks Start Recording
     
  2. Browser requests microphone permission
     
  3. Audio is captured using MediaRecorder
     
  4. Waveform rendered using AnalyserNode
     
  5. Audio chunks combined → Blob
      
  6. Blob converted to Base64
   
  7. Base64 audio sent to Tauri via invoke()
   
  8. Rust backend sends audio to Deepgram
   
  9. Transcript returned to frontend
   
  10. Typing animation displays text in textarea

# 🔑 Steps to Get a Deepgram API Key
## 1️⃣ Create a Deepgram Account

  • Go to Deepgram official website
  
  • Click Sign Up
  
  • Sign up using:
  
    • Google account or
    
    • Email & password
    
  • Verify your email if prompted

## 2️⃣ Create a New Project

  • After login, go to the Deepgram Dashboard
  
  • Click Create Project
  
  • Give it a name (example: WisprFlow)
  
  • Create the project

## 3️⃣ Generate an API Key

  • Inside the project, navigate to API Keys
  
  • Click Create API Key

  Click Create

  👉 You will see a key like:
    `dg_xxxxxxxxxxxxxxxxxxxxx`

## 4️⃣ Store the API Key Securely (Recommended Way)

Create a .env file inside:

`src-tauri/.env`

Add:

`DEEPGRAM_API_KEY = dg_your_api_key_here`

# ⚙️ Setup Instructions

## 🔹 Prerequisites
  • Node.js >= 18
  
  • Rust (stable)
  
  • Tauri CLI (V2 or 2.6.X)
  
  • Deepgram API
  
  ## In Terminal (After git clone):
  `cd wispr-flow-clone`
      
  ## After installation of Rust, Install Tauri with this command:
  `cargo install tauri-cli`
            (or)
  `npm install tauri-cli`
      
## 🔹 Clone Repository
  `git clone https://github.com/your-username/wisprflow.git`

## 🔹 Install Frontend Dependencies
  `npm install`

## 🔹 Environment Variables (Backend)

  Do NOT expose API keys in frontend
  
  Create:
  
  `src-tauri/.env`
  
  Inside .env:
  
  `DEEPGRAM_API_KEY = your_deepgram_key_here`

## 🔹 Run in Development

  For react: 
  
  `npm run dev`
      
  For tauri:
  
  `npx tauri dev`


# 🧠 Key Design Decisions

## 1️⃣ React + Tauri (Instead of Electron)

  • Smaller binary size
  
  • Better performance
  
  • Native OS APIs via Rust
  
  • Improved security model

## 2️⃣ Audio Processing in Frontend

  • MediaRecorder used for accurate audio capture
  
  • Web Audio API used for visualization only
  
  • Keeps backend lightweight

## 3️⃣ Base64 Audio Transfer

  • Simplifies IPC between JS ↔ Rust
  
  • Avoids filesystem writes during transcription
  
  • Safer for sandboxed environments

## 4️⃣ Typing Effect in App.jsx

  • UI responsibility stays in parent component
  
  • Clean separation of logic and presentation
  
  • Improves perceived responsiveness

# 🔐 Security Considerations

  • API keys stored only in Rust backend
  
  • .env files excluded via .gitignore
  
  • No direct external HTTP calls from frontend
  
  • Tauri IPC used instead of exposing REST endpoints

# ⚠️ Known Limitations

  • No real-time streaming transcription
  
  • Large recordings increase memory usage
  
  • Works best with single-speaker audio
  
  • No offline transcription support
  
  • WebM audio format only
  
  • No text summarization
  
  • No auto-correction
  
# 📷 Screenshot:
  
# 📌 Repository Notes:

  • node_modules/ and src-tauri/target/ are excluded from this repository due to large file size and are generated during build.
  
  • The Deepgram API key is not included for security reasons and must be provided via a local .env file.
