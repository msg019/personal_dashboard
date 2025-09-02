class EmptyFields(Exception):
  def __init__(self, message="Fields are empty"):
    self.message=message

class InvalidUsername(Exception):
  def __init__(self, message="Invalid characters in the username"):
    self.message=message

class InvalidPassword(Exception):
  def __init__(self, message="Invalid characters in the password"):
    self.message=message

class UnavailableUsername(Exception):
  def __init__(self, message="This username is not available"):
    self.message=message

class WrongLogin(Exception):
  def __init__(self, message="Invalid username or password"):
    self.message=message

class InvalidToken(Exception):
  def __init__(self, message="Invalid Token"):
    self.message=message

class InvalidCSRFToken(Exception):
  def __init__(self, message="Invalid CSRF Token"):
    self.message=message

class EmptyFieldsDash(Exception):
  def __init__(self, message="Fields are empty"):
    self.message=message
    
class InvalidMonth(Exception):
  def __init__(self, message="Invalid Month"):
    self.message=message

class InvalidActivity(Exception):
  def __init__(self, message="Activity must be income or spend"):
    self.message=message

class InvalidAmount(Exception):
  def __init__(self, message="Invalid Amount"):
    self.message=message

class InvalidDetails(Exception):
  def __init__(self, message="Invalid Details"):
    self.message=message

class NoOperations(Exception):
  def __init__(self, message="There are not operations"):
    self.message=message
