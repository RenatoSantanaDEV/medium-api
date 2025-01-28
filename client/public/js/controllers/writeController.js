myApp.controller('writeController', function ($scope,$state ,$window, UserService, $timeout, $document, PostsService) {
    const user_id = localStorage.getItem('user_id');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    $scope.loading = false;
    $scope.saved = false;
    $scope.saving = false;
    $scope.isMenuOpen = false;
    $scope.isModalVisible = false;
    $scope.postData = {}
    $scope.form = {
        title: '',
        text: '',
        titlePreview: '',
        summary: '',
        user_id,
        post_date: formattedDate
    };
    const init = () => {
        getUser();
    };

    $scope.triggerFileInput = function () {
        $timeout(() => {
            const fileInput = document.getElementById('fileTobase64');
            if (fileInput) {
                fileInput.click();
            }
        });
    };

    $scope.loadImage = function (element) {
        if (element.files && element.files.length > 0) {
            const fileToLoad = element.files[0];
            const fileName = `${Date.now() * Math.random()}.png`;
            const fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;
                $timeout(() => {
                    $scope.postData.img = srcData;
                    $scope.postData.filename = fileName;
                });
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    };

    const savedTitle = $window.sessionStorage.getItem('title');
    const savedSubtitle = $window.sessionStorage.getItem('text');
    let saveTimeout;

    if (savedTitle) $scope.form.title = savedTitle;
    if (savedSubtitle) $scope.form.text = savedSubtitle;

    function watchAndSave(scopeKey, storageKey) {
        $scope.$watch(scopeKey, function (newVal) {
            $window.sessionStorage.setItem(storageKey, newVal || '');
            $scope.saved;
        });
    }

    function initializeFromSessionStorage(scopeKey, storageKey) {
        $scope[scopeKey] = $window.sessionStorage.getItem(storageKey) || '';
    }

    $scope.saveData = function () {
        if (saveTimeout) {
            $timeout.cancel(saveTimeout);
        }

        if ($scope.form.title.trim() === '' || $scope.form.text.trim() === '') {
            $scope.saving = false;
            $scope.saved = false;
            return;
        }

        $scope.saving = false;
        $scope.saved = false;

        saveTimeout = $timeout(function () {
            $scope.saving = true;
            $scope.saved = false;

            $timeout(function () {
                $scope.saving = false;
                $scope.saved = true;

                $timeout(function () {
                    $scope.saved = false;
                }, 3000);
            }, 1000);
        }, 1000);
    };

    $scope.openPublishModal = function () {
        if(!$scope.form.titlePreview & !$scope.form.summary) {
            $scope.form.summary = $scope.form.text;
            $scope.form.titlePreview = $scope.form.title;
        }

        $scope.isModalVisible = $scope.isModalVisible = true;
    };

    $scope.closePublishModal = function () {
        $scope.isModalVisible = false;
    }

    $scope.toggleMenu = function () {
        $scope.isMenuOpen = !$scope.isMenuOpen;
    };

    const getUser = () => {
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
                    title: 'An error occurred while loading this screen',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const createPost = () => {
        PostsService.addPosts($scope.form)
            .then((resp) => {
                console.log($scope.postData)
                PostsService.addThumbnail(resp.data.id, $scope.postData)
                    .then(() => {
                        $state.go('home');
                    })
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post created successfully',
                    showConfirmButton: false,
                    timer: 1000,
                });
            })
            .catch((e) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'An error occurred while creating the post',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    $scope.toggleDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
    };

    const closeDropdown = function (event) {
        const dropdown = document.querySelector(".doca-dropdown-menu");
        const profileButton = document.getElementById("profile");

        if (dropdown && profileButton) {
            if (
                !dropdown.contains(event.target) &&
                !profileButton.contains(event.target)
            ) {
                $scope.isDropdownVisible = false;
                $scope.$apply();
            }
        }
    };

    $document.on("click", closeDropdown);
    $document.on("scroll", closeDropdown);

    $scope.$on("$destroy", function () {
        $document.off("click", closeDropdown);
        $document.off("scroll", closeDropdown);
    });

    $scope.createPost = createPost;
    watchAndSave('form.title', 'title');
    watchAndSave('form.text', 'text');

    initializeFromSessionStorage('form.title', 'title');
    initializeFromSessionStorage('form.text', 'text');

    $scope.$on('$destroy', function () {
        ['title', 'text', 'img'].forEach((key) => $window.sessionStorage.removeItem(key));
    });
    init();
});
