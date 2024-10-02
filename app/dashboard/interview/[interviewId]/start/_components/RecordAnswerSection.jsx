// 'use client';
// import { Button } from '@/components/ui/button'
// import { Mic, Mic2 } from 'lucide-react';
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAIModel';
// import { db } from '@/utils/db';
// import { UserAnswer,id} from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';


// function RecordAnswerSection( interviewQuestion,activeQuestionIndex,interviewData) {
//     const [userAnswer, setUserAnswer] = useState('');
//     const [errorMessage, setErrorMessage] = useState(null);
//     const hasQuestions = interviewQuestion && interviewQuestion.length > 0;
//     const activeQuestion = hasQuestions ? interviewQuestion[activeQuestionIndex] : null;
//     const {user} =useUser();
//     const [loading,setLoading]=useState(false);

//     const {
//         error,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//     } = useSpeechToText({
//         continuous: true,
//         useLegacyResults: false
//     });

//     useEffect(() => {
//         console.log("Recording status:", isRecording);
//         console.log("Interim result:", interimResult);
//         console.log("Final results:", results);
//     }, [isRecording, interimResult, results]);

//     useEffect(() => {
//         if (results.length) {
//             const finalTranscript = results.map(result => result.transcript).join(' ');
//             setUserAnswer(prevAnswer => prevAnswer + ' ' + finalTranscript);
//             console.log("Updated user answer:", userAnswer);
//         }
//     }, [results]);

//     useEffect(() => {
//         if (error) {
//             console.error("Speech to text error:", error);
//             setErrorMessage("Error with speech recognition: " + error.message);
//         }
//     }, [error]);
//     useEffect(()=>{
//         if(!isRecording&&userAnswer.length>10)
//         {
//             updateUserAnswer();

//         }
        
//     },[userAnswer])

//     const startStopRecording=async()=>{
//         if(isRecording)
//             {   
                
//                 stopSpeechToText();
              
//             }
//         else{
//             startSpeechToText();
//         }
//     }

//     const updateUserAnswer=async()=>{
//         setLoading(true);
//         const feedbackPrompt="Question:"+activeQuestion.question+", User Answer:"+userAnswer+",Depends on question and user answer for given interview question"+"please give us rating for answer and feedback as area Of improvmenet"+
//                 "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

//                 const result=await chatSession.sendMessage(feedbackPrompt);

//                 const RecordjsonResp=(result.response.text()).replace('```json','').replace('```','')
//                 const feedbackResponse=(JSON.parse(RecordjsonResp));
//                 console.log(feedbackResponse);
//                 const resp=await db.insert(UserAnswer)
//                 .values({
//                     prepIdRef: interviewData?.id,
//                     question: activeQuestion.question,
//                     correctAns: activeQuestion?.answer,
//                     userAns:userAnswer,
//                     feedback:feedbackResponse?.feedback,
//                     rating :feedbackResponse?.rating,
//                     userEmail:user?.primaryEmailAddress?.emailAddress,
//                     createdAt:moment().format('DD-MM-YYYY')
//                 })
                
//                 if(resp){
//                     toast('User Answer recorded succesfully')
//                 }
//                 setLoading(false);
//                 setUserAnswer('');


//     }

//     return (
//         <div className='flex flex-col items-center justify-center'>
//             <div className='relative flex flex-col justify-center items-center bg-black rounded-lg p-5 my-20'>
//                 <Image 
//                     src={'/webcam-30-512.png'} 
//                     width={100} 
//                     height={100}
//                     className='absolute top-2 left-2 opacity-50 z-0'
//                 />
//                 <Webcam
//                     mirrored={true}
//                     style={{
//                         height: 300,
//                         width: '100%',
//                         zIndex: 10,
//                         borderRadius: '8px',
//                     }}
//                 />
//             </div>
//             <Button 
//                 onClick={startStopRecording}
//                 variant="outline" 
//                 className={`my-10 bg-white text-blue-500  border-2 px-6 py-2 rounded-md transition duration-300 ease-in-out ${
//                     isRecording ? 'bg-red-600 text-white' : 'hover:text-white hover:bg-red-600'
//                 }`}
//             >
//                 {isRecording ? (
//                     <div className='flex items-center'>
//                         <Mic2 className='mr-2 bg-red-600 text-white hover:text-white hover:bg-green-500 border-none' /> Recording...
//                     </div>
//                 ) : (
//                     'Record Answer'
//                 )}
//             </Button>
//             {errorMessage && (
//                 <div className='text-red-600 mt-4'>{errorMessage}</div>
//             )}
//             <div>
//                 <Button onClick={() => console.log("Final user answer:", userAnswer)}>Show User Answer</Button>
//             </div>
//         </div>
//     );
// }

// export default RecordAnswerSection;

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Mic, Mic2 } from 'lucide-react';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAIModel';
// import { useUser } from '@clerk/nextjs';

// function RecordAnswerSection({ interviewQuestion, activeQuestionIndex, interviewData }) {
//     const [userAnswer, setUserAnswer] = useState('');
//     const [errorMessage, setErrorMessage] = useState(null);
//     const { user } = useUser();
//     const [loading, setLoading] = useState(false);

//     const hasQuestions = interviewQuestion && interviewQuestion.length > 0;
//     const activeQuestion = hasQuestions ? interviewQuestion[activeQuestionIndex] : null;

