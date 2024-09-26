import "dotenv/config";

// Get a job with a specified job id
export const getJobById = ( req, jobId) => {
    return req.knexDb("jobs").where({ id: jobId }).first();
}

// Get the total job count for a specified month
export const getJobsByMonth = ( req, userId, month) => {
    return req.knexDb("jobs").where({ user_id: userId })
    .andWhere(req.knexDb.raw('DATE_FORMAT(creation_date, "%Y-%m") = ?', [month]))
    .select(req.knexDb.raw('DAY(creation_date) as day'), req.knexDb.raw('COUNT(*) as job_count'))
    .groupBy('day');
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
export const createJob = async (req) => {
    const { title, company, location, creation_date, color, status, user_id } = req.body;

    if (!title || !company || !location || !creation_date || !color || !status || !user_id) {
        throw new Error("Error: Missing properties");
    }

    try {
        const [newJobId] = await req.knexDb("jobs").insert(req.body);
        const newJobData = await req.knexDb("jobs").select('*').where({ id: newJobId }).first(); 
        return newJobData; 
    } catch (error) {
        console.error(`Error creating job:`, error.message);
        throw new Error(`Error creating job: ${error.message}`);
    }
}
// Update Job Application
export const updateJob = async ( req, jobId) => {
    const { title, company, location, url, description, applied_at, deadline, color, salary, status } = req.body;
    
    const job = await req.knexDb("jobs").where({ id: jobId }).first();
    if (!job) {
        throw new Error('Job ID not found');
    }

    await req.knexDb("jobs").where({ id: jobId }).update({
        title,
        company,
        location,
        description,
        applied_at,
        url,
        deadline,
        color,
        salary,
        status,
        updated_at: req.knexDb.fn.now(),
    });
    return req.knexDb("jobs").where({ id: jobId}).first();
}

export const updateJobStatus = async ( req, jobId, status) => {
    const job = await req.knexDb("jobs").where({ id: jobId }).first();
    if (!job) {
        throw new Error('Job ID not found');
    }
    await req.knexDb("jobs").where({ id: jobId }).update({
        status,
        updated_at: req.knexDb.fn.now(),
    });
    return req.knexDb("jobs").where({ id: jobId}).first();
}

// Delete Job Application 
export const deleteJob = async ( req, jobId ) => {
    const job = await req.knexDb("jobs").where({ id: jobId }).first();

    if (!job) {
       throw new Error('Job ID not found');
    }

    return req.knexDb("jobs").where({ id: jobId }).del();
}
