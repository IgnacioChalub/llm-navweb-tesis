from GenericScript import generic_script

def main():
    # Define the URL and actions for the form
    url = "http://localhost:3000/register"
    actions = [
        ("INPUT", "example@email.com", "email-register-input"),
        ("INPUT", "Beltran", "username-register-input"),
        ("INPUT", "securepassword123", "password-register-input"),
        ("CLICK-BUTTON", None, "submit-button-id")  # Ensure correct ID
    ]

    # Call the generic script function with the URL and actions
    generic_script(url, actions)

if __name__ == "__main__":
    main()
