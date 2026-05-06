import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameStateContext';
import './EduPage.css';

const EduPage = () => {
    const { type } = useParams(); // 'adware' or 'fileless'
    const navigate = useNavigate();
    const { setHasSeenAdwareEdu, setHasSeenFilelessEdu } = useGameState();

    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [quizActive, setQuizActive] = useState(false);
    const [quizPassed, setQuizPassed] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        let timer;
        if (timeLeft > 0 && !quizPassed) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft, quizPassed]);

    const handleReturnToGame = () => {
        if (type === 'adware') setHasSeenAdwareEdu(true);
        if (type === 'fileless') setHasSeenFilelessEdu(true);
        navigate('/game');
    };

    const adwareContent = {
        title: "Caught in the Adware Trap!",
        content: "That popup wasn't a real prize. It was adware! Adware uses cookies and tracking code to gather information about your habits, like your pet's name or your hobbies, and then bombards you with hyper-targeted, often malicious advertisements.",
        question: "How does adware typically know what specific ads to show you?",
        options: [
            "It guesses randomly.",
            "It secretly films you through your webcam.",
            "It uses tracking cookies to log your browsing habits and inputs.",
            "It reads your mind."
        ],
        correct: 2
    };

    const filelessContent = {
        title: "Hooked by Fileless Malware!",
        content: "You just executed a malicious script directly in your terminal! Unlike traditional viruses, fileless malware doesn't install a physical file on your hard drive. Instead, it runs malicious code directly in your system's memory (RAM), often using legitimate tools like PowerShell or Bash to evade detection.",
        question: "Why is fileless malware harder for traditional antivirus to detect?",
        options: [
            "It's invisible to the human eye.",
            "It doesn't leave a traditional file signature on the hard drive.",
            "It encrypts the entire internet.",
            "It deletes the antivirus software."
        ],
        correct: 1
    };

    const data = type === 'adware' ? adwareContent : filelessContent;

    const handleQuizSubmit = () => {
        if (selectedAnswer === data.correct) {
            setQuizPassed(true);
            setTimeLeft(0);
        } else {
            alert("Incorrect! Read the lesson carefully and try again.");
            setSelectedAnswer(null);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const isLocked = timeLeft > 0 && !quizPassed;

    return (
        <div className="edu-layout">
            <div className="cartoon-panel edu-panel">
                <h1 className="title-text" style={{color: 'var(--danger)', fontSize: '3.5rem', marginBottom: '20px'}}>{data.title}</h1>
                <p className="edu-content">{data.content}</p>

                <div className="timer-section" style={{borderColor: isLocked ? 'var(--danger)' : 'var(--accent-secondary)'}}>
                    <h2 style={{color: isLocked ? 'var(--danger)' : 'var(--cookie-primary)', textShadow: '2px 2px 0px #1e293b'}}>
                        Security Lockout: {isLocked ? formatTime(timeLeft) : 'UNLOCKED!'}
                    </h2>
                    
                    {isLocked && !quizActive && (
                        <button className="start-btn" onClick={() => setQuizActive(true)}>
                            Take Quiz to Skip Timer
                        </button>
                    )}
                </div>

                {quizActive && isLocked && (
                    <div className="quiz-section">
                        <h3>{data.question}</h3>
                        <div className="options-list">
                            {data.options.map((opt, i) => (
                                <button 
                                    key={i} 
                                    className={`quiz-option ${selectedAnswer === i ? 'selected' : ''}`}
                                    onClick={() => setSelectedAnswer(i)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <button className="start-btn" style={{width: '100%', marginTop: '15px'}} onClick={handleQuizSubmit} disabled={selectedAnswer === null}>
                            Submit Answer
                        </button>
                    </div>
                )}

                <button 
                    className="start-btn" 
                    style={{marginTop: '30px', width: '100%', background: isLocked ? '#94a3b8' : 'var(--accent-secondary)'}}
                    onClick={handleReturnToGame}
                    disabled={isLocked}
                >
                    {isLocked ? "Wait for timer or pass quiz..." : "Return to Kitchen"}
                </button>
            </div>
        </div>
    );
};

export default EduPage;
