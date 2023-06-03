FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app/

























# FROM python:3.9-slim

# #Install git
# # RUN apt-get install -y git

# # git clone

# COPY /app /app
# COPY requirements.txt .
# COPY path.py ../

# # RUN apt-get install -y git
# RUN python -m pip install update pip
# RUN pip install -r requirements.txt


# ENTRYPOINT  ["python"]
