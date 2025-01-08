const Post = require('../models/Posts.js');
const User = require('../models/Users.js');

class ThumbnailService {
    async storeThumbnail(data) {
        try {
            const { user_id, title, text, summary, postLikes, post_date } =
                data;

            const newThumbnail = await Post.create({
                user_id,
                title,
                text,
                summary,
                post_likes: 0,
                post_date: new Date(post_date),
            });

            return newThumbnail;
        } catch (error) {
            return { error: error.message };
        }
    }

}

module.exports = new ThumbnailService();
