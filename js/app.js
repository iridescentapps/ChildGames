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

function phonegapinit() {
    window.plugins.insomnia.keepAwake();
}

function setContent(count) {
    if (count === undefined) {
        count = 0;
    }
    document.addEventListener('deviceready', phonegapinit, false);
    var emojis = ["1f951", "1f98b", "1f955", "1f921", "1f920", "1f95b", "1f95e"];
    // var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    document.getElementById("content").innerHTML = getEmoji(emojis, count);
    document.getElementById("value").innerHTML = count;

}

function onStart() {
    document.getElementById("navButtons").setAttribute("class", "displayClass");
    document.getElementById("startButton").setAttribute("hidden", "true");
    this.countAhead = 1;
    setContent(this.countAhead);


}

function onNext() {
    if (this.countAhead < 10) {
        this.countAhead++;
        setContent(this.countAhead);
    }
    else {
        document.getElementById("message").innerHTML = "Maximum count is till 10.Click 'Previous' Button to see smaller numbers";
    }

}

function onBack() {
    if (this.countAhead >= 2) {
        this.countAhead--;
        setContent(this.countAhead);
    }
    else {
        document.getElementById("message").innerHTML = "Minimum count is till 1.Click 'Next' Button to see bigger numbers";
    }

}