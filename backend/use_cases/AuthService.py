from domain.utils.auth import compareHash, CSRF_token, Hashear
from domain.utils.valid import is_valid_passwd, is_valid_username
from domain.utils.id_generator import id_generator
from adapters.db.models import searchUser, addUser
from domain.utils.jwt_handler import generate_jwt,check_jwt
from domain.exceptions import *

class AuthService():
 
    # Register an user
    def register(self, username,passwd):
        if not username or not passwd:
            raise EmptyFields()
            
        if not is_valid_username(username):
            raise InvalidUsername()
            
        if not is_valid_passwd(passwd):
            raise InvalidPassword()
            
            
        if searchUser(username):
            raise UnavailableUsername()
            
        addUser(id_generator(),username,passwd)

    # Login an user
    def login(self,username,passwd):
        if not username or not passwd:
            raise EmptyFields()
        
        user= searchUser(username)
        hashed=Hashear(passwd)

        if not user:
            raise WrongLogin()
        
        if compareHash(hashed, user.passwd):
            id=user.id
            return generate_jwt(user), CSRF_token(), id
        else:
            raise WrongLogin()
        
   
    # Validate jwt token
    def validate(self, token):
        if check_jwt(token):
            return True
        else:
           raise InvalidToken()
        
