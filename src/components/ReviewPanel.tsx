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

interface ReviewPanelProps {
    questions: Question[];
    onUpdate: (updatedQuestion: Question) => void;
    onDelete: (id: number, source: string) => void;
    sourceFilter: string;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ questions, onUpdate, onDelete, sourceFilter }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Question | null>(null);

    const handleEditClick = (q: Question) => {
        setEditingId(q.id);
        setEditForm({ ...q });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const handleSave = () => {
        if (editForm) {
            onUpdate(editForm);
            setEditingId(null);
            setEditForm(null);
        }
    };

    const handleExport = () => {
        // Export only the currently viewed set (filtered by source if applicable, or all)
        // If 'all' is selected, we should probably warn or export all.
        // Ideally, the user selects a specific paper to export so they can overwrite the file.

        const dataStr = JSON.stringify(questions, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `updated_questions_${sourceFilter === 'all' ? 'combined' : sourceFilter}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="review-panel">
            <div className="review-header">
                <h2>Review Questions ({questions.length})</h2>
                <div className="review-actions">
                    <button className="export-btn" onClick={handleExport}>
                        Export JSON
                    </button>
                </div>
            </div>

            <div className="questions-list">
                {questions.map((q) => (
                    <div key={`${q.source}-${q.id}`} className={`question-review-item ${editingId === q.id ? 'editing' : ''}`}>
                        {editingId === q.id && editForm ? (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>ID:</label>
                                    <input type="number" value={editForm.id} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Text:</label>
                                    <textarea
                                        value={editForm.text}
                                        onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Is Figure?</label>
                                    <input
                                        type="checkbox"
                                        checked={editForm.isFigure}
                                        onChange={(e) => setEditForm({ ...editForm, isFigure: e.target.checked })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Options:</label>
                                    {editForm.options.map((opt, idx) => (
                                        <div key={idx} className="option-input">
                                            <span>{idx + 1}.</span>
                                            <input
                                                value={opt}
                                                onChange={(e) => {
                                                    const newOpts = [...editForm.options];
                                                    newOpts[idx] = e.target.value;
                                                    setEditForm({ ...editForm, options: newOpts });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="form-group">
                                    <label>Correct Answer Index (0-3):</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="3"
                                        value={editForm.correctAnswerIndex ?? 0}
                                        onChange={(e) => setEditForm({ ...editForm, correctAnswerIndex: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Explanation:</label>
                                    <textarea
                                        value={editForm.explanation || ''}
                                        onChange={(e) => setEditForm({ ...editForm, explanation: e.target.value })}
                                    />
                                </div>

                                <div className="form-actions">
                                    <button className="save-btn" onClick={handleSave}>Save</button>
                                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="view-mode">
                                <div className="q-header">
                                    <span className="q-id">#{q.id}</span>
                                    <span className="q-source">[{q.source}]</span>
                                    <div className="q-actions">
                                        <button onClick={() => handleEditClick(q)}>Edit</button>
                                        <button className="delete-btn" onClick={() => onDelete(q.id, q.source || '')}>Delete</button>
                                    </div>
                                </div>
                                <p className="q-text">{q.text}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPanel;
