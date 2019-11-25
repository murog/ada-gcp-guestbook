

const retrieve = async (knex) => {
    try {
        results = await knex.select("name", "body", "timestamp", "stickerurl")
            .from("messages")
            .orderBy("timestamp", "desc");
        return results;
    } catch (err) {
        throw Error(err);
    }
}

const construct = (params) => {
    // TODO:
    console.log("constructing message...")
    const {name, body, sticker} = params;
    const message = {name: name, body: body, stickerurl: sticker}
    return message
};

const save = async (message, knex) => {
    // TODO: save message
    console.log("saving message...")
    try {
        return await knex.insert(message).into('messages');
    } catch (err) {
        throw Error(err);
    }
    
};

// Constructs and saves message
const create = (params, knex) => {
    // TODO: create message
    console.log("creating message...")
    const message = construct(params);
    save(message, knex)
}


module.exports = {
    create: create,
    retrieve: retrieve,
}

