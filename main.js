let gameBlocks = document.querySelectorAll(".game-block")
let content = document.querySelector(".content")
let numClick = 0, maxClick = 2;
let duration = 1500;
let blocks = Array.from(gameBlocks)
let startGame = document.getElementsByClassName(`start`)[0], overlay = document.getElementsByClassName(`overlay`)[0];
let userName = document.querySelector(".head-game").firstElementChild;
let wrongTries = document.querySelector(".head-game div span") , wrongTriesNum = 0;
let alertC = document.getElementsByClassName("alert")[0], inputAlert = document.querySelector(".alert input"),
okBtnAlert = document.querySelector(".alert .ok"), noBtnAlert = document.querySelector(".alert .no");
let startClick = 0;
/* Win Varibles*/
let winCanves = document.querySelector(".win"), winUserName = document.querySelector(".win .user-name"),
winWrongTries = document.querySelector(".win .num-tries"), winButton = document.querySelector(".win .win-button");
/* Win Varibles*/
// audio varibles
let pick = document.querySelector(".pick"), wrong = document.querySelector(".wrong"), 
right = document.querySelector(".right"), victory = document.querySelector(".victory"),
write = document.querySelector(".write"), click = document.querySelector(".click");
// audio varibles
let rankMSG = document.querySelectorAll(".rank");
// let winCanves = document.createElement("div"), winCanvesText = 
let timeOut = [100, 200, 300, 400, 500, 600, 700, 800]
let first = document.querySelector(".first")

document.querySelectorAll("audio").forEach((e) => {
    e.volume = e.volume / 3
})

startGame.addEventListener("click", function () {
    click.play();
    if (startClick === 0) randomBlock();
    startClick++;
    alertName();
})
function randomBlock() {
    let randomRange = Array.from(Array(blocks.length).keys())

    shuffleArray(randomRange)

    blocks.forEach(function (ele, index) {
        ele.style.order = randomRange[index]
        ele.classList.remove("showAlways")
        wrongTriesNum = 0;
        wrongTries.innerHTML = 0;
        winCanves.style.cssText = `
        transform: scale(0);
        `
    })
}

function resetGame() {
    let randomRange = Array.from(Array(blocks.length).keys())
    
    shuffleArray(randomRange)
    
    blocks.forEach(function (ele, index) {
        ele.style.order = randomRange[index]
        ele.classList.remove("showAlways")
        wrongTriesNum = 0;
        wrongTries.innerHTML = 0;
        winCanves.style.cssText = `
        transform: scale(0);
        `
    })
    show1Sec();
}

function shuffleArray(array) {
    let current = array.length, temp, random;
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--;
        temp = array[current];
        array[current] = array[random]
        array[random] = temp;
    }
    return array;
}
 
