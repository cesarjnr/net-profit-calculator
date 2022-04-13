from dotenv import load_dotenv
from redis import Redis
from os import environ

load_dotenv()

redisClient = Redis(host=environ['REDIS_HOST'], decode_responses=True)

redisClient.set('foo', 'bar')
result = redisClient.get('foo')

print('Result: ', result)

redisClient.delete('foo')
result = redisClient.get('foo')

print('Result: ', result)
