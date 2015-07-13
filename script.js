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
    cardsLocation: $("div.player"),
    cards : [] ,
  } ,

  dealer : {
    cardsLocation: $("div.dealer"),
    cards : [] ,
  } ,

  dealCard : function(person, facedown) {
    var cardIndex = Math.floor(Math.random() * this.deck.length) ;
    if (facedown) {
          $("<img />").appendTo(person.cardsLocation).attr( "src", "img/card/back.png")
                      .css({marginLeft: '150px', opacity: '0'}).animate({marginLeft: '0px', opacity: '1'});
    } else {
          $("<img />").appendTo(person.cardsLocation).attr( "src", this.deck[cardIndex].image)
                      .css({marginLeft: '150px', opacity: '0'}).animate({marginLeft: '0px', opacity: '1'});
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

      $("#playerScore").text(lowScore)
      if (hasAce) {
        highScore = lowScore + 10;
        if (highScore < 21) {
          $("#playerScore").text( lowScore + "|" + highScore )
        } else if (highScore === 21) {
          $("#playerScore").text( highScore )
        }
      }
  } ,

  setUpHitBtn : function() {
    var self = this;
    $button = $(":button#hit");
    $button.on( "click", function() {
      self.dealCard(self.player);
      self.updateScore(self.player)
    })
  } ,

  setUpStandBtn : function() {
    //
  } ,

  dealHand : function() {
    var self = this;
    this.dealCard(this.player)
    var timeout = setTimeout(function () {
      self.dealCard(self.dealer)
    }, 500);
    var timeout = setTimeout(function () {
      self.dealCard(self.player)
      self.updateScore(self.player)
    }, 1000)
    var timeout = setTimeout(function () {
      self.dealCard(self.dealer, true)
    }, 1500);
    this.setUpHitBtn()
  }
  //end of blackJack object
}


blackJack.dealHand() ;
