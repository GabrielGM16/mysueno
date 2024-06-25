import React from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../styles/Home.css';
import bannerImage from '../imgs/habit.jpg'; // Ajusta la ruta a tu imagen
import Header from './Header';
import Footer from './Footer';
import SiteMap from './SiteMap'; // Importa el componente SiteMap

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <section className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-content">
            <h2>Daily Habits</h2>
            <p>Track your daily habits and achieve your goals!</p>
            <Link to="/login" className="cta-button">Get Started</Link>
          </div>
        </section>
        <section className="carousel-container">
          <Carousel autoPlay infiniteLoop>
            <div>
              <img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_9ZGugynYGAJTaM3naEW05r4MDcVQxaqBwa2iVT8oZtn2A7pFmUItJP15EDB7bhPjwge8wJCGRG8w3U7l8Qxi_2qWaxYbx7BfPHzob5OdIIZ7c4QQOaSivTQ6DRZqE9lhCgw6HQabb7yY8T_zrWOQ3VxuQD2tnJMUGMrvF3I75_uVA4xi8ZgXaKxI/s2000/H%C3%81BITOS%20SALUDABLES%20(1).jpg' alt="Slide 1" />
              <p className="legend">Track your habits</p>
            </div>
            <div>
              <img src="https://weldynquezada.blog/wp-content/uploads/2020/05/fe33dd93-5494-458d-8cea-a57a2ec03f53.png" alt="Slide 2" />
              <p className="legend">Stay organized</p>
            </div>
            <div>
              <img src="https://blog.oxfamintermon.org/wp-content/uploads/2015/07/salud-726x365.jpg" alt="Slide 3" />
              <p className="legend">Achieve your goals</p>
            </div>
          </Carousel>
        </section>
        <SiteMap /> {/* Añade el componente SiteMap aquí */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
