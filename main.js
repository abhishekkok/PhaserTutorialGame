var game =new Phaser.Game(800,600,Phaser.CANVAS,'game01v');

var spaceField;
var backgroundVel;
var player;

var bullets;
//var bullet;
var bulletTime=0;
var fireButton;
//var enemy;
var enemies;

var score=0;
var scoreText;
var winText;

var mainState={
	preload:function()
	{
		game.load.image('spacefield',"assets/lights.jpg");
		game.load.image('player',"assets/GameCharacter.png");
		game.load.image('bullet',"assets/bullet.png");
		game.load.image('enemy',"assets/Fireball.png");
	
	},
	create:function()
	{

spaceField=game.add.tileSprite(0,0,800,600,'spacefield');
backgroundVel=1;
player=game.add.sprite(game.world.centerX,game.world.centerY +200,'player');
game.physics.enable(player,Phaser.Physics.ARCADE);
cursors= game.input.keyboard.createCursorKeys();

bullets = game.add.group();
bullets.enableBody=true;
bullets.physicsBodyType=Phaser.Physics.ARCADE;
bullets.createMultiple(30,'bullet');
bullets.setAll('anchor.x',0.5);
bullets.setAll('anchor.y',1);
bullets.setAll('outOfBoundsKill',true);
bullets.setAll('checkWorldBounds',true);

enemies=game.add.group();
enemies.enableBody=true;
enemies.physicsBodyType=Phaser.Physics.ARCADE;

createEnemeies();

scoreText=game.add.text(0,500,'FireBall Nuked :',{font:'32px Arial',fill:'#fff'});
winText=game.add.text(game.world.centerX-100,game.world.centerY,'U saved Earth Bitches !!!!!!!! :',{font:'32px Arial',fill:'#ff0'});


fireButton=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update:function()
	{
		
	game.physics.arcade.overlap(bullets,enemies,collisionHandler,null);
winText.visible=false;
		player.body.velocity.x=0;
		spaceField.tilePosition.y+=backgroundVel;

		if(cursors.left.isDown)
		{
			player.body.velocity.x=-350;

		}

		if(cursors.right.isDown)
		{
			player.body.velocity.x=350;
			
		}

		if(fireButton.isDown)
		{
			fireBullet();
		}

		scoreText.text='FireBall Nuked :'+ score;
		if(score==40)
		{
			winText.visible=true;
			scoreText.visible=false;
		}
	}
}

function fireBullet()
{
	if(game.time.now>bulletTime)
	{
		bullet=bullets.getFirstExists(false);

		if(bullet)
		{
			bullet.reset(player.x+35,player.y);
			bullet.body.velocity.y= -400;
			bulletTime=game.time.now +200;
		}
	}
}

function createEnemeies()
{
	for(var y=0;y<4;y++)
	{
		for(var x=0;x<10;x++){
			var enemy=enemies.create(x*48,y*50,'enemy');
		
		enemy.anchor.setTo(0.5,0.5);
		}
	}
	enemies.x=100;
	enemies.y=50;

	var tween=game.add.tween(enemies).to({x:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);
 		tween.onRepeat.add(descend,this);
}

function descend()
{
	enemies.y+=10;
}
function collisionHandler(bullet,enemy)
{
	bullet.kill();
	enemy.kill();
	score +=1;
}


game.state.add('mainState',mainState);
game.state.start('mainState');