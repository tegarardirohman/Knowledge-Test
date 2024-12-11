class AuthenticationError(Exception):
    def __init__(self, message="Authentication failed"):
        self.message = message
        super().__init__(self.message)

class AuthorizationError(Exception):
    def __init__(self, message="Authorization failed"):
        self.message = message
        super().__init__(self.message)

class NotFoundError(Exception):
    def __init__(self, message="Data not found"):
        self.message = message
        super().__init__(self.message)

class ValidationError(Exception):
    def __init__(self, message="Validation failed"):
        self.message = message
        super().__init__(self.message)