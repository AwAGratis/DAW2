from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hola() :
    return {"Missatge":"HOLA KELOKE"}

if __name__ == "__main__":
    pass

# uv init nomdelprojecte
# uv add fastapi uvicorn sqlAlchemy
# uv run uvicorn main:app
