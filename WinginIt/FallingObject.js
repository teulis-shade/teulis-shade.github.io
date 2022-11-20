//CAN IGNORE THIS - now integrated into main js file


//rarity is 0 is rare, 1 is common
var rarity;
//item holds an object with a name and filepath
var item = null;
rareItems = [
    { name: "The Wreck", src: null },
    { name: "George P Burdell", src: null},
    { name: "UGA", src: null }
]

commonItems = [
    { name: "Flower", src: null },
    { name: "Football", src: null },
    { name: "Rat Cap", src: null },
    { name: "T", src: null }
]

// for (i = 0; i < 50; i++) {
//     FallingObject();
// }

//Create an object with a rarity and an item
function FallingObject() {
    chooseRarity();
    console.log("RARITY: " + rarity);
    console.log(item);
    return (
    {
        rarity: rarity,
        item: item
    });
}


function chooseRarity() {
    rarity = Math.round(Math.random());
    if (rarity == 0) {
        chooseItem(rareItems);
    } else {
        chooseItem(commonItems);
    }
}

function chooseItem(itemList) {
    let index = (Math.floor(Math.random() * itemList.length));
    item = itemList[index];
}

//Need to randomly choose between rare and common
//Randomly choose which rare and which common
