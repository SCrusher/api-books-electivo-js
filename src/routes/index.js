module.exports = (app) => {
    app.use('/books', require('./book.routes'));
};