const myApp = angular.module('mediumApp', ["ui.router", "ui.bootstrap"]);
const baseUrl = "http://localhost:3002/";

myApp.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('BearerAuthInterceptor');
    $urlRouterProvider.otherwise("/");

  	$stateProvider
    	.state({
      		name: "home",
      		url: "/home",
	  		templateUrl: "view/home.html",
			controller: "homeController",
            onEnter: isAuthorized
		})
        .state({
            name: "post",
            url: "/post/:id",
            templateUrl: "view/post.html",
            controller: "managePostController",
            onEnter: isAuthorized
		})
        .state({
            name: "getStarted",
            url: "/",
            templateUrl: "view/get-started.html",
            controller: "getStarted",
		})
        .state({
            name: "new-story",
            url: "/new-story",
            templateUrl: "view/new-story.html",
            controller: "writeController",
            onEnter: isAuthorized
		})
        .state({
            name: "profile",
            url: "/profile",
            templateUrl: "view/profile.html",
            controller: "profileController",
            onEnter: isAuthorized
		});
});

const isAuthorized = ($state, $rootScope) => {
    const isLogged = localStorage.getItem("token");
    if (!isLogged) {
        $state.go('getStarted');
        return;
    }
    $rootScope.isLogged = true;
};
