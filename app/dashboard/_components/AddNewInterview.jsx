'use client';
import React, { useState } from 'react';
import {chatSession} from '../../../utils/GeminiAIModel'
import {db}from '../../../utils/db'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LucideLoader2 } from 'lucide-react';
import { preppulse } from '@/utils/schema';
import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs';
import moment from 'moment'
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading,setLoading] = useState('');
  const [jsonResponse,setjsonResponse] = useState([]);
  const {user}=useUser();
  const router=useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("onSubmit called");
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = "Job Position:" + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + " ,Depends on this information please give me " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT + " Interview question with Answered in strictly Json Format,Give Question and Answered as field in JSON'";

    let retries = 3;
    let result;
    while (retries > 0) {
        try {
            result = await chatSession.sendMessage(InputPrompt);
            const jsonResp = (result.response.text()).replace('```json', '').replace('```', '');

            console.log(JSON.parse(jsonResp));
            setjsonResponse(jsonResp);

            if (jsonResp) {
                const resp = await db.insert(preppulse)
                    .values({
                        prepId: uuidv4(),
                        jsonPrepResp: jsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY')
                    }).returning({ prepId: preppulse.prepId });

                console.log("Inserted record ID:", resp);
                setLoading(false);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.prepId);
                }
            } else {
                console.log("Error: JSON response is empty");
            }
            break; // Exit the loop if successful
        } catch (error) {
            retries--;
            console.error(`Attempt failed. Retries left: ${retries}. Error: ${error.message}`);
            if (retries === 0) {
                console.error("All attempts failed. Please try again later.");
                setLoading(false);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }
    }
};

   


  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>
              Tell us more about your job interviewing
            </DialogTitle>
            <form onSubmit={onSubmit}>
              <div className='mt-7 my-2'>
                <label htmlFor='jobPosition'>Job Role/Job Position</label>
                <Input
                  id='jobPosition'
                  placeholder='Ex. Full Stack Developer'
                  required
                  value={jobPosition}
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>
              <div className='my-3'>
                <label htmlFor='jobDesc'>Job Description? Tech Stack (In Short)</label>
                <Textarea
                  id='jobDesc'
                  placeholder='Ex. React, Next.js, Angular etc'
                  required
                  value={jobDesc}
                  onChange={(event) => setJobDesc(event.target.value)}
                />
              </div>
              <div className='my-2'>
                <label htmlFor='jobExperience'>Years of Experience</label>
                <Input
                  id='jobExperience'
                  placeholder='2'
                  type='number'
                  min={0}
                  max={50}
                  required
                  value={jobExperience}
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
              <div className='flex gap-5 justify-end border-white'>
                <Button onClick={() => setOpenDialog(false)} type='button' className='bg-white text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 hover:shadow-md transition-all'>Cancel</Button>
                <Button  className='bg-blue-500 hover:bg-blue-700 hover:scale-110 hover:shadow-md transition-all' type='submit'
                disabled={loading}>
                {loading ? 
                <>
                <LucideLoader2 className='animate-spin' />'Generating from AI'
                </>:'Start Interview'
                }
                </Button>
              </div>
              

            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;



        

    
    
