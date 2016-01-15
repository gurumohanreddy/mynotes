(function(){
myApp = angular.module('starter', ['ionic']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myApp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('list', {
       url: '/list',
       templateUrl: 'templates/list.html'
      })
      .state('edit', {
       url: '/edit/:noteId',
       templateUrl: 'templates/edit.html',
       controller:'EditCtrl',
       controllerAs:'edit_add'
      })
      .state('add', {
       url: '/add',
       templateUrl: 'templates/edit.html',
       controller:'AddCtrl',
       controllerAs:'edit_add'
      });

     $urlRouterProvider.otherwise('/list');

});


myApp.controller('ListCtrl',['$scope','noteStore',function($scope,noteStore){
        var vm = this;
        vm.notes = noteStore.list();
}]);

myApp.controller('EditCtrl',['$scope','noteStore','$state',function($scope,noteStore,$state){

        var vm = this;
        vm.note = angular.copy(noteStore.get($state.params.noteId));
        vm.save = function(){
          noteStore.update(vm.note);
          $state.go('list');
        }

}]);

myApp.controller('AddCtrl',['$scope','noteStore','$state',function($scope,noteStore,$state){

        var vm = this;
        vm.note = {
          id: new Date().getTime().toString(),
          title:'',
          description:''
        }

        vm.save = function(){
          noteStore.create(vm.note);
          $state.go('list');
        }


}]);



})()
