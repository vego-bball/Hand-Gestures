prediction = "";

Webcam.set({
    width: 350, 
    height: 280,
    image_format: "jpeg",
    jpeg_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_img" src = "'+data_uri+'">';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/UtEWgpagB/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded! ");
}

function speak()
{
    synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "rock n roll")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if (results[0].label == "bad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if (results[0].label == "amazing")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (results[0].label == "fist")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9994;";
        }
    }
}
