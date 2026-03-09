import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Question {
    id: number;
    text: string;
    options: string[];
    isFigure: boolean;
    image?: string;
    correctAnswerIndex?: number;
    explanation?: string;
    source?: string;
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span className="question-number">Q{question.id}</span>
                        {question.source && (
                            <span className="source-badge">
                                📄 {question.source}
                            </span>
                        )}
                    </div>
                    {mode === 'study' && <span className="mode-badge">Study Mode</span>}
                </div>
            </div>

            <div className="question-text markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {question.text}
                </ReactMarkdown>
            </div>

            {question.isFigure && (
                <div className="question-image-container">
                    <img
                        src={question.image ? `${question.image}?v=${Date.now()}` : `/assets/q${question.id}.svg?v=${Date.now()}`}
                        alt={`Question ${question.id} Figure`}
                        className="question-image"
                        onError={(e) => {
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
                        <div className="option-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {option}
                            </ReactMarkdown>
                        </div>
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
                    <div className="explanation-content markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {question.explanation || "Detailed explanation coming soon."}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
