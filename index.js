const fs = require('fs');
const path = require('path');

const PokemonDatabase = require('./models/pokemonDatabase');

const express = require('express');
const app = express();
const port = 3000;




app.use(express.json({ limit: '10mb' }));
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'pages'), path.join(__dirname, 'layouts')]);
app.use(express.static('assets'));
app.use(express.static('static'));


app.get('/', async (req, res) => {
    res.render('index', { Pokemon: require('./models/pokemon'), pokemons: await PokemonDatabase.getAll() });
});
app.get('/:id', async (req, res) => {
    res.render('read', { Pokemon: require('./models/pokemon'), pokemon: await PokemonDatabase.get(req.params.id) });
});
app.get('/add', async (req, res) => {
    res.render('add');
});
// app.get('/assets/:directory*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'assets', req.params.directory, req.params[0]));
// });
// app.get('/:file', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', req.params.file));
// });


app.post('/api/pokemons', async (req, res) =>
{
    try {
        await PokemonDatabase.create(req.body);
        await PokemonDatabase.setImage(req.body.image.name, req.body.image.data);
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.delete('/api/pokemons', async (req, res) =>
{
    try {
        await fs.promises.unlink('./data/tasks.json');
    }
    catch {
        res.sendStatus(500);
        return;
    }
    
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Listening to: http://localhost:${port}/`)
});