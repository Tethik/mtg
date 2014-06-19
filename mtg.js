var module = angular.module('mtg', ['ngRoute']);
	
module.controller('main', function($scope) {
	$scope.round = 0;
	$scope.date = '2014-06-13';
	
	$scope.players = [{}, {}];
	$scope.matches = [];
	
	$scope.initPlayers = function(players) {
		for(var p = 0; p < players.length; p++) {
			players[p].won = 
			players[p].lost = 
			players[p].draw = 0;
		}
		
		return players;
	};
	
	$scope.createMatches = function() {		
		console.log($scope.players);				
		$scope.matches = [];
		for(var p = 0; p < $scope.players.length; p++) {
			var player1 = $scope.players[p];
			
			for(var p2 = p+1; p2 < $scope.players.length; p2++) {					
			
				var player2 = $scope.players[p2];
				
				console.log(player1);
				console.log(player2);
				
				var match = {
					players: [player1, player2],
					scores: [0, 0],
					finished: false
				}
				
				$scope.matches.push(match);
			}
		}
		$scope.matchesLeft = $scope.matches.length;
	};
	
	$scope.nextRound = function() {
		
		if(!true) //todo: validate
			return;
		
		// update scores.			
		$scope.round += 1;
		
		if($scope.round == 1) {
			var players = $scope.initPlayers($scope.players);
			$scope.players = players;
		}
			
		$scope.createMatches();				
	}
});
