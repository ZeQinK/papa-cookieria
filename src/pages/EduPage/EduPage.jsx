import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameStateContext';
import './EduPage.css';

const adwareQuestions = [
    {
        question: "How does adware typically know what specific ads to show you?",
        options: [
            "It guesses randomly.",
            "It secretly films you through your webcam.",
            "It uses tracking cookies to log your browsing habits and inputs.",
            "It reads your mind."
        ],
        correct: 2
    },
    {
        question: "What is the MOST common way adware gets installed on your computer?",
        options: [
            "By plugging in a USB drive.",
            "Bundled with free software you download from the internet.",
            "Through a phone call from tech support.",
            "By connecting to Wi-Fi."
        ],
        correct: 1
    },
    {
        question: "Which of these is a telltale sign your device has adware?",
        options: [
            "Your battery lasts longer than usual.",
            "Your wallpaper changes to a nicer picture.",
            "You see pop-up ads even when your browser is closed.",
            "Your device runs faster than normal."
        ],
        correct: 2
    },
    {
        question: "Why do adware creators make adware in the first place?",
        options: [
            "To make your computer more fun to use.",
            "To generate advertising revenue by forcing ads on users.",
            "To improve your internet speed.",
            "To help antivirus companies test their products."
        ],
        correct: 1
    },
    {
        question: "What should you do if you see a pop-up saying 'You won a free iPhone!'?",
        options: [
            "Click it immediately — free stuff!",
            "Share it with all your friends so they can win too.",
            "Enter your personal details to claim the prize.",
            "Close it without clicking — it's almost certainly a scam or adware."
        ],
        correct: 3
    },
    {
        question: "How can tracking cookies be used maliciously by adware?",
        options: [
            "They can physically damage your hard drive.",
            "They can build a profile of your browsing habits and sell it to advertisers.",
            "They can delete your operating system.",
            "They can hack into your bank directly."
        ],
        correct: 1
    },
    {
        question: "What is the best way to protect yourself from adware?",
        options: [
            "Never use the internet.",
            "Only download software from trusted sources and read installation prompts carefully.",
            "Use the oldest browser version available.",
            "Disable your firewall so ads load faster."
        ],
        correct: 1
    },
    {
        question: "What happens when you click 'Accept' on a suspicious cookie consent banner?",
        options: [
            "You get a real cookie delivered to your house.",
            "Nothing at all — it's just decoration.",
            "You may be granting permission to track your activity and personal data.",
            "Your computer becomes immune to viruses."
        ],
        correct: 2
    }
];

const filelessQuestions = [
    {
        question: "Why is fileless malware harder for traditional antivirus to detect?",
        options: [
            "It's invisible to the human eye.",
            "It doesn't leave a traditional file signature on the hard drive.",
            "It encrypts the entire internet.",
            "It deletes the antivirus software."
        ],
        correct: 1
    },
    {
        question: "Where does fileless malware primarily operate?",
        options: [
            "On a USB flash drive.",
            "Inside image files on your desktop.",
            "In your system's memory (RAM), using legitimate tools.",
            "On the surface of your monitor screen."
        ],
        correct: 2
    },
    {
        question: "Which legitimate system tool is commonly abused by fileless malware on Windows?",
        options: [
            "Microsoft Paint.",
            "Calculator.",
            "PowerShell.",
            "Notepad."
        ],
        correct: 2
    },
    {
        question: "What makes fileless malware different from traditional viruses?",
        options: [
            "It installs many large files on your hard drive.",
            "It requires physical access to your keyboard.",
            "It lives in memory and doesn't write malicious files to disk.",
            "It only affects Mac computers."
        ],
        correct: 2
    },
    {
        question: "How does fileless malware typically arrive on a victim's computer?",
        options: [
            "Through a physical letter in the mail.",
            "Via phishing emails with malicious links or scripts.",
            "By someone physically typing on your keyboard.",
            "Through Bluetooth from nearby strangers."
        ],
        correct: 1
    },
    {
        question: "Why does fileless malware use 'living off the land' techniques?",
        options: [
            "Because it needs sunlight to operate.",
            "To use trusted system tools so security software doesn't flag it.",
            "Because it's an eco-friendly type of malware.",
            "To make the computer use less electricity."
        ],
        correct: 1
    },
    {
        question: "What is one effective defense against fileless malware?",
        options: [
            "Turning off your computer forever.",
            "Using behavior-based detection that monitors suspicious process activity.",
            "Installing more RAM so the malware has room.",
            "Running only one program at a time."
        ],
        correct: 1
    },
    {
        question: "What happens to fileless malware when you restart your computer?",
        options: [
            "It becomes stronger.",
            "It duplicates itself across all your files.",
            "It typically gets cleared from memory, unless it set up persistence.",
            "It moves to your phone automatically."
        ],
        correct: 2
    }
];

const EduPage = () => {
    const { type } = useParams(); // 'adware' or 'fileless'
    const navigate = useNavigate();
    const { setHasSeenAdwareEdu, setHasSeenFilelessEdu } = useGameState();

    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [quizActive, setQuizActive] = useState(false);
    const [quizPassed, setQuizPassed] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionsToAsk] = useState(() => {
        // Pick 3 random questions from the pool
        const pool = type === 'adware' ? [...adwareQuestions] : [...filelessQuestions];
        const shuffled = pool.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    });
    const [correctCount, setCorrectCount] = useState(0);

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

    const adwareInfo = {
        title: "Caught in the Adware Trap!",
        content: "That popup wasn't a real prize. It was adware! Adware uses cookies and tracking code to gather information about your habits, like your pet's name or your hobbies, and then bombards you with hyper-targeted, often malicious advertisements. Adware can slow down your device, redirect your browser, and even open doors for more dangerous malware. Always be skeptical of flashy pop-ups that promise free prizes!"
    };

    const filelessInfo = {
        title: "Hooked by Fileless Malware!",
        content: "You just executed a malicious script directly in your terminal! Unlike traditional viruses, fileless malware doesn't install a physical file on your hard drive. Instead, it runs malicious code directly in your system's memory (RAM), often using legitimate tools like PowerShell or Bash to evade detection. This makes it extremely stealthy and hard to trace. Never run commands from untrusted sources!"
    };

    const info = type === 'adware' ? adwareInfo : filelessInfo;
    const currentQ = questionsToAsk[currentQuestionIndex];

    const handleQuizSubmit = () => {
        if (selectedAnswer === currentQ.correct) {
            const newCount = correctCount + 1;
            setCorrectCount(newCount);

            if (currentQuestionIndex < questionsToAsk.length - 1) {
                // Move to next question
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                // All questions answered correctly
                setQuizPassed(true);
                setTimeLeft(0);
            }
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
                <h1 className="title-text" style={{color: 'var(--danger)', fontSize: '3.5rem', marginBottom: '20px'}}>{info.title}</h1>
                <p className="edu-content">{info.content}</p>

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
                        <p className="quiz-progress">Question {currentQuestionIndex + 1} of {questionsToAsk.length}</p>
                        <h3>{currentQ.question}</h3>
                        <div className="options-list">
                            {currentQ.options.map((opt, i) => (
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
