import React, { useState, useEffect } from "react";
import logo from "/logo3.png";
import logo1 from "/logo4.png";
import logo2 from "/logo5.png";
import logo3 from "/logo6.png";
import logo4 from "/sleepingLogo.png"; 
import logo5 from "/playingLogo.png";
const slides = [
  {
    message1: "🐾 Fun Fact About Cats!",
    message2: "Cats sleep for about 13-16 hours a day!",
    catImage: logo5,
  },
  {
    message1: "🐾 Did you know?",
    message2: "Cats can make over 100 different sounds!",
    catImage: logo4,
  },
  {
    message1: "🐾 Cats Can Make Over 100 Sounds! 🎵",
    message2: "Unlike dogs (who have around 10 sounds), cats can purr, chirp, trill, and even 'talk' back to you!",
    catImage: logo3,
  },
  {
    message1: "🐾 A Cat’s Purr Has Healing Powers 🏥",
    message2: "Studies suggest that the frequency of a cat’s purr (25-150 Hz) can promote healing in bones and tissues.",
    catImage: logo2,
  },
  {
    message1: "🐾 Cats Sleep 70% of Their Lives 😴",
    message2: "On average, cats sleep between 13-16 hours a day, making them expert nappers!",
    catImage: logo1,
  },
  {
    message1: "🐾 They Can Jump 6 Times Their Body Length! 🏆",
    message2: "A cat’s back legs are super powerful, allowing them to jump up to 6 times their body length in one leap.",
    catImage: logo,
  },
  {
    message1: "🐾 The Oldest Cat Lived for 38 Years! 🎂",
    message2: "A cat named Creme Puff holds the record for the oldest cat ever, living to be 38 years old!",
    catImage: logo4,
  },
  {
    message1: "🐾 Cats 'Chirp' at Birds Out of Excitement! 🐦",
    message2: "Ever seen your cat stare at birds and make a strange chattering sound? This is thought to be an instinctive hunting behavior.",
    catImage: logo2,
  },
  {
    message1: "🐾 They Use Their Tails to Communicate 🌀",
    message2: "A straight-up tail means they’re happy, while a flicking tail can mean they’re annoyed or focused.",
    catImage: logo3,
  },
  {
    message1: "🐾 A Group of Cats is Called a 'Clowder' 🐈🐈🐈",
    message2: "If you see multiple cats together, congratulations—you’ve spotted a clowder!",
    catImage: logo5,
  },
  {
    message1: "🐾 Cats Walk Like Camels and Giraffes! 🐾",
    message2: "Cats move both right legs first, then both left legs, just like camels and giraffes.",
    catImage: logo,
  },
  {
    message1: "🐾 Your Cat Knows Its Name… But Might Ignore You! 🤭",
    message2: "Studies show that cats recognize their names but choose whether or not to respond. Classic cat behavior!",
    catImage: logo1,
  },
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);



  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };
useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.carouselContainer}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            display: index === currentIndex ? "flex" : "none", // Only show active slide
          }}
        >
          <div style={styles.textContainer}>
            <h2>{slide.message1}</h2>
            <p>{slide.message2}</p>
          </div>
          <div style={styles.imageContainer}>
            <img src={slide.catImage} alt="Peeking Cat" style={styles.image} />
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button onClick={prevSlide} style={styles.prevButton}>❮</button>
      <button onClick={nextSlide} style={styles.nextButton}>❯</button>
    </div>
  );
};

// Styles
const styles = {
  carouselContainer: {
    position: "relative",
    width: "80%",
    height: "400px",
    overflow: "hidden",
    margin: "auto",
    borderRadius: "10px",
  },
  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(248, 128, 128, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    transition: "opacity 1s ease-in-out",
  },
  textContainer: {
    flex: 1,
    paddingLeft: "50px",
  },
  imageContainer: {
    width: "300px",
    marginRight: "50px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  prevButton: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "24px",
    background: "rgba(255,255,255,0.8)",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    zIndex: 10, // Ensure buttons are clickable
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    fontSize: "24px",
    background: "rgba(255,255,255,0.8)",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    zIndex: 10, // Ensure buttons are clickable
  },
};

export default CarouselComponent;
