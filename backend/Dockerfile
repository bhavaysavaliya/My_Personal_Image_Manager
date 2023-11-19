FROM python:3.11.6
WORKDIR /app
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6
ADD requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . .
RUN pip install IPython
RUN mkdir dataset
EXPOSE 5000
CMD [ "python","app.py" ]