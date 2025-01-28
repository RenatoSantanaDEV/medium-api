myApp.controller('profileController', function ($scope, UserService, $state) {
    const user_id = localStorage.getItem('user_id');
    $scope.loading = false;

    const init = () => {
        listUser();
    };

    const listUser = () => {
        $scope.loading = true;
        UserService.showUser(user_id)
            .then(resp => {
                $scope.loading = false;
                $scope.user = resp.data;
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

    init();

});
