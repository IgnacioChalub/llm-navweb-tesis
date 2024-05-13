from bicho.bicho import run_bicho
from serena.serena import serena_script

url = "http://localhost:3000/login"
user_task = "Login with name Juan and password 123hola_123"

actions = run_bicho(user_task)
for action in actions:
    print(action)
serena_script(url, actions)


