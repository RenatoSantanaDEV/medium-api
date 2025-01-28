angular.module('mediumApp').directive('customHeader', function($state, $document) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'view/templates/header.html',
        scope: {
            userId: '=',
        },
        link: function(scope) {
            const logOut = () => {
                scope.loading = false
                Swal.fire({
                    title: 'log out?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'yes'
                }).then((result) => {
                    scope.loading = false

                    if (result.isConfirmed) {
                        $state.go('getStarted')
                        localStorage.clear()
                    }
                })
            }

            scope.isDropdownVisible = false;
            scope.userId = localStorage.getItem('user_id');
            scope.email = localStorage.getItem("email");

            scope.getMaskedEmail = function (email) {
                if (!email) return "";

                const [localPart, domainPart] = email.split("@");
                const visiblePart = localPart.slice(0, 2);
                const maskedPart = "••••••";

                return visiblePart + maskedPart + "@" + domainPart;
            };

            scope.toggleDropdown = function () {
                scope.isDropdownVisible = !scope.isDropdownVisible;
            };

            const closeDropdown = function (event) {
                const dropdown = document.querySelector(".doca-dropdown-menu");
                const profileButton = document.getElementById("profile");

                if (dropdown && profileButton) {
                    if (
                        !dropdown.contains(event.target) &&
                        !profileButton.contains(event.target)
                    ) {
                        scope.isDropdownVisible = false;
                        scope.$apply();
                    }
                }
            };

            $document.on("click", closeDropdown);
            $document.on("scroll", closeDropdown);

            scope.$on("$destroy", function () {
                $document.off("click", closeDropdown);
                $document.off("scroll", closeDropdown);
            });

            scope.logOut = logOut;
        }
    }
});
