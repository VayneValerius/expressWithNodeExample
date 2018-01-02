let bodyParser = require('body-parser')
let express = require('express');
let app = express();
const cors = require("cors");
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin:"*"}))
app.use("/api/cardList", router);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
    });

const cardList = [
    {
        id: 1,
        name: "Dank Magician",
        level : 7,
        attribute : "Dark",
        type : "Spellcaster"
    },

    {
        id: 2,
        name: "Dank Magician Girl",
        level : 6,
        attribute : "Dark",
        type : "Spellcaster"
    },

    {
        id: 3,
        name: "Dank Rebelion",
        level : 4,
        attribute : "Dark",
        type : "Dragon"
    }
];

router.get("/", (req, res) => {
    res.json(cardList);
});

router.get("/:id", (req, res) => {
    const cardID = req.params.id;
    const currentID = cardList.find((card) => card.id == cardID);
    if (currentID) {
        res.json(currentID);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", (req, res) => {
    const postCard = req.body;
    const isValid = isValidCard(postCard) && !cardList.find((card) => card.id == postCard.id);
    if (isValid) {
        cardList.push(postCard);
        res.send(postCard);
    } else {
        res.sendStatus(500);
    }
});

router.put("/:id", (req, res) => {
    const cardID = req.params.id;
    const currentCard = cardList.find((card) => card.id == cardID);
    if (currentCard) {
        const putCard = req.body;
        const isValid = isValidCard(putCard);
        if (isValid) {
            currentCard.name = putCard.name;
            currentCard.level = putCard.level;
            currentCard.attribute = putCard.attribute;
            currentCard.type = putCard.type;
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
});

router.delete("/:id", (req, res) => {
    const cardID = req.params.id;
    const currentCard = cardList.findIndex((card) => card.id == cardID);
    if (currentCard !== -1) {
        cardList.splice(currentCard, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

function isValidCard(card) {
    return "id" in card && "name" in card && "level" in card && "attribute" in card && "type" in card;
}