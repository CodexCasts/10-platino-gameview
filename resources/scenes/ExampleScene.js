// An example scene, which is a game state. This just puts a red square on the screen until
// there is a touch, then it converts to a text message.

var Platino = require('co.lanica.platino');

var ExampleScene = function(game) {
	var textsprite = null;
	var scene = Platino.createScene();

	// Construct a red square
	var red = null;
	red = Platino.createSprite({
		width : 64,
		height : 64
	});
	red.color(1.0, 0, 0);
	
	var blue = null;
	blue = Platino.createSprite({
		width : 64,
		height : 64
	});
	blue.color(0, 0, 1);
	
	// Place the square center screen
	red.center = {
		x: game.screen.width * 0.5, 
		y: game.screen.height * 0.5
	};
	scene.add(red);

	blue.center = { x:0, y:0};
	game.addHUD(blue);
	
	var tilted = false;
	blue.addEventListener('touchend', function(e) {
		if(tilted) {
			var transform_camera = Platino.createTransform();
			transform_camera.duration = 1000;
			transform_camera.easing = Platino.ANIMATION_CURVE_BACK_OUT;
			transform_camera.lookAt_centerY = game.screen.height / 2;
			game.moveCamera(transform_camera);
			tilted = false;
		} else {
			var transform_camera = Platino.createTransform();
			transform_camera.duration = 1000;
			transform_camera.easing = Platino.ANIMATION_CURVE_BACK_OUT;
			transform_camera.lookAt_centerY = game.screen.height / 4;
			game.moveCamera(transform_camera);
			tilted = true;
		}
	});
	
	// scene 'activated' event listener function (scene entry-point)
	var onSceneActivated = function(e) {
		Ti.API.info("HomeScene has been activated.");
	};

	// When the user touches the screen, replace the square with a message
	scene.addEventListener('touchstart', function(e) {
		if(textsprite == null) {
			textsprite = Platino.createTextSprite({
				text : 'Now you\'re gaming with Platino!',
				fontSize : 24
			});
			textsprite.color(1.0, 1.0, 1.0);
			textsprite.center = {
				x: game.screen.width * 0.5, 
				y: game.screen.height * 0.5
			};
			scene.remove(red);
			scene.add(textsprite);
		}
	});

	// scene 'deactivated' event listener function (scene exit-point)
	var onSceneDeactivated = function(e) {
		Ti.API.info("HomeScene has been deactivated.");
	};

	// Scene activation events here
	scene.addEventListener('activated', onSceneActivated);
	scene.addEventListener('deactivated', onSceneDeactivated);

	return scene;
};

module.exports = ExampleScene; 
