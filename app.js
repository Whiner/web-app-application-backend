const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');

const applicationRoutes = require( './routes/applications');
const categoriesRoutes = require('./routes/categories');

const config = require('./config/config');

const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', applicationRoutes);
app.use('/category', categoriesRoutes);

module.exports = app;

mongoose.connect(config.dbURL, config.dbOptions);
mongoose.connection
    .once('open', () => {
        console.log(`Mongoose - successful connection ...`);
        app.listen(
            process.env.PORT || config.port,
            () => console.log(`Server start on port ${config.port} ...`)
        )
    })
    .on('error', error => console.warn(error));
