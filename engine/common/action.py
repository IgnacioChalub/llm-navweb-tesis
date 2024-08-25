
class Action:
    def __init__(self, action_type, value, element_id, is_redirect, last):
        self.action_type = action_type
        self.value = value
        self.element_id = element_id
        self.is_redirect = is_redirect
        self.last = last

    def __str__(self):
        return f'{{"action": "{self.action_type}", "value": "{self.value}", "element_id": "{self.element_id}", "is_redirect": "{self.is_redirect}", "last": "{self.last}"}}'
