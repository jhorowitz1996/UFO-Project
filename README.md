# UFO Sightings with JS 👽🛸👩🏻‍💻

## Harvard Graduate School of Deisgn (GSD) Indpendent Study: ADV 9201 ##

### By Jennifer L. Horowitz (GSD '22) ###
#### Independent Study Advisor: Professor Jose Luis Garcia del Castillo y Lopez ####

Link: 
http://my-test-server.net/JenniferIndependentStudyJSVis/JenniferIndependentStudyJSVis.html 

JS wrapper: 
https://mappa.js.org/

Dataset: 
https://www.kaggle.com/c/suspicious-objects-what-is-that-on-the-sky

<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161345230-b3fda4f5-38e1-45b2-89fd-9599d0626143.png">

I used different cdns and libraries from the tutorial below. I’m proud of this funky little visualization because it’s a fair assessment of where I am with JS at the moment. I’m grateful for this independent study course to dive into JS wholeheartedly this semester and to have been able to sit down and benefit from Prof. Garcia del Castillo y Lopez's expertise throughout the Independent Study process. 

### Set up HTML Document ####

First, I set up the HTML document with a header at the center point of the screen by centering a div and turning the text to lime-green (along with the font settings). Once I got the text to align I moved down to the source code libraries this was drawing from. At first, I was going to use the P5 library but I found that P5 has limited support for sprite-sheets and no tween engine. Essentially, I needed to use the Green Socks (gsap) tween engine to allow the ufo objects I was using to move effectively from point A to point B. The Createjs library that I drew on (line 35) let me use sprite sheets and has a bunch of classes. Per your recommendation, I did make use of P5 for this. In this case, P5 was used for parsing the csv file with the UFO sightings geographic dataset. Note: I did initially use P5 but it had a somewhat convoluted function so I couldn’t call it in a loop for the animation piece. At the end there, Line 36 allowed me to sync the HTML file up with the main.js file needed. 




### Full Process Detailed ###

To start, I set the sizing dimensions up on the screen. I learned I would also need to create a “stage” in drawing from the CreateJS library. I learned the system variable frameRate contains the number of frames per second. The EventListener receives the info about the framerate which informs how many “ticks” per second. 

<img width="364" alt="image" src="https://user-images.githubusercontent.com/66505479/161341754-5996bbb9-7f4f-412c-9efc-c899e4c2347b.png">

The EventListener receives the info about the framerate which informs how many “ticks” per second.

<img width="398" alt="image" src="https://user-images.githubusercontent.com/66505479/161341907-4277e0d7-1b48-43bf-93e4-d6df053753ea.png">


Here, I’m realizing, I could have also made the Mappa map a const but instead I made it a let; works either way though. 

<img width="371" alt="image" src="https://user-images.githubusercontent.com/66505479/161342113-9e8e025b-e330-46b3-a9b4-10b6d7ff6e5c.png">

 
This array holds the circular dots that marks each of the UFO sightings. I did have some trouble with the csv file for the alien sighting data because there was an extra space after the longitude value. That tripped me up until I realized that was the issue there. 

 <img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342143-c6e6b9dc-3dec-4e93-952f-19aa1b4fa8f6.png">


Here’s where I connected up the csv file (with the data cleaned up without the space after the long. numbers) and where I created a second loader using the CreateJs method for loading the sprite-sheet. 

 <img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342257-f5c013df-bbe9-4ed4-b54e-7bfc6c622c4a.png">



 I ended up creating a second preloader using Create JS, I suppose I could have used just one of these but I was afraid I might not be able to access the loaded files correctly later based upon what I was reading in the Create JS and P5 documentation. Using createjs I created a loader variable for my createjs loaderqueue. Starting on line 95 I then removed the event listener function to free up memory. Lines 101-115 is the object that contains the sprite sheet data. I copy pasted from the JSON file that the program Zoe outputs when creating an individual sprite sheet image. This data is used to draw portions of the large png that contains 9 individual ufo graphics that makeup the rotating animation. I’d called on svgs from a sprite sheet in previous work so I had a basic sense of how to set this up and experimented around with the frame settings to make sure I was capturing the UFOs on my sprite sheet. 

<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342289-9f34ce87-fad9-436d-a301-5c2f5c760cf9.png">



Here I’m setting up the interval to run once and assigning the canvas I created at the very top of the main.JS file to the overlay on top of the Mapbox map I created. Line 133 set up a P5 function that runs automatically once it loads. I then set an interval that calls every 2 seconds calling the createUFO function At the very end there the myMap.onChange(myfunction) mappa method which will be especially relevant when I get to the code block that starts at line 233. 

<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342688-24aa52a1-f0a2-49ad-a46d-d2220f85eef8.png">



I then got the data for latitutde and longitude in the csv and loaded that up (in the same manner in which the Mappa tutorial did). Then I needed to create multiple instances of the sprites in a single sprite sheet. Here’s where Create JS turned out to be a great library mostly because it allows you to generate a sprite sheet with your desired pngs in a nice row to use built-in. I then set the position of the x and y position of the sprite through its animated movement. 


<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342704-0f51956d-bd61-476c-a76d-0fef78104176.png">


Now I set up the animation to read each row of the csv file. 

 
<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342718-b4191331-f4b8-4e3f-b7f3-d6f6aa4289d0.png">


I adjusted the position of the ufo png with each frame. Here is where I found the Green Socks library helpful to use.


 
<img width="480" alt="image" src="https://user-images.githubusercontent.com/66505479/161342752-c060570b-6fa8-40a5-acfa-d8d4e254961e.png">



I then removed the ufo animations to save memory and replaced it with a green circle once it gets to its destination. Things got more complex when I realized there needed to be a way to ensure the green little circles for each ufo would need their own separate function in order to ensure they didn’t move when the viewer panned along the screen. I called the same green circle shape I used above to place the object’s position in space. 

<img width="468" alt="image" src="https://user-images.githubusercontent.com/66505479/161342775-9fdeebb4-792e-41c7-8a41-be5338f90cc7.png">



I hosted the visualization through a local http server et voi la! An out-of-this-world JS map visualization. 


Side note here, I am not a big extraterrestrial enthusiast I just wanted to find a fun geographic dataset to visualize. It was either aliens or avocado prices for fun/cool geographic dataset and the alien one felt like a better fit because I could whip out my animation skills in Blender for the flying saucers (together with the Green Socks library). 
