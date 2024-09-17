import * as userModel from '../models/userModel.js';

export const getUserById = async (req,res) => {
    try{
        const { userId } = req.params; 
        const user = await userModel.getUserById(req, userId);
        if(!user){
            return res.status(404).json({ error: 'User does not exist'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching the user', error);
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req, res, req.body)
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating new user", error);
        res.status(400).send("Error creating new user");
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        if (!userId) {
            return res.status(404).send('User Id not found');
        }
        const updateUser = await userModel.updateUser(req, res, req.body, userId)
        res.status(200).json(updateUser);
    } catch (error) {
        console.error("Error updating the user information", error);
        res.status(400).send("Error updating the user information");
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        const deleteUser = await userModel.deleteUser(req, res, userId)
        res.status(200).json(deleteUser);
    } catch (error) {
        console.error("Error deleting the user", error);
        res.status(400).send("Error deleting the user");
    }
};