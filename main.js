img = "";       //declaring a variable at the top so that it can be used in all of the functions after it.
Status ="";
objects = []; //declaring an empty array, which will store the results once the cocossd model starts.

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded() {
    console.log("model Loaded!")
    Status = true;
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results; //putting the results we are getting into objects variable
}


function draw() {
    image(video, 0, 0, 380, 380);
    if(Status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}



