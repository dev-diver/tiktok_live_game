class Profile{
    constructor({
        imageSrc,
        uid,
        msg,
        team,
        speed,
        size
    }){
        this.team = team;
        this.uid= uid;
        this.msg = msg;
        this.msgCounter = 4;
        this.mentionColor = "white";
        this.image = new Image();
        this.image.src = imageSrc;
        this.speed = speed;
        this.size = size;
        this.direction = new Vector({
            x: this.team==1? 1: -1,
            y: Math.random()*4-2
        });
        let startpoint;
        if(team==1){
            startpoint = this.size;
        }else{
            startpoint = canvas.width-this.size;
        }
        this.location = new Vector({
            x:startpoint,
            y:Math.random()*canvas.height/4+(canvas.height-450)/2
        });
        this.velocity = this.direction.normalize().mult(this.speed);
        this.timer = setInterval(() => {
            //console.log(this.msgCounter);
            this.msgCounter-=1;
            if(this.msgCounter<0){
                clearInterval(this.timer);
            }
        }, 1000);
    }

    update(){
        //충돌체크
        let wallPos = canvas.width/2+game.wall;
        let minX = wallPos-this.size-2;
        let maxX = wallPos+this.size+2;
        if(this.location.x - this.size < 0 || this.location.x + this.size > canvas.width){
            this.velocity.x*=-1;
            this.pad = this.velocity.x/Math.abs(this.velocity.x);
            //this.location.x += this.pad*this.size/2;
        }

        if(this.location.x >= minX && this.location.x <= maxX){
            if(this.team==1){
                game.plus(this.size/50);
                this.location.x -= this.size/5;
            }else{
                game.minus(this.size/50);
                this.location.x += this.size/5;
            }  
            this.velocity.x*=-1;
        }
        let minY = 450 + this.size;
        let maxY = 450 + team1.image.height - this.size;
        if(this.location.y < minY || this.location.y > maxY){
            this.velocity.y*=-1;
        }
        
        this.location.add(this.velocity);
    }

    draw(){
        c.save();
        
        c.beginPath();        
        c.arc(this.location.x, this.location.y, this.size+2, 0, 2 * Math.PI);
        c.closePath();
        c.clip();

        c.drawImage(this.image, this.location.x-this.size, this.location.y-this.size, this.size*2, this.size*2);
        
        c.beginPath();
        c.lineWidth=10;
        c.strokeStyle = this.team==1 ?'pink' : 'blue';
        c.arc(this.location.x, this.location.y, this.size, 0, 2 * Math.PI);
        c.closePath();
        c.stroke();

        c.restore();

        this.drawMsg();
        
    }

    drawMsg(){
        if(this.msgCounter>0){
            c.font = '48px serif';
            let rectWidth = c.measureText(this.msg).width+20;
            c.fillStyle = this.mentionColor;
            c.fillRect(this.location.x-rectWidth/2,this.location.y-110, rectWidth, 60);
            c.fillStyle = "black";
            c.fillText(this.msg, this.location.x-rectWidth/2+10, this.location.y-60);
        }
    }

    run(){
        this.update();
        this.draw();
    }

    isDead(){ //끼임사고 dead 판정 수정
        if(this.location.x-this.size/3<=0||this.location.x+this.size/3>=canvas.width||this.location.y<=0||this.location.y>=canvas.hegiht){
            return true;
        }else{
            return false;
        }
    }

}

class Profiles {
    constructor(){
        this.profiles = [];
        this.uids = [];
        
        this.defaultSpd = 4;
        this.followSpd = 10;
        this.upSpd = 2; 
        this.maxSpd = 20;
        this.boostSpd = 30;

        this.defaultR = 50;
        this.followR = 75;
        this.upR = 25;
        this.maxR = 100;
        this.boostR = 120;
    }

    add(imageSrc, uid, msg, team, speed=this.defaultSpd, size=this.defaultR){
        let p = new Profile({
            imageSrc, uid, msg, team, speed, size
        });
        this.profiles.push(p);
        this.uids.push(uid);
        return p;
    }

    teamDelete(team){
        let profileIdx = this.profiles.findIndex(x => x.team === team);
        if(profileIdx==-1){return}
        let index = this.uids.indexOf(this.profiles[profileIdx].uid);
        if(index==-1){return}
        this.uids.splice(index, 1);
        this.profiles.splice(profileIdx,1);
    }

