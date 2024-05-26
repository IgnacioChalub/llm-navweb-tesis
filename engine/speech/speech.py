import sounddevice as sd
import numpy as np
import requests
import os

def record_audio(duration, sample_rate=16000):
    """
    Record audio from the microphone.
    """
    print("Recording...")
    audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='int16')
    sd.wait()  # Wait until the recording is finished
    print("Recording complete.")
    return np.squeeze(audio)

def save_audio_to_wav(audio_data, sample_rate, filename="recorded_audio.wav"):
    """
    Save the recorded audio data to a WAV file.
    """
    import wave

    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(1)  # Mono
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(sample_rate)
        wf.writeframes(audio_data.tobytes())
    return filename

def transcribe_audio_with_whisper_api(audio_file_path, openai_api_key):
    """
    Transcribe the given audio file using the Whisper API.
    """
    url = "https://api.openai.com/v1/audio/transcriptions"
    headers = {
        "Authorization": f"Bearer {openai_api_key}"
    }
    files = {
        "file": open(audio_file_path, "rb"),
        "model": (None, "whisper-1"),
    }

    response = requests.post(url, headers=headers, files=files)
    response.raise_for_status()  # Raise an exception for HTTP errors

    return response.json()["text"]

def get_text_from_speech():
    """
    Main function to record audio and transcribe it using the Whisper API.
    """

    duration = 15  # Duration in seconds for the recording
    openai_api_key = os.getenv("OPENAI_API_KEY")

    sample_rate = 16000
    
    # Record audio from the microphone
    audio_data = record_audio(duration, sample_rate)
    
    # Save the recorded audio to a WAV file
    audio_file_path = save_audio_to_wav(audio_data, sample_rate)
    
    # Transcribe the recorded audio using the Whisper API
    transcription = transcribe_audio_with_whisper_api(audio_file_path, openai_api_key)
    
    return transcription