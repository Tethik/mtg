var module = angular.module('mtg', ['ngRoute']);
	
module.controller('main', function($scope, $filter) {
	$scope.round = 0;
	$scope.date = '2014-06-13';
	
	$scope.players = [{}, {}];
	$scope.players = [{name:'Herp'}, {name:'Derp'}, {name:'Merp'}];
	$scope.matches = [];
	
	$scope.initPlayers = function() {
		for(var p = 0; p < $scope.players.length; p++) {
			$scope.players[p].won = 
			$scope.players[p].lost = 
			$scope.players[p].draw = 0;
		}
	};
	
	$scope.createMatches = function() {					
		$scope.matches = [];
		index = 0;
		for(var p = 0; p < $scope.players.length; p++) {
			var player1 = $scope.players[p];
			
			for(var p2 = p+1; p2 < $scope.players.length; p2++) {					
				
				var player2 = $scope.players[p2];
				
				var match = {
					index: index,
					players: [player1, player2],
					scores: [0, 0],
					status: 'queued'
				}
				index++;
				
				$scope.matches.push(match);
			}
		}
		$scope.matchesLeft = $scope.matches.length;
	};
	
	$scope.init = function() {
		$scope.inited = true;
		$scope.initPlayers();
		$scope.createMatches();				
	};
	
	var orderBy = $filter('orderBy');
	
	$scope.matchEvaluator = function(a) {
		statusorder = ['playing','queued','ended']
		letters = ['a','b','c'];
		return letters[statusorder.indexOf(a.status)] + a.index;
	};
	
	$scope.reorderMatches = function() {
		$scope.matches = orderBy($scope.matches, $scope.matchEvaluator, false);
		var updatedCount = 0;
		for(var i = 0; i < $scope.matches.length; i++)
			if($scope.matches[i].status != 'ended')
				updatedCount++;
		$scope.matchesLeft = updatedCount;
	};
	
	$scope.endMatch = function(match) {
		match.status = 'ended';
		if(match.scores[0] == match.scores[1])
		{
			match.players[0].draw += 1;
			match.players[1].draw += 1;
		} else if(match.scores[0] > match.scores[1]) {
			match.players[0].won += 1;
			match.players[1].lost += 1;
		} else {
			match.players[1].won += 1;
			match.players[0].lost += 1;
		}
		
		$scope.reorderMatches();
	};
	
	$scope.init(); // debug
});
