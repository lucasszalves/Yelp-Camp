const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const { campgroundSchema } = require('./schemas')
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const ExpressError = require('./utils/ExpressError');

const port = 3000
app.listen(port, () => {
    console.log(`Serving on localhost:${port}`)
})
mongoose.connect('mongodb://admin:admin@localhost:27017/yelp-camp?authSource=admin')
    .then((data) => { console.log('Database connected') })
    .catch((err) => { console.log('Error in database connection'); console.log(err) })

const Campground = require('./models/campground')

app.get('/', (req, res) => {
    res.render('home')
})

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body); // valida se o req.body se encaixa no padrão determinado por esse schema (não tem nada a ver com o Mongoose!)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

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
app.post('/campgrounds', validateCampground, async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground); // basta passar assim! o objeto já foi construído na request!
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

// UPDATE (PATCH/PUT)
app.put('/campgrounds/:id', validateCampground, async (req, res) => {
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

app.all('/{*path}', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(status).render('error', { err });
})