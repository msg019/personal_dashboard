import uuid

def id_generator():
    return str(uuid.uuid4()).split("-")[0]