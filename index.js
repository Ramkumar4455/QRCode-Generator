const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const qrcode = require('qrcode');
const exp = require('constants');

const port = 5000;

// use to parse the data in the body to js object format
app.use(express.json());

// use to  parse incoming request bodies with URL-encoded data. This middleware is commonly used when dealing with form submissions from HTML pages.
app.use(express.urlencoded({ extended: false }));


// This means that when you render a view in your
// routes, Express will use EJS to compile the view templates. EJS allows you to 
// embed JavaScript code directly within your HTML templates
app.set('view engine', 'ejs');

//This line sets the directory where your view templates are located.
app.set('views', path.join(__dirname, 'view'));

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.render('index');
})

app.post('/scan', (req, res, next) => {
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text, (err, src) => {
        res.render('scan',{
            qr_code:src
        });
    })
})

app.listen(port, () => {
    console.log('listening to port 5000')
})