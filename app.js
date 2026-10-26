const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const port = 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
mongoose.connect('mongodb://admin:admin@localhost:27017/yelp-camp?authSource=admin')
    .then((data) => { console.log('Database connected') })
    .catch((err) => { console.log('Error in database connection'); console.log(err) })

const Campground = require('./models/campground')

app.get('/', (req, res) => {
    res.render('home')
})

// INDEX (GET ONE/SOME)
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find();
    res.render('campgrounds/index', { campgrounds })
})

// NEW (GET FORM)
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

// SHOW (GET ONE)
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
})

// EDIT (GET FORM)
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
})

// CREATE (POST)
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground); // basta passar assim! o objeto já foi construído na request!
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

// UPDATE (PATCH/PUT)
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${id}`)
})

// DELETE (DELETE)
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})