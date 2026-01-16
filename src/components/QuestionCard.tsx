import React, { useState } from 'react';

interface Question {
    id: number;
    text: string;
    options: string[];
    isFigure: boolean;
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
                    <div className="explanation-content">
                        {question.explanation?.split('\n').map((line, i) => {
                            // Check for bold notation **text**
                            const parseBold = (text: string) => {
                                const parts = text.split(/(\*\*.*?\*\*)/g);
                                return parts.map((part, index) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={index}>{part.slice(2, -2)}</strong>;
                                    }
                                    return part;
                                });
                            };

                            // Bullet points
                            if (line.trim().startsWith('- ')) {
                                return (
                                    <div key={i} className="explanation-step bullet">
                                        <span className="bullet-point">•</span>
                                        <span>{parseBold(line.trim().substring(2))}</span>
                                    </div>
                                );
                            }

                            // Numbered lists (e.g., "1. ")
                            if (/^\d+\.\s/.test(line.trim())) {
                                return (
                                    <div key={i} className="explanation-step numbered">
                                        {parseBold(line)}
                                    </div>
                                );
                            }

                            // Empty lines
                            if (!line.trim()) {
                                return <div key={i} className="explanation-spacer"></div>;
                            }

                            // Standard text
                            return <div key={i} className="explanation-text">{parseBold(line)}</div>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
