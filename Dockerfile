FROM python:3.10.4

WORKDIR /var/python/net-profit-calculator

COPY . .

RUN pip install -r requirements.txt

CMD [ "python", "./src/calculator.py" ]