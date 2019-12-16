
const language = require('@google-cloud/language');

const retrieve = async (knex) => {
    results = await knex.select("name", "body", "timestamp", "stickerurl")
        .from("messages")
        .orderBy("timestamp", "desc");
    for (let result of results) {
        console.log(`detecting sentiment for ${result.body}`)
        try {
            let sentiment = await detectSentiment(result.body);
            result.sentiment = sentiment;
        } catch (error) {
            throw(error);
        }

    }
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

const detectSentiment = async (message) => {
    const client = new language.LanguageServiceClient();
    const document = {
        content: message,
        type: 'PLAIN_TEXT',
    };
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    return sentiment;
}

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

