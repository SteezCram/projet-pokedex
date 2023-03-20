const fs = require('fs');
const path = require('path');

const PokemonDatabase = require('./models/pokemonDatabase');

const express = require('express');
const app = express();
const port = 3000;




app.use(express.json({ limit: '10mb' }));
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'pages'), path.join(__dirname, 'layouts')]);
app.use(express.static('assets', { maxAge: 604800, mustRevalidate: true }));
app.use(express.static('static', { maxAge: 604800, mustRevalidate: true }));


app.get('/', async (req, res) => {
    res.render('index', { Pokemon: require('./models/pokemon'), pokemons: await PokemonDatabase.getAll(), route: 'index' });
});
app.get('/add', async (req, res) => {
    res.render('add', { route: 'add' });
});
app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});
app.get('/:id', async (req, res) =>
{
    const id = req.params.id.padStart(4, '0');
    const pokemon = await PokemonDatabase.get(id);

    if (pokemon == null) {
        res.sendStatus(404);
        return;
    }

    res.render('read', { Pokemon: require('./models/pokemon'), pokemon: pokemon, route: 'read' });
});
app.get('/edit/:id', async (req, res) =>
{
    const pokemon = await PokemonDatabase.get(req.params.id);

    if (pokemon == null) {
        res.sendStatus(404);
        return;
    }

    res.render('edit', { Pokemon: require('./models/pokemon'), pokemon: pokemon, route: 'edit' });
});


// API pokemons requests
app.get('/api/pokemons/:id/exists', async (req, res) =>
{
    const id = req.params.id.padStart(4, '0');

    if (await PokemonDatabase.exists(id)) {
        res.sendStatus(200);
        return;
    }

    res.sendStatus(404);
});
app.get('/api/pokemons/:name/search', async (req, res) =>
{
    const name = req.params.name;

    res.send(await PokemonDatabase.search(name));
});
app.patch('/api/pokemons/:id', async (req, res) =>
{
    try {
        if (!(await PokemonDatabase.update(req.params.id, req.body))) {
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.post('/api/pokemons', async (req, res) =>
{
    try
    {
        if (!(await PokemonDatabase.create(req.body))) {
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.delete('/api/pokemons/:id', async (req, res) =>
{
    try {
        await PokemonDatabase.delete(req.params.id);
    }
    catch {
        res.sendStatus(500);
        return;
    }
    
    res.sendStatus(200);
});


app.get('*', function(req, res){
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Listening to: http://localhost:${port}/`)
});