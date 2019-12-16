// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = process.env.STICKER_BUCKET;

const stickerLink = `https://storage.googleapis.com/${bucketName}/`

const retrieve = async () => {
    // Lists files in the bucket
    try {
    const [files] = await storage.bucket(bucketName).getFiles();
    let stickers = []
    files.forEach(file => {
        let sticker = {};
        sticker.name = file.name;
        sticker.url = stickerLink + file.name
        stickers.push(sticker);
    });
    return stickers;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    retrieve: retrieve,
}

