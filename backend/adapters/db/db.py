from sqlalchemy import create_engine,Integer,String, Enum, Float
from sqlalchemy.orm import mapped_column, DeclarativeBase, Mapped, sessionmaker
import os

postgres=os.getenv("POSTGRESQL_URL") or "postgresql://user-db:app_1234@localhost:5432/app-db"

# Connect to db
engine= create_engine(postgres)

session=sessionmaker(bind=engine)

# Object to connect to the table
class Base(DeclarativeBase):
    pass

class User(Base):
    # Rewrite the necessary arguments
    def __init__(self,id,username,passwd,session_version):
        self.id=id
        self.username=username
        self.passwd=passwd
        self.session_version=session_version
        
    # Connection to the table
    __tablename__="users"
    id: Mapped[str]=mapped_column(String(15),primary_key=True)
    username: Mapped[str]=mapped_column(String(30), nullable=False)
    passwd: Mapped[str]=mapped_column(String(90), nullable=False)
    session_version: Mapped[int]=mapped_column(Integer,default=1, nullable=False)

class Operations(Base):

    def __init__(self, id, user_id,activity, mon,details, amount):
        self.id=id
        self.user_id=user_id
        self.activity=activity
        self.mon=mon
        self.details=details
        self.amount=amount

    __tablename__="operations"
    id: Mapped[str]= mapped_column(String(15), primary_key=True)
    user_id: Mapped[str]=mapped_column(String(15), nullable=False)
    mon: Mapped[str]=mapped_column(Enum("jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"), nullable=False)
    activity: Mapped[str]=mapped_column(Enum("income","spend"), nullable=False)
    details: Mapped[str]=mapped_column(String(50))
    amount: Mapped[float]=mapped_column(Float, nullable=False)
                    
