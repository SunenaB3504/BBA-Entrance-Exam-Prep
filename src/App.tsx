import { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import questionsData from './data/questions.json';

interface Question {
  id: number;
  text: string;
  options: string[];
  isFigure: boolean;
  correctAnswerIndex?: number;
  explanation?: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mode, setMode] = useState<'exam' | 'study'>('exam');
  const [category, setCategory] = useState<'all' | 'visual'>('all');

  useEffect(() => {
    // Filter questions - allow all questions in the dataset
    const validQuestions = questionsData;
    setQuestions(validQuestions);
  }, []);

  // Filter questions based on category
  const displayedQuestions = questions.filter(q => {
    if (category === 'visual') return q.isFigure;
    return true;
  });

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted && mode === 'exam') return;

    // In study mode, allow selecting once per question logic is handled in Card, but state updates here
    const questionId = displayedQuestions[currentQuestionIndex].id;

    // If not already answered or if we want to allow changing in exam mode before submit
    // In Study mode, usually we lock it after first attempt to show explanation.
    if (mode === 'study' && userAnswers[questionId] !== undefined) return;

    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      const correctIndex = q.correctAnswerIndex ?? 0;

      if (userAnswer === undefined) {
        unattempted++;
      } else if (userAnswer === correctIndex) {
        score += 5;
        correct++;
      } else {
        score -= 1;
        wrong++;
      }
    });
    return { score, correct, wrong, unattempted };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const resetTest = () => {
    setIsSubmitted(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  };

  if (questions.length === 0 || displayedQuestions.length === 0) return <div>Loading...</div>;

  const currentQuestion = displayedQuestions[currentQuestionIndex];
  const { score, correct, wrong, unattempted } = calculateScore();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>CUET GAT 2024</h1>
        </div>

        <div className="header-controls">
          <div className="control-group">
            <span className="group-label">Mode:</span>
            <div className="mode-toggle">
              <button
                className={`toggle-btn ${mode === 'exam' ? 'active' : ''}`}
                onClick={() => { setMode('exam'); resetTest(); }}
              >
                Exam
              </button>
              <button
                className={`toggle-btn ${mode === 'study' ? 'active' : ''}`}
                onClick={() => { setMode('study'); resetTest(); }}
              >
                Study
              </button>
            </div>
          </div>

          <div className="control-group">
            <span className="group-label">Filter:</span>
            <div className="mode-toggle">
              <button
                className={`toggle-btn ${category === 'all' ? 'active' : ''}`}
                onClick={() => { setCategory('all'); setCurrentQuestionIndex(0); }}
              >
                All
              </button>
              <button
                className={`toggle-btn ${category === 'visual' ? 'active' : ''}`}
                onClick={() => { setCategory('visual'); setCurrentQuestionIndex(0); }}
              >
                Visual
              </button>
            </div>
          </div>

          {(isSubmitted || mode === 'study') && (
            <div className="score-badge">
              {mode === 'study' ? 'Study Mode' : `Score: ${score}`}
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        {!isSubmitted ? (
          <>
            <div className="progress-bar">
              Question {currentQuestionIndex + 1} of {displayedQuestions.length} ({category === 'visual' ? 'Visual Only' : 'Full Test'})
            </div>
            <QuestionCard
              question={currentQuestion}
              selectedOption={userAnswers[currentQuestion.id] ?? null}
              onSelect={handleSelectOption}
              mode={mode}
            />

            <div className="navigation-buttons">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              >
                Previous
              </button>

              {currentQuestionIndex < displayedQuestions.length - 1 ? (
                <button
                  className="primary-button"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                >
                  Next
                </button>
              ) : (
                mode === 'exam' && (
                  <button
                    className="submit-button"
                    onClick={handleSubmit}
                  >
                    Submit Test
                  </button>
                )
              )}
            </div>

            <div className="question-palette">
              {displayedQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  className={`palette-item ${currentQuestionIndex === idx ? 'active' : ''} ${userAnswers[q.id] !== undefined ? 'answered' : ''}`}
                  onClick={() => setCurrentQuestionIndex(idx)}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="results-container">
            <h2>Test Results</h2>
            <div className="score-summary">
              <div className="score-card">
                <h3>Total Score</h3>
                <p className="score-value">{score}</p>
              </div>
              <div className="stats-grid">
                <div className="stat-item correct">
                  <span>Correct (+5)</span>
                  <strong>{correct}</strong>
                </div>
                <div className="stat-item wrong">
                  <span>Wrong (-1)</span>
                  <strong>{wrong}</strong>
                </div>
                <div className="stat-item unattempted">
                  <span>Unattempted (0)</span>
                  <strong>{unattempted}</strong>
                </div>
              </div>
            </div>
            <button className="primary-button" onClick={resetTest}>Take Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
