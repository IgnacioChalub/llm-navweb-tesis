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

driver.get("http://localhost:3000/about-next13")

wait = WebDriverWait(driver, 10)

# Locate the heading 'API Routes Enhancements'
header = wait.until(EC.presence_of_element_located((By.XPATH, "//h1[.='API Routes Enhancements']")))

# Collect all sibling elements that follow the located header
# This assumes that all elements of interest are in similar type or inside a container
elements = driver.find_elements(By.XPATH, "//h1[.='API Routes Enhancements']/following-sibling::*")
text_below = [element.text for element in elements if element.text.strip() != '']

print("\n".join(text_below))

time.sleep(10)  # Allow time to review output if necessary
driver.quit()
