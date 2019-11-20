// TODO: require postgres

// TODO: if cloudsql disconnected

// TODO: if cloudsql errors out

// TODO: once connected, log "connect to cloudsql URI"

// TODO: connect to cloudSQL

const connectToCloudSql = async () => {
    // TODO: connect to cloudsql
    console.log("connecting to cloudsql...")
}

const construct = (params) => {
    // TODO:
    console.log("constructing message...")
    // const name = params.name;
    // const body = params.body;
    // const sticker = params.sticker;
    // const message = new messageModel({ name: name, body: body, sticker: sticker })
    // return message
};

const save = (message) => {
    // TODO: save message
    console.log("saving message...")
};

// Constructs and saves message
const create = (params) => {
    // TODO: create message
    console.log("creating message...")
}

module.exports = {
    create: create,
    connectToCloudSql: connectToCloudSql
}

