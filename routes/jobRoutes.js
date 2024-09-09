// Modules
const express = require("express")
const axios = require('axios');

const jobRoutes = express.Router()

const searchJob = (jobs, description, location, full_time) => {
  console.log(typeof full_time, full_time)
  const jobsFilteredByDescription = description ? jobs.filter((job) => job.description.includes(description)) : jobs;
  const jobsFilteredByLocation = location ? jobsFilteredByDescription.filter((job) => job.location.includes(location)) : jobsFilteredByDescription;
  const jobsFilteredByFullTime = full_time ? jobsFilteredByLocation.filter((job) => job.type === "Full Time") :
    jobsFilteredByLocation.filter((job) => job.type !== "Full Time")
  return jobsFilteredByFullTime
}

/* 
  Method: GET
  Function: Getting Jobs with query
  Route: /api/1/job
*/
jobRoutes.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const description = req.query.description || "";
  const location = req.query.location || "";
  const full_time = req.query.full_time === "true";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const response = await axios.get('https://dev6.dansmultipro.com/api/recruitment/positions.json');
    const jobs = searchJob(response.data, description, location, full_time)
  
    const paginatedJobs = jobs.slice(startIndex, endIndex);

    res.json({
      currentPage: page,
      totalJobs: jobs.length,
      totalPages: Math.ceil(jobs.length / limit),
      jobs: paginatedJobs
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

module.exports = jobRoutes
