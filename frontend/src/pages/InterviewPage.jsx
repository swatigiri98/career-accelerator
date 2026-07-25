import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2, CheckCircle2, AlertTriangle } from "lucide-react";
import { startInterviewRequest, submitAnswerRequest } from "../services/interviewService.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

const SPEECH_RECOGNITION_SUPPORTED =
  typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

function InterviewPage() {
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!SPEECH_RECOGNITION_SUPPORTED) return;
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswerText(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const handleStart = async () => {
    setError("");
    setStarting(true);
    try {
      const res = await startInterviewRequest();
      setSession(res.data.session);
      setCurrentIndex(0);
      setAnswerText("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not start an interview - upload a resume first.");
    } finally {
      setStarting(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setAnswerText("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const readQuestionAloud = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const currentQuestion = session?.questions[currentIndex];

  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) {
      setError("Give an answer (typed or spoken) before submitting.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await submitAnswerRequest(session._id, currentQuestion._id, answerText);
      setSession(res.data.session);
      setAnswerText("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not score that answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, session.questions.length - 1));
    setAnswerText("");
  };

  if (!session) {
    return (
      <div>
        <h1 className="mb-1 text-2xl font-bold text-paper-900 dark:text-ink-50">AI Mock Interview</h1>
        <p className="mb-8 text-sm text-paper-600 dark:text-ink-200">
          Questions are generated from your resume's specific gaps - not a generic question bank.
        </p>

        {error && <Card className="mb-6 p-4 text-sm text-signal-red">{error}</Card>}

        <Card className="p-8 text-center">
          <p className="mb-4 text-paper-900 dark:text-ink-50">
            Ready for a 5-question mock interview based on your latest resume?
          </p>
          <Button onClick={handleStart} disabled={starting}>
            {starting ? "Preparing questions..." : "Start Mock Interview"}
          </Button>
        </Card>
      </div>
    );
  }

  const answeredQuestion = currentQuestion.score !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-paper-900 dark:text-ink-50">Mock Interview</h1>
        <span className="font-mono text-sm text-paper-600 dark:text-ink-200">
          Question {currentIndex + 1} of {session.questions.length}
        </span>
      </div>

      {error && <Card className="mb-6 p-4 text-sm text-signal-red">{error}</Card>}

      <Card className="mb-6 p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="text-base font-medium leading-relaxed text-paper-900 dark:text-ink-50">
            {currentQuestion.question}
          </p>
          <button
            onClick={() => readQuestionAloud(currentQuestion.question)}
            aria-label="Read question aloud"
            className="flex-shrink-0 rounded-full p-2 text-paper-600 hover:bg-paper-200/60 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        {!answeredQuestion ? (
          <>
            <textarea
              rows={4}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder={
                SPEECH_RECOGNITION_SUPPORTED
                  ? "Type your answer, or use the microphone below to speak it"
                  : "Type your answer (voice input isn't supported in this browser - Chrome works best)"
              }
              className="mb-3 w-full rounded-lg border border-paper-200 bg-paper-0 px-3 py-2.5 text-sm text-paper-900 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-50"
            />

            <div className="flex flex-wrap items-center gap-3">
              {SPEECH_RECOGNITION_SUPPORTED && (
                <Button variant="secondary" onClick={toggleListening} type="button">
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isListening ? "Stop recording" : "Speak your answer"}
                </Button>
              )}
              <Button onClick={handleSubmitAnswer} disabled={submitting}>
                {submitting ? "Scoring..." : "Submit Answer"}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-signal-green" />
              <span className="font-mono text-lg font-semibold text-paper-900 dark:text-ink-50">
                {currentQuestion.score}/10
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-paper-600 dark:text-ink-200">
              {currentQuestion.feedback}
            </p>
            {currentIndex < session.questions.length - 1 ? (
              <Button onClick={goToNext}>Next Question</Button>
            ) : (
              <p className="flex items-center gap-2 text-sm font-medium text-signal-green">
                <CheckCircle2 className="h-4 w-4" /> Interview complete - average score:{" "}
                {session.averageScore?.toFixed(1)}/10
              </p>
            )}
          </div>
        )}
      </Card>

      {!SPEECH_RECOGNITION_SUPPORTED && (
        <p className="flex items-center gap-2 text-xs text-paper-600 dark:text-ink-200">
          <AlertTriangle className="h-3.5 w-3.5" /> Voice input isn't supported in this browser. Try Chrome for
          the full voice experience.
        </p>
      )}
    </div>
  );
}

export default InterviewPage;
