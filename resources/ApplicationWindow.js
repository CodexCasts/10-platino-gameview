var Platino = require('io.lanica.platino');

// Main application window class
(function() {
	var ApplicationWindow = function() {
		var window = Ti.UI.createWindow({
			backgroundColor: 'black',
			orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT],
			layout: 'horizontal',
			fullscreen: true,
			navBarHidden: true,
			exitOnClose:true
		});
		
		// Set up our picker
		var pickerView = Ti.UI.createView({width: '35%', height: '100%', backgroundColor:'white'});
		var picker = Ti.UI.createPicker({selectionIndicator:"true", useSpinner:"true", left:0, top:0, width:'100%'});
		picker.add(Ti.UI.createPickerRow({title: 'Perspective'}));
		picker.add(Ti.UI.createPickerRow({title: 'Orthogonal'}));
		pickerView.add(picker);
		
		
		// Game setup
		var game = Platino.createGameView({width: '65%', height: '100%'});
		game.fps = 30;
		game.color(0, 0, 0);
		game.debug = true;
		game.screen = {width: 1000, height: 480};
		
		picker.addEventListener('change', function(e) {
			if(e.rowIndex == 0) {
				Ti.API.info("Using perspective");
				game.usePerspective = true;
			} else {
				Ti.API.info("Using orthogonal");
				game.usePerspective = false;
			}
		});
		
		// Loads our scene, launches the game
		game.addEventListener('onload', function(e) {
			var scene = require("scenes/ExampleScene");
			game.pushScene(new scene(game));
			game.start();
		});
		
		// Free up game resources when window is closed
		window.addEventListener('close', function(e) {
			game = null;
		});
		
		// Return the prepared window
		window.add(pickerView);
		window.add(game);
		return window;
	};
	
	// Export as class (module) type
	module.exports = ApplicationWindow;
})();
