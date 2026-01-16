import React, { useState } from 'react';

interface Question {
    id: number;
    text: string;
    options: string[];
    isFigure: boolean;
    correctAnswerIndex?: number;
    explanation?: string;
}

interface QuestionCardProps {
    question: Question;
    selectedOption: number | null;
    onSelect: (optionIndex: number) => void;
    mode: 'exam' | 'study';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelect, mode }) => {
    const [showExplanation, setShowExplanation] = useState(false);

    // Reset local state when question changes
    React.useEffect(() => {
        setShowExplanation(false);
    }, [question.id]);

    const handleOptionClick = (index: number) => {
        onSelect(index);
        if (mode === 'study') {
            setShowExplanation(true);
        }
    };

    const getOptionClass = (index: number) => {
        let baseClass = "option-button";

        if (selectedOption === index) {
            baseClass += " selected";
        }

        if (mode === 'study' && showExplanation) {
            if (index === question.correctAnswerIndex) {
                baseClass += " correct";
            } else if (selectedOption === index && index !== question.correctAnswerIndex) {
                baseClass += " incorrect";
            }
        }

        return baseClass;
    };

    return (
        <div className="question-card">
            <div className="question-header">
                <span className="question-number">Q{question.id}</span>
                {mode === 'study' && <span className="mode-badge">Study Mode</span>}
            </div>
            <p className="question-text">{question.text}</p>

            {question.isFigure && (
                <div className="question-image-container">
                    <img
                        src={`/assets/q${question.id}.svg?v=${Date.now()}`}
                        alt={`Question ${question.id} Figure`}
                        className="question-image"
                        onError={(e) => {
                            // Fallback if image not found (since we only generated a few)
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <div className="options-container">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={getOptionClass(index)}
                        onClick={() => handleOptionClick(index)}
                        disabled={mode === 'study' && showExplanation}
                    >
                        <span className="option-label">({index + 1})</span>
                        <span className="option-content">{option}</span>
                        {mode === 'study' && showExplanation && index === question.correctAnswerIndex && (
                            <span className="icon-check">✓</span>
                        )}
                        {mode === 'study' && showExplanation && selectedOption === index && index !== question.correctAnswerIndex && (
                            <span className="icon-cross">✗</span>
                        )}
                    </button>
                ))}
            </div>

            {mode === 'study' && showExplanation && (
                <div className="explanation-card">
                    <h3>Explanation</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>{question.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
