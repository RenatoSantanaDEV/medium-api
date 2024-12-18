const postService = require('../services/postService.js');
const BaseController = require('./BaseController.js');

class PostController extends BaseController {
    constructor(){
        super();
        this.indexPost = this.indexPost.bind(this);
        this.storePost = this.storePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.storeLike = this.storeLike.bind(this);
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