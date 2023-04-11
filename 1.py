from datetime import datetime, timedelta
from jose import JWTError, jwt
import time 

from fastapi.encoders import jsonable_encoder



secret_ker1 = 'key_good'
exp_time = 4
now = datetime.utcnow()

exp_time = now + timedelta(seconds=exp_time)

data = {'username': 'panov'}
data.update({'exp': exp_time})
count = 1
token = jwt.encode(claims=data, key=secret_ker1)
print(token)

time.sleep(2)
try:
    res = jwt.decode(token=token, key=secret_ker1)
    print(res)
except JWTError as e:
    print(str(e))
