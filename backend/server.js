const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')


const app = express();
app.use(bodyParser.json())
app.use(cors())


const database = {
	users:
		[
			{
				id:'123',
				name:'Simon',
				email:'Simon@gmail.com',
				password:'newPass',
				entries:0,
				date:new Date()
			},
			{
				id:'125',
				name:'Sifen',
				email:'Sifen@gmail.com',
				password:'newPass',
				entries:0,
				joined:new Date()
			},
			{
				id:'124',
				name:'Jhon',
				email:'Joni@gmail.com',
				password:'newPass',
				entries:0,
				joined:new Date()
			}
		]
	}

app.get('/', (req, res) => {
	res.json(database.users)
})

app.post('/signin', (req, res) => {
	const { email, password } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(email === user.email && password === user.password){
			found = true;
			return res.json(user)
		}
	})

	if(!found){
		return res.status(404).json('Login failed')
	}

})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	
	// bcrypt.hash(password, null, null, function(err, hash) {
 //    		console.log(hash)
	// });

	if(email && name && password){
		const newUser = {
			id:'125',
			name,
			email,
			password,
			joined:new Date(),
			entries:0
		}

		database.users.push(newUser);
		res.json(newUser)
	}
	else {
		res.status(400).json('Please fill in all the form');
	}
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(id === user.id){
			found = true;
			return res.json(user)
		}
	})

	if(!found){
		res.status(404).json('No such user')
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(id === user.id){
			found = true;
			user.entries ++;
			return res.json(user.entries)
		}
	})

	if(!found){
		res.status(404).json('No such user')
	}
})

app.listen(8000, () => {
	console.log('listening to port 8000')
})

/*
	--> res = root route => '/' --> returns all users
	--> signin --> POST success/fail
	--> register --> POST = user
	/profile/:userid --> GET = user
	/image --> PUT -- user

	/*

	*//*
*/

