import axios from 'axios';
import React from 'react'

const fetchResults = async (value, setResults) => {
  try {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const response = await axios.get(`https://api.themoviedb.org/3/configuration/jobs`, {
      params: {
        query: value,
        include_adult: false,
        language: 'en-US',
        page: 1
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const filteredJobs = response.data.reduce((acc, dept) => {
      const matchingJobs = dept.jobs.filter(job => job.includes(value));
    
      if (matchingJobs.length > 0) acc.push({ department: dept.department, jobs: matchingJobs });
    
      return acc;
    }, []);

    console.log(filteredJobs);
    
    setResults(filteredJobs)
  } catch (error) {
    console.error('Error fetching data:', error);
    setResults([]);
  }
};

const JobSearch = ({ setResults, jobOccupation, setJobOccupation }) => {
  const handleChange = (search) => {
    setJobOccupation({ ...jobOccupation, job: search });
    fetchResults(search, setResults);
  }

  return (
    <input
      type="text"
      className="job--input-field"
      placeholder="Select a job"
      value={jobOccupation.job}
      onChange={(e) => handleChange(e.target.value)}
      required
    />
  )
}

export default JobSearch
