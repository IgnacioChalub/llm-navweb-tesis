from Serena import serena_script
from Serena import Action

def main():
    # Define the URL and actions for the form
    url = "http://localhost:3000/register"
    actions = [
        Action("INPUT", "example@email.com", "email-register-input"),
        Action("INPUT", "Beltran", "username-register-input"),
        Action("INPUT", "securepassword123", "password-register-input"),
        Action("CLICK-BUTTON", None, "submit-button-id")  # Ensure correct ID
    ]

    # Call the generic script function with the URL and actions
    serena_script(url, actions)

if __name__ == "__main__":
    main()
