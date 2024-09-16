import axios from 'axios';
import "dotenv/config";

export const getJobById = ( req, id) => {
    return req.knexDb("jobs").where({ id }).first();
}

export const getJobsByMonth = ( req, id, month) => {
    return req.knexDb("jobs").where({ user_id: id })
    .andWhere(req.knexDb.raw('DATE_FORMAT(creation_date, "%Y-%m") = ?', [month])).select('*');
}

export const getJobsByDay = ( req, id, date) => {
    return req.knexDb("jobs").where({ user_id: id })
    .andWhere(req.knexDb.raw('DATE_FORMAT(creation_date, "%Y-%m-%d") = ?', [date])).select('*');
}

export const getTotalJobApplications = ( req, id) => {
    return req.knexDb("jobs").where({ user_id : id }).count();
}

export const createJob = ( req, jobDetails) => {
    return req.knexDb("jobs").insert(jobDetails);
}


