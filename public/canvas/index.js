const canvas = document.querySelector('canvas'); //jquery
const c = canvas.getContext('2d');
canvas.width = 1440;
canvas.height = 2560;

canvas.addEventListener('click', function(event) {
    //console.log("click")
    let rect = canvas.getBoundingClientRect();
    let url = "/img/gift/coin.jpg";
    //console.log(event.clientX-rect.left, game.wall+720)
    if(event.clientX-rect.left < game.wall+720){
        profiles.add(url,'312',team1.teamName,1);
    }else{
        profiles.add(url,'213',team2.teamName,2);
    }
 }, false);

window.addEventListener('keydown',function(event){
    //console.log(event);
    if(event.key=="b"){
        profiles.booster('312');
    }else if(event.key=="m"){
        profiles.maxsize('312');
    }else if(event.key=="a"){
        profiles.more('312',2,"Rose");
    }else if(event.key=="s"){
        profiles.sizeup('312',"Share");
    }

}, false);

function joinToGame(msg){
    console.log("join: ", msg.userId);
    let timeout = setTimeout(()=>{  
        if(profiles.uids.indexOf(msg.userId)!==-1){
            clearTimeout(timeout);
            return;
        }else{
            profiles.randomTeam(msg);
        }
    }, 30000); //30초
}

function chatToGame(msg){
    if(game.over){
        return;
    }
    //console.log("Chat");
    //console.log(msg);
    idx = profiles.uids.indexOf(msg.userId);
    //console.log(profiles.uids);
    if(idx==-1){
        profiles.newProfile(msg);
    }else{
        //profiles.speedup(msg.userId,"Chat");
        let message = msg;
        //console.log("채팅",message.comment)
        setTimeout(() => {
            profiles.mention(message.userId, message.comment);
        }, 1000);
    } 
}

function likeToGame(msg){
    if(game.over){
        return;
    }
    //console.log("Like: "+ msg);
    profiles.speedup(msg.userId,"Like");
}

function giftToGame(msg){
    console.log("Gift");
    //console.log(msg);
    if(msg.diamondCount==1){
        profiles.more(msg.userId,3,"Rose");
    }else if(msg.diamondCount==5){
        profiles.maxsize(msg.userId);
    }else if(msg.diamondCount==10){
        profiles.booster(msg.userId);
    }else if(msg.diamondCount==20){
        profiles.kill(msg.userId);
    }else{
        profiles.more(msg.userId,msg.diamondCount*2,"Gift");
    }
}

function socialToGame(msg){
    //console.log("Social");
    console.log(msg);
    if(msg.displayType=="pm_main_follow_message_viewer_2"){
        profiles.sizeup(msg.userId,"Follow");
        //profiles.more(msg.userId,1,"Follow");
    }else if(msg.displayType=="pm_mt_guidance_share"){
        
    }
}

game.nextGameSet();
game.newGameSet();
game.gameStart();