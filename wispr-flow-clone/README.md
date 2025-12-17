#🎙️ WisprFlow – Voice to Text Desktop Application

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

┌─────────────┐
│ Microphone  │
└──────┬──────┘
         │
         ▼
┌────────────────────┐
│   React Frontend   │
│ (AudioRecorder)    │
│ - MediaRecorder    │
│ - Web Audio API    │
│ - Waveform Canvas  │
└──────┬────────────┘
         │ base64 audio
         ▼
┌────────────────────┐             Audio(Webm)         ┌────────────────────┐ 
│   Tauri Backend    │ ------------------------------> |    Deepgram API    |
│ (Rust Command)     │                                 |  - Audio(webm)     |
│ - Receives audio   │                                 |  - Transcript Text |
│ - Calls Deepgram   │ <------------------------------ |                    |
└──────┬────────────┘                Text              └────────────────────┘
         │ transcript
         ▼
┌────────────────────┐
│    React App.jsx   │
│ - Typing Effect    │
│ - Textarea UI      │
└────────────────────┘

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

 wispr-flow-clone/
├── public
|   ├── logo.png                # Title logo
├── src/
│   ├── App.jsx                 # Root component
│   ├── Audiorecorder.jsx       # Audio capture + waveform
│   ├── Statuspopup.jsx         # Mic & network status
│   ├── assets/                 # UI icons
│   └── *.css                   # Styling
│
├── src-tauri/
│   ├── src/
│   │   └── main.rs              # Tauri backend & Deepgram logic
│   ├── tauri.conf.json
|   ├── .env                     # Deepgram API
│   └── Cargo.toml
│
├── .gitignore
├── package.json
└── README.md

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

# ⚙️ Setup Instructions
## 🔹 Prerequisites
      • Node.js >= 18
      • Rust (stable)
      • Tauri CLI (V2 or 2.6.X)
    
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
    ** Create: **
        `src-tauri/.env`
    ** Inside .env **
        `DEEPGRAM_API_KEY = your_deepgram_key_here`

## 🔹 Run in Development
      `npm run tauri dev`

