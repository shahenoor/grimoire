import * as jobModel from '../models/jobModel.js';

export const getJobById = async (req,res) => {
    try{
        const { id } = req.params; 
        const job = await jobModel.getJobById(req, id);
        if(!job){
            return res.status(404).json({ error: 'Job application does not exist'});
        }
        res.status(200).json(job);
    }
    catch (error) {
        console.error('Error fetching the job application', error);
    }
};

export const getTotalJobApplications = async (req,res) => {
    try{
        const { id } = req.params; 
        const totalJobs = await jobModel.getTotalJobApplications(req, id);
        if(!totalJobs){
            return res.status(404).json({ error: 'No job applications found for this user'});
        }
        res.status(200).json(totalJobs);
    }
    catch (error) {
        console.error('Error fetching total job application', error);
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

