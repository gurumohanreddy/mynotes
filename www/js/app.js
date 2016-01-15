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

var notes = [];


    getnote = function(noteId){
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === noteId) {
              return notes[i]
          }
        }
        return undefined;
    }
    updatenote = function(note){
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
              notes[i] = note;
              return;
          }
        }
    }
    createnote = function(note){
      notes.push(note);
    }

myApp.controller('ListCtrl',['$scope',function($scope){
        var vm = this;
        vm.notes = notes;
}]);

myApp.controller('EditCtrl',['$scope','$state',function($scope,$state){

        var vm = this;
        vm.note = angular.copy(getnote($state.params.noteId));
        vm.save = function(){
          updatenote(vm.note);
          $state.go('list');
        }

}]);

myApp.controller('AddCtrl',['$scope','$state',function($scope,$state){

        var vm = this;
        vm.note = {
          id: new Date().getTime().toString(),
          title:'',
          description:''
        }

        vm.save = function(){
          createnote(vm.note);
          $state.go('list');
        }


}]);


})()
