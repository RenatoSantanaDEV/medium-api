myApp.service("LoginService", function ($http) {
    this.getToken = (data) => {
        return $http.post(`${baseUrl}tokens`, data)
        .catch(error => {
            console.error("Erro na requisição:", error);
            throw error;
        });
    };
});