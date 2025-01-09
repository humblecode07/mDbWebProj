import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Client/Header'
import { useParams } from 'react-router-dom'
import { topLevelDataAppendCreditsApi } from '../../api/api';
import Section from '../../components/Details/Section';
import Credits from '../../components/Details/Credits';

const MovieCredits = () => {
   const params = useParams();
   const [credits, setCredits] = useState();

   useEffect(() => {
      const fetchCreditsData = async () => {
         try {
            const response = await topLevelDataAppendCreditsApi('movie', params.movieId.split('-')[0]);

            console.log(response)

            const groupedCrew = response.credits.crew.reduce((acc, member) => {
               if (!acc[member.department]) acc[member.department] = [];

               acc[member.department].push(member);

               return acc;
            }, {})

            setCredits({
               id: response.id,
               section: {
                  section_title: "Full Cast & Crew",
                  backdrop_path: response.backdrop_path || null,  
                  title: response.title || null,  
                  release_date: response.release_date.split('-')[0]
               },
               credits: {
                  casts: response.credits.cast || [],
                  crews: groupedCrew || [], 
               }
            });
         }
         catch (error) {
            console.error('Error fetching data:', error);
         }
      }

      fetchCreditsData();
   }, [params.movieId])

   console.log(credits)

   if (credits) {
      return (
         <>
            <main className='text-white flex flex-col gap-[2.75rem] font-roboto p-0'>
               <Section data={credits.section} />
               <Credits data={credits.credits} />
            </main>
         </>
      )
   }
}

export default MovieCredits
