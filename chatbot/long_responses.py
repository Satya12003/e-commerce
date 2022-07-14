import random

R_CUSTOMER = "The coustomer care number is: 9588254697"
R_SIZE = "Please refer to the size chart"
R_ADVICE = "If I were you, I would go to the internet and type exactly what you wrote there!"


def unknown():
    response = ["Could you please re-phrase that? ",
                "...",
                "It's good.",
                "What does that mean?"][
        random.randrange(4)]
    return response
