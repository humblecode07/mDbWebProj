import React, { useState } from 'react';
import JobSearch from './JobSearch';

const JobSearchBar = ({ jobOccupation, setJobOccupation }) => {
   const [results, setResults] = useState([]);

   const handleSelectJobOccupation = (job, department) => {
      setJobOccupation({
         job: job,
         department: department
      });
      setResults([]);
   };

   return (
      <div className="relative">
         <label className="block text-sm font-medium mb-2">Job Name</label>
         <div>
            <JobSearch
               setResults={setResults}
               jobOccupation={jobOccupation}
               setJobOccupation={setJobOccupation}
            />
         </div>
         {results && results.length > 0 && (
            <div className="absolute w-full h-[25rem] overflow-auto bg-gray-800">
               {results.map((result, index) => (
                  <div key={index} className="p-2 border-b border-gray-700">
                     {result.jobs.map((job, jobIndex) => (
                        <div
                           key={`${index}-${jobIndex}`}
                           className="flex flex-col p-2 bg-[#2C2C2C] hover:bg-[#3C3C3C] cursor-pointer"
                           onClick={() => handleSelectJobOccupation(job, result.department)}
                        >
                           <div className="font-semibold">Job: {job}</div>
                           <div className="text-gray-600">Department: {result.department}</div>
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default JobSearchBar;