function alertName() {
    alertC.style.cssText = `
    left: 47.5%;  
    transform: translateX(-50%) rotate(360deg) scale(1);
    `
    inputAlert.focus();
    noBtnAlert.addEventListener("click", function (e) {
        click.play();
        e.preventDefault()
        overLayRemove()
        show1Sec();
        userName.innerHTML = "Hello : Annomuys";
    })
    okBtnAlert.addEventListener("click", function (e) {
        show1Sec();
        click.play();
        if (inputAlert.value !== "") {
            userName.innerHTML = `Hello : ${inputAlert.value}`
        } else {
            userName.innerHTML = "Hello : Annomuys";
        }
        startGame.style.cssText = `
        transition: transform .5s;
        transform: translateX(-50%) rotate(360deg) scale(0);
        `
        overLayRemove();
        e.preventDefault()
    })
}
function show1Sec() {
    blocks.forEach(function (ele) {
        ele.classList.add("show")
        content.classList.add("no-clicking")
        setTimeout(() => {
            content.classList.remove("no-clicking")
            ele.classList.remove("show")
        }, 1000);
    })
}
function overLayRemove() {
    alertC.style.cssText = `
    transform: translateX(-50%) rotate(0deg) scale(0);
    `
    setTimeout(() => {
        alertC.remove();
        overlay.remove();
        startGame.remove();
    }, 400);
}
// before start game
// after start game
blocks.forEach( function (block) {
    block.addEventListener("click", function () {
        flipBlock(block);
    })
})
function flipBlock(block) {
    block.classList.add("show")
    pick.play();
    let allShowBlocks = blocks.filter(function (ele) {
        return ele.classList.contains("show");
    })
    if (allShowBlocks.length === 2) {
        stopClick(allShowBlocks);
        checkMatchedBlocks(allShowBlocks[0], allShowBlocks[1]);
    }
}
function stopClick(all) {
    content.classList.add("no-clicking")
}
function checkMatchedBlocks(fristEle, lastEle) {
    if (fristEle.dataset.color === lastEle.dataset.color) {
        setTimeout(() => {
            fristEle.classList.remove("show")
            lastEle.classList.remove("show")
            fristEle.classList.add("showAlways")
            lastEle.classList.add("showAlways")
            content.classList.remove("no-clicking")
            checkWin();
        }, duration);
        setTimeout(() => {
            right.play();
        }, duration - 1000)
    } else {
        setTimeout(() => {
            fristEle.classList.remove("show")
            lastEle.classList.remove("show")
            content.classList.remove("no-clicking")
            wrongTriesNum++;
            wrongTries.innerHTML = wrongTriesNum;
            checkWin();
        }, duration);
        setTimeout(() => {
            wrong.play();
        }, duration - 1000)
    }
}
function checkWin() {
    let allMatchedBlock = Array.from(document.querySelectorAll(".showAlways"));

    if (allMatchedBlock.length === blocks.length) {
        showWin();
    }
}
function showWin() {
    winCanves.style.cssText = `
    transform: scale(1);
    `
    if (wrongTriesNum <= 5) {
        rank0();
    }
    victory.play();
    winUserName.innerHTML = `${userName.textContent.trim().split(" ")[2]}`;
    winWrongTries.innerHTML = `${wrongTriesNum}`;
    winButton.addEventListener("click", function () {
        click.play();
        resetGame();
    })
}
// ranks    
function rank0() {
    let msg = "Amazing!";
    for (let i = 0; i < msg.length; i++) {
        let span = document.createElement("span")
        let spanText = document.createTextNode(msg[i]);
        span.append(spanText)
        rankMSG[0].append(span)
        // rankMSG[1].append(span)
        if (i >= msg.length - 1) {
            let rankMSG2 = rankMSG[0].cloneNode(true);
            rankMSG2.className = "rank two"
            first.after(rankMSG2)
        }
    }
    let letters1 = document.querySelectorAll(".win .one span")
    let letters2 = document.querySelectorAll(".win .two span")
    setInterval(() => {
        letters1.forEach(function (e, i, a) {
            setTimeout(() => {
                a[i].style.color = "red"            
            }, timeOut[i]);
            setTimeout(() => {
                a[i].style.color = "yellow"            
            }, timeOut[i] + 100);
            setTimeout(() => {
                a[i].style.color = "lightgreen"            
            }, timeOut[i] + 200);
            setTimeout(() => {
                a[i].style.color = "green"            
            }, timeOut[i] + 300);
            setTimeout(() => {
                a[i].style.color = "cyan"            
            }, timeOut[i] + 400);
            setTimeout(() => {
                a[i].style.color = "blue"            
            }, timeOut[i] + 500);
            setTimeout(() => {
                a[i].style.color = "rgb(209,31,248)"
            }, timeOut[i] + 600)
            setTimeout(() => {
                a[i].style.color = "red"
            }, timeOut[i] + 700)
        })
        letters2.forEach(function (e, i, a) {
            setTimeout(() => {
                a[i].style.color = "red"            
            }, timeOut[i]);
            setTimeout(() => {
                a[i].style.color = "yellow"            
            }, timeOut[i] + 100);
            setTimeout(() => {
                a[i].style.color = "lightgreen"            
            }, timeOut[i] + 200);
            setTimeout(() => {
                a[i].style.color = "green"            
            }, timeOut[i] + 300);
            setTimeout(() => {
                a[i].style.color = "cyan"            
            }, timeOut[i] + 400);
            setTimeout(() => {
                a[i].style.color = "blue"            
            }, timeOut[i] + 500);
            setTimeout(() => {
                a[i].style.color = "rgb(209,31,248)"
            }, timeOut[i] + 600)
            setTimeout(() => {
                a[i].style.color = "red"
            }, timeOut[i] + 700)
        })
    }, 1000);
}
// function rank() {
//     // if (wrongTriesNum === 0) {
//     //     rankMSG.forEach(function (ele1, index1, array1) {
//     //         let msg = "Amazing!";
//     //         let colors = ["#ff5722", "#444"]
//     //         for (let i = 0; i < msg.length; i++) {
//     //             let span = document.createElement("span")
//     //             let spanText = document.createTextNode(msg[i])
//     //             span.append(spanText)
//     //             ele1.append(span)
//     //         }
//     //         let letterOne = document.querySelectorAll(".one span");
//     //         let letterTwo = document.querySelectorAll(".two span");
//     //         setInterval(() => {
//     //             for (let i = 0; i < msg.length; i++) {
//     //                 setInterval(() => {
//     //                     letterOne.forEach(function (ele, index, array) {
//     //                         array[i].style.color = "red";
//     //                         i !== 0 ? array[i - 1].style.color = "black" : array[i].style.color = "red"
//     //                     })
//     //                 }, 100);
//     //             }
//     //         }, 1000);
//     //         setInterval(() => {
//     //             letterTwo.forEach(function (ele, index) {
//     //                 ele.style.color = colors[1];
//     //             })
//     //         }, 1000);
//     //     })
//     // }
//     // ["#ff5722", "#ff5722", "#ff5722", "#444", "#444", "#444", "#444", "#444",]
// }
// if (wrongTriesNum === 0) {
//         rankMSG.forEach(function (ele1, index1, array1) {
//             let msg = "Amazing!";
//             let colors = ["#ff5722", "#444"]
//             for (let i = 0; i < msg.length; i++) {
//                 let span = document.createElement("span")
//                 let spanText = document.createTextNode(msg[i])
//                 span.append(spanText)
//                 ele1.append(span)
//         }
//     }
// }