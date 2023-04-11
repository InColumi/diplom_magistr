import uvicorn
from dependencies import settings

HOST = settings.HOST
PORT = settings.PORT

if __name__ == '__main__':
    uvicorn.run(app='main:app', host=HOST, port=PORT, reload=True)
