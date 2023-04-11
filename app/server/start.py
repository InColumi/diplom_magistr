import uvicorn
from config import Config

HOST = Config.HOST
PORT = Config.PORT

if __name__ == '__main__':
    uvicorn.run(app='main:app', host=HOST, port=PORT, reload=True)