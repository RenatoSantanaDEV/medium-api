myApp.service('UserService', function ($http) {
    this.create = function (data) {
        return $http.post(`${baseUrl}users`, data)
    };

    this.showUser = function (id) {
        return $http.get(`${baseUrl}users/${id}`);
    };
});
