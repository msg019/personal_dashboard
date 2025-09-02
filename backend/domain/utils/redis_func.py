from infrastructure.redis_client import redis_client

def getCSRFToken(user_id):
    r=redis_client()
    stored_csrf= r.get(f'csrf-token:{user_id}')
    return stored_csrf.decode()

def saveCSRFToken(user_id,csrf_token):
    r=redis_client()
    r.setex(f'csrf-token:{user_id}',900,csrf_token)
