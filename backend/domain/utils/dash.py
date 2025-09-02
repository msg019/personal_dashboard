from domain.utils.dash_valid import months_dicc

month_to_index = {
    "jan": 0, "feb": 1, "mar": 2, "apr": 3,
    "may": 4, "jun": 5, "jul": 6, "aug": 7,
    "sep": 8, "oct": 9, "nov": 10, "dec": 11
}

def change_month(mon):
    return months_dicc[mon.lower()]

def reverse_month(mon):
    return [key for key,value in months_dicc.items() if value==mon][0].capitalize()

def create_op(ops):
    data=[]
    for op in ops:
        op={
            "id": op.id,
            "mon": reverse_month(op.mon),
            "activity": op.activity,
            "details": op.details,
            "amount": op.amount
        }

        data.append(op)
        op={}

    return data

def chart_data(ops):
    incomes=[0]*12
    spends=[0]*12


    for op in ops:
        index=month_to_index.get(op.mon)

        if index is None:
            continue

        if op.activity=="income":
            incomes[index]+=op.amount
        elif op.activity=="spend":
            spends[index]+=op.amount
        
    
    return incomes, spends
        