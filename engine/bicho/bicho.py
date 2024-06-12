from dotenv import load_dotenv
from openai import OpenAI
import os
import json
from common.action import Action

load_dotenv()

def load_file_from_parent_of_root(filename):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    parent_of_root = os.path.abspath(os.path.join(root_dir, os.pardir))
    file_path = os.path.join(parent_of_root, filename)
    with open(file_path, 'r') as file:
        return file.read()

def run_bicho(user_task) -> list[Action]:
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    )

    file_text = load_file_from_parent_of_root("next-sandbox/test-app/src/app/(unAuthRoutes)/login/page.tsx")

    system_message = f"""
        You are a virtual assistant that creates a list of actions to navigate and use web pages. 
        - The action response has to be a JSON with 3 keys: action, value, element_id
        - action key is a string
        - There is only 3 possible actions INPUT, CLICK-BUTTON, REDIRECT
        - value key is a string and can be null
        - element_id is a string and can be null
        - element_id is the id of the html element or component
        - You are going to receive a nextjs component and you have to return a list of actions to perform the task asked 
        - The json response should have the key actions and the value should be a list of actions. This value should always be a list even if the list is empty or if it only has one action
        The component code is the following: 
        {file_text}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_task}
        ]
    )

    json_response = response.choices[0].message.content

    data = json.loads(json_response)
    actions = []
    for action_data in data["actions"]:
        action = Action(action_data["action"], action_data.get("value", None), action_data["element_id"])
        actions.append(action)

    return actions   
