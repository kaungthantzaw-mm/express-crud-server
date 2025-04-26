import express from 'express';

const PORT = 3030;
const app = express();
let MemoryDB = [];
let id = 1;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(MemoryDB);
});

app.get('/:id', (req, res) => {
    const {id} = req.params;

    const menu = MemoryDB.find((m) => m.id === parseInt(id));
    if (!menu) {
        return res.status(404).send({message: "Menu not found"});
    }

    res.status(200).send(menu);
});

app.post('/', (req, res) => {
    const {name, price} = req.body;

    const menu = {id: id++, name, price};
    MemoryDB.push(menu);
    res.status(201).send({message: "New menu created"}, menu);
});

app.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, price} = req.body;

    const menu = MemoryDB.find((m) => m.id === parseInt(id));

    if (!menu) {
        return res.status(404).send({message: "Menu not found"});
    }

    menu.name = name;
    menu.price = price;

    res.status(200).send({message: `Menu id ${id} is updated`})
});

app.delete('/:id', (req, res) => {
    const {id} = req.params;

    const menuIndex = MemoryDB.findIndex((m) => m.id === parseInt(id));

    if(!menuIndex) {
        return res.status(404).send({message: "Menu not found"});
    }

    MemoryDB.splice(menuIndex);

    res.status(200).send({message: `Menu id ${id} is deleted`})
})