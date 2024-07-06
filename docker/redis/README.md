docker run -d --name <CONTAINER_NAME> -p 127.0.0.1:6379:6379 redis


docker exec -it <CONTAINER_NAME|ID> sh

command to run cli:
redis-cli

commands to do operation:
    ping
    get 
    set
    del
    exit