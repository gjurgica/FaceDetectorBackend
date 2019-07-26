const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
const handleApiCal = (req,res) => {
        app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(404).json("Api failed")) 
}  
const dataBase = {
    users: [
        {
            id: "1",
            name: "Gjurgica",
            email: "gana123@gmail.com",
            password: "nesto",
            entries: 0,
            join: new Date()
        },
        {
            id: "2",
            name: "Marko",
            email: "marko3@gmail.com",
            password: "mara",
            entries: 0,
            join: new Date()
        },
        {
            id: "3",
            name: "Veronika",
            email: "vera@gmail.com",
            password: "nvera",
            entries: 0,
            join: new Date()
        }
    ]
}
app.get('/',(req,res) => {
    res.send(dataBase.users)
});
app.post('/signin',(req,res) => {
    // Load hash from your password DB.
    //bcrypt.compare("B4c0/\/", hash, function(err, res) {
    // res === true
    //});
    //bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
    //});
    const findUser = dataBase.users.find(x => x.email === req.body.email && x.password === req.body.password);
    if(findUser !== undefined){
        res.json("Hello user");
    }else{
        res.status(400).json("error login");
    }
});
app.post('/register',(req,res) => {
    const {name,email,password} = req.body;
    const count = 3;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash);
        });
    });
    dataBase.users.push({
            id: count +1,
            name: name,
            email: email,
            entries: 0,
            join: new Date()
    });
    res.json(dataBase.users[dataBase.users.length-1]);
});
app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    const user = dataBase.users.find(x => x.id === id);
    if(user !== undefined){
        res.json(user);
    }else{
        res.status(404).json('not found');
    }
});
app.put('/image',(req,res) => {
    const {id} = req.body;
    const user = dataBase.users.find(x => x.id === id);
    if(user !== undefined){
        user.entries ++;
        res.json(user.entries);
    }else{
        res.status(404).json('not found');
    }
})

app.listen(process.env.PORT || 3000,() => {
    console.log("Hello from server")
});