class Game {
    constructor(image, name, link) {
        this.image = image;
        this.name = name;
        this.link = link;
    }
    
    AddToContainer() {
        let node = document.createElement("div");
        node.className = "grid-element";
        let imageView = document.createElement("img");
        imageView.addEventListener("error", function() { imageView.src = "images/noimage.png"; });
        imageView.src = "images/" + this.image;
        imageView.style.width = "350px";
        imageView.style.height = "225px";
        imageView.innerHTML = "There should be an image here";
        node.appendChild(imageView);
        let text = document.createElement("h2");
        text.style.display = "inline";
        text.innerHTML = this.name;
        node.appendChild(text);
        let link = document.createElement("a");
        link.innerHTML = "Download " + this.name;
        link.href = this.link;
        link.target = "_blank";
        link.style.float = "right";
        link.onmouseover = function() { 
            link.style.backgroundColor="white"; 
            link.style.color = "black";
        }
        link.onmouseleave = function() { 
            link.style.backgroundColor="black"; 
            link.style.color = "lightblue";
        }
        node.appendChild(link);
        document.getElementById("games-container").appendChild(node);
    }
}

var games = [];
function initialize() 
{
    console.log("initializing games");
    addAll();
    games.forEach(element => element.AddToContainer());
}

function addAll()
{
    games.push(new Game("sidebyside.png", "Side-By-Side", "https://www.gtvgdev.com/games-archive/side-by-side"));
    games.push(new Game("evolution.png", "Evolution", "https://www.gtvgdev.com/games-archive/evolution%3A-arcade"));
    games.push(new Game("factorythm.png", "Factorythm", "https://www.gtvgdev.com/games-archive/factorythm"));
    games.push(new Game("slider.png", "Slider", "https://store.steampowered.com/app/1916890/Slider/"));
    games.push(new Game("corpsedrop.png", "Clone Launch", "Games/Clone Launch.zip"));
    games.push(new Game("elements.png", "The Elements", "Games/The Elements.zip"));
    //games.push(new Game("currentcrisis.png", "Current Crisis (Not Currently Available)", ""));
    games.push(new Game("winginit.png", "Wingin' It", "https://teulis-shade.github.io/Wingin-It-main/"));
    games.push(new Game("sumosquared.png", "Sumo Squared", "Games/Sumo Squared.zip"));
    games.push(new Game("coinhell.png", "Coin Hell", "Games/Coin Hell.zip"));
    games.push(new Game("extremophile.png", "Extremophile", "https://teulis.itch.io/extremophile"));
    games.push(new Game("apartment.png", "Apartment Fire", "https://teulis-shade.github.io/apartment.html"))
    games.push(new Game("connect43D.png", "Connect 4 3D", "Games/Connect 4 3D.zip"))
    games.push(new Game("404.png", "404 Error Page", "nothing.html"));
}

window.onload = initialize();