'use client';

import { preppulse } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview() {
    const { interviewId } = useParams();
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

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

        setInterviewData(result[0]);
    };

    return (
        <div className='my-10  '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='flex flex-row  gap-10 justify-between p-5'>
              <div className='flex flex-col gap-5 p-5'>
                <div  className='grid grid-cols-1  gap-10 p-5 rounded-md border w-auto h-auto'>
              {interviewData && (
                <div className='flex flex-col my-5 gap-5'>
                    <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                </div>
            )}
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 shadow-md'>
              <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
              <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
              </div>
             
            
            <div className='items-start'>
                {webCamEnabled ? (
                    <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                          aspectRatio: '4 / 3',
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                        <Button varient="ghost" onClick={() => setWebCamEnabled(true)} >
                            Enable Webcam and Microphone
                        </Button>
                    </>
                )}
            </div> 
            </div>

            <div className='flex justify-end items-end pr-10'>
              <Link href={'/dashboard/interview/'+interviewId+'/start'}>
               <Button className='bg-blue-500 hover:bg-blue-700 hover:scale-110 hover:shadow-md transition-all'>
                Start Interview
               </Button>
              </Link>
              
              
            </div>

            
        </div>
    );
}

export default Interview;


