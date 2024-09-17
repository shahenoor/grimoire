import * as jobModel from '../models/jobModel.js';

export const getJobById = async (req,res) => {
    try{
        const { jobId } = req.params; 
        const job = await jobModel.getJobById(req, jobId);
        if(!job){
            return res.status(404).json({ error: 'Job application does not exist'});
        }
        res.status(200).json(job);
    }
    catch (error) {
        console.error('Error fetching the job application', error);
    }
};

export const getJobsByMonth = async (req,res) => {
    try{
        const { userId, month} = req.params;
        const job = await jobModel.getJobsByMonth(req, userId, month);
        if(!job){
            return res.status(404).json({ error: 'Job application does not exist'});
        }
        res.status(200).json(job);
    }
    catch (error) {
        console.error('Error fetching the job application', error);
    }
};

export const getJobsByDate = async (req,res) => {
    try{
        const { userId, date } = req.params;
        const job = await jobModel.getJobsByDate(req, userId, date);
        if(!job){
            return res.status(404).json({ error: 'Job application does not exist'});
        }
        res.status(200).json(job);
    }
    catch (error) {
        console.error('Error fetching the job application', error);
    }
};

export const getTotalJobs = async (req,res) => {
    try{
        const { userId } = req.params; 
        const totalJobs = await jobModel.getTotalJobs(req, userId);
        if(!totalJobs){
            return res.status(404).json({ error: 'No job applications found for this user'});
        }
        res.status(200).json(totalJobs);
    }
    catch (error) {
        console.error('Error fetching total job application', error);
    }
};

export const getWishlistJobs = async (req,res) => {
    try{
        const { userId } = req.params; 
        const wishlistJobs = await jobModel.getWishlistJobs(req, userId);
        if(!wishlistJobs){
            return res.status(404).json({ error: 'No job applications found in the wishlist for this user'});
        }
        res.status(200).json(wishlistJobs);
    }
    catch (error) {
        console.error('Error fetching wishlist jobs', error);
    }
};

export const createJob = async (req, res) => {
    try {
        const newJob = await jobModel.createJob(req, req.body)
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error creating job application", error);
        res.status(400).send("Error creating job aplication");
    }
};

export const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params; 
        if (!jobId) {
            return res.status(404).send('Job ID not found');
        }
        const updateJob = await jobModel.updateJob(req, res, req.body, jobId)
        res.status(200).json(updateJob);
    } catch (error) {
        console.error("Error updating job application", error);
        res.status(400).send("Error updating job aplication");
    }
};

export const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params; 
        const deleteJob = await jobModel.deleteJob(req, res, jobId)
        res.status(200).json(deleteJob);
    } catch (error) {
        console.error("Error deleting job application", error);
        res.status(400).send("Error deleting job aplication");
    }
};