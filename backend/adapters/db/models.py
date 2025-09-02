from adapters.db.db import session, User, Operations
from domain.utils.auth import Hashear

def addUser(id,username,passwd):
    localSession=session()
    try:
        username=username.lower()
        passwd=Hashear(passwd)
        user=User(id,username,passwd,1)
        localSession.add(user)
        localSession.commit()
    except:
        localSession.rollback()
    finally:
        localSession.close()


# Check if the username is already registered
def searchUser(username):
    localSession=session()
    try:
        username=username.lower()
        query=localSession.query(User).filter_by(username=username).scalar()
        return query
    finally:
        localSession.close()
    

def searchId(id):
    localSession=session()
    try:
        user=localSession.query(User).filter_by(id=id).first()
        return user
    finally:
        localSession.close()

def addDash(id,user_id,mon,activity,details,amount):
    localSession=session()
    try:
        op= Operations(id=id,user_id=user_id,mon=mon,activity=activity,details=details,amount=amount)
        localSession.add(op)
        localSession.commit()
    except:
        localSession.rollback()
    finally:
        localSession.close()

def readDash(user_id):
    localSession=session()
    try:
        data=localSession.query(Operations).filter_by(user_id=user_id).all()
        return data
    finally:
        localSession.close()

def deleteDash(id,user_id):
    localSession=session()
    try:
        query=localSession.query(Operations).filter_by(id=id, user_id=user_id)
        # CHECK THIS 22
        query.delete(synchronize_session=False)
        localSession.commit()
    except:
        localSession.rollback()
    finally:
        localSession.close()

def updateDash(id,user_id,mon,activity,details,amount):
    localSession=session()
    try:
        query=localSession.query(Operations).filter_by(id=id,user_id=user_id)
        query.update({
            "mon":mon,
            "activity":activity,
            "details":details,
            "amount":amount
            },
            synchronize_session="fetch"
        )
        localSession.commit()
    except Exception as e:
        print(e)
        localSession.rollback()
    finally:
        localSession.close()