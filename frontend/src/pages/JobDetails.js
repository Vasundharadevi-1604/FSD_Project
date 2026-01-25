import React from 'react';
import { useParams } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';

function JobDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Job Details for Job ID: {id}</h1>
      <ApplicationForm />
    </div>
  );
}

export default JobDetails;
