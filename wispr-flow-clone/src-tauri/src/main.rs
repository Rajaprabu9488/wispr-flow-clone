#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;
use base64::{engine::general_purpose, Engine as _};
use reqwest::blocking::Client;
use serde_json::Value;
use std::env;

#[command]
fn transcribe_audio(audio_base64: String) -> Result<String, String> {
    // Load API key
    let api_key = env::var("DEEPGRAM_API_KEY")
        .map_err(|_| "Deepgram API key not set".to_string())?;

    // Decode base64 audio
    let audio_bytes = general_purpose::STANDARD.decode(audio_base64)
        .map_err(|e| format!("Base64 decode error: {}", e))?;

    println!(" Received audio bytes: {}", audio_bytes.len());

    // Deepgram API
    let client = Client::new();
    
    let response = client
        .post("https://api.deepgram.com/v1/listen?punctuate=true&language=en")
        .header("Authorization", format!("Token {}", api_key))
        .header("Content-Type", "audio/webm")
        .body(audio_bytes)
        .send()
        .map_err(|e| format!("Request error: {}", e))?;

    let json: Value = response
        .json()
        .map_err(|e| format!("JSON parse error: {}", e))?;

    let transcript = json["results"]["channels"][0]["alternatives"][0]["transcript"]
        .as_str()
        .unwrap_or("")
        .to_string();

    Ok(transcript)
}

fn main() {
    dotenvy::dotenv().ok(); 

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![transcribe_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
