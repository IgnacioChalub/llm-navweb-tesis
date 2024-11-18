from openai import OpenAI
import json
from common.action import Action
from bicho.fileParser import get_components
from common.find_page_by_url import find_page_tsx


def run_bicho(openai_api_key, user_task, repo_path, entry_file_path) -> list[Action]:
    client = OpenAI(
        api_key=openai_api_key
    )
    components_list = resolve_components(entry_file_path, repo_path)

    file_text = "\n".join(components_list)
    system_message = f"""
        You are a virtual assistant that creates a list of actions to navigate and use web pages. 
        - The action response has to be a JSON with 5 keys: action, value, element_id, is_redirect, last
        - action key is a string            
        - There is only 2 possible actions INPUT, CLICK-BUTTON
        - In case that clicking a button generates a redirect the flag is_redirect should be True and the value should be the url where the redirect is been done otherwise it should be False
        - If the action is the last action needed to complete the task: set the last flag to True, otherwise it should be False
        - If redirect is to the same page the user is currently on, don't set is_redirect to true
        - If is_redirect is True, the value should be the relative path where the redirect is been done
        - Redirect could be push('/value'), been '/value' the relative path where the redirect is been done
        - value key is a string and can be null
        - element_id is a string and can be null
        - element_id is the id of the html element or component
        - You are going to receive a NextJS page and associated components
        - Im going to do multiple requests and in each request I want to receive an action 
        - We are going to build a list of actions
        - The json response should always be an action
        The component code is the following: 
        {file_text}
    """

    current_chat = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_task}
    ]
    actions = []

    exit_loop = False
    while not exit_loop:
        response = client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=current_chat
        )
        json_response = response.choices[0].message.content
        current_chat.append({"role": "assistant", "content": json_response})

        data = json.loads(json_response)
        new_action = Action(data["action"], data.get("value", None), data["element_id"], data["is_redirect"],
                            data["last"])
        actions.append(new_action)
        print(new_action)

        if new_action.last is True:
            exit_loop = True

        if new_action.is_redirect is True:
            new_page_path = find_page_tsx(repo_path, new_action.value)
            dashboard_components_list = resolve_components(new_page_path, repo_path)

            new_file_text = "\n".join(dashboard_components_list)
            new_system_message = f"""
                    Since there was a redirect you should use this new components to resolve the actions
                    The instructions are the same as before: you are a virtual assistant that creates a list of actions to navigate and use web pages. 
                    - The action response has to be a JSON with 5 keys: action, value, element_id, is_redirect, last
                    - action key is a string
                    - There is only 2 possible actions INPUT, CLICK-BUTTON
                    - In case that clicking a button generates a redirect the flag is_redirect should be True and the value should be the url where the redirect is been done otherwise it should be False
                    - If the action is the last action needed to complete the task: set the last flag to True, otherwise it should be False
                    - If redirect is to the same page the user is currently on, don't set is_redirect to true
                    - If is_redirect is True, the value should be the relative path where the redirect is been done
                    - Redirect could be push('/value'), been '/value' the relative path where the redirect is been done
                    - value key is a string and can be null
                    - element_id is a string and can be null
                    - element_id is the id of the html element or component
                    - You are going to receive a NextJS page and associated components
                    - Im going to do multiple requests and in each request I want to receive an action 
                    - We are going to build a list of actions
                    - The json response should always be an action
                    The new components are the following: 
                    {new_file_text}
                """
            current_chat.append({"role": "system", "content": new_system_message})



    return actions

def resolve_components(entry_file_path, repo_path):
    file_path = repo_path + entry_file_path
    components_list = get_components(file_path, repo_path)
    return components_list