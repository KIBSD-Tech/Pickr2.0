(function() {
	'use strict';

	angular.module('Student')
		.controller('StudentReportController', ['$scope', 'Page', '$mdDialog', 'StudentResource', function($scope, Page, $mdDialog,StudentResource) {
			Page.title('Assigned Students Report');

			//goes through all students and finds which students are signed up for a tutorial in the active cycle
			$scope.students = StudentResource.query({id:"active"}, function() {
				for (var i=0; i<$scope.students.length; i++) {
					var student = $scope.students[i];
					if (student.tutorial.length) {
						student.instructor = student.tutorial[0].teacher_name;
						student.room = student.tutorial[0].room_number;
						student.tutorial = student.tutorial[0].name;
					}
				}
			});

			$scope.currStudents = $scope.students;

			$scope.unStudents = StudentResource.query({id:"activeU"}, function() {
				// console.log($scope.unStudents);
				for (var i=0; i<$scope.students.length; i++) {
					var unStudent = $scope.unStudents[i];
					if (unStudent.tutorial.length) {
						unStudent.instructor = student.tutorial[0].teacher_name;
						unStudent.room = student.tutorial[0].room_number;
						unStudent.tutorial = student.tutorial[0].name;
					}
				}
			});

			$scope.sort = ["full_name", "last_name"];
			$scope.reverse = false;
			$scope.isUnassigned = false;
			$scope.buttonTitle = "See Unassigned Students";


			$scope.getUnassignedStudents= function(ev) {
				// $mdDialog.show({
				// 	controller: 'StudentUnassignedController',
				// 	templateUrl: '/js/student/view/report-dialog.html',
				// 	parent: angular.element(document.body),
				// 	targetEvent: ev
				// }).then(function(data) {
				// 	//nothing
				// });
				console.log($scope.isUnassigned);
				if ($scope.isUnassigned == false) {
					$scope.currStudents = $scope.unStudents;
					Page.title('Unassigned Students Report');
					$scope.buttonTitle = "See Assigned Students";
					$scope.isUnassigned = true;
				} else {
					$scope.currStudents = $scope.students;
					Page.title('Assigned Students Report');
					$scope.buttonTitle = "See Unassigned Students";
					$scope.isUnassigned = false;
				}
			};


			$scope.newSort = function(type) {
				if ($scope.sort[0] == type) {
					$scope.reverse = !$scope.reverse;
				}
				$scope.sort = [type, "last_name"];
			};

			$scope.sortUp = function(type) {
				return $scope.sort[0] == type && $scope.reverse;
			};

			$scope.sortDown = function(type) {
				return $scope.sort[0] == type && !$scope.reverse;
			};
		}]);
})();
