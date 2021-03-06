var count = 0;
var countAhead = 0;
var countBack = 0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getEmoji1(emojis, numOfTimes) {

    var selectedEmoji = Math.floor(this.getRandomArbitrary(0, emojis.length));
    var finalSvg = "<span class=" + "\"" + "logo" + "\"" + ">";
    var src = "./svg/" + emojis[selectedEmoji] + ".svg";
    var val = "<img src=" + "'" + src + "'/>";
    for (var i = 0; i < numOfTimes; i++) {
        finalSvg = finalSvg + val;
    }
    return finalSvg + "</span>";


}

function getEmoji(emojis, numOfTimes) {

    var selectedEmoji = Math.floor(this.getRandomArbitrary(0, emojis.length));
    var finalSvg = "<div class=" + "\"" + "row" + "\"" + ">";
    var src = "./svg/" + emojis[selectedEmoji] + ".svg";
    var val = "<div class=" + "\"" + "col s4 m2 " + "\"" + ">" + "<img src=" + "'" + src + "'/>" + "</div>";
    for (var i = 0; i < numOfTimes; i++) {
        finalSvg = finalSvg + val;
    }
    return finalSvg + "</div>";


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
    //document.getElementById("value").setAttribute('class',"floatRight");
    if (count === undefined) {
        count = 0;
    }
    document.addEventListener('deviceready', phonegapinit, false);
    var emojis = ["1f951", "1f98b", "1f955", "1f921", "1f920", "1f95b", "1f95e"];
    // var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    document.getElementById("content").innerHTML = getEmoji(emojis, count);
    document.getElementById("value").innerHTML = "<h3>" + count + "</h3>";
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

function createOptions1(correctAnswer) {

    var finalDiv = document.createElement('div');
    var buttonCorrect = document.createElement('BUTTON');
    var buttonWrong1 = document.createElement('BUTTON');
    var buttonWrong2 = document.createElement('BUTTON');

    buttonCorrect.innerHTML = correctAnswer;
    buttonCorrect.setAttribute('onclick', 'onCorrectAns()');
    buttonCorrect.setAttribute('class', 'btn-class');

    var wrongAnswers = getWrongAnswers(correctAnswer);
    buttonWrong1.innerHTML = wrongAnswers[0];
    buttonWrong1.setAttribute('onclick', 'onWrongAns()');
    buttonWrong1.setAttribute('class', 'btn-class');
    buttonWrong2.innerHTML = wrongAnswers[1];
    buttonWrong2.setAttribute('onclick', 'onWrongAns()');
    buttonWrong2.setAttribute('class', 'btn-class');


    var btnArray = [buttonCorrect, buttonWrong1, buttonWrong2];
    btnArray = shuffleArray(btnArray);
    for (var i = 0; i < btnArray.length; i++) {
        finalDiv.appendChild(btnArray[i]);
    }
    return finalDiv.innerHTML;
}

function createOptions(correctAnswer) {

    var finalDiv = document.createElement('div');
    finalDiv.setAttribute('class', 'row');
    var buttonCorrect = document.createElement('a');
    var buttonWrong1 = document.createElement('a');
    var buttonWrong2 = document.createElement('a');

    buttonCorrect.innerHTML = correctAnswer;
    var correctAnswerText = "onCorrectAns(" + correctAnswer + ")";
    buttonCorrect.setAttribute('onclick', correctAnswerText);
    buttonCorrect.setAttribute('class', 'waves-effect waves-light btn-floating');

    var wrongAnswers = getWrongAnswers(correctAnswer);
    buttonWrong1.innerHTML = wrongAnswers[0];
    buttonWrong1.setAttribute('onclick', 'onWrongAns()');
    buttonWrong1.setAttribute('class', 'waves-effect waves-light btn-floating');
    buttonWrong2.innerHTML = wrongAnswers[1];
    buttonWrong2.setAttribute('onclick', 'onWrongAns()');
    buttonWrong2.setAttribute('class', 'waves-effect waves-light btn-floating');

    var container = document.createElement('div')
    container.setAttribute('class', 'col s10');

    var btnArray = [buttonCorrect, buttonWrong1, buttonWrong2];
    btnArray = shuffleArray(btnArray);
    for (var i = 0; i < btnArray.length; i++) {
        container.appendChild(btnArray[i])
        finalDiv.appendChild(container);
    }
    return finalDiv.innerHTML;
}

function onCorrectAns(val) {

    var audio = getSoundTag("Yes-Small");
    // document.getElementById("audio").innerHTML =audio;
    audio.play();
    
    var delay=500; //1 second

setTimeout(function() {
     var audio = getSoundTag(val);
    // document.getElementById("audio").innerHTML =audio;
    audio.play();
  //your code to be executed after 1 second
}, delay);
    /*audio = getSoundTag("blank");
    // document.getElementById("audio").innerHTML =audio;
    audio.play();
    audio = getSoundTag(val);
    // document.getElementById("audio").innerHTML =audio;
    audio.play();*/

    Materialize.toast('Horray correct :) !', 3000, 'rounded')
        // document.getElementById("answer").innerHTML = "Hooray !! Correct. Click on more for new number.";
        //document.getElementById("moreTest").setAttribute("class", "displayClass");

}

function onWrongAns() {
    Materialize.toast('Oops wrong :(!', 3000, 'rounded')
        // document.getElementById("answer").innerHTML = "Oops!! Wrong Answer. Try again.";
        //document.getElementById("moreTest").setAttribute("class", "displayClass");

}

function setTestContent() {
    document.getElementById("value").setAttribute('class', 'floatNone');
    var testCount = Math.floor(getRandomArbitrary(1, 11));
    document.addEventListener('deviceready', phonegapinit, false);
    var emojis = ["1f951", "1f98b", "1f955", "1f921", "1f920", "1f95b", "1f95e"];
    // var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    document.getElementById("contentTest").innerHTML = getEmoji(emojis, testCount);
    document.getElementById("valueTest").innerHTML = createOptions(testCount);
    //  var audio = getSoundTag(count);
    // document.getElementById("audio").innerHTML =audio;
    // audio.play();

}

function onStart() {
    //var audio = getSoundTag("start");
    //document.getElementById("audio").innerHTML =audio;
    //audio.play();
    var delay = 0;
    setTimeout(function() {

        /*document.getElementById("navButtons").setAttribute("class", "displayClass");
        document.getElementById("navButtons").setAttribute("class", "displayClass");
        document.getElementById("homeDiv").setAttribute("class", "displayClass");
        document.getElementById("homeButtons").setAttribute("class", "hideClass")*/
        //document.getElementById("navButtons").setAttribute("class", "displayClass")
        $('#startPage').addClass('hideClass').removeClass('displayClass');
        $('#testPage').addClass('hideClass').removeClass('displayClass');
        $('#countPage').addClass('displayClass').removeClass('hideClass');
        $('#countBack').addClass('invisibleClass').removeClass('visibleClass');

        this.countAhead = 1;
        setContent(this.countAhead);
    }, 0);
}

function onTest() {
    /* var audio = getSoundTag("start");
      document.getElementById("audio").innerHTML =audio;*/
    var delay = 0;
    setTimeout(function() {
        /*  document.getElementById("navButtons").setAttribute("class", "hideClass");
          document.getElementById("moreTest").setAttribute("class", "displayClass");
          document.getElementById("homeDiv").setAttribute("class", "displayClass");
          document.getElementById("homeButtons").setAttribute("class", "hideClass")*/
        $('#startPage').addClass('hideClass').removeClass('displayClass');
        $('#countPage').addClass('hideClass').removeClass('displayClass');
        $('#testPage').addClass('displayClass').removeClass('hideClass');

        this.countAhead = 1;
        setTestContent();
    }, delay);
}

function onMore() {
    //document.getElementById("answer").innerHTML ="";
    setTestContent();

}

function onHome() {
    $('#countNext').addClass('visibleClass').removeClass('invisibleClass');
    $('#countPage').addClass('hideClass').removeClass('displayClass');
    $('#testPage').addClass('hideClass').removeClass('displayClass');
    $('#startPage').addClass('displayClass').removeClass('hideClass');
    this.countAhead = 0;
}

function onNext() {
    if (this.countAhead < 10) {
        this.countAhead++;
        setContent(this.countAhead);
        // document.getElementById("message").innerHTML = "";
        $('#countBack').addClass('visibleClass').removeClass('invisibleClass');
        if (this.countAhead == 10) {
            $('#countNext').addClass('invisibleClass').removeClass('visibleClass');
        }
    }

}

function onBack() {
    if (this.countAhead >= 2) {
        this.countAhead--;
        setContent(this.countAhead);
        $('#countNext').addClass('visibleClass').removeClass('invisibleClass');
        if (this.countAhead == 1) {
            $('#countBack').addClass('invisibleClass').removeClass('visibleClass');
        }
    }

}