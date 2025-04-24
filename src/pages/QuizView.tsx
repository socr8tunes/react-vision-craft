
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChevronRight, Check, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock quiz data
const quizData = {
  "m1": {
    id: "m1",
    courseId: "1",
    title: "Classical Mechanics Quiz",
    description: "Test your knowledge of Newton's Laws and Conservation principles.",
    timeLimit: 30, // in minutes
    passingScore: 70,
    questions: [
      {
        id: "q1",
        text: "Which of Newton's laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an outside force?",
        type: "multiple-choice",
        options: [
          "First Law",
          "Second Law",
          "Third Law",
          "Fourth Law"
        ],
        correctAnswer: "First Law"
      },
      {
        id: "q2",
        text: "What is the formula for calculating force according to Newton's Second Law?",
        type: "multiple-choice",
        options: [
          "F = mv",
          "F = ma",
          "F = mg",
          "F = m/a"
        ],
        correctAnswer: "F = ma"
      },
      {
        id: "q3",
        text: "Which of the following is an example of Newton's Third Law?",
        type: "multiple-choice",
        options: [
          "A book resting on a table",
          "A car accelerating on a highway",
          "A rocket pushing out gas to propel forward",
          "An apple falling from a tree"
        ],
        correctAnswer: "A rocket pushing out gas to propel forward"
      },
      {
        id: "q4",
        text: "What is conserved in an isolated system according to the Law of Conservation of Momentum?",
        type: "multiple-choice",
        options: [
          "Energy",
          "Mass",
          "Momentum",
          "Velocity"
        ],
        correctAnswer: "Momentum"
      },
      {
        id: "q5",
        text: "True or False: The total energy in an isolated system is always conserved.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "True"
      }
    ]
  }
};

