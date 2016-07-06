(function() {
    
     function phonegapinit() {
        window.plugins.insomnia.keepAwake();
    }
    
    function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
    }
    
    

    document.addEventListener('deviceready', phonegapinit, false);
    
    var emojis = ["1f951","1f98b","1f955","1f921","1f920","1f95b","1f95e"];
    //var emojis = ["\xF0\x9F\x86\x9A"];
    
   // var emojisLength = emojis.length();
    
    
    
    var numberOfTimes = Math.floor(getRandomArbitrary(1,11));
    
    function getEmoji(numOfTimes){
        
        var selectedEmoji = Math.floor( getRandomArbitrary(0,emojis.length));
        var finalSvg="<span>";
        
        /*for(var i=0;i<numOfTimes;i++){
            finalSvg = finalSvg+ '<p>&x#' + emojis[selectedEmoji]+"</p>";
        }*/
        
        var elem=document.createElement('p');
       // elem.innerHTML = "&#"+emojis[selectedEmoji]+";";
        elem.innerHTML = "./svg/" + emojis[selectedEmoji]+".svg";
        var value = elem.innerHTML;
        
         for(var i=0;i<numOfTimes;i++){
            finalSvg = finalSvg+ '<p>' + value+"</p>";
        }
        
        
        return finalSvg +"</span>";
        
        
    }
    
    
    document.getElementById("content").innerHTML=getEmoji(numberOfTimes);
    document.getElementById("value").innerHTML=numberOfTimes;
    
    
    
    
})();
    