//     const {
//         error,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//     } = useSpeechToText({
//         continuous: true,
//         useLegacyResults: false,
//     });

//     useEffect(() => {
//         console.log("Recording status:", isRecording);
//         console.log("Interim result:", interimResult);
//         console.log("Final results:", results);
//     }, [isRecording, interimResult, results]);

//     useEffect(() => {
//         if (results.length) {
//             const finalTranscript = results.map(result => result.transcript).join(' ');
//             setUserAnswer(prevAnswer => prevAnswer + ' ' + finalTranscript);
//         }
//     }, [results]);

//     useEffect(() => {
//         if (error) {
//             console.error("Speech to text error:", error);
//             setErrorMessage("Error with speech recognition: " + error.message);
//         }
//     }, [error]);

//     useEffect(() => {
//         if (!isRecording && userAnswer.length > 10) {
//             updateUserAnswer();
//         }
//     }, [isRecording, userAnswer]);

//     const startStopRecording = async () => {
//         try {
//             if (isRecording) {
//                 await stopSpeechToText();
//             } else {
//                 await startSpeechToText();
//             }
//         } catch (err) {
//             console.error("Error in start/stop recording:", err);
//             toast.error("Failed to start/stop recording.");
//         }
//     };

//     const updateUserAnswer = async () => {
//         setLoading(true);
//         try {
//             const feedbackPrompt = `Question:${activeQuestion.question}, User Answer:${userAnswer}, Depends on question and user answer for given interview question, please give us rating for answer and feedback as area Of improvement in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

//             const result = await chatSession.sendMessage(feedbackPrompt);
//             const RecordjsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
//             const feedbackResponse = JSON.parse(RecordjsonResp);

//             const response = await fetch('/api/saveAnswer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     interviewData,
//                     activeQuestion,
//                     userAnswer,
//                     feedbackResponse,
//                     userEmail: user?.primaryEmailAddress?.emailAddress,
//                 }),
//             });

//             if (response.ok) {
//                 toast('User Answer recorded successfully');
//             } else {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error);
//             }
//         } catch (err) {
//             console.error("Error updating user answer:", err);
//             toast.error("Failed to update user answer.");
//         } finally {
//             setLoading(false);
//             setUserAnswer('');
//         }
//     };

//     return (
//         <div className='flex flex-col items-center justify-center'>
//             <div className='relative flex flex-col justify-center items-center bg-black rounded-lg p-5 my-20'>
//                 <Image 
//                     src={'/webcam-30-512.png'} 
//                     width={100} 
//                     height={100}
//                     className='absolute top-2 left-2 opacity-50 z-0'
//                 />
//                 <Webcam
//                     mirrored={true}
//                     style={{
//                         height: 300,
//                         width: '100%',
//                         zIndex: 10,
//                         borderRadius: '8px',
//                     }}
//                 />
//             </div>
//             <Button 
//                 onClick={startStopRecording}
//                 variant="outline" 
//                 className={`my-10 bg-white text-blue-500 border-2 px-6 py-2 rounded-md transition duration-300 ease-in-out ${
//                     isRecording ? 'bg-red-600 text-white' : 'hover:text-white hover:bg-red-600'
//                 }`}
//             >
//                 {isRecording ? (
//                     <div className='flex items-center'>
//                         <Mic2 className='mr-2' /> Recording...
//                     </div>
//                 ) : (
//                     'Record Answer'
//                 )}
//             </Button>
//             {errorMessage && (
//                 <div className='text-red-600 mt-4'>{errorMessage}</div>
//             )}
//             <div>
//                 <Button onClick={() => alert(userAnswer)}>Show User Answer</Button>
//             </div>
//         </div>
//     );
// }

// export default RecordAnswerSection;

"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({interviewQuestion,activeQuestionIndex,interviewData}) {
    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
   
      } = useSpeechToText({
        continuous:false,
        useLegacyResults: false
      });
          const hasQuestions = interviewQuestion && interviewQuestion.length > 0;
          const activeQuestion = hasQuestions ? interviewQuestion[activeQuestionIndex] : null;

      useEffect(()=>{
       
        results?.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer?.length>10)
        {
          UpdateUserAnswer();
        } 
      },[userAnswer])
         
      const StartStopRecording=async()=>{
        if(isRecording)
        {
          stopSpeechToText()
        }
        else{
          startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{

        console.log(userAnswer)
        setLoading(true)
        const feedbackPrompt="Question:"+interviewQuestion[activeQuestionIndex]?.question+
        ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
        " please give us rating for answer and feedback as area of improvmenet if any "+
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

        const result=await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
        const resp=await db.insert(UserAnswer)
        .values({
          prevIdRef:interviewData?.prepId,
          question:interviewQuestion[activeQuestionIndex]?.question,
          correctAns:interviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        })

        if(resp)
        {
          toast('User Answer recorded successfully');
          setUserAnswer('');
          setResults([]);
        }
        setResults([]);
        
          setLoading(false);
      }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam-30-512.png'} width={200} height={200} 
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:400,
                width:400,
                zIndex:10,
            }}
            />
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10"
        onClick={StartStopRecording}
        >
            {isRecording?
            <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                <StopCircle/>Stop Recording
            </h2>
            :
            
            <h2 className='text-primary flex gap-2 items-center'>
              <Mic/>  Record Answer</h2> }</Button>
      
     
    </div>
  )
}

export default RecordAnswerSection











