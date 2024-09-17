import "dotenv/config";

// Get a job with a specified job id
export const getJobById = ( req, jobId) => {
    return req.knexDb("jobs").where({ id: jobId }).first();
}

// Get the total job count for a specified month
export const getJobsByMonth = ( req, userId, month) => {
    return req.knexDb("jobs").where({ user_id: userId })
    .andWhere(req.knexDb.raw('DATE_FORMAT(creation_date, "%Y-%m") = ?', [month])).count();
}

// Get all the jobs for a specified date
export const getJobsByDate = ( req, userId, date) => {
    return req.knexDb("jobs").where({ user_id: userId })
    .andWhere(req.knexDb.raw('DATE_FORMAT(creation_date, "%Y-%m-%d") = ?', [date])).select('*');
}

// Get count of Total Job Applied
export const getTotalJobs = ( req, userId) => {
    return req.knexDb("jobs").where({ user_id : userId }).count();
}

// Get all the jobs in Wishlist for a specified user
export const getWishlistJobs = ( req, userId) => {
    return req.knexDb("jobs").where({ user_id : userId })
    .andWhere(({ status : 'wishlist' })).select('*');
}

// Create a new Job Application
export const createJob = ( req, jobDetails) => {
    const { id, title, company, location, description, applied_at, creation_date, deadline, color, salary, status, user_id } = jobDetails;
    
    if (!id || !title || !company || !location || !description || !applied_at || !creation_date || !deadline || !color || !salary || !status || !user_id) {
        return res.status(400).send("Error: Missing properties");
    }
    return req.knexDb("jobs").insert(jobDetails);
}

// Update Job Application
export const updateJob = async ( req, res, jobDetails, jobId) => {
    const { id, title, company, location, description, applied_at, deadline, color, salary, status } = jobDetails;
    
    if (!id || !title || !company || !location || !description || !applied_at || !deadline || !color || !salary || !status) {
        return res.status(400).send("Error: Missing properties");
    }

    const job = await req.knexDb("jobs").where({ id: jobId }).first();
    if (!job) {
        return res.status(404).send('Job ID not found');
    }

    await req.knexDb("jobs").where({ id: jobId }).update({
        id,
        title,
        company,
        location,
        description,
        applied_at,
        deadline,
        color,
        salary,
        status,
        updated_at: req.knexDb.fn.now(),
    });
    return req.knexDb("jobs").where({ id: jobId}).first();
}

// Delete Job Application 
export const deleteJob = async ( req, res, jobId ) => {
    const job = await req.knexDb("jobs").where({ id: jobId }).first();

    if (!job) {
        return res.status(404).send('Job ID not found');
    }

    return req.knexDb("jobs").where({ id: jobId }).del();
}
