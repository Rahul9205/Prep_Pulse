'use client'
import { db } from '@/utils/db';
import { preppulse } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
    const { interviewId } = useParams();
    const [interviewData,setInterviewData] =useState();
    const [interviewQuestion,setInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
    useEffect(() => {
        console.log(interviewId);
        GetInterviewDetails();
    }, [interviewId]);

    // Used to get interview Details by interviewId
    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(preppulse)
            .where(eq(preppulse.prepId, interviewId));

         const jsonPrepResp=JSON.parse(result[0].jsonPrepResp);
         console.log(jsonPrepResp);
         setInterviewQuestion(jsonPrepResp);
         setInterviewData(result[0]);
    };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

            {/* Question */}
            <QuestionSection interviewQuestion={interviewQuestion}
            activeQuestionIndex={activeQuestionIndex}/>


            {/* Video/Audio Recording */}
            <RecordAnswerSection  interviewQuestion={interviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}/>

        </div>

        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0&&  
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=interviewQuestion?.length-1&& 
           <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==interviewQuestion?.length-1&&  
          <Link href={'/dashboard/interview/'+interviewId+"/feedback"}>
          <Button >End Interview</Button>
          </Link>}


        </div>
    </div>
  )
}

export default StartInterview