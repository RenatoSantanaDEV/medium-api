myApp.controller('homeController', function ($scope, PostsService) {
    $scope.postData = {};
    $scope.loading = false;
    const user_id = localStorage.getItem('user_id');

    const init = () => {
        listPosts();
    };

    const listPosts = () => {
        $scope.loading = true;
        PostsService.index()
            .then(resp => {
                $scope.loading = false;
                $scope.posts = resp.data;
                $scope.posts = resp.data.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
            })
            .catch(() => {
                $scope.loading = false;
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'An error occurred while loading posts',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const likePost = (post_id) => {
        PostsService.likePost(post_id, user_id)
            .then(init)
            .catch(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Erro ao curtir o post',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    $scope.listPosts = listPosts;
    $scope.likePost = likePost;

    init();
});
