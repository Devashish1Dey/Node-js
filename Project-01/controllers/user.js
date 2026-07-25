const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not Found' })
    return res.json(user)
}

async function handleUpdateUserById(req, res) {
    try {
        const body = req.body;
        // Update user in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            body,
            { new: true, runValidators: true } // return updated doc, validate schema
        );
        if (!updatedUser) {
            return res.status(404).json({ status: 'User not found' });
        }
        return res.json({ status: 'Success', updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'Failed', message: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                status: "User not found"
            });
        }
        return res.json({
            status: "Success",
            deletedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
}

async function handleCreateNewUser(req, res) {
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: 'All Fields are required' })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    console.log('result', result)

    return res.status(201).json({ msg: "Success", id: result._id })
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}