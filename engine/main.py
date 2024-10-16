import os
from dotenv import load_dotenv
from bicho.bicho import run_bicho
from serena.serena import serena_script
from speech.speech import get_text_from_speech

load_dotenv()

def main():
    openai_api_key = os.getenv("OPENAI_API_KEY")
    url = "http://localhost:3000/"
    repo_path = "/Users/ignaciochalub/faculty/llm-navweb-tesis/next-sandbox/test-app/src"
    # entry_file = "next-sandbox/test-app/src/app/(unAuthRoutes)/login/page.tsx"
    entry_file = "next-sandbox/test-app/src/app/page.tsx"

    # user_task = get_text_from_speech(openai_api_key)
    user_task = "Login with username ignacio and password ignacio and then Deposit $150"
    print("User task:", user_task)

    actions = run_bicho(openai_api_key, user_task, repo_path, entry_file)

    serena_script(url, actions)

if __name__ == "__main__":
    main()