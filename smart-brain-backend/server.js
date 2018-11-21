const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'1234',
		database:'smart-brain'
	}
})



app.get('/', (req, res) => {
	database.select('*').from('users')
	.then(data => {
		res.json(data)
	})
})



app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.select('*').from('users')
	.where('id', '=', id)
	.then(user => {
		res.json(user[0])
	})
	.catch(error => {
		res.status(404).json('No such user')
	})
})



app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password)

	database.transaction(trx => {
		trx.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email:loginEmail[0],
				name:name,
				joined:new Date(),
			})
			.then(user => {
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(error => res.status(400).json('Failed to register'))
})


app.post('/signin', (req, res) => {
	const { email, password } = req.body;

	database.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash)
			if(isValid){ 
				database.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => {
					res.status(404).json('User not found')
				})
			} else {
				res.status(404).json('User not found')
			}
		})
		.catch(error => {
			res.status(404).json('User not found')
		})

})

app.put('/image', (req, res) => {
	const { id } = req.body;

	database('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		console.log(entries)
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('Failed to increase rank'))
})



app.listen(8000, () => {
	console.log('listening to port 8000')
})
