import React from 'react';
import { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'src/Corosel/img/pin0.jpeg',
    'src/Corosel/img/pin1.jpeg',
    'src/Corosel/img/pin2.jpeg',
    'src/Corosel/img/pin10.jpeg',
    'src/Corosel/img/pin4.jpeg'
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-red-400 via-purple-500 to-blue-500">
      <div className="flex justify-center items-center w-full  h-full">
        <div className="relative flex justify-center items-center bg-slate-200 w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute transition-all w-full bg-red-200 duration-500 transform ${
                index === currentIndex ? 'scale-100 opacity-100 z-0' : 'scale-75 opacity-0 z-0'
              }`}
              style={{
                left:
                  index === currentIndex
                    ? '17%'
                    : index === (currentIndex + 1) % images.length
                    ? '38%'
                    : index === (currentIndex + 2) % images.length
                    ? '59%'
                    : '80%',
              }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="rounded-lg shadow-xl w-full bg-slate-500"
                style={{ height: '550px', width: '80%' }}
              />
            </div>
          ))}
          <div className="absolute w-full flex justify-between items-center top-3/4 -left-3 px-6">
            <button
              onClick={prevSlide}
              className="text-4xl bg-black bg-opacity-50 text-white rounded-full h-12 w-12 flex items-center justify-center"
            >
              &lt;
            </button>
            <button
              onClick={nextSlide}
              className="text-4xl bg-black bg-opacity-50 text-white rounded-full h-12 w-12 left-full flex items-center justify-center"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
