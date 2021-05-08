var prediction_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 85,
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id ="capture_image" src="' + data_uri + '">'
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/K9HbmkoT-/model.json", model_loaded);

function model_loaded() {
    console.log('model_loaded')
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, got_results);
}

function got_results(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        to_speak = "";
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        gesture = results[0].label;
        if (gesture == "best") {
            to_speak = "this is the best";
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
        } else
        if (gesture == "victory") {
            to_speak = "this gesture is called victory";
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
        /*if (gesture == "amazing") {
            to_speak = "this is amazing";
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }*/
        speak_this();
    }
}

function speak_this() {
    var synth = window.speechSynthesis;
    speak_data = to_speak;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}