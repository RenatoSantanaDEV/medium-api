const Post = require('../models/Posts.js');
const Like = require('../models/Likes.js');

class LikeService {
    async like(post_id, user_id) {
        try {
            const post = await Post.findByPk(post_id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            const hasLike = await Like.findOne({
                where: {
                    post_id,
                    user_id
                }
            });

            if(hasLike) {
                throw new Error('Esse post já foi curtido por você.')
            }

            const newLike = await Like.create({
                post_id: post_id,
                user_id: user_id,
            });

            await post.increment('post_likes', {
                where: {
                    id: post_id
                },
                by: 1
            });

            return newLike;
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

            const hasLike = await Like.findOne({
                where: {
                    post_id,
                    user_id
                },
            });

            if(!hasLike) {
                throw new Error('Esse post não existe.')
            }

            await Like.destroy({
                where: {
                    post_id,
                    user_id
                }
            });

            await post.decrement('post_likes', {
                where: {
                    id: post_id
                },
                by: 1
            });

            return true;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports =  new LikeService();