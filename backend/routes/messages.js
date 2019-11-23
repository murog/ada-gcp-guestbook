// TODO: require postgres
const Knex = require('knex');
// TODO: if cloudsql disconnected

// TODO: if cloudsql errors out

// TODO: once connected, log "connect to cloudsql URI"

// TODO: connect to cloudSQL

const connectToCloudSql = async () => {
    // TODO: connect to cloudsql.
    const config = {
        user: process.env.DB_USER, // e.g. 'my-user'
        password: process.env.DB_PASS, // e.g. 'my-user-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
    };

    config.host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;

    // Establish a connection to the database
    Knex({
        client: 'pg',
        connection: config,
    }).then((result) => {
        console.log("connected to cloudsql!");
        return (result);
    }).catch((err) => {
        console.log("Failed to connect :(");
        throw Error(err)
    });


    return knex;
}

const retrieve = (client) => {
    client.select('name', 'body', 'stickerUrl', "timestamp")
        .from("messages")
        .orderBy("timestamp", "desc").then((result) => {
            return result;
        }).catch((err) => {
            throw Error(err);
        })
}

const construct = (params, client) => {
    // TODO:
    console.log("constructing message...")
    // const name = params.name;
    // const body = params.body;
    // const sticker = params.sticker;
    // const message = new messageModel({ name: name, body: body, sticker: sticker })
    // return message
};

const save = (message, client) => {
    // TODO: save message
    console.log("saving message...")

    client('messages').insert(message).then((result) => {
        return result;
    }).catch((err) => {
        throw Error(err);
    })
};

// Constructs and saves message
const create = (params, client) => {
    // TODO: create message
    console.log("creating message...")
    const message = construct(params);
    save(message, client).then((result) => {
        return result;
    }).catch((err) => {
        throw Error(err);
    })
}

module.exports = {
    create: create,
    retrieve: retrieve,
    connectToCloudSql: connectToCloudSql
}

