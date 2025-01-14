const Thumbnail = require('../models/Thumbnails.js');

class ThumbnailService {
    async storeThumbnail(file, post_id) {
        try {
            const hasThumb = await Thumbnail.findOne({ where: {post_id} });

            if(hasThumb){
                console.log('hasthum');
                return
            }

            const foto = await Thumbnail.create({
                ...file,
                originalname: file.img,
                filename: file.filename,
                post_id: post_id,
                user_id: post_id
            });

            return foto;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new ThumbnailService();
