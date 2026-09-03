from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Habilitar CORS para desarrollo local fluido
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/tasks")
def get_tasks():
    return ["Diseñar base de datos", "Revisar Mockups UI", "Prueba de API con FastAPI"]