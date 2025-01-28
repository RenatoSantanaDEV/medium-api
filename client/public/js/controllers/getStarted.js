myApp.controller('getStarted', function ($scope, LoginService, UserService, $state) {

    $scope.isModalSignInVisible = false;
    $scope.isModalRegisterVisible = false;

    $scope.openModalSignIn = function () {
        $scope.isModalSignInVisible = $scope.isModalSignInVisible = true;
        $scope.isModalRegisterVisible = $scope.isModalRegisterVisible = false;
    };

    $scope.closeSignInModal = function () {
        $scope.isModalSignInVisible = false;
    }

    $scope.openModalRegister = function () {
        $scope.isModalSignInVisible = $scope.isModalSignInVisible = false;
        $scope.isModalRegisterVisible = $scope.isModalRegisterVisible = true;
    };

    $scope.closeRegisterModal = function () {
        $scope.isModalRegisterVisible = false;
    }

    $scope.user = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    $scope.login = () => {
        if (!$scope.user.email || !$scope.user.password) {
            Swal.fire({
                title: 'Erro',
                text: 'Preencha todos os campos!',
                icon: 'error',
                confirmButtonColor: '#04052e',
            });

            return;
        }

        LoginService.getToken($scope.user)
            .then(resp => {
                if (resp.data?.token) {
                    localStorage.setItem("token", resp.data.token);
                    localStorage.setItem("email", $scope.user.email);
                    localStorage.setItem("user_id", resp.data.id);

                    $scope.user.email = '';
                    $scope.user.password = '';

                    $state.go('home');
                } else {
                    throw new Error('Token inválido recebido');
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Algo deu errado',
                    text: err.data && err.data.error ? err.data.error : "Erro ao fazer login.",
                    icon: 'error',
                    confirmButtonColor: '#04052e',
                });
            });
    };

    $scope.err = false;

    const create = () => {
        return UserService.create($scope.user)
            .then(() => {
                $scope.err = false;
                $scope.openModalSignIn();
            })
            .catch((e) => {
                const confirmation = Swal.fire({
                    title: 'dados inválidos',
                    text: "Verifique as suas informações!",
                    icon: 'error',
                    confirmButtonColor: '#04052e',
                });
                if (!confirmation.isConfirmed) {
                    return;
                }
                $scope.err = true;
                localStorage.clear()
                $scope.user.username = '';
                $scope.user.email = '';
                $scope.user.password = '';
                $scope.user.confirmPassword = '';
            })
    }

    $scope.create = create;
});
