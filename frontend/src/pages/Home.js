import React from 'react';
import JobCard from '../components/JobCard';

function Home() {
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'ABC Corp', location: 'Remote' },
    { id: 2, title: 'Backend Developer', company: 'XYZ Ltd', location: 'New York' },
  ];

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
}

export default Home;