    newProfile(msg){
        let text = msg.comment.toLowerCase();
        console.log(text);
        let url = msg.profilePictureUrl;

        let msg1 = team1.teamWord.reduce((p,c)=>{
            console.log(c)
            let idx = text.indexOf(c.toLowerCase());
            //console.log(c, idx, p);
            return idx!==-1&&idx<p ? idx : p;
        },text.length+1);
        
        let msg2 = team2.teamWord.reduce((p,c)=>{
            console.log(c)
            let idx = text.indexOf(c.toLowerCase());
            //console.log(c, idx, p);
            return idx!==-1&&idx<p ? idx : p;
        },text.length+1);
        console.log(msg.userId," ",msg1,msg2);

        let speed = this.defaultSpd;
        let size = this.defaultR;
        console.log("팔로우정보:", msg.followInfo.followStatus);
        if(msg.followInfo.followStatus!=0){  //1은 신규, 2는 기존
            console.log("팔로워:", msg.nickname);
            speed = this.followSpd;
            size = this.followR;
        }

        if(msg1<msg2){//winner1
            console.log("알림:팀1", msg1, msg2);
            this.add(url,msg.userId,text,1, speed, size);
        }else if(msg2<msg1){ //winner2
            console.log("알림:팀2", msg1, msg2);
            this.add(url,msg.userId,text,2, speed, size);
        }
        
    }

    randomTeam(msg){
        if(this.profiles.length<10){
            let seed = Math.random()*2;
            console.log(seed);
            if(seed<=1){ //winner 1
                console.log("알림:랜덤 팀1");
                this.add(msg.profilePictureUrl,msg.userId,team1.teamName+" Team By Chance",1);
            }else if(seed>1&&seed<=2){ //winner2
                console.log("알림:랜덤 팀2");
                this.add(msg.profilePictureUrl,msg.userId,team2.teamName+" Team By Chance",2);
            }else{
                console.log("랜덤실패");
            }
        }        
    }

    draw(){
        this.profiles.forEach((p,i)=>{
            p.run();
            if(p.isDead()){
                this.profiles.splice(i,1);
                let index = this.uids.indexOf(p.uid);
                this.uids.splice(index,1);
            }
        });
    }

    mention(uid, msg, color="white"){
        let profile = this.profiles.find(x => x.uid === uid);
        profile.msg = msg;
        profile.mentionColor = color;
        profile.msgCounter = 5;
        let timer = setInterval(() => {
            profile.msgCounter-=1;
            if(profile.msgCounter<0){
                clearInterval(timer);
            }
        }, 1000);
    }

    speedup(uid,reason=""){
        //console.log("speedup: ",uid);
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        if(profile.speed<this.maxSpd){
            profile.speed += this.upSpd;
            profile.velocity = profile.velocity.normalize().mult(profile.speed);
            this.mention(uid, reason+" Speed Up!", "pink");
        }
    }

    sizeup(uid,reason=""){
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        if(profile.size<this.defaultR+this.upR){
            profile.size += this.upR;
            this.mention(uid, reason+" Size Up!!", "pink");
        }        
    }

    maxsize(uid){
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        this.mention(uid, "Maximum Size!","red");
        profile.size = this.maxR;
    }

    booster(uid){ //원래 속도 받을 때 profile로 받으면 안됨
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        this.mention(uid, "Booster!!!", "red");
        let size = profile.size;
        let speed = profile.speed;
        profile.speed = this.boostSpd;
        profile.velocity = profile.velocity.normalize().mult(this.boostSpd);
        if(size<this.maxR){
            profile.size = this.maxR;
        }else{
            profile.size = this.boostR;
        }
        setTimeout(() => {
            profile.speed = speed;
            profile.velocity = profile.velocity.normalize().mult(speed);
            profile.size = size;
        }, "4000");
    }

    more(uid,number,reason=""){
        console.log(uid);
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        for(let i=0;i<number;i++){
            this.add(profile.image.src, profile.uid, reason+" Cloning!", profile.team, profile.speed, profile.size);
            this.mention(uid, "Cloning","green");
        }
    }

    kill(uid){
        let profile = this.profiles.find(x => x.uid === uid);
        if(!profile){return}
        let team = profile.team;
        let otherTeam = (team==1)?2:1;
        this.mention(uid, "!!!Erase Them!!!","green");
        for(let i=0;i<3;i++){
            console.log("상대팀 제거:" + otherTeam);
            this.teamDelete(otherTeam);
        }
    }

    clear(){
        this.profiles=[];
        this.uids = [];
    }
}