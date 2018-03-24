//define variables//
var game;
var player;
var platforms;
var badges;
var stars;
var coins;
var poisons;
var cursors;
var jumpButton;
var scoreText;
var livesText;
var finalMessage;
var won = false;
var gameOver = false;
var currentScore = 0;
var lives = 2;
var winningScore = 100;

//create items in game on screen //
function createStars() {
    stars = game.add.physicsGroup();

    starCreate(620, 560, 'star');
   
}

function createCoins() {
    coins = game.add.physicsGroup();
    
    coinCreate(100, 200, 'coin');
    coinCreate(105, 450, 'coin');
    coinCreate(425, 100, 'coin');
    coinCreate(500, 200, 'coin');
    coinCreate(250, 350, 'coin');
    coinCreate(350, 350, 'coin');
} 

function createPoisons() {
    poisons = game.add.physicsGroup();

    
    poisonCreate(150, 465, 'poison');
    poisonCreate(300, 200, 'poison');
    poisonCreate(600, 360, 'poison');

}


function createPlatforms() {
    platforms = game.add.physicsGroup();

    
    platforms.create(350, 500, 'platform1');
    platforms.create(100, 500, 'platform');
    platforms.create(200, 397, 'platform');
    platforms.create(200, 500, 'platform');
    platforms.create(30, 250, 'platform1');
    platforms.create(200, 250, 'platform1');
    platforms.create(475, 250, 'platform1');
    platforms.create(560, 250, 'platform1');
    platforms.create(650, 500, 'platform');
    platforms.create(600, 397, 'platform');
   
    platforms.setAll('body.immovable', true);
}

function createBadges() {
    badges = game.add.physicsGroup();
    
    badgeCreate(750, 340, 'badge');
}


//create item animations//

function starCreate(left, top, starImage) {
    var star = stars.create(left, top, starImage);
    star.animations.add('spin');
    star.animations.play('spin', 8, true);
}

function coinCreate(left, top, coinImage) {
    var coin = coins.create (left, top, coinImage);
    coin.animations.add('spin');
    coin.animations.play('spin', 8, true);
}

function badgeCreate(left, top, badgeImage) {
    var badge = badges.create (left, top, badgeImage);
    badge.animations.add('spin');
    badge.animations.play('spin', 8, true);
}

function poisonCreate(left, top, poisonImage) {
    var poison = poisons.create(left, top, poisonImage);
    poison.animations.add('bubble');
    poison.animations.play('bubble', 8, true);
}

//define on screen action when item is collected//
function starCollect(player, star) {
    star.kill();
    currentScore = currentScore + 40;
    if (currentScore === winningScore) {
        createBadges();
    }
}

function badgeCollect(player, badge) {
    badge.kill();
    won = true;
  
}

function coinCollect(player, coin) {
    coin.kill();
    currentScore = currentScore + 10;
    if (currentScore === winningScore) {
      createBadges();
    }
}

function poisonCollect(player, poison) {
    poison.kill();
    lives = lives - 1;
    if (lives === 0) {
        player.kill();
        gameOver = true;
    }
}

//preload images from png files//

window.onload = function () {

    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.stage.backgroundColor = '#e238cf';

        //Load images
        game.load.image('platform', 'brick1.png');
        game.load.image('platform1', 'platform_1.png');
      
        //Load spritesheets
        game.load.spritesheet('player', 'egg1.png', 40, 47);
        game.load.spritesheet('coin', 'coin.png', 36, 44);
        game.load.spritesheet('badge', 'badge.png', 42, 54);
        game.load.spritesheet('poison', 'poison.png', 32, 32);
        game.load.spritesheet('star', 'star.png', 32, 32);
    }

  //declare "Create" functions for beginning of game (badges donesn't go here)//
    function create() {

        player = game.add.sprite(50, 600, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;

        createStars();
        createCoins();
        createPoisons();
        createPlatforms();
      

      // format onscreen text and add js for keyboard signals//
      
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        scoreText = game.add.text(16, 16, "SCORE: " + currentScore, { font: "24px Arial", fill: "white" });
        livesText = game.add.text(685, 16, "LIVES: " + lives, { font: "24px Arial", fill: "white" });

        finalMessage = game.add.text(game.world.centerX, 200, "", { font: "48px Arial", fill: "white" });
        finalMessage.anchor.setTo(0.5, 1);
    }

  // add game physics from phaser library//
  
    function update() {
        scoreText.text = "SCORE: " + currentScore;
        livesText.text = "LIVES: " + lives;

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(player, stars, starCollect);
        game.physics.arcade.overlap(player, coins, coinCollect);
        game.physics.arcade.overlap(player, poisons, poisonCollect);
        game.physics.arcade.overlap(player, badges, badgeCollect);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = -350;
            player.scale.x = - 1;
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = 350;
            player.scale.x = 1;
        }
        else {
            player.animations.stop();
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
            player.body.velocity.y = -400;
        }
  
      //conditional statements for win or lose//
      
        if (won) {
            finalMessage.text = "YOU WIN!!!";
        }
        if (gameOver) {
            finalMessage.text = "GAME OVER!!!";
        }

    }

    function render() {

    }

};


