$( document ).ready(function() {

    // Main array of trivia information
    //////////////////////////////
    const questions = [
        {
            question: "According to eyewitness accounts, what gunslinger could hit a dime nine out of ten times when tossed in the air?",
            choices: ["Wyatt Earp", "Billy the Kid", "Doc Holiday", "Wild Bill Hickok"],
            answer: ["Wild Bill Hickok"],
            detail: "Allegedly, Wild Bill could also shoot an apple from a tree with one shot and then hit the apple with another bullet before it hit the ground.",
            gif: "assets/media/wildwest1.gif",
        },
        {
            question: "Who is the most famous woman known to have robbed a stagecoach?",
            choices: ["Pearl Hart", "Annie Oakley", "Atilla Smith", "Wilma Winchester"],
            answer: ["Pearl Hart"],
            detail: 'Pearl and her accomplice robbed a stagecoach and stole about $400. According to legend, she left all her victims $1 so they would have enough to eat.',
            gif: "assets/media/wildwest2.gif",
        },
        {
            question: 'For what reason did Doc Holliday leave the comforts of the eastern United States, heading west in 1875?',
            choices: ["He desired the lifestyle of an outlaw", "He suffered from tuberculosis", "He was running from the law", "He was sick of civilization"],
            answer: ["He suffered from tuberculosis"],
            detail: 'He was told that if he did not move to a warmer climate he would die of tuberculosis within months. However after moving to Dallas, his TB impeded his ability to work with patients, and he found an alternative lifestyle as a gambler to be suitable to his tastes anyhow.',
            gif: "assets/media/wildwest3.gif",
        },
        {
            question: 'How did Billy the Kid escape his "date with the hangman"?',
            choices: ["During a trip to the outhouse", "On the 3:10 to Yuma", "By marying the hangman's wife", "He died before his hanging"],
            answer: ["During a trip to the outhouse"],
            detail: "During a trip to the outhouse, the Kid slipped out of his handcuffs, ambushed a guard and shot the man to death with his own pistol. He then armed himself with a double-barreled shotgun and gunned down a second guard who was crossing the street. Once in control of the courthouse, the Kid collected a small arsenal of weapons, cut his leg shackles with a pickaxe and fled town on a stolen horse. News of the brazen escape was soon reprinted in newspapers across the country, making the Kid the most wanted man in the West.",
            gif: "assets/media/wildwest4.gif",
        },
        {
            question: 'What was the weapon that became known as “the gun that won the West”?',
            choices: ["Winchester Rifle", "Double-Barrel Shotgun", "Colt Peacemaker", "Smith & Wesson Model 3 Revolver"],
            answer: ["Colt Peacemaker"],
            detail: "The Colt .45-caliber was manufactured by Colt's Fire Arms Manufacturing Company in Hartford, Connecticut in 1873. At the time it sold for $17.00.",
            gif: "assets/media/wildwest5.gif",
        },
    ];

    // Global variables
    //////////////////////////////
    let currentQuestion = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0; 
    let notAnswered = 0;
    let questionTime = 26;
    let timeLeft = questionTime;
    let intervalName;
    let gifInterval;
    let draw = $("audio")[0];
    

    //Functions 
    //////////////////////////////
    
    //Hiding the card until it's trivia time
    $('.card').hide();

    //Giving 20 seconds/question and 5 to see the gif
    function questionTimer() {

        intervalName = setInterval(function() {

            timeLeft--;
            $("#timerDiv").html(`<p>You have ${timeLeft} seconds left, partner.</p>`);

            if (timeLeft === 0) {

                clearInterval(intervalName);
                notAnswered++;
                $("#timerDiv").empty();
                $("#questionDiv").empty();
                $("#answersDiv").html(`<p>You're too slow on the draw!</p><br /><p>The correct answer was ${questions[currentQuestion].answer[0]}!</p><br /><img class = "gif" src = ${questions[currentQuestion].gif}>`);
                gifInterval = setTimeout(questionPush, 7000);
                currentQuestion++;

            }   
        }, 1000);
    };

    function questionPush() {

        if (currentQuestion < questions.length) {

            clearInterval(intervalName);
            clearInterval(gifInterval);

            timeLeft = questionTime;

            $("#timerDiv").empty();
            $("#questionDiv").empty();
            $("#answersDiv").empty();

            $("#questionDiv").html(`${questions[currentQuestion].question}`);

            let choicesPath = questions[currentQuestion].choices;

            for (let i = 0; i < choicesPath.length; i++) {
                let choiceButtons = $(`<button>${questions[currentQuestion].choices[i]}</button>`) 
                choiceButtons.appendTo($(`#answersDiv`)); 

                choiceButtons.attr({"class":"answerOptions"});
                choiceButtons.css({"background-color":"#b0390a","font-family":"'Arbutus', cursive","color":"#ffffff","margin":"10px","padding":"7px","font-size":"25px"})
            
            };

            questionTimer();

        } else {

            $("#timerDiv").empty();
            $("#questionDiv").empty();
            $("#answersDiv").empty();

            gameOver();
        };
        
    };

    function rightAnswer() {

        let gifImg = $('<img class="gif">');
        clearInterval(intervalName);
        correctAnswers++;
        $("#timerDiv").empty();
        $("#questionDiv").empty();
        $("#answersDiv").empty();
        $("#answersDiv").html(`<p>Bully for you, deadshot! Will you be our new sheriff?</p><br /><p>The correct answer was ${questions[currentQuestion].answer[0]}!</p><br />`);
        $("#answersDiv").append(gifImg);
        gifImg.attr("src", questions[currentQuestion].gif);
        currentQuestion++;

        setTimeout(questionPush, 7000);

    };

    function wrongAnswer() {

        let gifImg = $('<img class="gif">');
        clearInterval(intervalName);
        wrongAnswers++;
        $("#timerDiv").empty();
        $("#questionDiv").empty();
        $("#answersDiv").empty();
        $("#answersDiv").html(`<p>You must be soaked, you layabout. Try again.</p><br /><p>The correct answer was ${questions[currentQuestion].answer[0]}!</p><br />`);
        $("#answersDiv").append(gifImg);
        gifImg.attr("src", questions[currentQuestion].gif);
        currentQuestion++;

        setTimeout(questionPush, 7000);

    };

    function gameOver() {

        if (correctAnswers >= 3) {
            $("#questionDiv").html(`<p>You're an ace in the hole!</p>`);

        } else if (wrongAnswers >= 3) {
            $("#questionDiv").html(`<p>Come back when you sober up...</p>`);

        } else if (notAnswered >= 3) {
            $("#questionDiv").html(`<p>What a bag of nails! Go warm your hands up with some prairie coal and try again, rusty.</p>`);
        
        } else {
            $("#questionDiv").html(`<p>You're not from around here are you?</p>`);
        
        }

        let restart = $('<button>Care for another?</button>')
        restart.attr('class','resetButton');
        restart.css({"background-color":"#b0390a","font-family":"'Arbutus', cursive","color":"#ffffff","margin":"10px","padding":"7px","font-size":"35px"});
        $('#answersDiv').append(restart);
        
    };

    function restartGame() {

        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0; 
        notAnswered = 0;

        $("#timerDiv").empty();
        $("#questionDiv").empty();
        $("#answersDiv").empty();

        questionPush();
        questionTimer();

        $(this).css("display", "none");

    };

    //On-click functions
    //////////////////////////////
    $(document).on('click', '.startButton', function() {
        
        event.preventDefault();

        draw.play();

        $(".songDiv").css("display", "none");
        $(".buttonDiv").css("display", "none");
        $(".card").css("display", "block");

        questionPush();

    });

    $(document).on('click', '.answerOptions', function() {
        
        draw.play();

        let correctOne = questions[currentQuestion].answer[0];
        let buttonWord = $(this).text();

        // If the value is true, clear the content area, stop the counter, and display the correct answer screen
        if (buttonWord == correctOne) {
            clearInterval(intervalName);
            correctAnswers++;
            rightAnswer();
        };
        // If false, clear content area, stop counter, and display wrong answer screen
        if (buttonWord !== correctOne) {
            clearInterval(intervalName)
            wrongAnswers++;
            wrongAnswer();
        };
    });

    $(document).on('click', '.resetButton', function() {
        
        event.preventDefault();
        
        restartGame();
    });



});