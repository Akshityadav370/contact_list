const express = require('express')
const path = require('path')
const port = 9001

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
//Middleware for converting our req of contacts through form into key, value pairs
app.use(express.urlencoded())
app.use(express.static('assets'));

// //middleware1
// app.use(function(req, res, next){
//     req.myName = 'Arpan';
//     // console.log('middleware 1 used');
//     next();
// });

// //middleware2
// app.use(function(req, res, next){
//     console.log('myName from middleware2: ', req.myName);
//     // console.log('middleware 2 used');
//     next();
// })

contactList = [
    {
        name: 'Akshit',
        phone: '123456789'
    },
    {
        name: 'tony Stark', 
        phone: '234567890'
    },
    {
        name: 'Great Hulk',
        phone: '3456789012'
    }
]

app.get('/', function(req, res){
    
    return res.render('home', {
        title: 'Homepage'
    })
})

app.get('/contacts',async function(req, res){
    // console.log(__dirname);
    // res.send('Cool, it is running! or is it?');

    // console.log('myName from get contacts route: ', req.myName);
    // Contact.find({}, function(err, contacts_data){
    //     if(err){
    //         console.log('Error in fetching contacts from db');
    //         return;
    //     }
    //     return res.render('contacts', {
    //         title: "My Contacts list", 
    //         contact_list: contactList
    //     });
    // });
    // let contacts_data = await Contact.find({name: "Captain"});
    let contacts_data = await Contact.find({});

    return res.render('contacts', {
                title: "My Contacts list", 
                contact_list: contacts_data
            });
});



app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with EJS"
    });
});

// app.post('/create-contact', function(req, res){
    // return res.redirect('/practice');
    // console.log(req.body)
    // console.log(req.body.name)
    // console.log(req.body.phone);

    //Adding contacts to our contactList
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })

    // contactList.push(req.body);

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    //     },  function(err, newContact){
    //         if(err){
    //             console.log('error in creating a contact');
    //             return;
    //         }

    //         console.log("******", newContact);
    //         return res.redirect('/contacts');
            
    //     });

    
    
    // return res.redirect('back');
    // return res.redirect('/contacts');
    // return res.redirect('back');
// });

app.post('/create-contact', async function(req,res){
    // contactList.push(req.body)
    let newContact  = await Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    if(newContact){
        console.log(newContact);
        return res.redirect('back');

    }
    // return res.redirect('back');
});

// Using Params
// app.get('/delete-contact:phone', function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone;
// })

// Using query
// app.get('/delete-contact', function(req, res){
//     // console.log(req.query);
//     let phone = req.query.phone;
//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);}

//     return res.redirect('back');
// })

// Using ID
app.get('/delete-contact', async function(req, res){
    //get the id from query in ul
    let id = req.query.id;

    // find the contact in the DB using id & delete
    await Contact.findByIdAndDelete(id);
    return res.redirect('back');
});



// app.get('/another', function(req, res){
//     res.send('Yes!, this is another rendering page created by me after the lecture');
// })

// app.get('/', function(req, res){
//     res.send('<h1>Cool, it is running! or is it?</h1>');
// });
// app.get('/profile', function(req, res){
//     res.send('Cool, it is running! or is it?');
// });

app.listen(port, function(err){
    if(err) {
        console.log('Error in running the server', err);
    }

    console.log("Yup! My Express server is running on Port: ", port);
});