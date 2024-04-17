class Game{
    constructor(){
        this.over = false;
        this.wall = 0;
        this.endCount = 200; //200
        this.startCount = 20; //20
        this.counter;
        this.winPoint = 5;//25;
        this.thisRound = 0;
        this.thisSet = -1;
        this.roundWinner = undefined;
        this.setWinner = undefined;

        this.nextTeam1;
        this.nextTeam2;
    }

    plus(num=1){
        this.wall+=10*num;
    }

    minus(num=1){
        this.wall-=10*num;
    }

    nextGameSet(){
        this.thisSet = this.nextSet(this.thisSet); //숫자설정
        this.nextTeam1 = new Team({
            team : '1',
            point : 0,
            imageSrc : GameSetting[this.thisSet]['1']['imageSrc'],
            videoSrc : GameSetting[this.thisSet]['1']['videoSrc'],
            teamName: GameSetting[this.thisSet]['1']['teamName'],
            teamWord: GameSetting[this.thisSet]['1']['teamWord'],
        });
        this.nextTeam2 = new Team({
            team : '2',
            point : 0,
            imageSrc : GameSetting[this.thisSet]['2']['imageSrc'],
            videoSrc : GameSetting[this.thisSet]['2']['videoSrc'],
            teamName: GameSetting[this.thisSet]['2']['teamName'],
            teamWord: GameSetting[this.thisSet]['2']['teamWord'],
        });
    }

    newGameSet(){
        this.setWinner = undefined;
        team1 = this.nextTeam1;
        team2 = this.nextTeam2;
    }

    nextSet(thisSet){
        let set = Math.floor(Math.random()*GameSetting.length);
        if(set == thisSet){
            return this.nextSet(set);
        }else{
            return set;
        }
    }

    gameEnd(){
        this.over = true;
        profiles.clear();
        console.log("GameOVER!");
        if(this.wall>0){
            this.roundWinner = team1;
            this.roundWinner.point+=1;
        }else if(this.wall<0){
            this.roundWinner = team2;
            this.roundWinner.point+=1;                
        }else{
            this.roundWinner = undefined;
        }
        this.waitCounter();
        if(team1.point>=this.winPoint || team2.point>=this.winPoint){
            this.setWinner = team1.point>=this.winPoint? team1 : team2;
            this.nextGameSet();
            this.SceneWait2(); //다음 세트
        }else{
            this.SceneWait(); //다음 라운드
        }                 
    }

    gameStart(){ 
        this.over = false;   
        this.wall = 0;             
        this.inGameCounter();
        this.SceneInGame();
    }   

    inGameCounter(){        
        this.counter = this.endCount;
        let endTimer = setInterval(function(){
            this.counter-=1;
            if(this.counter<=0||this.over){
                clearInterval(endTimer);
            }
        }.bind(this),1000);
    }

    waitCounter(){
        this.counter = this.startCount;
        let startTimer = setInterval(function(){
            this.counter-=1;            
            if(this.counter<=0){
                this.over = false;             
                clearInterval(startTimer);
            }
        }.bind(this), 1000);
    }

    SceneInGame(){
        this.drawBackground();            
        if(this.wall<-720||this.wall>720||this.counter<=0){//game over 조건
            this.gameEnd();
            console.log("게임이 끝난 뒤")
            return;
        }
        team1.update();
        team2.update();
        this.drawFrontText();
        this.displayCounter();    
        profiles.draw();
        window.requestAnimationFrame(this.SceneInGame.bind(this));
    }

    SceneWait(){//다음 라운드
        this.drawBackground(); 
        if(this.counter<=0){
            this.gameStart();
            return;
        }
        if(this.wall>=-720&&this.wall<=720){
            if(this.roundWinner==team1){
                this.plus();
            }else if(this.roundWinner==team2){
                this.minus();
            }
        }
        team1.update();
        team2.update();

        this.winnerMessage();
        this.nextGameCounterDisplay();
        
        if(this.counter<this.startCount-5){
            this.drawMenu();
        }
        //winnerAnimate
        window.requestAnimationFrame(this.SceneWait.bind(this));
    }

    SceneWait2(){//다음 세트
        
        this.drawBackground(); 
        if(this.counter<=0){
            this.newGameSet();
            this.gameStart();
            return;
        }
        if(this.wall>=-720&&this.wall<=720){
            if(this.roundWinner==team1){
                this.plus();
            }else{
                this.minus();
            }
        }
        team1.update();
        team2.update();

        this.winnerMessage();
        this.nextGameCounterDisplay();
        if(this.counter<=this.startCount-1){
            this.finalMessage();
        }

        if(this.counter<=this.startCount-5){
            let image1 = this.nextTeam1.image;
            let image2 = this.nextTeam2.image;          
            c.drawImage(image1, canvas.width/2-image1.width/8, canvas.height-image1.height/2-200, image1.width/4, image1.height/4);
            c.drawImage(image2, canvas.width/2+image2.width/8, canvas.height-image2.height/2-200, image2.width/4, image2.height/4);
            this.nextGameMessage();
        }
        //winnerAnimate
        window.requestAnimationFrame(this.SceneWait2.bind(this));
    }

    displayCounter(){        
        c.font = '100px 고딕';
        let msg = this.counter;
        let rectWidth = c.measureText(msg).width+20;
        c.fillStyle = "white";
        c.fillText(msg, (canvas.width-rectWidth)/2, canvas.height-380);
    }

    drawBackground(){
        //console.log("배경")
        let grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, "#FBAB7E");
        grd.addColorStop(1, "#F7CE68");
        c.fillStyle = grd;
        c.fillRect(0,0,canvas.width, canvas.height);
    }

    drawFrontText(){
        //console.log("메뉴판")
        c.font = '90px blod 고딕';
        let msg = "냥/멍으로  팀 결정";
        let rectWidth = c.measureText(msg).width;
        c.fillStyle = "white";
        c.fillText(msg, (canvas.width-rectWidth)/2, 200);

        c.font = '90px blod 고딕';
        msg = "Get " +this.winPoint + " Points to Win";
        rectWidth = c.measureText(msg).width;
        c.fillStyle = "white";
        c.fillText(msg, (canvas.width-rectWidth)/2, 2300);
    
        let shortMenu = new Image();
        shortMenu.src = '/img/숏메뉴판.png';
        let img = shortMenu;
        c.drawImage(img,(canvas.width-img.width)/2,250,img.width,img.height);
    }

    drawMenu(){
        let menuImg = new Image();
        menuImg.src = '/img/영어메뉴판.png';
        let img = menuImg;
        c.fillStyle = "white";
        c.rect((canvas.width-img.width*2)/2,1000,img.width*2,img.height*2);
        c.globalAlpha = 0.5;
        c.fill();
        c.globalAlpha = 1;
        c.drawImage(img,(canvas.width-img.width*2)/2,1000,img.width*2,img.height*2);
    }

    winnerMessage(){
        let msg = "";

        if(this.roundWinner){
            msg += this.roundWinner.teamName+" WIN!";
            //this.roundWinner.fullDraw();
        }else{
            msg = "DRAW!";
            team1.draw();
            team2.draw();
        }       
        
        c.font = 'bold 200px 고딕';
        let rectWidth = c.measureText(msg).width;
        c.strokeStyle = "black";
        c.fillStyle = "#fc037f";        
        c.fillText(msg, (canvas.width-rectWidth)/2, 550); 
    }

    finalMessage(){
        console.log("마참내")
        let msg = "Finally!";
        c.font = 'bold 300px 고딕';
        let rectWidth = c.measureText(msg).width;
        c.strokeStyle = "black";
        c.fillStyle = "#fc037f";        
        c.fillText(msg, (canvas.width-rectWidth)/2, 800); 
    }

    nextGameMessage(){
        let msg = "Next Game";
        c.font = 'bold 150px 고딕';
        let rectWidth = c.measureText(msg).width;
        c.strokeStyle = "black";
        c.fillStyle = "#fc037f";        
        c.fillText(msg, (canvas.width-rectWidth)/2, 1500); 
    }

    nextGameCounterDisplay(){
        c.font = '100px 고딕';
        let msg = "Next Game" + this.counter.toString().padStart(3,' ') + " Seconds left";
        let rectWidth = c.measureText(msg).width+20;
        c.fillStyle = "white";
        c.fillRect((canvas.width-rectWidth)/2, canvas.height-300, rectWidth, 110);
        c.fillStyle = "black";
        c.strokeStyle = "white";
        c.fillText(msg, (canvas.width-rectWidth)/2, canvas.height-200);
    }

}