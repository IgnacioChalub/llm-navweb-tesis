import os
from dotenv import load_dotenv
from bicho.bicho import run_bicho
from serena.serena import serena_script
from speech.speech import get_text_from_speech

load_dotenv()

def main():
    openai_api_key = os.getenv("OPENAI_API_KEY")
    url = "http://localhost:3000/"
    repo_path = "/Users/ignaciochalub/faculty/llm-navweb-tesis/next-sandbox/test-app"
    entry_file_path = "/src/app/page.tsx"

    # user_task = get_text_from_speech(openai_api_key)
    user_task = "Login with username mateo and password mateo"
    print("User task:", user_task)


    actions = run_bicho(openai_api_key, user_task, repo_path, entry_file_path)

    serena_script(url, actions)

if __name__ == "__main__":
    main()