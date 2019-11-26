# Ada Guestbook Backend

## Setup

<!-- TODO: add prereqs: node etc -->

1. Create `.env` file, using `example.env`

    ```console
    $ cp example.env .env
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

1. Install dependencies

    ```console
    $ npm install
    ```

1.  Run unit tests

    ```console
    $ npm test
    ```

1. Start server

    ```console
    $ npm start
    ```

1. Test the server: make a GET request to the messages route in another terminal window.

    ```console
    $ curl localhost:8000/messages
    ```

1. Stop server: Ctrl + C

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

1. To close server, run stop command with container ID
    * Get container ID
        ```console
        $ docker ps
        CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
         <container id>
        ```
    * Stop constainer
        ```console
        $ docker stop <container ID>
        ```
## Database
If we're going to have users post messages to the guestbook, we need somewhere to store those messages. For this project, we're going to create a Postgres database with CloudSQL, which is a relational database (a structured db with rows and columns). The Database Deep Dive discusses why we're using a relational database for this project as opposed to a non-relational database (like Firestore). 

#### Create an Instance
There are a few steps we need to take to get our database working. First, we need to create a CloudSQL instance in the Google Cloud Console. This can be done by following the instructions found under the "Create an Instance" heading in the [CloudSQL PostgreSQL Quickstart](https://cloud.google.com/sql/docs/postgres/quickstart).

#### Set up the Cloud SQL Proxy
Detailed instructions for setting up the proxy can be found in the [Quickstart for using the proxy for local testing](https://cloud.google.com/sql/docs/postgres/quickstart-proxy-test).
Tl;dr there are four steps:
1. Download the proxy and make it executable. On Mac:
    ```
    $ curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
    $ chmod +x cloud_sql_proxy
    ```
1. Get the instance connection name. Go to the [CloudSQL Instances Page](https://console.cloud.google.com/sql/instances). Click the instance name to open its Instance details page. Then copy the instance connection name under **Connect To This Instance** to your .env file.
1. Start the proxy using service account credentials and Unix Sockets:
    ```
    $ sudo mkdir /cloudsql; sudo chmod 777 /cloudsql
    $ ./cloud_sql_proxy -dir=/cloudsql -instances=<INSTANCE_CONNECTION_NAME> \
                    -credential_file=<PATH_TO_KEY_FILE> &
    ```
1. Connect through the proxy using the Postgres command line `psql` tool. Use the instance connection name from before.
    ```
    $ psql "sslmode=disable host=/cloudsql/<INSTANCE_CONNECTION_NAME> user=postgres"
    ```
You should see a prompt that looks like:
    ```
    postgres=>
    ```

#### Let's make a table!

Time to use some SQL queries to set up our table. Type the following query the terminal window that's running psql (don't copy the `postgres=>` prompt).

1. First, we need to create a table:
    ```
    postgres=> CREATE TABLE messages (name VARCHAR(255), body VARCHAR(255),
                            entryID SERIAL PRIMARY KEY);
    postgres=> \dt
    ```
1. Then we need to add 2 columns - one for sticker urls, and one for timestamps.
    ```
    postgres=> ALTER TABLE messages ADD COLUMN stickerUrl VARCHAR(255);
    postgres=> ALTER TABLE messages ADD COLUMN timestamp TIMESTAMP DEFAULT now();
    ```
1. Now we want to make sure that the database won't accept messages without a name and a body:
    ```
    postgres=> ALTER TABLE messages ALTER COLUMN name SET NOT NULL;
    postgres=> ALTER TABLE messages ALTER COLUMN body SET NOT NULL;
    ```
1. Let's verify that we have an empty table:
    ```
    postgres=> SELECT * FROM messages;
    ```
1. Now let's insert a message:
    ```
    postgres=> INSERT INTO messages (name, body, stickerUrl) values ('Crisco', 'Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.', 'https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg');
    ```
1. When we select all the rows this time, we should see our new message. You'll also notice that the entryID and timestamp have auto-populated. 
    ```
    postgres=> SELECT * FROM messages;
    ```
1. Let's try inserting an invalid message that's missing a name and body:
    ```
    postgres=> INSERT INTO messages (stickerUrl) values ('https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg');
    ```
    If the validations we set up are working, we can expect to get an error that says something like:
    ```
    ERROR:  null value in column "name" violates not-null constraint
    DETAIL:  Failing row contains (null, null, 24, https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c..., 2019-11-26 00:20:08.706553).
    ```
#### Merge in Database Code

Now that we've set up the database on the cloud, we can connect it to the guestbook app. 

Merge in the guestbook branch:
```
$ git merge database-branch
```

Let's go over the changes. First, there's a new file, `connection.js`. This file exports a Knex client, which you will use to make your queries. Knex is a node library that constructs SQL queries for you and passes them into postgres. 
```
onst connectToCloudSql = () => {
    const config = {
        user: process.env.DB_USER, // e.g. 'my-user'
        password: process.env.DB_PASS, // e.g. 'my-user-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
    };

    config.host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;

    // Establish a connection to the database
    console.log("connecting to cloudsql...")
    const connection = knex({
        client: 'pg',
        connection: config,
        debug: true
    });

    connection.client.pool.max = 5;
    connection.client.pool.min = 5;
    connection.client.pool.createTimeoutMillis = 30000;
    connection.client.pool.idleTimeoutMillis = 600000;
    connection.client.pool.createRetryIntervalMillis = 200;
    connection.client.pool.acquireTimeoutMillis = 600000;


    return connection;
}

```
Why use knex? 
* It's secure. Without knex, you would pass in raw SQL queries as strings directly to postgres. These queries would likely have user input interpolated into them, which makes you vulnerable to [SQL Injection Attacks](https://xkcd.com/327/)!
* It keeps your Node.js code looking like Node.js code, which makes it more readable and easier to maintain.

We've also modified the methods in `messages.js` to use the knex client:
```
const retrieve = async (knex) => {
    results = await knex.select("name", "body", "timestamp", "stickerurl")
        .from("messages")
        .orderBy("timestamp", "desc");
    return results; 
}

...

const save = async (message, knex) => {
    console.log("saving message...")
        return await knex.insert(message).into('messages');
    
};
```

Finally, we are using the client exported by `connection.js` in `index.js` and passing it as an argument to the methods in `messages.js`:
```
...

const pgClient = require("./connection")

...

// Handles GET requests to /messages
router.get('/messages', async (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

    // Query for messages in descending order
    try {
        const msg = await Message.retrieve(pgClient);
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json(error.error);
    }
});

// Handles POST requests to /messages
router.post('/messages', async (req, res) => {
    try {
        await Message.create(
            { name: req.body.name, 
            body: req.body.body, 
            sticker: req.body.sticker }, pgClient);
        res.status(200).json("successfully inserted message into database");
    } catch (err) {
        if (err.routine == "ExecConstraints") {
            console.error('validation error: ' + err);
            res.status(400).json(err);
        } else {
            console.error('could not save: ' + err);
            res.status(500).json(err);
        }
    }
});

```

## Deployment

<!-- TODO: -->