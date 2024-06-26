import sys
import os

# Add the parent directory of 'common' to the sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
sys.path.append(parent_dir)

from common.action import Action
from typing import List
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time


def perform(action: Action, driver):
    if action.action_type == "INPUT":
        input_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, action.element_id))
        )
        input_field.clear()
        input_field.send_keys(action.value)
    elif action.action_type == "CLICK-BUTTON":
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, action.element_id))
        )
        button.click()
    elif action.action_type == "REDIRECT":
        driver.get(action.value)


def setup_driver():
    options = Options()
    options.add_argument("--start-maximized")
    options.add_experimental_option("detach", True)
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver


def perform_actions(driver, actions: List[Action]):
    for action in actions:
        perform(action, driver)


def serena_script(url: str, actions: List[Action]):
    driver = setup_driver()
    driver.get(url)
    perform_actions(driver, actions)
    time.sleep(5)
    driver.quit()

