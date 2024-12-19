const Post = require('../models/Posts.js');
const User = require('../models/Users.js');
const Like = require('../models/Likes.js');

class PostService {
    async storePost(body) {
        try {
            const { user_id, title, text, summary, postLikes, post_date } =
                body;

            const IDuser = await User.findByPk(user_id);

            if (!IDuser) {
                throw new Error('Usuário não existe.');
            }

            const newPost = await Post.create({
                user_id,
                title,
                text,
                summary,
                post_likes: 0,
                post_date: new Date(post_date),
            });

            return newPost;
        } catch (error) {
            return { error: error.message };
        }
    }

    async indexPost() {
        try {
            const posts = await Post.findAll({
                attributes: [
                    'id',
                    'user_id',
                    'text',
                    'title',
                    'post_likes',
                    'post_date',
                ],
                where: { deleted_at: null },
                raw: true,
            });

            return posts;
        } catch (error) {
            return { error: error.message };
        }
    }

    async updatePost(params, body) {
        try {
            const { id } = params;

            if (!id) {
                throw new Error('ID do post é obrigatório.');
            }

            const { user_id, title, text, summary, postLikes, post_date } =
                body;

            const IDuser = await User.findByPk(user_id);

            if (!IDuser) {
                throw new Error('Usuário não existe.');
            }

            const post = await Post.findByPk(id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            await post.update({
                title: title || post.title,
                text: text || post.text,
                summary: summary || post.summary,
                post_likes: post.postLikes,
                post_date: post_date ? new Date(post_date) : post.post_date,
            });

            return post;
        } catch (error) {
            return { error: error.message };
        }
    }

    async deletePost(params) {
        try {
            const { id } = params;

            if (!id) {
                throw new Error('ID do post é obrigatório.');
            }

            const post = await Post.findByPk(id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            await post.destroy();
            console.log(`Post com ID ${id} deletado com sucesso.`);

            return { message: 'Post deletado com sucesso.' };
        } catch (error) {
            return { error: error.message };
        }
    }

    async storeLike(params, body) {
        try {
            const { id } = params;

            if (!id) {
                throw new Error('ID do post é obrigatório.');
            }

            const post = await Post.findByPk(id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            const { user_id } = body;

            if (!user_id) {
                throw new Error('User_id não existe.');
            }

            const IDuser = await User.findByPk(user_id);

            if (!IDuser) {
                throw new Error('Usuário não existe.');
            }

            const existingLike = await Like.findOne({
                where: {
                    post_id: id,
                    user_id: user_id,
                },
            });

            if (existingLike) {
                throw new Error('Você já curtiu este post.');
            }

            const newLike = await Like.create({
                post_id: id,
                user_id: user_id,
            });

            await this.updateLike(id);

            return newLike;
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateLike(post_id) {
        try {
            const totalLikes = await Like.count({
                where: { post_id },
            });

            console.log(totalLikes, 'totalLikes');

            const post = await Post.findByPk(post_id);

            if (!post) {
                throw new Error('Post não encontrado.');
            }

            await post.update({ post_likes: totalLikes });

            return post;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new PostService();
