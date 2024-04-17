class Team {
    constructor({
      imageSrc,
      teamName,
      team,
      teamWord,
      point,
      scale = 1,
    }){
      this.image = new Image();
      this.image.src = imageSrc;
      this.team = team;
      this.teamName = teamName;
      this.teamWord = teamWord;
      this.teamWord.push(this.teamName.toLowerCase());
      this.teamWord.push(team,toString());
      this.point  = point? point :0;

      this.scale = scale;
      this.y = 450;
      this.opacity = 1;
      this.cHalf = 0;
    }

    draw(){
      let cHalf = canvas.width/2;
      let iHalf = this.image.width/2;
      c.font = 'bold 100px 고딕';
      c.strokeStyle = "black";
      c.lineWidth = 10;
      c.shadowBlur = 4;
      c.fillStyle = "white";
      c.shadowOffsetX = 3;
      c.shadowOffsetY = 3;
      c.shadowColor = "rgba(0,0,0,0.3)";
      c.globalAlpha = this.opacity;
      let rectWidth = c.measureText(this.teamName).width;
      let rectWidth2 = c.measureText(this.team).width;
      if(this.team==1){
        c.fillText(this.teamName, 20, this.y-50);
        c.font = 'bold 80px 고딕';
        c.fillText(this.team, 20, this.y-150);
        c.drawImage(this.image, 0, 0, iHalf+game.wall, this.image.height, 0, this.y, cHalf+game.wall, this.image.height);
      }else{
        c.fillText(this.teamName, canvas.width-20-rectWidth, this.y-50);
        c.font = 'bold 80px 고딕';
        c.fillText(this.team, canvas.width-20-rectWidth2, this.y-150);
        c.drawImage(this.image, iHalf+game.wall, 0, iHalf-game.wall, this.image.height, cHalf+game.wall, this.y, cHalf-game.wall, this.image.height);
      }
    }

    drawPoint(){
      let fontsize = 90;
      c.font = fontsize+'px blod Verdana';
      let msg = this.point;
      c.fillStyle = "#fc037f";
      c.lineWidth = 10;
      c.strokeStyle = "white";
      let textWidth = c.measureText(msg).width;
      let pad = 40;
      let y = this.y + this.image.height + fontsize + pad;
      if(this.team==1){
        //c.strokeText(msg, pad, y);
        c.fillText(msg, pad*10, y);
      }else{
        //c.strokeText(msg, canvas.width-textWidth-pad, y);
        c.fillText(msg, canvas.width-textWidth-pad*10, y);
      }
      
    }

    fullDraw(){
      c.drawImage(this.image,0,this.y);
    }
  
    update(){
      this.draw();
      this.drawPoint();
    }
}