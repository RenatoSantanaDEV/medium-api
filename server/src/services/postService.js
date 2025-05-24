const Post = require('../models/Posts.js');

class PostService {
    async storePost(data) {
        try {
            const { user_id, title, text, summary, postLikes, post_date } =
                data;

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

    async updatePost(id, data) {
        try {
            if (!id) {
                throw new Error('ID do post é obrigatório.');
            }

            const { user_id, title, text, summary, postLikes, post_date } = data;

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

}

module.exports = new PostService();
