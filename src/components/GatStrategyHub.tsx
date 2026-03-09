
import React, { useState } from 'react';
import './GatStrategyHub.css';
import { syllabusData, techniquesData, practiceQuizData } from '../data/gat_strategy_data';

type Tab = 'syllabus' | 'techniques' | 'practice' | 'analysis';

const GatStrategyHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('syllabus');
    const [activeTechnique, setActiveTechnique] = useState<string>(syllabusData[0].topics[0].id);

    // Quiz State
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [sessionAnswers, setSessionAnswers] = useState<Record<number, boolean>>({}); // Track if answered

    const handleTabChange = (tab: Tab) => setActiveTab(tab);

    // Quiz Logic
    const handleAnswer = (optionIndex: number) => {
        if (showFeedback) return; // Prevent double clicking

        const currentQ = practiceQuizData[currentQuizIndex];
        const correct = currentQ.correct === optionIndex;

        setIsCorrect(correct);
        setShowFeedback(true);

        // Update score only if not already answered
        if (sessionAnswers[currentQuizIndex] === undefined) {
            setScore(prev => ({
                correct: prev.correct + (correct ? 1 : 0),
                wrong: prev.wrong + (!correct ? 1 : 0)
            }));
            setSessionAnswers(prev => ({ ...prev, [currentQuizIndex]: correct }));
        }
    };

    const nextQuestion = () => {
        setShowFeedback(false);
        if (currentQuizIndex < practiceQuizData.length - 1) {
            setCurrentQuizIndex(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        setShowFeedback(false);
        if (currentQuizIndex > 0) {
            setCurrentQuizIndex(prev => prev - 1);
        }
    };

    const renderSyllabus = () => (
        <div className="view-section">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="card-title" style={{ fontSize: '1.5rem' }}>Syllabus Decoder</h2>
                <p style={{ color: '#475569' }}>Explore the five core pillars of the General Test syllabus.</p>
            </div>
            <div className="syllabus-grid">
                {syllabusData.map((item) => (
                    <div key={item.id} className="syllabus-card">
                        <span className="card-icon">{item.icon}</span>
                        <h3 className="card-title">{item.title}</h3>
                        <ul className="card-list">
                            {item.topics.map((t) => (
                                <li key={t.id}>
                                    <span className="bullet">•</span>
                                    <span>
                                        <strong>{t.label}</strong>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>{t.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="pro-tip">
                            <strong>Pro Tip:</strong> {item.tip}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTechniques = () => {
        const data = techniquesData[activeTechnique];
        const activeCategory = syllabusData.find(cat => cat.topics.some(t => t.id === activeTechnique))?.id;

        return (
            <div className="view-section techniques-layout">
                <div className="tech-nav">
                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', fontWeight: 700 }}>Strategy Syllabus</h3>

                    {syllabusData.map((category) => (
                        <div key={category.id} style={{ marginBottom: '1rem' }}>
                            <div
                                style={{
                                    padding: '0.5rem',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    color: '#1e293b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: activeCategory === category.id ? '#f1f5f9' : 'transparent',
                                    borderRadius: '0.375rem'
                                }}
                            >
                                <span>{category.icon}</span>
                                <span>{category.title.split('(')[0]}</span>
                            </div>
                            <div style={{ paddingLeft: '0.5rem', marginTop: '0.25rem', borderLeft: '2px solid #e2e8f0', marginLeft: '0.8rem' }}>
                                {category.topics.map(topic => (
                                    <button
                                        key={topic.id}
                                        className={`tech-btn ${activeTechnique === topic.id ? 'active' : ''}`}
                                        onClick={() => setActiveTechnique(topic.id)}
                                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                                    >
                                        {topic.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tech-content">
                    {data ? (
                        <>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{data.title}</h3>
                            <p style={{ color: '#475569', marginBottom: '2rem', paddingLeft: '1rem', borderLeft: '4px solid #6366f1' }}>
                                {data.desc}
                            </p>
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>⚡ Core Technique</h4>
                                {data.steps.map((step, i) => (
                                    <div key={i} className="step-box">{step}</div>
                                ))}
                            </div>
                            <div className="example-box">
                                <h4 style={{ color: '#065f46', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Real Example Analysis</h4>
                                <p style={{ color: '#064e3b', fontWeight: 500 }}>{data.example}</p>
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                            <p>Select a topic from the menu to view its solving technique.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderPractice = () => {
        const q = practiceQuizData[currentQuizIndex];
        return (
            <div className="view-section quiz-layout">
                <div className="quiz-card">
                    <div className="quiz-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="quiz-topic-tag">{q.topic}</span>
                            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>Question {currentQuizIndex + 1} of {practiceQuizData.length}</span>
                        </div>

                        <h3 className="quiz-question">{q.question}</h3>

                        <div>
                            {q.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className="quiz-option"
                                    onClick={() => handleAnswer(i)}
                                    disabled={showFeedback}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + i)}.</span>
                                    <span>{opt}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quiz-footer">
                        <button
                            className="nav-btn"
                            style={{ color: '#4f46e5', border: 'none', background: 'none' }}
                            onClick={() => { setShowFeedback(true); setIsCorrect(false); }} // Reveal as neutral/incorrect context
                        >
                            Show Solution
                        </button>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="nav-btn" onClick={prevQuestion} disabled={currentQuizIndex === 0}>Previous</button>
                            <button className="nav-btn btn-primary" onClick={nextQuestion} disabled={currentQuizIndex === practiceQuizData.length - 1}>Next</button>
                        </div>
                    </div>

                    {showFeedback && (
                        <div className="feedback-overlay">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{isCorrect ? '✅' : '📝'}</div>
                            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: isCorrect ? '#059669' : '#1e293b' }}>
                                {isCorrect ? 'Correct!' : 'Solution'}
                            </h4>
                            <p style={{ maxWidth: '24rem', color: '#475569', marginBottom: '1.5rem' }}>{q.explanation}</p>
                            <button className="nav-btn btn-primary" onClick={() => setShowFeedback(false)}>Dismiss</button>
                        </div>
                    )}
                </div>

                <div>
                    <div className="stats-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Session Progress</h3>
                        <div className="stat-row">
                            <span style={{ color: '#64748b' }}>Correct</span>
                            <span style={{ fontWeight: 700, color: '#059669' }}>{score.correct}</span>
                        </div>
                        <div className="stat-row">
                            <span style={{ color: '#64748b' }}>Incorrect</span>
                            <span style={{ fontWeight: 700, color: '#e11d48' }}>{score.wrong}</span>
                        </div>
                        <div className="simple-chart-container">
                            <div className="bar-group">
                                <div className="bar-label">Accuracy</div>
                                <div className="bar-bg">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${(score.correct + score.wrong) === 0 ? 0 : Math.round((score.correct / (score.correct + score.wrong)) * 100)}%`,
                                            backgroundColor: '#4f46e5'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAnalysis = () => (
        <div className="view-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="syllabus-card" style={{ textAlign: 'center' }}>
                <h3 className="card-title">Topic Weightage (Estimated)</h3>
                <div style={{ margin: '2rem 0' }}>
                    <div className="donut-chart">
                        <div className="donut-hole"></div>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item"><div className="color-box" style={{ background: '#a5b4fc' }}></div> GK (25%)</div>
                        <div className="legend-item"><div className="color-box" style={{ background: '#4f46e5' }}></div> Quant (35%)</div>
                        <div className="legend-item"><div className="color-box" style={{ background: '#10b981' }}></div> Logic (30%)</div>
                        <div className="legend-item"><div className="color-box" style={{ background: '#fcd34d' }}></div> Current (10%)</div>
                    </div>
                </div>
                <p className="pro-tip">Estimates based on 2022-2024 papers.</p>
            </div>
            <div className="syllabus-card">
                <h3 className="card-title">Key Observations</h3>
                <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ background: '#e0e7ff', color: '#4338ca', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Heavy Emphasis on Logic</strong>
                            <span style={{ fontSize: '0.875rem', color: '#475569' }}>Coding-decoding and ranking require speed, not complex math.</span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ background: '#d1fae5', color: '#047857', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Basic but Tricky Quant</strong>
                            <span style={{ fontSize: '0.875rem', color: '#475569' }}>Formulas for Surface Area/Volume are essential. Watch out for percentage changes.</span>
                        </div>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ background: '#fef3c7', color: '#b45309', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                        <div>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Visual Reasoning</strong>
                            <span style={{ fontSize: '0.875rem', color: '#475569' }}>Master the elimination technique for Mirror/Water images.</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="hub-container">
            <div className="hub-header">
                <h1 className="hub-title">General Test (501) Strategy Hub</h1>
                <p className="hub-subtitle">
                    Comprehensive breakdown of the CUET UG General Test syllabus, featuring analysis of 2022-2024 papers.
                </p>
                <div className="hub-badges">
                    <span className="hub-badge badge-indigo">50 Questions</span>
                    <span className="hub-badge badge-emerald">All Compulsory</span>
                    <span className="hub-badge badge-amber">60 Minutes</span>
                    <span className="hub-badge badge-rose">+5 / -1 Marking</span>
                </div>
            </div>

            <div className="hub-tabs">
                <button className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`} onClick={() => handleTabChange('syllabus')}>Syllabus Map</button>
                <button className={`tab-btn ${activeTab === 'techniques' ? 'active' : ''}`} onClick={() => handleTabChange('techniques')}>Techniques</button>
                <button className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => handleTabChange('practice')}>Practice Quiz</button>
                <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => handleTabChange('analysis')}>Analysis</button>
            </div>

            <div className="view-container">
                {activeTab === 'syllabus' && renderSyllabus()}
                {activeTab === 'techniques' && renderTechniques()}
                {activeTab === 'practice' && renderPractice()}
                {activeTab === 'analysis' && renderAnalysis()}
            </div>
        </div>
    );
};

export default GatStrategyHub;
