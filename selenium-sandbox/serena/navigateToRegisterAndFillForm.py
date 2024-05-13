from Serena import serena_script
from Serena import Action

def main():
    # Actions to navigate and fill the form
    actions = [
            Action("CLICK-BUTTON", None, "register-button"),
            Action("INPUT", "example@email.com", "email-register-input"),
            Action("INPUT", "Beltran", "username-register-input"),
            Action("INPUT", "securepassword123", "password-register-input"),
            Action("CLICK-BUTTON", None, "submit-button-id")
        ]

    # Define the URL for the main page
    url = "http://localhost:3000"

    # Call the generic script function with the URL and actions
    serena_script(url, actions)

if __name__ == "__main__":
    main()
