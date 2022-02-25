// canvas width
const w = 600;

// canvas height
const h = 500;

//gets the canvas from the HTML doc
const canvas = document.getElementsByTagName("canvas")[0];

// set canvas height & width
canvas.height = h;
canvas.width = w;

// create a stage, needed for CreateJS
const stage = new createjs.Stage(canvas);

// set frame rate
createjs.Ticker.framerate = 30; 

// add a ticker listener to the stage 
createjs.Ticker.addEventListener("tick", stage);

// add a ticker listener to the update function
createjs.Ticker.addEventListener("tick", update);

// mappa map
let myMap;

// loader variable
let loader;

// ufo sprite sheet variable
let ufoSS;

// an array to contain each ufo
let ufos = [];

// an array to contain the circle-shapes that marks where the ufo were spotted
let plottedUfos = [];

// vaiable to contain the cvs file data
let data;

//text data
let datetime;
let city;
let state;
let country;
let shape;
let comments;
let textOutput;
let divElement;

// increment variable used to read the next row in the cvs file
let cvsIndex = 0;

// used to name the setInterval function so we can clear it later
let ufoInterval;

// users token from Mapbox.com
const key = 'pk.eyJ1IjoiamVubmlmZXJob3Jvd2l0eiIsImEiOiJja21pNXd5NzAwZHk4MnFxdXdlMDE1dTJjIn0.JNNHK-Megf7tCA47ctPcyg';

// new instance of mappa 
const mappa = new Mappa('MapboxGL', key);

// an object for the mappa options
const options = {
  lat: 0, // latitude
  lng: 0, // longitude
  zoom: 1.4, // map zoom
  style: 'mapbox://styles/mapbox/dark-v9' // Mapbox map link

};

// p5 pre-load method
function preload()
{
  // p5 function for loading a cvs file
  data = loadTable('scrubbed.csv', 'csv', 'header');
  
  // loads the sprite sheet 
  loadAssets();
}

// loads the sprite sheet 
function loadAssets()
{
	//image loader manifest
	var manifest = [
		 {id: "ufo", src:"ufo3.png"},
	 ];
	 
	//create loader, loaded assets
	loader = new createjs.LoadQueue(false);
	
	// calls the handleComplete function once the loading is completed
	loader.addEventListener("complete", handleComplete);

    // loads the manifest
	loader.loadManifest(manifest, true);
}

//loading complete
function handleComplete()
{
	// removes the loader event listener
	loader.removeEventListener("complete", handleComplete);

    //framerate: frames per second, the speed of the animation
	//images: the sprite image to use
	//frames: x, y, height and width properties for each frame
	let ufoData = {
		framerate:12,
		images:[loader.getResult("ufo")],
		frames:[
					[0, 0, 512, 256, 0, -9, -4],
					[512, 0, 512, 256, 0, -9, -4],
					[1024, 0, 512, 256, 0, -9, -4],
					[0, 256, 512, 256, 0, -9, -4],
					[512, 256, 512, 256, 0, -9, -4],
					[1024, 256, 512, 256, 0, -9, -4],
					[0, 512, 512, 256, 0, -9, -4],
					[512, 512, 512, 256, 0, -9, -4],
					[1024, 512, 512, 256, 0, -9, -4]
		],
    }
    
	// creates a new sprite sheet from the data: ufoData
    ufoSS = new createjs.SpriteSheet(ufoData);
}


// P5 JS, setup() runs once
function setup()
{
  // apply the options to myMap
  myMap = mappa.tileMap(options);
  
  // assign the canvas to overlay myMap
  myMap.overlay(canvas); 
  
  // setInterval calls createUFO() every 2 seconds
  ufoInterval = setInterval(createUFO, 2000);

  // myMap.onChange(your function) mappa method, if the user moves the map do something
  myMap.onChange(drawPoint);
}


