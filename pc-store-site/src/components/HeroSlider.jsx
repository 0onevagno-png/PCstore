import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "СБОРКИ НА INTEL CORE ",
    subtitle: "Новое поколение процессоров",
    button: "ПК С INTEL CORE ",
    className: "slide-0",
    link: "/pc/intel",
  },
  {
    title: "СБОРКИ С AMD RYZEN ",
    subtitle: "Производительность нового уровня",
    button: "ПК С AMD RYZEN",
    className: "slide-1",
    link: "/pc/amd",
  },
  {
    title: "НАШИ УСЛУГИ",
    subtitle: "Профессиональная помощь и сервис",
    button: "ПОДРОБНЕЕ",
    className: "slide-2",
    link: "/services",
  },
  {
    title: "КОНФИГУРАТОР",
    subtitle: "Создайте свой идеальный ПК",
    button: "ПЕРЕЙТИ",
    className: "slide-3",
    link: "/configurator",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className={`slide ${slide.className}`}>
            <div className="slide-content">
              <h1 className="mb-4">{slide.title}</h1>
              <p className="text-lg mb-6 text-gray-300">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="gold-button inline-block px-6 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
