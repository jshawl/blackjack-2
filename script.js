// $(function() {
    var blackJack = {
      deck : [
        { value: 1 , image: "img/card/spadesAce.png" },
        { value: 2 , image: "img/card/spades2.png" },
        { value: 3 , image: "img/card/spades3.png" },
        { value: 4 , image: "img/card/spades4.png" },
        { value: 5 , image: "img/card/spades5.png" },
        { value: 6 , image: "img/card/spades6.png" },
        { value: 7 , image: "img/card/spades7.png" },
        { value: 8 , image: "img/card/spades8.png" },
        { value: 9 , image: "img/card/spades9.png" },
        { value: 10 , image: "img/card/spades10.png" },
        { value: 10 , image: "img/card/spadesJack.png" },
        { value: 10 , image: "img/card/spadesQueen.png" },
        { value: 10 , image: "img/card/spadesKing.png" },

        { value: 1 , image: "img/card/heartsAce.png" },
        { value: 2 , image: "img/card/hearts2.png" },
        { value: 3 , image: "img/card/hearts3.png" },
        { value: 4 , image: "img/card/hearts4.png" },
        { value: 5 , image: "img/card/hearts5.png" },
        { value: 6 , image: "img/card/hearts6.png" },
        { value: 7 , image: "img/card/hearts7.png" },
        { value: 8 , image: "img/card/hearts8.png" },
        { value: 9 , image: "img/card/hearts9.png" },
        { value: 10 , image: "img/card/hearts10.png" },
        { value: 10 , image: "img/card/heartsJack.png" },
        { value: 10 , image: "img/card/heartsQueen.png" },
        { value: 10 , image: "img/card/heartsKing.png" },

        { value: 1 , image: "img/card/clubsAce.png" },
        { value: 2 , image: "img/card/clubs2.png" },
        { value: 3 , image: "img/card/clubs3.png" },
        { value: 4 , image: "img/card/clubs4.png" },
        { value: 5 , image: "img/card/clubs5.png" },
        { value: 6 , image: "img/card/clubs6.png" },
        { value: 7 , image: "img/card/clubs7.png" },
        { value: 8 , image: "img/card/clubs8.png" },
        { value: 9 , image: "img/card/clubs9.png" },
        { value: 10 , image: "img/card/clubs10.png" },
        { value: 10 , image: "img/card/clubsJack.png" },
        { value: 10 , image: "img/card/clubsQueen.png" },
        { value: 10 , image: "img/card/clubsKing.png" },

        { value: 1 , image: "img/card/diamondsAce.png" },
        { value: 2 , image: "img/card/diamonds2.png" },
        { value: 3 , image: "img/card/diamonds3.png" },
        { value: 4 , image: "img/card/diamonds4.png" },
        { value: 5 , image: "img/card/diamonds5.png" },
        { value: 6 , image: "img/card/diamonds6.png" },
        { value: 7 , image: "img/card/diamonds7.png" },
        { value: 8 , image: "img/card/diamonds8.png" },
        { value: 9 , image: "img/card/diamonds9.png" },
        { value: 10 , image: "img/card/diamonds10.png" },
        { value: 10 , image: "img/card/diamondsJack.png" },
        { value: 10 , image: "img/card/diamondsQueen.png" },
        { value: 10 , image: "img/card/diamondsKing.png" }
            ] ,

      player : {
        $cardsLocation: $("div.player"),
        $scoreLocation: $("#playerScore"),
        score : 0,
        cards : [] ,
        bankingRoll : 1000,
        bet : 0
      } ,

      dealer : {
        $cardsLocation: $("div.dealer"),
        $scoreLocation: $("#dealerScore"),
        score : 0,
        cards : [] ,
      } ,

      dealCard : function(person, facedown, callback) {
        var cardIndex = Math.floor(Math.random() * this.deck.length) ;
        if (facedown) {
              $("<img />").appendTo(person.$cardsLocation).attr( "src", "img/card/back.png")
                          .css({ marginLeft: '500px', opacity: '0'}).animate({ marginLeft: '-40px', opacity: '1'}, 400, callback);
        } else {
              $("<img />").appendTo(person.$cardsLocation).attr( "src", this.deck[cardIndex].image)
                          .css({ marginLeft: '540px', opacity: '0'}).animate({ marginLeft: '-40px', opacity: '1'}, 400, callback);
        }
        var card = this.deck.splice(cardIndex, 1)[0]
        person.cards.push(card);
      } ,

      updateScore : function(person) {
        var lowScore = 0;
        var hasAce = false;
          for (var i=0; i < person.cards.length; i++) {
            hasAce |= person.cards[i].value === 1;  // if hasAce has been already set to true it'll stay true, otherwise it's equal to value === 1
            lowScore += person.cards[i].value ;
          }

          person.$scoreLocation.text(lowScore)
          person.score = lowScore;
          if (hasAce) {
            highScore = lowScore + 10;
            if (highScore < 21) {
              person.$scoreLocation.text( lowScore + "|" + highScore )
              person.score = highScore;
            } else if (highScore === 21) {
              person.$scoreLocation.text( highScore )
              person.score = highScore;
            }
          }
      } ,

      setUpHitBtn : function() {
        var self = this;
        var $button = $(":button#hit");
        $button.on( "click", function() {
            self.dealCard(self.player);
            self.updateScore(self.player);
            self.checkIfRoundIsOver(self.player);
        })
      } ,

      setUpStandBtn : function() {
        var self = this;
        var $button = $(":button#stand");
        $button.on( "click", function() {
            self.endHand();
        })
      } ,

      checkIfRoundIsOver : function(person) {
        var self = this;
        if ( person.score === 21 || person.score > 21 ) {
          setTimeout(function () {
              self.endHand();
          }, 500);
        }
      } ,

      endHand : function () {
        $(":button#hit").attr("disabled","disabled");
        $(":button#stand").attr("disabled","disabled");
        $("div.dealer > img:nth-of-type(2)").attr( "src", blackJack.dealer.cards[1].image);
        this.dealerDrawCards();
      },

      dealerDrawCards : function() {
        var self = blackJack;
        self.updateScore(self.dealer);
        var score = parseInt(self.dealer.score);
        var playerHasBlackJack = self.player.score === 21 && self.player.cards.length === 2;
        if (score < 17 && !playerHasBlackJack) {
          self.dealCard(self.dealer, false, self.dealerDrawCards);
        } else {

          self.showFinalResults();
        }
      },

      showFinalResults : function () {
        var result;
        var $header = $(".popup h2");
        var $board = $("div#popup1");
        var $popup = $(".popup");
        var $bankRoll = $("#bankingRoll");
        var $yourBet = $("#yourBet");

        // this.player.bankingRoll -= amount;
        // this.player.bet += amount;

        if (this.player.score === 21 && this.player.cards.length === 2 && this.dealer.score !== 21) {
          result = "BlackJack";
          this.player.bankingRoll += this.player.bet * 1.5;
          this.soundEffects.happySound.play();
        } else if (this.player.score > 21) {
          result = "Busted";
          this.soundEffects.sadSound.play();
        } else if (this.dealer.score > 21 || this.player.score > this.dealer.score) {
          result = "You win";
          this.player.bankingRoll += this.player.bet * 2;
          this.soundEffects.happySound.play();
        } else if (this.dealer.score > this.player.score) {
          result = "You lost";
          this.soundEffects.sadSound.play();
        } else {
          result = "Pushed";
          this.player.bankingRoll += this.player.bet;
          this.soundEffects.sadSound.Play();
        }

        $(".content").show();
        $header.text(result);
        $(".dealerScore").text(this.dealer.score);
        $(".playerScore").text(this.player.score);
        $board.show();
        setTimeout(function() {
          $popup.css("transform", "");
        }, 0)
      },

      soundEffects : {
        happySound: document.createElement('audio'),
        sadSound: document.createElement('audio')
      },

      loadSoundEffects : function () {
        this.soundEffects.happySound.setAttribute('src', 'audio/ApplauseCheeringC AR04_05_1.wav.m4a');
        this.soundEffects.sadSound.setAttribute('src', 'audio/ReactionCrowd AR02_46_1.wav.m4a');
      } ,

      resetGame : function() {
        var self = this;
        var $yourBet = $("#yourBet");
        var $bankRoll = $("#bankingRoll");
        this.player.bet = 0;
        $yourBet.text(" $" + this.player.bet);
        $bankRoll.text(" $" + this.player.bankingRoll);

        var array = $.merge( self.player.cards.splice(0, self.player.cards.length), self.dealer.cards.splice(0, self.dealer.cards.length));
        $.merge( self.deck, array);
        $(".dealer").html(null)
        $(".player").html(null)
        $("#dealerScore").html(null)

        $(":button#hit").hide();
        $(":button#stand").hide();

      } ,

      dealHand : function() {
        var self = this;

        this.dealCard(this.player) ;

        var timeout = setTimeout(function () {
          self.dealCard(self.dealer)
        }, 500);

        var timeout = setTimeout(function () {
          self.dealCard(self.player)
          self.updateScore(self.player)
        }, 1000);

        var timeout = setTimeout(function () {
          self.dealCard(self.dealer, true)
          self.checkIfRoundIsOver(self.player);
          $(":button#hit").removeAttr("disabled");
          $(":button#stand").removeAttr("disabled");
        }, 1500);
      } ,

      startGame : function() {

        var self = this;
        var $button = $("a.close");
        var $header = $(".popup h2");
        var $board = $("div#popup1");
        var $popup = $(".popup");
        var $betButton = $("#bet");

        $header.text("Black Jack");
        $button.text("Play Game");
        $(".content").hide();

        $(":button#hit").removeAttr("disabled").hide();
        $(":button#stand").removeAttr("disabled").hide();
        $(":button#bet").hide();

        self.setUpHitBtn();
        self.setUpStandBtn();
        self.loadSoundEffects();
        self.setUpPlaceBet();

        var closingOverlay = false;
        $button.text("Play Game").on("click", function () {
          if (!closingOverlay) {
            closingOverlay = true;
            $popup.css("transform", "scale(0)");
            setTimeout(function() {
              $board.hide();
              closingOverlay = false;
              self.resetGame();
            }, 1000 )
          }
        });

        $betButton.on("click", function() {
          self.dealHand()
          $betButton.hide();
          $(":button#hit").show();
          $(":button#stand").show();
        })
      } ,

       setUpPlaceBet : function() {
         var self = this;
         var $bet500 = $(".chip500");
         var $bet100 = $(".chip100");
         var $bet50 = $(".chip50");
         var $bet25 = $(".chip25");
         var $bet0 = $(".chip0");

         $bet25.on("click", function() {
           self.placeBet(25);
         })
       } ,

        placeBet : function(amount) {
          var self = this;
          var $bankRoll = $("#bankingRoll");
          var $yourBet = $("#yourBet");
          var $button = $("#bet");
          $button.show();

          if (amount <= this.player.bankingRoll) {
            this.player.bankingRoll -= amount;
            this.player.bet += amount;
            $bankRoll.text(" $" + this.player.bankingRoll);
            $yourBet.text(" $" + this.player.bet);
          }
        }
      //end of blackJack object
    }

    blackJack.startGame() ;


//create overplay for Play Game
//change possible outcomes conditional statements
