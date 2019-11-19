document.addEventListener("DOMContentLoaded", function () {

    let audio = document.getElementById("backgroundSong");

    // plays audio 
    document.addEventListener("click", function (event) {
        if (event.target.matches(".themeButton")) return;
        event.preventDefault();
        audio.play();
    }, false);

    //pauses audio
    document.addEventListener("click", function (event) {
        if (event.target.matches(".pauseButton")) return;
        event.preventDefault();
        audio.pause();
    }, false);

});