// creates a new ufo sprite
function createUFO()
{
	// get the latitude from the cvs file @ cvsIndex
	let destX = data.getString(cvsIndex, 'latitude');
	
	// get the longitude from the cvs file @ cvsIndex
	let destY = data.getString(cvsIndex, 'longitude');

    // create a new Create JS sprite instance from the ufo sprites sheet
	// the clone method duplicates the sprite so you can have multiples 
	let ufo = new createjs.Sprite(ufoSS).clone();
	
	// set the x origins to the center of the ufo sprite
	ufo.regX = 135;
	
	// set the y origins to the center of the ufo sprite
	ufo.regY = 82.5;
	
	// set the starting x position of the ufo sprite
	ufo.x = 300;
	
	// set the starting y position of the ufo sprite
	ufo.y = 500;
	
	// add a destination x property to ufo sprite
	ufo.destX = data.getString(cvsIndex, 'latitude');
	
	// add a destination y property to ufo sprite
	ufo.destY = data.getString(cvsIndex, 'longitude');
	
	// datetime, city, state, country, shape, comments data from cvs file
	datetime = data.getString(cvsIndex, 'datetime');
	city = data.getString(cvsIndex, 'city');
	state = data.getString(cvsIndex, 'state');
	country = data.getString(cvsIndex, 'country');
	shape = data.getString(cvsIndex, 'shape');
	comments = data.getString(cvsIndex, 'comments');
	
	// create the text string
	textOutput = "Date: " + datetime + " <br /> Place: " + city + ", " + state + ", " + country + "<br /> UFO Shape: " + shape + "<br />" + comments;
	
	// get the div from the HTML page and populate it with the textOutput
	divElement = document.getElementById('text');
	
	// populate the HTML div element with the textOutput
	divElement.innerHTML = textOutput;
	
	// add the ufo to the stage
	stage.addChild(ufo);
	
	// play the ufo sprite
	ufo.play();
	
	// add this ufo to the ufos array
	ufos.push(ufo)
	
	// increment the cvsIndex, used to read the next row in the cvs file
	cvsIndex++;
	
	// if cvsIndex is equal to the number of rows in the cvs file: clear/stop the ufoInterval
	if(cvsIndex == data.length)
	{
		// clear the ufoInterval because we've reached the end of the cvs file
		clearInterval(ufoInterval);
	}
}

// called every "tick"
function update()
{
	// for each item "ufo" in the ufos array run the following code
	for(let i = 0; i < ufos.length; i++)
	{
		// myMap.latLngToPixel() This method allows to get the pixel position of a latitude and longitude coordinates in relationship to the map
		// the parameters used here come from the ufo.destX & ufo.destY properties setup in creatUFO()
        // assign the results from myMap.latLngToPixel(ufos[i].destX, ufos[i].destY) to the pixelPos object
		let pixelPos = myMap.latLngToPixel(ufos[i].destX, ufos[i].destY);
		
		// uses the gsap tween class to move and scale the ufo over time
		// gsap.to(object, {time, end X position, end Y position, end scale/size})
		gsap.to(ufos[i], {duration: 3, x: pixelPos.x, y: pixelPos.y, scale: 0.03});
		
		// if the current ufo x & y positions are equal to pixelPos.x & pixelPos.y create a circle graphic and remove the ufo
		if(Math.floor(ufos[i].x) == Math.floor(pixelPos.x) && Math.floor(ufos[i].y) == Math.floor(pixelPos.y))
		{
			// create a new graphic "circle"
			let graphics = new createjs.Graphics().beginFill("#00FF00").drawCircle(pixelPos.x, pixelPos.y, 2);
			
			// apply the graphic to a shape
            let shape = new createjs.Shape(graphics);
			
			// create destination prosperities to used later when recreating the shape upon the user moving the map
			shape.destX = ufos[i].destX;
			shape.destY = ufos[i].destY;
			
			// add shape to the stage
			stage.addChild(shape);
			
			// add the shape to the plottedUfos array
			plottedUfos.push(shape); 
			 
			// remove the ufo from the stage
			stage.removeChild(ufos[i]);
			
			// remove the ufo from the ufos array
			ufos.splice(i, 1);
		}
	}
}

// called when the user moves the map
// removes and recreates the circle shapes
function drawPoint()
{
	// for each circle-shape in the plottedUfos array run the following code
	for(let j = 0; j < plottedUfos.length; j++)
	{
		// remove the old shape from the stage
		stage.removeChild(plottedUfos[j]);
		
		// assign the results from myMap.latLngToPixel(plottedUfos[i].destX, plottedUfos[i].destY) to the pixelPos object
		let pixelPos = myMap.latLngToPixel(plottedUfos[j].destX, plottedUfos[j].destY);
		
		// create a new graphic "circle"
		let graphics = new createjs.Graphics().beginFill("#00FF00").drawCircle(pixelPos.x, pixelPos.y, 2);
		
		// apply the graphic to a shape
		let shape = new createjs.Shape(graphics);
		
		// create destination prosperities to used later when recreating the shape upon the user moving the map
		shape.destX = plottedUfos[j].destX;
		shape.destY = plottedUfos[j].destY;
		
		// add shape to the stage
		stage.addChild(shape);
		
		// remove the old shape from the plottedUfos array
		plottedUfos.splice(j, 1);
		
		// add the new shape to the plottedUfos array
		plottedUfos.push(shape); 
	}
}