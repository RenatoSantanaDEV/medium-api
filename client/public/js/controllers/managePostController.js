myApp.controller('managePostController', function ($scope, $state, PostsService) {
    const id = $state.params.id;
    const user_id = localStorage.getItem('user_id');

    const init = () => {
        showPost(id);
    }

    const showPost = () => {
    PostsService.showPost(id)
        .then(resp => {
            $scope.loading = false;
            $scope.post = resp.data;
            $scope.date = resp.data.post_date;
    }).catch((e) => {
        $scope.loading = false;
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error occurred while loading posts',
            showConfirmButton: false,
            timer: 1500,
        });
    });
    }

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

    $scope.likePost = likePost;
    $scope.showPost = showPost;
    init();
});
