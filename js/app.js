var count = 0;
var countAhead = 0;
var countBack = 0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getEmoji(emojis, numOfTimes) {

    var selectedEmoji = Math.floor(this.getRandomArbitrary(0, emojis.length));
    var finalSvg = "<span class=" + "\"" + "logo" + "\"" + ">";
    var src = "./svg/" + emojis[selectedEmoji] + ".svg";
    var val = "<img src=" + "'" + src + "'/>";
    for (var i = 0; i < numOfTimes; i++) {
        finalSvg = finalSvg + val;
    }
    return finalSvg + "</span>";


}

function getSoundPath(audioName) {
    var path = "./sounds/" + audioName + ".mp3";
    //var audio = new Media(path);
    // return audio;
    return path;

}

function getSoundTag(audioName) {
    var path = getSoundPath(audioName);
    //  var audioTag = "<audio autoplay><source src=\""+path+"\" type=\"audio/mpeg\" /></audio>"
    var audio = new Audio(path);
    //return audioTag;
    return audio;

}

function phonegapinit() {
    window.plugins.insomnia.keepAwake();
}

function setContent(count) {
    document.getElementById("value").setAttribute('class','floatRight');
    if (count === undefined) {
        count = 0;
    }
    document.addEventListener('deviceready', phonegapinit, false);
    var emojis = ["1f951", "1f98b", "1f955", "1f921", "1f920", "1f95b", "1f95e"];
    // var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    document.getElementById("content").innerHTML = getEmoji(emojis, count);
    document.getElementById("value").innerHTML = count;
    var audio = getSoundTag(count);
    // document.getElementById("audio").innerHTML =audio;
    audio.play();

}

function shuffleArray(a) {
    var p, x, i;
    for (i = a.length; i; i--) {
        p = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[p];
        a[p] = x;
    }

    return a;
}

function getWrongAnswers(correctAnswer) {
    var wrongArray = [0, 0];
    for (var j = 0; j < wrongArray.length; j++) {
        var chk = false;
        while (chk === false) {
            var chk1 = false;
            var chk2 = false;
            var number = Math.floor(getRandomArbitrary(1, 11));
            if (number == correctAnswer)
                chk1 = false;
            else
                chk1 = true;

            if (wrongArray.indexOf(number) != -1)
                chk2 = false;

            else
                chk2 = true;

            if (chk1 && chk2) {
                chk = true;
                wrongArray[j] = number;

            }

        }
    }
    return wrongArray;
}

function createOptions(correctAnswer) {

    var finalDiv = document.createElement('div');
    var buttonCorrect = document.createElement('BUTTON');
    var buttonWrong1 = document.createElement('BUTTON');
    var buttonWrong2 = document.createElement('BUTTON');

    buttonCorrect.innerHTML = correctAnswer;
    buttonCorrect.setAttribute('onclick', 'onCorrectAns()');
    buttonCorrect.setAttribute('class','btn-class');
  
    var wrongAnswers = getWrongAnswers(correctAnswer);
    buttonWrong1.innerHTML = wrongAnswers[0];
    buttonWrong1.setAttribute('onclick', 'onWrongAns()');
    buttonWrong1.setAttribute('class','btn-class');
    buttonWrong2.innerHTML= wrongAnswers[1];
    buttonWrong2.setAttribute('onclick', 'onWrongAns()');
    buttonWrong2.setAttribute('class','btn-class');


    var btnArray = [buttonCorrect, buttonWrong1, buttonWrong2];
    btnArray = shuffleArray(btnArray);
    for (var i = 0; i < btnArray.length; i++) {
        finalDiv.appendChild(btnArray[i]);
    }
    return finalDiv.innerHTML;
}

function onCorrectAns() {
    document.getElementById("answer").innerHTML = "Hooray !! Correct. Click on more for new number.";
    //document.getElementById("moreTest").setAttribute("class", "displayClass");

}

function onWrongAns() {
    document.getElementById("answer").innerHTML = "Oops!! Wrong Answer. Try again.";
    //document.getElementById("moreTest").setAttribute("class", "displayClass");

}

function setTestContent() {
    document.getElementById("value").setAttribute('class','floatNone');
    var testCount = Math.floor(getRandomArbitrary(1, 11));
    document.addEventListener('deviceready', phonegapinit, false);
    var emojis = ["1f951", "1f98b", "1f955", "1f921", "1f920", "1f95b", "1f95e"];
    // var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    document.getElementById("content").innerHTML = getEmoji(emojis, testCount);
    document.getElementById("value").innerHTML = createOptions(testCount);
    //  var audio = getSoundTag(count);
    // document.getElementById("audio").innerHTML =audio;
    // audio.play();

}

function onStart() {
    var audio = getSoundTag("start");
    //document.getElementById("audio").innerHTML =audio;
    audio.play();
    var delay = 3300;
    setTimeout(function() {
        document.getElementById("navButtons").setAttribute("class", "displayClass");
        document.getElementById("navButtons").setAttribute("class", "displayClass");
        document.getElementById("homeDiv").setAttribute("class", "displayClass");
        document.getElementById("homeButtons").setAttribute("class", "hideClass")
        this.countAhead = 1;
        setContent(this.countAhead);
    }, delay);
}

function onTest() {
    /* var audio = getSoundTag("start");
      document.getElementById("audio").innerHTML =audio;*/
    var delay = 3300;
    setTimeout(function() {
        document.getElementById("navButtons").setAttribute("class", "hideClass");
        document.getElementById("moreTest").setAttribute("class", "displayClass");
        document.getElementById("homeDiv").setAttribute("class", "displayClass");
        document.getElementById("homeButtons").setAttribute("class", "hideClass")

        this.countAhead = 1;
        setTestContent();
    }, delay);
}

function onMore() {
    document.getElementById("answer").innerHTML ="";
    setTestContent();
    
}

function onHome() {
    document.getElementById("navButtons").setAttribute("class", "hideClass");
    document.getElementById("moreTest").setAttribute("class", "hideClass");
    document.getElementById("homeDiv").setAttribute("class", "hideClass");
    document.getElementById("homeButtons").setAttribute("class", "displayClass")
    document.getElementById("content").innerHTML = "";
    document.getElementById("value").innerHTML = "";
    document.getElementById("answer").innerHTML ="";
    document.getElementById("message").innerHTML="";
    this.countAhead = 0;
}

function onNext() {
    if (this.countAhead < 10) {
        this.countAhead++;
        setContent(this.countAhead);
        document.getElementById("message").innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML = "Maximum count is till 10.Click 'Previous' Button to see smaller numbers";
    }

}

function onBack() {
    if (this.countAhead >= 2) {
        this.countAhead--;
        setContent(this.countAhead);
        document.getElementById("message").innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML = "Minimum count is till 1.Click 'Next' Button to see bigger numbers";
    }

}