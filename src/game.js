game_canvas = document.getElementById("game");
game_canvas.width = window.window.innerWidth;
game_canvas.height = window.window.innerHeight - 150;

kontra.init();

let sprite = kontra.sprite({
    // all of these settings are responsive 
    x: game_canvas.width / 2,
    y: game_canvas.height / 2,
    width:  game_canvas.width / 40,
    height: game_canvas.width / 20,
    render:function(){
        // this.context.fillStyle = "#FF0000";
        // this.context.fillRect(this.x , this.y,this.width,this.height);
        this.context.beginPath();
        this.context.arc(this.x ,this.y ,this.width,0,3*Math.PI);
        this.context.stroke();
        // this.context.rect(20,20,150,100);
        // this.context.stroke();
    }
});

let enemies =[
    // upper left 
    kontra.sprite({
    x : 0,
    y : 0,
    width: game_canvas.width / 6,
    height : game_canvas.width / 6,
    color:"red",
    dx:.5,
    dy:5
    }),
    // upper right
    kontra.sprite({
    x : game_canvas.width,
    y : 0,
    width: game_canvas.width / 6,
    height : game_canvas.height / 12,
    color:"red",
    dx:3.0,
    dy:.1
    }),
    // down left
    kontra.sprite({
    x : 0,
    y : game_canvas.height,
    width: game_canvas.width / 7,
    height:game_canvas.width / 7,
    color:"red",
    dx:3.1,
    dy:0.8
    }),
    // down right
    kontra.sprite({
    x : game_canvas.width,
    y : game_canvas.height,
    width: game_canvas.width / 24,
    height : game_canvas.width/6,
    color:"red",
    dx:3.5,
    dy:3.8
    })
]
let width_border = game_canvas.width;
let height_border = game_canvas.height;


kontra.pointer.radius = 50

var loop = kontra.gameLoop({
    fps:60,
    clearCanvas: false,
    update: function(){
        //controler 
        sprite.x = kontra.pointer.x
        sprite.y = kontra.pointer.y

        // kontra.pointer.track(sprite)
        //player logic 
        // check if the sprite x position is bigger then width_border which is 
        // the game space then subtract the sprite width so it's responsive with
        // multible screens sizes
        // right border
        if (sprite.x > width_border - sprite.width){
            sprite.x = width_border  - sprite.width;
            // console.log("GG")
        }
        // left border
        if (sprite.x < sprite.width){
            sprite.x = sprite.width
            // console.log("GG")
        }
        // bottom border
        if (sprite.y > height_border - sprite.height){
            sprite.y = height_border - sprite.height
            // console.log("GG")
        }
        // top border
        if (sprite.y < sprite.height){
            sprite.y = sprite.height
            // console.log("GG")
        }
        // Screen Size Alert so you can't play if the screen is less then 300 * 300
        if (game_canvas.width < 300 || game_canvas.height < 300){
            loop.stop()
            alert("Sorry but you can't play the game at a screen that has less then 300px in width and 300 height , if you think there is something wrong try to refresh the page.")
        }
        // update game size 
        game_canvas.width = window.window.innerWidth;
        game_canvas.height = window.window.innerHeight -150 ;
        //update borders if screen size changed
        width_border = game_canvas.width;
        height_border = game_canvas.height;
        // update player size if screen changed whil playing 
        // sprite.width = game_canvas.width / 20;
        // sprite.height = game_canvas.width / 20;
        // enemies logic 
        enemies.forEach(function(enemy){
            if (enemy.collidesWith(sprite)){
                // loop.stop()
                // alert("GG")
                // window.location = "/"
            }
            if (enemy.x > width_border - enemy.width){
                enemy.dx = -Math.floor(Math.random() * (5 - 3) + 5);
            }
            if (enemy.x < 0){
                enemy.dx = Math.floor(Math.random() * (5 - 3) + 5);
            }
            if (enemy.y > height_border - enemy.height){
                enemy.dy = -Math.floor(Math.random() * (5 - 3) + 5);
            }
            if (enemy.y < 0){
                enemy.dy = Math.floor(Math.random() * (5 - 3) + 5);
            }
            enemy.update();
        })

        sprite.update();
    },
    render: function(){
        sprite.render();
        enemies.forEach(function(enemy){
            enemy.render()
        })
    }
})


loop.start()