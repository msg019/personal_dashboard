from adapters.db.models import addDash, readDash, deleteDash, updateDash
from domain.utils.dash_valid import is_valid_activity, is_valid_month, is_valid_details
from domain.exceptions import InvalidMonth, InvalidActivity, InvalidAmount, InvalidDetails, EmptyFieldsDash, InvalidToken,NoOperations, InvalidCSRFToken
from domain.utils.dash import change_month, create_op, chart_data
from domain.utils.jwt_handler import id_token
from domain.utils.redis_func import getCSRFToken
from domain.utils.id_generator import id_generator

class DashService:

    def register(self,token,csrf_token,mon,activity,details,amount):
        if not mon or not activity or not details or not amount:
            raise EmptyFieldsDash()
        
        if not is_valid_month(mon):
            raise InvalidMonth()
        
        if not is_valid_activity(activity):
            raise InvalidActivity()
        
        if not float(amount) or amount<0:
            raise InvalidAmount()
        
        if not is_valid_details(details):
            raise InvalidDetails()
        
        if not id_token(token):
            raise InvalidToken()

        user_id=id_token(token)

        stored_csrf= getCSRFToken(user_id)

        if stored_csrf is None or stored_csrf!=csrf_token:
            raise InvalidCSRFToken()

        activity=activity.lower()
        mon=change_month(mon)
        id=id_generator()

        addDash(id=id,user_id=user_id,mon=mon,activity=activity,details=details,amount=amount)

    def read(self,csrf_token,token):

        user_id=id_token(token)
        data=readDash(user_id)

        stored_csrf=getCSRFToken(user_id)

        if not data:
            ops=[]
            incomes=[0]*12
            spends=[0]*12
            return ops, incomes, spends
        
        if stored_csrf is None or stored_csrf!=csrf_token:
            raise InvalidCSRFToken()
        
        
        ops=create_op(data)

        incomes, spends= chart_data(data)

        return ops, incomes, spends
    
    def delete(self,csrf_token,token,id):
        user_id=id_token(token)

        stored_csrf=getCSRFToken(user_id)

        if stored_csrf is None or stored_csrf!=csrf_token:
            raise InvalidCSRFToken()

        deleteDash(id=id, user_id=user_id)

    def update(self,id,token,csrf_token,mon,activity,details,amount):
        user_id=id_token(token)

        stored_csrf=getCSRFToken(user_id)

        if stored_csrf is None or stored_csrf!=csrf_token:
            raise InvalidCSRFToken()
        
        mon=change_month(mon)
        activity=activity.lower()
        
        updateDash(id=id,user_id=user_id,mon=mon,activity=activity,details=details,amount=amount)

