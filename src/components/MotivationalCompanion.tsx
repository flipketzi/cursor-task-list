import { useEffect, useState } from 'react';
import '../styles/MotivationalCompanion.css';

const motivationalQuotes = [
  "You're doing amazing! Keep up the great work! 🎉",
  "Every completed task is a step closer to your goals! 💪",
  "You're unstoppable! Look at all you've accomplished! 🌟",
  "The only way to do great work is to love what you do! ❤️",
  "Success is the sum of small efforts repeated daily! ✨",
  "You're making progress every single day! Keep going! 🚀",
  "Your dedication is inspiring! Keep crushing those goals! 💫",
  "The secret of getting ahead is getting started! 🏃‍♂️",
  "You're capable of amazing things! Believe in yourself! 🌈",
  "Every task you complete makes you stronger! 💪"
];

interface MotivationalCompanionProps {
  totalTasks: number;
  completedTasks: number;
}

const MotivationalCompanion = ({ totalTasks, completedTasks }: MotivationalCompanionProps) => {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [showQuote, setShowQuote] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const happinessLevel = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const allTasksCompleted = totalTasks > 0 && completedTasks === totalTasks;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const companion = document.querySelector('.companion');
      if (companion) {
        const rect = companion.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate angle between companion center and mouse
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        // Limit the eye movement to a reasonable range
        const maxDistance = 5;
        const eyeX = Math.cos(angle) * maxDistance;
        const eyeY = Math.sin(angle) * maxDistance;
        
        setMousePosition({ x: eyeX, y: eyeY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (allTasksCompleted) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
      setShowQuote(true);
    } else {
      setShowQuote(false);
    }
  }, [allTasksCompleted]);

  return (
    <div className="companion-container" data-testid="companion-container">
      <div className="mood-bar-container">
        <div 
          className="mood-bar" 
          style={{ width: `${happinessLevel}%` }}
          data-testid="mood-bar"
        />
      </div>
      <div className="companion">
        <div className="companion-body">
          <div className="companion-face">
            <div className="eyes">
              <div className="eye">
                <div 
                  className="pupil" 
                  style={{ 
                    transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`
                  }}
                />
              </div>
              <div className="eye">
                <div 
                  className="pupil" 
                  style={{ 
                    transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`
                  }}
                />
              </div>
            </div>
            <div 
              className="mouth" 
              style={{ transform: `scale(${1 + happinessLevel / 100})` }}
            />
          </div>
        </div>
      </div>
      {showQuote && (
        <div className="motivational-quote" data-testid="motivational-quote">
          {currentQuote}
        </div>
      )}
    </div>
  );
};

export default MotivationalCompanion; 