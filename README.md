# 🔐💰📊 Personal Dashboard

A full-stack application built with **Flask (Python)** on the backend and **React** on the frontend. It uses **JWT** (JSON Web Tokens) for secure user authentication, **SQLAlchemy** as the **ORM** to interact with a **PostgreSQL** database running in **Docker**, and **Redis** for CSRF token verification, also in **Docker**.

The app allows users to register and log in, add monthly incomes and expenses, and visualize financial data with interactive charts, providing both security and usability in managing personal finances.

---

## Prerequisites 
- Python: 3.13.7
- Flask: 3.1.2
- Node.js: v22.15.0
- React: 19.1.1
- react-chartjs-2: 5.3.0
- Vite: 7.1.4
- Docker: 28.3.3
- postgres: 17.5-alpine
- redis: 8.2

## 🛠 Technologies

- **Backend**: Python + Flask  
- **Frontend**: React  
- **Database**: PostgreSQL + SQLAlchemy + Docker + Redis 



## Instalations

### clone repository
git clone https://github.com/msg019/personal_dashboard.git      
cd personal_dashboard    

### set up docker container  
docker compose up -d  

### set up Backend
cd backend  
python -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt     
python3 main.py  

### set up Frontend  
cd frontend  
npm install  
npm run dev  

