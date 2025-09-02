import re

regex1=r'^[a-zA-Z0-9,.-]$'

months_dicc={
    "january" : "jan",
    "february": "feb",
    "march": "mar",
    "april": "apr",
    "may": "may",
    "june":"jun",
    "july":"jul",
    "august": "aug",
    "september":"sep",
    "october":"oct",
    "november":"nov",
    "december":"dec"
}

activities=["income","spend"]

def is_valid_month(mon):
    return mon.lower() in months_dicc.keys()

def is_valid_activity(activity):
    return activity.lower() in activities
        

def is_valid_details(details):
    return not bool(re.fullmatch(regex1,details))
