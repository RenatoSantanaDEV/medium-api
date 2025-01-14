const postService = require('../services/postService.js');
const BaseController = require('./BaseController.js');

class PostController extends BaseController {
    constructor() {
        super();
        this.indexPost = this.indexPost.bind(this);
        this.storePost = this.storePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.showPost = this.showPost.bind(this);
        this.showUserPosts = this.showUserPosts.bind(this);
    }

    async indexPost(req, res) {
        try {
            const posts = await postService.indexPost();
            this.handleResponse(res, posts);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async showPost(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.showPost(id);
            this.handleResponse(res, post);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async showUserPosts(req, res) {
        try {
            const { id } = req.params;
            const posts = await postService.showUserPosts(id);
            this.handleResponse(res, posts);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async storePost(req, res) {
        try {
            const data = req.body
            const newPost = await postService.storePost(data);
            this.handleResponse(res, newPost);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.deletePost(id);
            this.handleResponse(res, post);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async updatePost(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const updatePost = await postService.updatePost(
                id,
                data
            );
            this.handleResponse(res, updatePost);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async indexPost(req, res) {
      try {
        const posts = await postService.indexPost();
          this.handleResponse(res, posts);

      } catch (e) {
          this.handleError(res, 'ERROR');

      }
    }

    async storePost(req, res) {
      try {
        const newPost = await postService.storePost(req.body);
        this.handleResponse(res, newPost);

    } catch (e) {
        this.handleError(res, 'ERROR')

        }
    }

    async storeLike(req, res) {
      try {
        const newPost = await postService.storeLike(req.params, req.body);
        this.handleResponse(res, newPost);

    } catch (e) {
        this.handleError(res, 'ERROR')

        }
    }

    async deletePost(req, res) {
        try {
          const post = await postService.deletePost(req.params);
          this.handleResponse(res, post);

        } catch (e) {
          this.handleError(res, 'ERROR')

        }
      }

      async updatePost(req, res) {
        try {
          const updatePost = await postService.updatePost(req.params, req.body);
          this.handleResponse(res, updatePost)

        } catch (e) {
          this.handleError(res, 'ERROR')

        }
      }
}

module.exports = new PostController();
