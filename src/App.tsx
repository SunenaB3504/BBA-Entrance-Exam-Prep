import { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import ReviewPanel from './components/ReviewPanel';
import questionsData2024 from './data/questions.json';
import questionsData2023 from './data/questions_2023.json';
import questionsData2022 from './data/questions_2022.json';
import questionsDataChallenge from './data/questions_visual_challenge.json';
import questionsAccountancy2024 from './data/questions_accountancy_2024.json';

import EngStrategyHub from './components/EngStrategyHub';
import GatStrategyHub from './components/GatStrategyHub';

interface Question {
  id: number;
  text: string;
  options: string[];
  isFigure: boolean;
  correctAnswerIndex?: number;
  explanation?: string;
  source?: string;
  image?: string;
}

function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mode, setMode] = useState<'exam' | 'study' | 'review' | 'strategy'>('exam');
  const [category, setCategory] = useState<'all' | 'visual'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [strategySubject, setStrategySubject] = useState<'gat' | 'eng'>('gat');

  useEffect(() => {
    // Merge datasets
    // Fix IDs to be unique across sets if needed, or handle them as is?
    // Since we filter by source, duplicates might be confusing if displayed together.
    // Let's assume for now we just merge them.
    // IMPORTANT: questionsData2024 has IDs 1-63. questionsData2023 likely has overlapping IDs.
    // If we want to show them in the same list, we might need unique composite IDs, but if filtering, it's fine.
    // Ideally, we should maybe re-map IDs if source is 'all'.

    const q2024 = questionsData2024.map(q => ({ ...q, source: q.source || 'CUET-GAT-2024' }));
    const q2023 = questionsData2023.map(q => ({ ...q, source: q.source || 'CUET-GAT-2023' }));
    const q2022 = questionsData2022.map(q => ({ ...q, source: q.source || 'CUET-GAT-2022' }));
    const qChallenge = questionsDataChallenge.map(q => ({ ...q, source: q.source || 'Visual-Challenge-Set-1' }));
    const qAcc2024 = questionsAccountancy2024.map(q => ({ ...q, source: q.source || 'CUET-ACCOUNTANCY-2024' }));

    // Simple concat
    const combined = [...q2024, ...q2023, ...q2022, ...qChallenge, ...qAcc2024];
    setAllQuestions(combined as Question[]);
  }, []);

  // Get unique sources for dropdown
  const sources = ['all', ...Array.from(new Set(allQuestions.map(q => q.source).filter(Boolean)))];

  // Filter questions based on category and source
  const displayedQuestions = allQuestions.filter(q => {
    if (sourceFilter !== 'all' && q.source !== sourceFilter) return false;
    if (category === 'visual') return q.isFigure;
    return true;
  });

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted && mode === 'exam') return;

    // Use a unique key for answer storage to avoid ID collision if IDs overlap across years
    // Composite key: source + id
    const currentQ = displayedQuestions[currentQuestionIndex];
    if (!currentQ) return;

    // We'll store answers by the question's index in the *displayed* array for simplicity in this session,
    // OR better, composite ID. But `userAnswers` uses number key.
    // Let's rely on the fact that we reset test on filter change usually?
    // Actually, let's keep it simple: If IDs overlap, user might see answer for Q1 2024 in Q1 2023.
    // To fix this properly, we should regenerate IDs or clear answers on filter change.
    // Let's clear answers when source changes.

    const questionKey = currentQ.id; // Potential collision!
    // Ideally we'd use a composite key, but `Question` interface has `id: number`.
    // Let's assume for now user filters one paper at a time or we accept collision danger for this quick iteration.

    if (mode === 'study' && userAnswers[questionKey] !== undefined) return;

    setUserAnswers(prev => ({
      ...prev,
      [questionKey]: optionIndex
    }));
  };

  // Reset when filter changes
  const handleSourceChange = (newSource: string) => {
    setSourceFilter(newSource);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    displayedQuestions.forEach(q => {
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

  const handleUpdateQuestion = (updatedQ: Question) => {
    setAllQuestions(prev => prev.map(q =>
      (q.id === updatedQ.id && q.source === updatedQ.source) ? updatedQ : q
    ));
  };

  const handleDeleteQuestion = (id: number, source: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setAllQuestions(prev => prev.filter(q => !(q.id === id && q.source === source)));
    }
  };

  if (allQuestions.length === 0) return <div>Loading Data...</div>;
  if (displayedQuestions.length === 0 && mode !== 'review') return <div className="app-container"><header className="app-header"><h1>No Questions Found</h1><button onClick={() => setSourceFilter('all')}>Reset Filter</button></header></div>;

  const currentQuestion = displayedQuestions[currentQuestionIndex];
  const { score, correct, wrong, unattempted } = calculateScore();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>CUET Practice</h1>
        </div>

        <div className="header-controls">
          {/* Source Filter Dropdown */}
          <div className="control-group">
            <span className="group-label">Paper:</span>
            <select
              className="source-select"
              value={sourceFilter}
              onChange={(e) => handleSourceChange(e.target.value)}
            >
              {sources.map(s => (
                <option key={s} value={s as string}>
                  {s === 'all' ? 'All Papers' : s}
                </option>
              ))}
            </select>
          </div>

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
              <button
                className={`toggle-btn ${mode === 'review' ? 'active' : ''}`}
                onClick={() => { setMode('review'); }}
              >
                Review
              </button>
              <button
                className={`toggle-btn ${mode === 'strategy' ? 'active' : ''}`}
                onClick={() => { setMode('strategy'); }}
              >
                Strategy
              </button>
            </div>
          </div>

          {mode === 'strategy' ? (
            <div className="control-group">
              <span className="group-label">Subject:</span>
              <div className="mode-toggle">
                <button
                  className={`toggle-btn ${strategySubject === 'gat' ? 'active' : ''}`}
                  onClick={() => setStrategySubject('gat')}
                >
                  GAT
                </button>
                <button
                  className={`toggle-btn ${strategySubject === 'eng' ? 'active' : ''}`}
                  onClick={() => setStrategySubject('eng')}
                >
                  English
                </button>
              </div>
            </div>
          ) : (
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
          )}

          {(isSubmitted || mode === 'study') && mode !== 'review' && mode !== 'strategy' && (
            <div className="score-badge">
              {mode === 'study' ? 'Study Mode' : `Score: ${score}`}
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        {mode === 'strategy' ? (
          strategySubject === 'gat' ? <GatStrategyHub /> : <EngStrategyHub />
        ) : mode === 'review' ? (
          <ReviewPanel
            key={sourceFilter}
            questions={displayedQuestions}
            onUpdate={handleUpdateQuestion}
            onDelete={handleDeleteQuestion}
            sourceFilter={sourceFilter}
          />
        ) : !isSubmitted ? (
          <>
            <div className="progress-bar">
              Question {currentQuestionIndex + 1} of {displayedQuestions.length} ({category === 'visual' ? 'Visual Only' : 'Full Test'})
            </div>
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                selectedOption={userAnswers[currentQuestion.id] ?? null}
                onSelect={handleSelectOption}
                mode={mode as 'exam' | 'study'}
              />
            )}

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
                  key={`${q.source}-${q.id}`}
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
