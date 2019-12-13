// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = process.env.STICKER_BUCKET

const stickerLink = `https://storage.googleapis.com/${bucketName}/`

const retrieve = async () => {
    console.log('retrieving stickers...');
    // Lists files in the bucket
    try {
    const [files] = await storage.bucket(bucketName).getFiles();
    console.log('Files:');
    let stickers = {}
    files.forEach(file => {
        console.log(file.metadata.selfLink);
        stickers[file.name] = stickerLink + file.name;
    });
    return stickers;
    } catch(err) {
        console.log(err);
    }

}

module.exports = {
    retrieve: retrieve,
}

