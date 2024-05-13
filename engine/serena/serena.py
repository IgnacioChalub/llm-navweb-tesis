from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

class Action:
    def __init__(self, action_type, value, element_id):
        self.action_type = action_type
        self.value = value
        self.element_id = element_id

    def __str__(self):
        return f'{{"action": "{self.action_type}", "value": "{self.value}", "element_id": "{self.element_id}"}}'

    def perform(self, driver):
        if self.action_type == "INPUT":
            input_field = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, self.element_id))
            )
            input_field.clear()
            input_field.send_keys(self.value)
        elif self.action_type == "CLICK-BUTTON":
            button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, self.element_id))
            )
            button.click()
        elif self.action_type == "REDIRECT":
            driver.get(self.value)

def setup_driver():
    options = Options()
    options.add_argument("--start-maximized")
    options.add_experimental_option("detach", True)
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def perform_actions(driver, actions):
    for action in actions:
        action.perform(driver)

def serena_script(url, actions):
    driver = setup_driver()
    driver.get(url)
    perform_actions(driver, actions)
    time.sleep(5)
    driver.quit()

