import redis,os

port=os.getenv("REDIS_PORT") or 6379

def redis_client():
    return redis.Redis(host="localhost", port=port, db=0)