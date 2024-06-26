import sys
import os

# Add the parent directory of 'serena' to the sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
sys.path.append(parent_dir)

from serena import serena_script
from serena import Action

def main():
    url = "http://localhost:3000"
    actions = [
        Action("CLICK-BUTTON", None, "login-button"),
        Action("INPUT", "beltran7", "login-username-input"),
        Action("INPUT", "123", "login-password-input"),
        Action("CLICK-BUTTON", None, "login-button-submit"),
        Action("CLICK-BUTTON", None, "quick-actions-card-deposit-button"),
        Action("INPUT", "100", "quick-actions-card-amount-input"),
        Action("CLICK-BUTTON", None, "quick-actions-card-confirm-button"),
    ]

    # Call the generic script function with the URL and actions
    serena_script(url, actions)

if __name__ == "__main__":
    main()
