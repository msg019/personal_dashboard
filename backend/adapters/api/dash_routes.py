from flask import Blueprint, request, jsonify
from use_cases.AuthService import AuthService
from use_cases.DashService import DashService
from domain.exceptions import *

dash_bp=Blueprint("dash",__name__)

# Dashboard routes  
@dash_bp.route("/api/dashboard/register", methods=["POST"])
def dash_register():
    if request.method == "POST":
        token=request.cookies.get("token")
        csrf_token=request.headers.get("X-CSRF")
        data=request.get_json()
        mon=data["mon"]
        activity=data["activity"]
        details=data["details"]
        amount=data["amount"]


        dash=DashService()
        try:
            dash.register(token=token,csrf_token=csrf_token,mon=mon,activity=activity,details=details,amount=amount)
            return jsonify({"message":"Operation saved"}), 200
        except EmptyFieldsDash as e:
            return jsonify({"error":e.message}), 400
        except InvalidMonth as e:
            return jsonify({"error":e.message}), 400
        except InvalidActivity as e:
            return jsonify({"error":e.message}), 400
        except InvalidDetails as e:
            return jsonify({"error":e.message}), 400
        except InvalidAmount as e:
            return jsonify({"error":e.message}), 400
        except InvalidToken as e:
            return jsonify({"error":e.message}), 400
        except InvalidCSRFToken as e:
            return jsonify({"error":e.message}), 400
        except Exception:
            return jsonify({"error":"Internal server error"}), 500

        
@dash_bp.route("/api/dashboard/read", methods=["GET"])
def dash_read():    
    if request.method=="GET":
        token=request.cookies.get("token")
        csrf_token=request.headers.get("X-CSRF")

        dash=DashService()
        auth=AuthService()
        try:
            auth.validate(token)
            ops, incomes, spends=dash.read(token=token,csrf_token=csrf_token)
            return jsonify({"data":ops, "incomes":incomes, "spends":spends}), 200
        except InvalidToken as e:
            return jsonify({"error":e.message}), 400
        except InvalidCSRFToken as e:
            return jsonify({"error":e.message}), 400
        except Exception as e:
            return jsonify({"error":"Internal server error"}), 500
        
@dash_bp.route("/api/dashboard/delete", methods=["DELETE"])
def dash_delete():
    if request.method=="DELETE":
        token=request.cookies.get("token")
        csrf_token=request.headers.get("X-CSRF")
        id=request.args.get("id")

        dash=DashService()
        auth=AuthService()

        try:
            auth.validate(token)
            dash.delete(csrf_token=csrf_token,token=token,id=id)

            return jsonify({"message":"Operation deleted successfully"}), 200
        except InvalidToken as e:
            return jsonify({"error":e.message}), 400
        except InvalidCSRFToken as e:
            return jsonify({"error":e.message}), 400
        except Exception:
            return jsonify({"error":"Internal server error"}), 500
            

    
@dash_bp.route("/api/dashboard/update", methods=["PUT"])
def dash_update():
    if request.method=="PUT":
        token=request.cookies.get("token")
        csrf_token=request.headers.get("X-CSRF")
        data=request.get_json()

        id=data["id"]
        mon=data["mon"]
        activity=data["activity"]
        details=data["details"]
        amount=data["amount"]

        dash=DashService()
        auth=AuthService()

        try:
            auth.validate(token)
            dash.update(id=id,token=token,csrf_token=csrf_token,mon=mon,activity=activity,details=details,amount=amount)
            return jsonify({"message":"Operation updated successfutlly"}), 200
        except InvalidToken as e:
            return jsonify({"error":e.message}), 400
        except InvalidCSRFToken as e:
            return jsonify({"error":e.message}), 400