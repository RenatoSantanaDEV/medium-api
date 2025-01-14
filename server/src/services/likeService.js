const Post = require('../models/Posts.js');
const Like = require('../models/Likes.js');
const User = require('../models/Users.js');

class LikeService {
    async like(post_id, user_id) {
        try {
            const post = await Post.findByPk(post_id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            const user = await User.findByPk(user_id);

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }


            const hasLike = await Like.findOne({ where: {post_id,user_id} });

            if (hasLike) {
                return this.dislike(post_id, user_id);
            }

            await Like.create({post_id,user_id,});

            await post.increment('post_likes', { by: 1 });

            return true;
        } catch (error) {
            return { error: error.message };
        }
    }

    async dislike(post_id, user_id) {
        try {
            const post = await Post.findByPk(post_id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            const user = await User.findByPk(user_id);

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            const hasLike = await Like.findOne({
                where: {
                    post_id,
                    user_id
                },
            });

            if (!hasLike) {
                throw new Error('Esse like não existe.');
            }

            await Like.destroy({
                where: {
                    post_id,
                    user_id
                }
            });

            await post.decrement('post_likes', { by: 1 });

            return true;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new LikeService();
