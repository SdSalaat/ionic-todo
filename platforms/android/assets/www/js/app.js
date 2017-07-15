

//setting Angular
var app = angular.module('scotch-todo', ['ionic', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('scotch-todo');
});

app.controller('main', function ($scope, $ionicModal, localStorageService) {

//initialize the tasks scope with empty array
  $scope.tasks = [];

//initialize the task scope with empty object
  $scope.task = {};

//configure the ionic modal before use

  $scope.getTasks = function () {
    //fetches task from local storage
    if (localStorageService.get('taskData')) {
      $scope.tasks = localStorageService.get('taskData');
    } else {
      $scope.tasks = [];
    }
  };

  //$scope.getTasks();

  $scope.createTask = function () {
    //creates a new task
    $scope.task.date = new Date().toLocaleString();
    $scope.tasks.push($scope.task);
    localStorageService.set('taskData', $scope.tasks);
    $scope.task = {};
    //close new task modal
  };

  $scope.removeTask = function (index) {
    //removes a task
    $scope.tasks.splice(index, 1);
    localStorageService.set('taskData', $scope.tasks);
  };

  $scope.completeTask = function (index) {
    //updates a task as completed
    if (index !== -1) {
      $scope.tasks[index].completed = true;
    }


    localStorageService.set('taskData', $scope.tasks);
  };

});
