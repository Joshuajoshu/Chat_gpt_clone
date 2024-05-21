import React from 'react';
import '../Frontend/src/index.css'; 
import App from '../Frontend/src/App';

const Home_page = () => {
  const changingTexts = [
    "Welcome to Our Website!",
    "Explore Our Services",
    "Join Our Community",
    "Get Started Today"
  ];

  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [changingTexts.length]);

  return (
    <div className="home-page-container">
      <div className="left-column">
        <div className="changing-text">{changingTexts[currentTextIndex]}</div>
      </div>
      <div className="right-column">
        <App />
      </div>
    </div>
  );
};

export default Home_page;