export default function QuizView() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  
  const [currentQuiz, setCurrentQuiz] = useState<any>(quizData[quizId as keyof typeof quizData]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(currentQuiz?.timeLimit * 60 || 30 * 60); // in seconds
  
  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Quiz not found</h2>
              <Link to={`/courses/${courseId}`} className="text-primary hover:underline">
                Return to course
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  const startQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Quiz started",
      description: `You have ${currentQuiz.timeLimit} minutes to complete this quiz.`
    });
  };
  
  const selectAnswer = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  const goToNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const submitQuiz = () => {
    setQuizSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question: any) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const scorePercentage = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    const passed = scorePercentage >= currentQuiz.passingScore;
    
    toast({
      title: passed ? "Quiz completed successfully!" : "Quiz completed",
      description: `You scored ${scorePercentage}%. ${passed ? "Congratulations!" : "Try again to improve your score."}`,
      variant: passed ? "default" : "destructive"
    });
  };
  
  const retakeQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setQuizSubmitted(false);
  };
  
  const finishQuiz = () => {
    navigate(`/courses/${courseId}`);
  };
  
  // Display quiz introduction screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <Link to={`/courses/${courseId}`} className="text-sm text-muted-foreground hover:text-white flex items-center">
                <ChevronRight className="rotate-180 mr-1" size={16} />
                Back to course
              </Link>
            </div>
            
            <div className="max-w-3xl mx-auto bg-secondary/50 border border-white/10 rounded-lg p-10 text-center">
              <h2 className="text-3xl font-bold mb-4">{currentQuiz.title}</h2>
              <p className="text-muted-foreground mb-8">{currentQuiz.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
                <div className="bg-secondary/70 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Questions</h4>
                  <p className="text-2xl">{currentQuiz.questions.length}</p>
                </div>
                <div className="bg-secondary/70 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Time Limit</h4>
                  <p className="text-2xl">{currentQuiz.timeLimit} minutes</p>
                </div>
                <div className="bg-secondary/70 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Passing Score</h4>
                  <p className="text-2xl">{currentQuiz.passingScore}%</p>
                </div>
              </div>
              
              <div className="bg-secondary/30 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>• Read each question carefully before selecting your answer.</li>
                  <li>• You can navigate between questions using the previous and next buttons.</li>
                  <li>• Your progress is saved as you go.</li>
                  <li>• Submit the quiz when you've answered all questions.</li>
                  <li>• You'll receive your results immediately after submission.</li>
                </ul>
              </div>
              
              <button 
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 inline-flex items-center font-medium"
                onClick={startQuiz}
              >
                Start Quiz
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // If the quiz is submitted, show results
  if (quizSubmitted) {
    // Calculate score
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question: any) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const scorePercentage = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    const passed = scorePercentage >= currentQuiz.passingScore;
    
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <Link to={`/courses/${courseId}`} className="text-sm text-muted-foreground hover:text-white flex items-center">
                <ChevronRight className="rotate-180 mr-1" size={16} />
                Back to course
              </Link>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary/50 border border-white/10 rounded-lg p-10 text-center mb-8">
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${passed ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {passed ? <Check size={32} /> : <X size={32} />}
                </div>
                <h2 className="text-3xl font-bold mb-2">{passed ? "Quiz Passed!" : "Quiz Failed"}</h2>
                <p className="text-muted-foreground mb-6">
                  You scored {scorePercentage}%. {passed ? "Congratulations!" : `You need ${currentQuiz.passingScore}% to pass.`}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
                  <div className="bg-secondary/70 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Score</h4>
                    <p className="text-2xl">{scorePercentage}%</p>
                  </div>
                  <div className="bg-secondary/70 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Correct Answers</h4>
                    <p className="text-2xl">{correctAnswers} / {currentQuiz.questions.length}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <p className="text-2xl">{passed ? "Passed" : "Failed"}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <button 
                    className="px-6 py-2.5 bg-secondary text-white rounded-lg hover:bg-secondary/80 inline-flex items-center font-medium"
                    onClick={retakeQuiz}
                  >
                    Retake Quiz
                  </button>
                  <button 
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 inline-flex items-center font-medium"
                    onClick={finishQuiz}
                  >
                    Back to Course
                  </button>
                </div>
              </div>
              
              <div className="bg-secondary/50 border border-white/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Question Review</h3>
                
                <div className="space-y-8">
                  {currentQuiz.questions.map((question: any, index: number) => {
                    const selectedAnswer = answers[question.id];
                    const isCorrect = selectedAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="border border-white/10 rounded-lg overflow-hidden">
                        <div className="bg-secondary/70 p-4">
                          <div className="flex items-start">
                            <span className="bg-secondary/50 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="font-medium mb-1">{question.text}</h4>
                              <div className="flex items-center">
                                {isCorrect ? (
                                  <span className="text-sm flex items-center text-green-500">
                                    <Check size={16} className="mr-1" />
                                    Correct
                                  </span>
                                ) : (
                                  <span className="text-sm flex items-center text-red-500">
                                    <X size={16} className="mr-1" />
                                    Incorrect
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          {question.options.map((option: string) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrectOption = question.correctAnswer === option;
                            
                            return (
                              <div 
                                key={option}
                                className={`p-3 rounded-lg flex items-center ${
                                  isSelected && isCorrectOption ? 'bg-green-500/20 border border-green-500/40' :
                                  isSelected && !isCorrectOption ? 'bg-red-500/20 border border-red-500/40' :
                                  isCorrectOption ? 'bg-green-500/10 border border-green-500/30' :
                                  'bg-secondary/30 border border-white/5'
                                }`}
                              >
                                <span>{option}</span>
                                {isSelected && isCorrectOption && (
                                  <Check size={18} className="ml-auto text-green-500" />
                                )}
                                {isSelected && !isCorrectOption && (
                                  <X size={18} className="ml-auto text-red-500" />
                                )}
                                {!isSelected && isCorrectOption && (
                                  <AlertCircle size={18} className="ml-auto text-green-500/70" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // Quiz in progress
  const currentQ = currentQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuiz.questions.length - 1;
  const isAnswered = Boolean(answers[currentQ.id]);
  const canSubmit = Object.keys(answers).length === currentQuiz.questions.length;
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Quiz navigation */}
            <div className="bg-secondary/50 border border-white/10 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{currentQuiz.title}</h2>
                <div>
                  <span className="text-sm bg-primary/20 px-3 py-1 rounded-full">
                    Question {currentQuestion + 1} of {currentQuiz.questions.length}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Question */}
            <div className="bg-secondary/50 border border-white/10 rounded-lg mb-8">
              <div className="p-6">
                <h3 className="text-xl font-medium mb-6">{currentQ.text}</h3>
                
                <div className="space-y-3">
                  {currentQ.options.map((option: string) => {
                    const isSelected = answers[currentQ.id] === option;
                    
                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(currentQ.id, option)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          isSelected 
                            ? 'border-primary bg-primary/20' 
                            : 'border-white/10 bg-secondary/30 hover:border-white/30'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t border-white/10 px-6 py-4 flex justify-between">
                <button 
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                
                <div>
                  {isLastQuestion && canSubmit ? (
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={submitQuiz}
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={goToNextQuestion}
                      disabled={!isAnswered}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Question navigation */}
            <div className="bg-secondary/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-sm font-medium mb-4">Question Navigator</h3>
              <div className="flex flex-wrap gap-2">
                {currentQuiz.questions.map((_: any, index: number) => {
                  const questionId = currentQuiz.questions[index].id;
                  const isAnsweredQuestion = Boolean(answers[questionId]);
                  const isCurrent = currentQuestion === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        isCurrent 
                          ? 'bg-primary text-white' 
                          : isAnsweredQuestion
                          ? 'bg-primary/30 text-white'
                          : 'bg-secondary/70 text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              {canSubmit && (
                <button 
                  className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  onClick={submitQuiz}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
