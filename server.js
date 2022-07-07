//Packages we are using
var express = require('express'),
    app = express(),
    request = require('request'),
    async = require('async'),
    url = require('url'),
    path = require('path'),
    exphbs  = require('express-handlebars'),
    subdomain = require('express-subdomain'),
    crypto = require('crypto'),
    fs = require('fs')

// const PORT = 8080;
// const HOST = '0.0.0.0' || 'localhost';
//This is a global variable that only exists to demostrate stored XSS
var global_var = "This is a greeting to all users that view this page! Change it in the box below."

//Any url beginning with /static is assumed to be a static file,
//and will be served from the static directory
app.use('/static', express.static(__dirname + '/static'))

//Allow form inputs to be parsed easily
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

//Create cookie-based sessions for each user
//httponly is set to false so that js can access them
var session = require('express-session')

app.use(session({
    name     : 'sid',
    secret  : 'supersecretsecur3passw0rd',
    cookie : {
        httpOnly: false,
        maxAge: 60000*60*24
    }
}))

//This is our rendering engine
//It can be used to demonstrate forms of xss
app.engine('.html', exphbs({extname:'.html',partialsDir: __dirname +'/views',defaultLayout:"head"}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.html');

//Run the server
app.listen(process.env.PORT || 8080);

// console.log(`Example app listening on http://${HOST}:${PORT} or http://localhost:${PORT} !`);

app.get("/",function(req,res){
    return res.render("main",{})
})

app.get("/reflected_xss",function(req,res){
    res.header("X-XSS-Protection", 0)
    return res.render("reflected",{payload:req.query.foobar})
})

app.get("/reflected_xss_2",function(req,res){
    res.header("X-XSS-Protection", 0)
    return res.render("reflected1",{payload:req.query.foo})
})

app.get("/reflected_xss_3",function(req,res){
    return res.render("reflected2",{payload:req.query.foo})
})

app.get("/stored_xss",function(req,res){
    return res.render("stored",{payload: global_var})
})

app.post("/stored_xss",function(req,res){
    global_var = req.body.stored_payload
    return res.redirect("/stored_xss")
})

app.get("/csrf",function(req,res){
    if(typeof req.session.account_number == "undefined")
        req.session.account_number = "1234567"
    return res.render("csrf",{account_number:req.session.account_number})
})

app.post("/csrf",function(req,res){
    req.session.account_number = req.body.account_number
    return res.redirect("/csrf")
})


app.param("view",function(req,res,next,view){
    req.view = view
    next()
})

app.get("/views/:view",function(req,res){
    return res.sendFile(path.join(__dirname,"views/" + req.view))
})


app.param("id",function(req,res,next,id){
    req.id = id
    next()
})

app.get("/private_pages/:id/document.html",function(req,res){
    if(req.id == 123)
        return res.render("idor")
    else{
        if(!isNaN(req.id))
            return res.render("idor_bad",{id:req.id})
        else
            return res.render("idor_bad",{id:req.id,notNum:true})
    }
})

app.get("/rce",function(req,res){
    return res.render("rce")
})


app.param("fuzz",function(req,res,next,fuzz){
    req.fuzz = fuzz
    next()
})

app.get("/fuzzing/:fuzz",function(req,res){
    if (req.fuzz.indexOf("$") > -1 || req.fuzz.indexOf("^") > -1 || req.fuzz.indexOf("@") > -1){
        "privatekey_a0e5613a3c7f5779b47ab34657c48cf4".db_write()
        return res.render("fuzz")
}
    else
        return res.render("fuzz") 
})


app.param("user",function(req,res,next,user){
    req.user = user
    next()
})

app.get("/ban/user/:user",function(req,res){
    return res.render("banned",{user:req.user})
})

app.get("/auth_bypass",function(req,res){
    return res.render("auth_bypass")
})

app.get("/general",function(req,res){
    res.header("X-XSS-Protection", 0)
    return res.render("general",{payload:req.query.foo})
})

app.post("/csrf_protected_form",function(req,res){
    if(!req.body.recoveryemail || !req.body.csrf_token)
        return res.status(400).send("Missing one or more parameters")
    return res.status(200).send("Successfully Saved")
})

