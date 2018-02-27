
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    var movez = this.speed;
    var abc;
    if (this.x <= 600){
        this.x += movez;
        this.render();
        //判断碰撞
        for (enemy of allEnemies){
            if (enemy.y === player.y && enemy.x <= player.x && (enemy.x + 80) > player.x){
                abc = true;
            }
            if (enemy.y === player.y && (player.x + 60) > enemy.x && player.x <= enemy.x){
                abc = true;
            }
        }
        if (abc){
            console.log('Fail');
            player.x = 200;
            player.y = 400;
        }
    } else {
        this.x = -100;
        this.x += movez;
        this.render();
        if (abc){
            console.log('Fail');
            player.x = 200;
            player.y = 400;
        }
    }
    
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    Enemy.call(this,x,y);
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {

};
Player.prototype.handleInput = function(a){
    //y轴移动
    if (this.y >= 68 && this.y <= 400 ){
        if (this.y === 400){
            if (a === 'up'){
                this.y -= 83;
            }
        } else if (this.y === 68){
            if (a === 'up'){
                this.y = 400;
                this.x = 200;
                console.log('Success');
            }
            if (a === 'down'){
                this.y += 83;
            }
        } else {
            if (a === 'up'){
                this.y -= 83;
            }
            if (a === 'down'){
                this.y += 83;
            }
        }      
    }
    //x轴移动
    if (this.x <= 402 && this.x >= -2){
        if (this.x === 402){
            if (a === 'left'){
                this.x -= 101;
            }
        } else if (this.x === -2) {
            if (a === 'right'){
                this.x += 101;
            }
        } else {
            if (a === 'left'){
                this.x -= 101;
            }
            if (a === 'right'){
                this.x += 101;
            }
        }    
    }     
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var enemy1 = new Enemy(-10,68,1);
var enemy2 = new Enemy(-50,151,2);
var enemy3 = new Enemy(-200,234,3);
var enemy4 = new Enemy(-150,68,4);

var allEnemies = [enemy1,enemy2,enemy3,enemy4];

var player = new Player(200,400);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
