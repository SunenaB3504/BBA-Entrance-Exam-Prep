
import React, { useState, useEffect } from 'react';
import './EngStrategyHub.css';
import {
    missionBriefing,
    syllabusTopics,
    weightageData,
    playbookTabs,
    playbookContent
} from '../data/eng_strategy_data';

type MainTab = 'intel' | 'playbook' | 'simulator';
type PlaybookTab = 'rc' | 'vocab' | 'literary' | 'grammar';

const EngStrategyHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<MainTab>('intel');
    const [activePlaybookTab, setActivePlaybookTab] = useState<PlaybookTab>('rc');

    // Simulator State
    const [attempted, setAttempted] = useState(35);
    const [accuracy, setAccuracy] = useState(80);
    const [score, setScore] = useState(0);
    const [breakdown, setBreakdown] = useState({ correct: 0, incorrect: 0, cPoints: 0, iPoints: 0 });

    // Quiz State (Local to this session)
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

    useEffect(() => {
        const correctCount = Math.round(attempted * (accuracy / 100));
        const incorrectCount = attempted - correctCount;
        const finalScore = (correctCount * 5) - (incorrectCount * 1);
        setBreakdown({
            correct: correctCount,
            incorrect: incorrectCount,
            cPoints: correctCount * 5,
            iPoints: incorrectCount
        });
        setScore(finalScore);
    }, [attempted, accuracy]);

    const handleQuizAnswer = (tab: PlaybookTab, optionIndex: number) => {
        setQuizAnswers(prev => ({ ...prev, [tab]: optionIndex }));
    };

    const renderIntel = () => (
        <div className="eng-section">
            {/* Mission Briefing */}
            <div className="eng-section-header">
                <h3 className="eng-section-title"><span>📋</span> Mission Briefing</h3>
                <p style={{ marginTop: '0.5rem', color: '#475569' }}>
                    Exam fundamentals synthesized from Official Bulletins.
                </p>
            </div>

            <div className="eng-mission-grid">
                <div className="eng-mission-main">
                    <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                        Exam Structure & Rules
                    </div>
                    <div>
                        {missionBriefing.map((item, idx) => (
                            <div key={idx} className="eng-mission-item">
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                <div>
                                    <h5 style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</h5>
                                    <p style={{ fontSize: '0.875rem', color: '#475569' }}>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="eng-mission-sidebar">
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#e0e7ff' }}>Official Syllabus Topics</h4>
                    <ul className="eng-syllabus-list" style={{ listStyle: 'none', padding: 0 }}>
                        {syllabusTopics.map((topic, idx) => (
                            <li key={idx}><span style={{ color: '#34d399' }}>✓</span> {topic}</li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #4338ca', fontSize: '0.75rem', color: '#a5b4fc' }}>
                        Source: CUET-Eng-syllabus.pdf
                    </div>
                </div>
            </div>

            {/* Syllabus Analysis */}
            <div className="eng-mission-main" style={{ marginTop: '3rem', padding: '2rem' }}>
                <div className="grid md:grid-cols-2 gap-8 items-center" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h3 className="eng-section-title" style={{ fontSize: '1.25rem' }}><span>📊</span> Topic Weightage Analysis</h3>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {weightageData.map((item, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                                    <h5 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h5>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        {item.desc} <br />
                                        <span style={{ color: '#4f46e5', fontWeight: 500 }}>Strategy: {item.strategy}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748b', marginBottom: '1rem' }}>Estimated Distribution</h4>
                        {/* CSS Conic Gradient Chart */}
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            margin: '0 auto',
                            background: `conic-gradient(
                                #4F46E5 0% 30%, 
                                #10B981 30% 55%, 
                                #F59E0B 55% 80%, 
                                #6366F1 80% 100%
                            )`
                        }}></div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                            <span style={{ color: '#4F46E5' }}>● RC (30%)</span>
                            <span style={{ color: '#10B981' }}>● Vocab (25%)</span>
                            <span style={{ color: '#F59E0B' }}>● Ability (25%)</span>
                            <span style={{ color: '#6366F1' }}>● Grammar (20%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPlaybook = () => {
        const content = playbookContent[activePlaybookTab];
        const qAnswer = quizAnswers[activePlaybookTab];

        return (
            <div className="eng-section">
                <div className="eng-playbook-tabs">
                    {playbookTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`eng-pb-tab ${activePlaybookTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActivePlaybookTab(tab.id as PlaybookTab)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="eng-pb-content">
                    <div className="prose">
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{content.title}</h4>
                        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>{content.intro}</p>

                        {content.steps && (
                            <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', color: '#334155' }}>
                                {content.steps.map((step, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
                                ))}
                            </ul>
                        )}

                        {content.definitions && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                                {content.definitions.map((def, i) => (
                                    <div key={i} style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #e5e7eb', fontSize: '0.8rem' }}>
                                        <strong>{def.term}:</strong> {def.def} <br />
                                        <em style={{ color: '#64748b' }}>Ex: "{def.ex}"</em>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.exampleBox && (
                            <div className="eng-example-box">
                                <h5 style={{ fontWeight: 700, color: '#854d0e', fontSize: '0.875rem' }}>{content.exampleBox.title}</h5>
                                <p style={{ fontSize: '0.8rem', color: '#a16207', margin: '0.5rem 0' }}>{content.exampleBox.content}</p>
                                {content.exampleBox.strategy && (
                                    <p style={{ fontSize: '0.8rem', color: '#a16207' }}><strong>Strategy:</strong> {content.exampleBox.strategy}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="eng-quiz-card">
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>Sample Question</h4>
                        <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '1rem' }}>{content.sampleQuestion.question}</p>

                        <div>
                            {content.sampleQuestion.options.map((opt, i) => {
                                let btnClass = "eng-quiz-opt";
                                if (qAnswer !== undefined) {
                                    if (i === content.sampleQuestion.correct) btnClass += " correct";
                                    else if (i === qAnswer) btnClass += " wrong";
                                }

                                return (
                                    <button
                                        key={i}
                                        className={btnClass}
                                        onClick={() => handleQuizAnswer(activePlaybookTab, i)}
                                        disabled={qAnswer !== undefined}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        {qAnswer !== undefined && (
                            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: qAnswer === content.sampleQuestion.correct ? '#059669' : '#0f172a' }}>
                                {content.sampleQuestion.feedback}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderSimulator = () => (
        <div className="eng-section">
            <div className="eng-simulator-panel">
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span>🧮</span> Maximin Calculator
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginTop: '1rem', lineHeight: 1.6 }}>
                        The "Maximin" strategy involves Maximizing your score by Minimizing incorrect attempts.
                        With +5 for correct and -1 for incorrect, guessing is risky.
                    </p>

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="eng-sim-input-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
                                <label>Questions Attempted</label>
                                <span>{attempted} / 40</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="40"
                                value={attempted}
                                onChange={(e) => setAttempted(parseInt(e.target.value))}
                                className="eng-sim-slider"
                            />
                        </div>
                        <div className="eng-sim-input-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
                                <label>Accuracy</label>
                                <span>{accuracy}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={accuracy}
                                onChange={(e) => setAccuracy(parseInt(e.target.value))}
                                className="eng-sim-slider"
                            />
                        </div>
                    </div>
                </div>

                <div className="eng-score-display">
                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Predicted Score</h4>
                    <div className="eng-score-text" style={{ color: score > 180 ? '#34d399' : score > 140 ? '#facc15' : '#f87171' }}>
                        {score}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>out of 200</div>

                    <div className="eng-score-breakdown">
                        <div className="eng-breakdown-row">
                            <span style={{ color: '#94a3b8' }}>Correct (+5):</span>
                            <span style={{ color: '#34d399', fontWeight: 'bold' }}>+{breakdown.cPoints} ({breakdown.correct})</span>
                        </div>
                        <div className="eng-breakdown-row">
                            <span style={{ color: '#94a3b8' }}>Incorrect (-1):</span>
                            <span style={{ color: '#f87171', fontWeight: 'bold' }}>-{breakdown.iPoints} ({breakdown.incorrect})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="eng-hub-container">
            <header className="eng-hero">
                <div>
                    <div className="eng-hero-badge">Updated for 2026 Cycle</div>
                    <h2 className="eng-title">Master the <span style={{ color: '#4f46e5' }}>Art of Attempting</span></h2>
                    <p className="eng-subtitle">Comprehensive Maximin Strategy Guide for CUET (UG) English.</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className="eng-nav-btn active"
                            style={{ background: '#4f46e5', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}
                            onClick={() => setActiveTab('playbook')}
                        >
                            Start Learning
                        </button>
                    </div>
                </div>
                <div className="eng-hero-stats-grid">
                    <div className="eng-stat-card">
                        <div className="eng-stat-value" style={{ color: '#4f46e5' }}>200</div>
                        <div className="eng-stat-label">Max Marks</div>
                    </div>
                    <div className="eng-stat-card">
                        <div className="eng-stat-value" style={{ color: '#4f46e5' }}>45</div>
                        <div className="eng-stat-label">Minutes</div>
                    </div>
                    <div className="eng-stat-card">
                        <div className="eng-stat-value" style={{ color: '#4f46e5' }}>40</div>
                        <div className="eng-stat-label">To Attempt</div>
                    </div>
                    <div className="eng-stat-card">
                        <div className="eng-stat-value" style={{ color: '#10b981' }}>+5 / -1</div>
                        <div className="eng-stat-label">Marking</div>
                    </div>
                </div>
            </header>

            <nav className="eng-nav">
                <button
                    className={`eng-nav-btn ${activeTab === 'intel' ? 'active' : ''}`}
                    onClick={() => setActiveTab('intel')}
                >
                    Exam Intel
                </button>
                <button
                    className={`eng-nav-btn ${activeTab === 'playbook' ? 'active' : ''}`}
                    onClick={() => setActiveTab('playbook')}
                >
                    Tactical Playbook
                </button>
                <button
                    className={`eng-nav-btn ${activeTab === 'simulator' ? 'active' : ''}`}
                    onClick={() => setActiveTab('simulator')}
                >
                    Score Simulator
                </button>
            </nav>

            {activeTab === 'intel' && renderIntel()}
            {activeTab === 'playbook' && renderPlaybook()}
            {activeTab === 'simulator' && renderSimulator()}
        </div>
    );
};

export default EngStrategyHub;
