const express = require('express')
// const fs = require('fs')
// const mongoose = require('mongoose')
// const users = require('./MOCK_DATA.json')
const { type } = require('os')

const {connectMongoDb} = require('./connection.js')
const {logReqRes} = require('./middlewares')
const userRouter = require('./routes/user.js')


const app = express()
const PORT = 8000

// connection
connectMongoDb('mongodb://127.0.0.1:27017/Dev-pro-1').then(()=> console.log('MongoDb Connected'))

// mongoose.connect('mongodb://127.0.0.1:27017/Dev-pro-1')
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log('Mongo Error', err))

// // Schema
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: false,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     jobTitle: {
//         type: String,
//     },
//     gender: {
//         type: String,
//     },
// },{timestamps: true})

// const User = mongoose.model('user', userSchema)

// Middleware - Plugin
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next) => {
//     // fs.appendFile('log.txt', `\n${Date.now()}:${req.ip} ${req.method} ${req.path}\n`, (err, data) => {
//     //     next()
//     // })
// })

app.use(logReqRes('log.txt'))

// app.use((req, res, next) => {
//     console.log('Hello From Middleware 1')
//     req.myUserName = 'Avinash'
//     // return res.json({msg: 'Hello From Middleware 1'})
//     next()
// })

// app.use((req, res, next) => {
//     console.log('Hello From Middleware 2', req.myUserName)
//     // return res.json({msg: 'Hello From Middleware 2'})
//     // return res.end("Hey")
//     next()
// })

// Routes
// app.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({})
//     // ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>
//     `
//     res.send(html)
// })

// // REST API
// app.get('/api/users', async (req, res) => {
//     const allDbUsers = await User.find({})

//     // console.log('I am in get route', req.myUserName)
//     res.setHeader('X-MyName', 'Krishna')   // Custom Header
//     // Always add X to custom Headers
//     console.log(req.headers)
//     return res.json(allDbUsers)
// })

// app.route('/api/users/:id').get( async (req, res) => {
//     const user = await User.findById(req.params.id)

//     // const id = Number(req.params.id)
//     // const user = allDbUsers.find((user) => user.id === id)
//     if (!user) return res.status(404).json({ error: 'User not Found' })
//     return res.json(user)
// })
//     .patch( async (req, res) => {
//         // TODO: Edit the user with id
//         // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         // // const id = Number(req.params.id)
//         // // const body = req.body
//         // console.log('Body', body)
//         // // const userIndex = User.findIndex((user) => user.id === id)
//         // if (userIndex === -1) {
//         //     return res.status(404).json({ Status: 'User not found' })
//         // }
//         // users[userIndex] = { ...users[userIndex], ...body }
//         // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//         //     if (err) {
//         //         return res.status(500).json({
//         //             status: "Failed",
//         //             message: "Error writing file"
//         //         });
//         //     }
//         //     return res.json({ Status: 'Success', updatedUser: users[userIndex] })
//         // })
//         // console.log(req.body);
//         // console.log(req.params.id);

//         try {
//         const body = req.body;

//         // Update user in MongoDB
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             body,
//             { new: true, runValidators: true } // return updated doc, validate schema
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ status: 'User not found' });
//         }

//         return res.json({ status: 'Success', updatedUser });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: 'Failed', message: error.message });
//     }
//     })
//     .delete( async (req, res) => {
//         // TODO: Delete the user with id

//         // const id = Number(req.params.id);

//         // const userIndex = users.findIndex(user => user.id === id);

//         // if (userIndex === -1) {
//         //     return res.status(404).json({
//         //         status: "User not found"
//         //     });
//         // }

//         // // Store deleted user
//         // const deletedUser = users[userIndex];

//         // // Remove user
//         // users.splice(userIndex, 1);

//         // fs.writeFile(
//         //     './MOCK_DATA.json',
//         //     JSON.stringify(users, null, 2),
//         //     (err) => {
//         //         if (err) {
//         //             return res.status(500).json({
//         //                 status: "Failed",
//         //                 message: "Error writing file"
//         //             });
//         //         }

//         //         return res.json({
//         //             status: "Success",
//         //             deletedUser
//         //         });
//         //     }
//         // );
//         // return res.json({ Status: 'Pending'})
//         try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);

//         if (!deletedUser) {
//             return res.status(404).json({
//                 status: "User not found"
//             });
//         }

//         return res.json({
//             status: "Success",
//             deletedUser
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             status: "Failed",
//             message: error.message
//         });
//     }
//     })

// // app.get('/api/users/:id', (req, res) => {
// //     const id = Number(req.params.id)
// //     const user = users.find((user) => user.id === id)
// //     return res.json(user)
// // })

// app.post('/api/users', async (req, res) => {
//     // TODO: Create new user
//     const body = req.body
//     if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
//         return res.status(400).json({ msg: 'All Fields are required' })
//     }
//     // console.log('Body',body)
//     // users.push({ ...body, id: users.length + 1 })
//     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data) => {
//     //     return res.status(201).json({ Status: 'Success', id: users.length })
//     // })
//     const result = await User.create({
//         firstName: body.first_name,
//         lastName: body.last_name,
//         email: body.email,
//         gender: body.gender,
//         jobTitle: body.job_title,
//     })
//     console.log('result', result)

//     return res.status(201).json({ msg: "Success" })
// })

// app.patch('/api/users/:id', (req, res) => {
//     // TODO: Edit the user with id
//     return res.json({ Status: 'Pending'})
// })

// app.delete('/api/users/:id', (req, res) => {
//     // TODO: Delete the user with id
//     return res.json({ Status: 'Pending'})
// })


app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})

