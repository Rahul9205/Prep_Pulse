
 import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'


function QuestionSection({ interviewQuestion, activeQuestionIndex }) {
  // Safeguard against undefined or empty interviewQuestion array
  const hasQuestions = interviewQuestion && interviewQuestion.length > 0;
  const activeQuestion = hasQuestions ? interviewQuestion[activeQuestionIndex] : null;

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech= new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry ,Your browser does not Support Text to Speech')
    }
  }

  return (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {hasQuestions && interviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex === index ? ' text-blue-500 bg-blue-500' : ''}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {activeQuestion ? (
        <>
          <h2 className='my-5 text-md md:text-lg'>
            {activeQuestion.question}
          </h2>

          <Volume2 onClick={()=>textToSpeech(activeQuestion.question) } className='cursor-pointer'/>

          <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
            <h2 className='flex gap-2 items-center'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='mt-2 text-sm text-blue-500 my-2'>
            {process.env.NEXT_PUBLIC_QUESTIOM_NOTE}
          </h2>
        </div>
        </>
      ) : (
        <h2 className='my-5 text-md md:text-lg text-red-500'>
          No questions available.
        </h2>
      )}
    </div>
  )
}

export default QuestionSection








