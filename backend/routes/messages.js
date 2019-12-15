const retrieve = async (knex) => {
    results = await knex.select("name", "body", "timestamp", "stickerurl")
        .from("messages")
        .orderBy("timestamp", "desc");
    return results; 
}

const construct = (params) => {
    const {name, body, sticker} = params;
    const message = {name: name, body: body, stickerurl: sticker}
    return message
};

const save = async (message, knex) => {
    return await knex.insert(message).into('messages');
};

// Constructs and saves message
const create = async (params, knex) => {
    const message = construct(params);
    result = await save(message, knex);
    return result;
}


module.exports = {
    create: create,
    retrieve: retrieve,
}

