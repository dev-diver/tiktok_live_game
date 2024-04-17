const game = new Game();

const GameSetting = [
    // {
    //     1: {
    //         imageSrc :'/img/versus/t1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "T1",
    //         teamWord: ["t1","페이커","오너","구마유시","케리아","제우스"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/drx.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "DRX",
    //         teamWord: ["drx","킹겐","표식","제카","데프트","베릴"],
    //     }
    // },
    {
        1: {
            imageSrc :'/img/versus/고양이2.png',
            videoSrc : ['/video/cat1.mp4'],
            teamName: "Cat",
            teamWord: ["고양이","냥","야옹"],
        },
        2: {
            imageSrc :'/img/versus/강아지2.png',
            videoSrc : ['/video/cat1.mp4'],
            teamName: "Dog",
            teamWord: ["강아지","멍","왈"],
        }
    },
    // {
    //     1: {
    //         imageSrc :'/img/versus/고양이1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "Cat",
    //         teamWord: ["고양이","냥","야옹"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/강아지1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "Dog",
    //         teamWord: ["강아지","멍","왈"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/장원영1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "장원영",
    //         teamWord: ["IVE","워뇨","아이브","원영"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/김채원1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "김채원",
    //         teamWord: ["SSERAFIM","세라핌","채채","채원"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/사자1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "Lion",
    //         teamWord: ["사자"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/호랑이1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "Tiger",
    //         teamWord: ["호랑이"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/이이경.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "이이경",
    //         teamWord: ["이경"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/강하늘.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "강하늘",
    //         teamWord: ["하늘"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/수민.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "수민",
    //         teamWord: ["스테이시","STAYC"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/해원.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "해원",
    //         teamWord: ["NMIXX","엔믹스"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/방탄.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "BTS",
    //         teamWord: ["방탄","방탄소년단"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/블랙핑크.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "BlackPink",
    //         teamWord: ["블핑","블랙핑크"],
    //     }
    // },
    // {
    //     1: {
    //         imageSrc :'/img/versus/장원영1.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "장원영",
    //         teamWord: ["IVE","워뇨","아이브","원영"],
    //     },
    //     2: {
    //         imageSrc :'/img/versus/해원.png',
    //         videoSrc : ['/video/cat1.mp4'],
    //         teamName: "해원",
    //         teamWord: ["NMIXX","엔믹스"],
    //     }
    // },
]

let team1;
let team2;

const profiles = new Profiles();