from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

options = Options()
options.add_argument("--start-maximized")
options.add_experimental_option("detach", True)

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

driver.get("http://localhost:3000")

wait = WebDriverWait(driver, 10)

input1 = wait.until(EC.presence_of_element_located((By.ID, "input1-id")))
input2 = wait.until(EC.presence_of_element_located((By.NAME, "input2")))

input1.send_keys("Text for input1")
input2.send_keys("Text for input2")

submit_button = wait.until(EC.presence_of_element_located((By.ID, "submit-button")))
submit_button.click()

time.sleep(10)
driver.quit()
