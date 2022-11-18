'use strict'

//string for Verbing side
const verbings = 'Screaming,Biting,Hopping,Hoping,Judging,Caressing,Avoiding,Brightening,Singing,Nibbling,Twirling,Wiggling,Flying,Pouncing,Sneaking,Hugging,Bubbling,Crying,Weeping,Whistling,Crawling,Glistening,Doodling,Panicking,Terrorizing,Bleating,Searching,Staring,Stargazing,Juggling,Vamping,Expressing,Dancing,Crystalizing,Seeking,Copying,Floating,Rebelling,Wrestling,Stomping,Footloosing,Frolicking,Hunting,Hooting,Metamorphasizing,Morphing,Transforming,Birthing,Dying,Evolving,Planting,Escaping,Gurgling,Contorting,Degenerating,Laughing,Awaking,Scribbling,Coughing,Convulsing,Realizing,Straddling,Concocting,Elbowing,Dissolving,Disintegrating,Itching,Digging,Kicking,Mooning,Enraging,Fetching,Falling,Fighting,Flattening,Flattering,Rolling,Rafting,Riffing,Sniffing,Snorting,Sneezing,Teething,Tipping,Tiptoeing,Nudging,Punching,Picking,Scratching,Screaming,Crawling,Fidgeting,Gargling,Giggling,Radiating,Insulting,Ironing,Lifting,Scraping,Beaming,Blaming,Doodling,Encroaching,Flexing,Smoothing,Circling,Thickening';

//string for the Whats side
const whats = 'Moose,Dodo,Corn Cob,Cow,Goat,Rat,Baby,Bear,Gosling,Grasshopper,Spoon,Leaf,Rock,Caterpillar,Egg,Tiger,Crocodile,Dachsund,Apple,Orange,Grape,Watermelon,Grapefruit,Kiwi,Banana,Basket,Scarf,Octopus,Cardinal,Teapot,Water Jug,Warthog,Ocean,Magnet,Whippoorwill,Yak,Arrow,Dove,Pigeon,Zebra,Lawyer,Judge,Chef,Ostrich,Apron,Sleeve,Claw,Foot,Breakfast,Sandwich,Concoction,Moon,Sun,Star,Mountain,Morsel,Cheese,Mouse,Orangutan,Whale,Fiddle,Lute,Harpsichord,Floof,Ogre,Sprite,Fairy,Mosquito,Grasshopper,Ostrich,Ocelot,Dragon,Camel,Dingbat,Ghost,Book,Candle,Sheepdog,Beagle,Chihuahua,Wombat,Sloth,Antelope,Goat,Frog,Keyboard,Candle,Hummingbird,Plank,Glasses,Telescope,Eyeball,Muffin,Unicorn,Spinster,Wasp,Catepillar,Gingerbread Man,Comet,Twinkle';

let combos = []; 
let verbingsArr = [];
let whatsArr = [];

const btnCreate = document.querySelector(".button-create");
const btnKeep = document.querySelector(".button-keep");
const btnList = document.querySelector(".button-list");
const btnRestart = document.querySelector(".button-restart");

const leftSideWord = document.querySelector('#left-side'); 
const rightSideWord = document.querySelector('#right-side');

const listCtnr = document.querySelector('#list-container');
const theList = document.querySelector('#the-list');

let listHidden = true;
let newPhrase = false;

const resetWordBoxes = () => {
    leftSideWord.textContent = "Verbing";
    rightSideWord.textContent = "Whats-it";
    document.querySelectorAll('.word-box').forEach(el => el.style.color ='#ccc');
}

const start = function(){
    //clear contents and hide list
    resetWordBoxes();
    theList.innerHTML = '';
    listCtnr.style.opacity = 0;
    btnList.textContent = "Show List";
    listHidden = true;
    combos = [];

    //Test strings for duplicates, return array with no duplicates
    const testForDupes = (str) => {
        const holdArray = str.split(',');
        const tempSet = new Set(holdArray);
        return [...tempSet];
    }

    verbingsArr = testForDupes(verbings);
    whatsArr = testForDupes(whats);
}

//Random number generator
const randomNum = (array) => {
    const num = Math.trunc(Math.random()*array.length);
    return num;
}

//Start shebang
start();


//Button Create
btnCreate.addEventListener('click', function(){
    document.querySelectorAll('.word-box').forEach(el => el.style.color ='#222');
    let left = randomNum(verbingsArr);
    let right = randomNum(whatsArr);
    leftSideWord.textContent = verbingsArr[left];
    rightSideWord.textContent = whatsArr[right];
    newPhrase = true;
})

//Button Keep
btnKeep.addEventListener('click', function() {
    if (newPhrase) {
        let phrase = [leftSideWord.textContent, rightSideWord.textContent].join(' ');
        combos.push(phrase);
        //remove what was kept from each array
        verbingsArr.splice(verbingsArr.indexOf(leftSideWord.textContent),1);
        whatsArr.splice(whatsArr.indexOf(rightSideWord.textContent),1);

        leftSideWord.textContent = rightSideWord.textContent = "";
        theList.textContent = '';
        
        combos.forEach((phrase) => {
            theList.insertAdjacentHTML('afterbegin', `<span class="list-item">${phrase}</span></br>`); 
        });
        resetWordBoxes();
        newPhrase = false;
    }
})

//Button Show/Hide List
btnList.addEventListener('click', function() {
    if (listHidden) {
        listCtnr.style.opacity = 1;
        btnList.textContent = "Hide List";
    } else {
        listCtnr.style.opacity = 0;
        btnList.textContent = "Show List";
    }
    listHidden = !listHidden;
})

//Button Restart
btnRestart.addEventListener('click', start);