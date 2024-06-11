import os
from dotenv import load_dotenv
from bicho.bicho import run_bicho
from serena.serena import serena_script
from speech.speech import get_text_from_speech

load_dotenv()

def main():
    openai_api_key = os.getenv("OPENAI_API_KEY")

    url = "http://localhost:3000/login"
    user_task = get_text_from_speech(openai_api_key)

    print("User task:", user_task)


    actions = run_bicho(openai_api_key, user_task)
    for action in actions:
        print(action)

    serena_script(url, actions)

if __name__ == "__main__":
    main()