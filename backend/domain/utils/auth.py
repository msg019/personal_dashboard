import hashlib, secrets, os

# Put in env variable
salt=os.getenv("SALT") or "ef90e4bb9bdcb3380af008f90b23a5d16"

def Hashear(passwd):
    return hashlib.pbkdf2_hmac("sha256",passwd.encode("utf-8"),salt.encode("utf-8"),1000).hex()

def compareHash(hash1,hash2):
    return hash1==hash2

def CSRF_token():
    return secrets.token_urlsafe(32)
