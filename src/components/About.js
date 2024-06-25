import React from 'react';
import '../styles/About.css';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div className="about-container">
      <Header />
      <main className="about-main">
        <section className="hero">
          <h1>About Habit Tracker</h1>
          <p>Transform your habits, transform your life.</p>
        </section>
        <section className="content">
          <div className="content-section">
            <h2>Our Mission</h2>
            <p>Habit Tracker is an application designed to help you track and maintain your daily habits. With our tool, you can monitor your daily activities, set goals, and see your progress over time.</p>
          </div>
          <div className="content-section">
            <h2>Why Habit Tracker?</h2>
            <p>Our mission is to make habit tracking easy and help you achieve your goals effectively. Whether you're trying to develop new healthy habits or maintain the ones you already have, Habit Tracker is the perfect solution for you.</p>
          </div>
          <div className="content-section">
            <h2>Benefits</h2>
            <ul>
              <li>Daily habit tracking</li>
              <li>Setting personalized goals</li>
              <li>Progress visualization</li>
              <li>Reminders and notifications</li>
              <li>User-friendly interface</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
