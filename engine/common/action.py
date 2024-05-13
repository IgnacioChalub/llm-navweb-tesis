
class Action:
    def __init__(self, action_type, value, element_id):
        self.action_type = action_type
        self.value = value
        self.element_id = element_id

    def __str__(self):
        return f'{{"action": "{self.action_type}", "value": "{self.value}", "element_id": "{self.element_id}"}}'
