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

driver.get("http://localhost:3000/form")

wait = WebDriverWait(driver, 10)

# Fill the Name field
name_field = wait.until(EC.presence_of_element_located((By.NAME, "name")))
name_field.send_keys("John Doe")

# Fill the ID field - assuming the second input field by order
id_field = wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "input")))[1]
id_field.clear()
id_field.send_keys("12345")

# Fill the Date of Birth field
dob_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='date']")))
dob_field.send_keys("01-01-1990")  # Date must be in YYYY-MM-DD format

# Select the Gender using Selenium's built-in click, ensuring the element is clickable
male_option = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='radio'][value='male']")))
time.sleep(1)  # Optional: give some time if there is a delay in the JS event handlers
male_option.click()

# Check the 'Agree to terms' checkbox
terms_checkbox = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='checkbox']")))
terms_checkbox.click()

# Click the Submit button
submit_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[type='submit']")))
submit_button.click()

time.sleep(10)
driver.quit()

