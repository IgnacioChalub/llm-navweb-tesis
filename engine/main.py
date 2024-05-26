from bicho.bicho import run_bicho
from serena.serena import serena_script
from speech.speech import get_text_from_speech

def main():
    url = "http://localhost:3000/login"
    user_task = get_text_from_speech()

    print("User task:", user_task)

    actions = run_bicho(user_task)
    for action in actions:
        print(action)
    serena_script(url, actions)

if __name__ == "__main__":
    main()