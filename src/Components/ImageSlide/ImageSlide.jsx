import React, { useState } from 'react';
import styles from './ImageSlide.module.css'; 
import image1 from '../../Pictures/pic6.png';
import image2 from '../../Pictures/pic2.png';
import image3 from '../../Pictures/pic3.png';
import image4 from '../../Pictures/pic4.png';

const slides = [
 
  { image: image2, text: 'A living room with equpiied with TV, bluetooth speaker and apple TV' },
  { image: image3, text: 'Bedroom 1, Two beds with a big closet for storing all your needs' },
  { image: image4, text: 'Bedroom 2, Queen-sized bed with a big drawer for clothes. Enjoy the morning sun with a just a step out the door' },
  { image: image1, text: "Big outdoor balcony outlooking the beutiful view of the costa del sol, Sit and have a refreshing drink." },
];

const ImageSlide = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(null);

  const changeImage = (nextIndex) => {
    setNextImageIndex(nextIndex); 
    setTimeout(() => {
      setCurrentImageIndex(nextIndex); 
      setNextImageIndex(null); 
    }, 500); 
  };

  const nextImage = () => {
    const nextIndex = currentImageIndex === slides.length - 1 ? 0 : currentImageIndex + 1;
    changeImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? slides.length - 1 : currentImageIndex - 1;
    changeImage(prevIndex);
  };

  return (
    <>
      <div className={styles.imageSlider}>
       
        <img
          src={slides[currentImageIndex].image}
          alt="Current Slider"
          className={`${styles.sliderImage} ${nextImageIndex !== null ? styles.fadeOut : ''}`}
        />
       
        {nextImageIndex !== null && (
          <img
            src={slides[nextImageIndex].image}
            alt="Next Slider"
            className={`${styles.sliderImage} ${styles.fadeIn}`}
          />
        )}
       
        <div className={styles.textOverlay}>
          {slides[currentImageIndex].text}
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <button 
          onClick={prevImage} 
          className={`${styles.button} ${styles.prevButton}`} 
          aria-label="Previous image"
        >
          Prev
        </button>
        <button 
          onClick={nextImage} 
          className={`${styles.button} ${styles.nextButton}`} 
          aria-label="Next image"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ImageSlide;
