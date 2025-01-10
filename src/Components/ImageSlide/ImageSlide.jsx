import React, { useState } from "react";
import styles from "./ImageSlide.module.css";
import image1 from "../../Pictures/pic6.png";
import image2 from "../../Pictures/pic2.png";
import image3 from "../../Pictures/pic3.png";
import image4 from "../../Pictures/pic4.png";

const slides = [
  {
    image: image2,
    text: "A living room equipped with a TV, bluetooth speaker, and Apple TV.",
  },
  {
    image: image3,
    text: "Bedroom 1, two beds with a big closet for storing all your needs.",
  },
  {
    image: image4,
    text: "Bedroom 2, Queen-sized bed with a large drawer for clothes. Enjoy the morning sun just a step outside the door.",
  },
  {
    image: image1,
    text: "Big outdoor balcony overlooking the beautiful view of Costa del Sol. Sit and enjoy a refreshing drink.",
  },
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
    const nextIndex =
      currentImageIndex === slides.length - 1 ? 0 : currentImageIndex + 1;
    changeImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? slides.length - 1 : currentImageIndex - 1;
    changeImage(prevIndex);
  };

  return (
    <div className={styles.imageSliderContainer}>
      <section id="pictures"></section>
      <div className={styles.mainImageWrapper}>
        <img
          src={slides[currentImageIndex].image}
          alt="Current Slider"
          className={`${styles.sliderImage} ${
            nextImageIndex !== null ? styles.fadeOut : ""
          }`}
        />
        {nextImageIndex !== null && (
          <img
            src={slides[nextImageIndex].image}
            alt="Next Slider"
            className={`${styles.sliderImage} ${styles.fadeIn}`}
          />
        )}

        {/* <div className={styles.textOverlay}>
          {slides[currentImageIndex].text}
        </div> */}

        <div className={styles.thumbnailSlider}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Thumbnail ${index}`}
              className={`${styles.thumbnail} ${
                currentImageIndex === index ? styles.activeThumbnail : ""
              }`}
              onClick={() => changeImage(index)}
            />
          ))}
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
    </div>
  );
};

export default ImageSlide;
