import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const client = new ImageKit({

    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

const UploadFile = async (buffer) => {
    try {
        return await client.files.upload({
            file: buffer.toString("base64"),
            fileName: "image.jpg"
        });
    } catch (err) {
        console.error("IMAGEKIT ERROR:", err);
        throw err;
    }
};

export default UploadFile;
