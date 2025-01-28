myApp.service("PostsService", function ($http) {
    this.addPosts = (data) => {
        return $http.post(`${baseUrl}posts`, data);
    };
    this.updateWatched = (post_id, data) => {
        return $http.put(`${baseUrl}posts/${post_id}`, data);
    };
    this.deletePost = (post_id) => {
        return $http.delete(`${baseUrl}posts/${post_id}`);
    };
    this.showPost = (post_id) => {
        return $http.get(`${baseUrl}posts/${post_id}`);
    };
    this.index = () => {
        return $http.get(`${baseUrl}posts`);
    };
    this.likePost = (post_id, user_id) => {
        return $http.post(`${baseUrl}posts/${post_id}/like`, {user_id});
    };
    this.dislikePost = (post_id) => {
      return $http.post(`${baseUrl}posts/${post_id}/dislike`);
    };
    this.addThumbnail = (post_id, data) => {
        return $http.post(`${baseUrl}thumbnails/${post_id}`, data);
    };
});