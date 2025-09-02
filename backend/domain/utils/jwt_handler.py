import jwt, datetime,os
from datetime import timezone
from adapters.db.models import searchId
from domain.exceptions import InvalidToken

secret=os.getenv("SECRET") or "19bc298105da20fe"

def generate_jwt(user):
    now= datetime.datetime.now(tz=timezone.utc)
    expiry= now + datetime.timedelta(minutes=15)

    return jwt.encode({
            "id":user.id,
            "username":user.username,
            "iat": now ,
            "exp":expiry, 
            "session_version":user.session_version
            }, secret,algorithm="HS256"
        )

def check_jwt(token):
    try:
        payload=jwt.decode(token,secret,algorithms="HS256")  
        user=searchId(payload["id"]) 
        if not user or  user.username != payload["username"] or user.id != payload["id"] or user.session_version != payload["session_version"]:
            return False
        return True
    except:
        raise InvalidToken
    
# Obtain id from token
def id_token(token):   
    try:  
        payload=jwt.decode(token,secret,algorithms="HS256")
        return payload["id"]
    except:
        raise InvalidToken
   

