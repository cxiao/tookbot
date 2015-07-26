function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatBot() {
	
	// current user input
	this.input;

    // cat noises
    var cat = {
        meow: ["meow", "mew", "mraw", "reow"],
        purr: ["purr", "prr"],
        hiss: ["hiss", "ss"]
    };

    var catemo = {
        basic: "(=^･ﻌ･^=)",
        sad: "(=；ｪ；=)",
        paws: "ฅ^•ﻌ•^ฅ",
        wow: "(*✧×✧*)",
        srsly: "(=^ಠㅅಠ^=)",
        evil: "（*ФωФ* )",
        angry: "😾",
        laugh: ":3c"
    };
    
    var currentmood = "basic";

    var mood = {
        joy: 0, 
        sad: 0, 
        anger: 0, 
        disgust: 0, 
    };
    
	/**
	 * respondTo
	 * 
	 * return nothing to skip response
	 * return string for one response
	 * return array of strings for multiple responses
	 * 
	 * @param input - input chat string
	 * @return reply of chat-bot
	 */
	this.respondTo = function(input) {
	
		this.input = input.toLowerCase();
		
		if(this.match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)')) {
            var resp = " ";
            for (i = 0; i < getRandomInt(1, 3); i++) {
                var n = getRandomInt(0, cat.meow.length - 1);
                resp += cat.meow[n] + " ";
            }
            return resp;
        }
		
		if(this.match('what[^ ]* up') || this.match('sup') || this.match('how are you')) {
            if (mood.anger > 1 && (mood.anger > mood.sadness)) { return catemo.anger; }
            if (mood.sadness > 1) { return catemo.sad; }
            else { return catemo.basic; }
        }
		
		if(this.match('l(ol)+') || this.match('(ha)+(h|$)') || this.match('lmao')) { 
            if (mood.sad > 0 || mood.disgust > 0) { mood.anger += 1; return ["hiss", catemo.srsly]; }
            else { return catemo.laugh; }
        }
        
        if(this.match('(love|pet|purr|happy|oh u|best)')) {
            mood.joy += 1;
            mood.sad -= 1;
            if (mood.joy == 1) {return ["purr", catemo.paws];}
            if (mood.joy == 2) {return ["purrrrrrrr", catemo.paws];}
            if (mood.joy == 3) {return ["https://www.youtube.com/watch?v=mk2YGxdhIVs", catemo.paws];}
            if (mood.joy > 3) {return ["purrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", "https://youtu.be/trcnd7qs-S8?t=21s", catemo.paws];}
        }
		
		if(this.match('(cya|bye|see ya|ttyl|talk to you later)')) {
            return "meow.";
        }
		
		if(this.match('(dumb|stupid|is that all)')) {
           mood.sad += 1;
           mood.angry += 1;
           if (mood.angry > mood.sad) { return catemo.angry; }
           else { return catemo.sad; }
        }
        
        if (this.match('turing')) {
            return "http://www.victoriaspast.com/ParlorCats2/cat_mirror.jpg"
        }
        
        if(this.match('food')) {
            return catemo.wow;
        }

		if(this.input == 'noop')
			return;
		
        else {
            if (mood.angry > 1) {
                var resp = " ";
                for (i = 0; i < getRandomInt(1, mood.angry); i++) {
                    var n = getRandomInt(0, cat.hiss.length - 1);
                    var o = getRandomInt(0, cat.meow.length - 1);
                    resp += cat.meow[n] + cat.hiss[n];
                }
                return resp;
            } else {
                var resp = " ";
                for (i = 0; i < getRandomInt(1, 19); i++) {
                    var n = getRandomInt(0, cat.meow.length - 1);
                    resp += cat.meow[n] + " ";
                }
                return resp;
            }

            return;
        }
	}
	
	/**
	 * match
	 * 
	 * @param regex - regex string to match
	 * @return boolean - whether or not the input string matches the regex
	 */
	this.match = function(regex) {
	
		return new RegExp(regex).test(this.input);
	}
}
