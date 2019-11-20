# Ada Guestbook Backend

## Setup

<!-- TODO: add prereqs: node etc -->

1. Create .env file, using `example.env`

    ```console
    $ cp example.env .env
    ```




### Running tests

```console
$ npm test
```

## Functionality

### Messages

List all messages in descending order

```console
GET /messages
```

Create a message

```console
POST /messages
```

## Running locally


```console
## install deps
$ npm install
## start server
$ npm start
```

### Using Docker

1. Build and tag docker image

    ```console
    $ docker build -t ada-guestbook:v0.1 .
    ```

1. Run docker container, exposing port to local network

    ```console
    $ docker run -d -p 8000:8000 ada-guestbook:v0.1  
    ```

1. Confirm container is running in detached mode

    ```console
    $ docker ps
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    -- should see some stuff here (-: --
    ```

1. Test the server: make a GET request to the `messages` route
    ```console
    $ curl localhost:8000/messages

    [{"name":"Crisco","body":"Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.","stickerUrl":"https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg","timestamp":"11-19-2019"}
    ```

Woo! It works! 


## Deployment

<!-- TODO: -->