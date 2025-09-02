import re

regex_user=r'^[a-zA-Z0-9._-]+$'
regex_passwd=r'[<>"\'`\\/]'


def is_valid_username(username):
    return bool(re.fullmatch(regex_user,username))

def is_valid_passwd(passwd):
    return not bool(re.search(regex_passwd,passwd))

