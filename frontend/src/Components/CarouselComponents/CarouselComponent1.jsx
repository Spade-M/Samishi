import React from 'react'
import { useState, useEffect } from 'react';
import logo from "/logo3.png";
import logo1 from "/logo4.png";
import logo2 from "/logo5.png";
import logo3 from "/logo6.png";
import logo4 from "/sleepingLogo.png"; 
import logo5 from "/playingLogo.png";
const slides = [
    {
      message1: "🐾 Cats Can’t Taste Sweet Things! 🍭🚫",
      message2: "Unlike humans, cats lack taste receptors for sweetness. So, they don’t crave sugary treats!",
      catImage: logo,
    },
    {
      message1: "Their Whiskers Act Like Radar! 📡",
      message2: "A cat’s whiskers aren’t just for looks—they’re sensitive enough to detect changes in air currents, helping them navigate in the dark",
      catImage: logo1,
    },
    {
      message1:"They Can Run Faster Than Usain Bolt! ⚡", 
      message2: "A domestic cat can sprint up to 30 mph (48 km/h)—faster than Olympic champion Usain Bolt!",
      catImage: logo2,
    },
    {
      message1: "Some Cats Are Allergic to Humans! 🤧",
      message2: "Just like people can be allergic to cats, some cats are allergic to human dander (skin flakes).",
      catImage: logo3,
    },
    {
      message1: "They Can “Chirp” Like Birds! 🐦😺",
      message2: "Cats sometimes mimic birds’ sounds when hunting. This strange behavior is called “chattering.” ",
      catImage: logo4,
    },
    {
      message1: "Cats Were Worshipped in Ancient Egypt! 🏺",
      message2: "Killing a cat in Ancient Egypt was a crime punishable by death, and cats were often mummified alongside their owners.",
      catImage: logo5,
    },
    {
      message1: "The First Cat in Space Was a French Astronaut! 🚀",
      message2: "In 1963, a cat named Félicette became the first feline in space! She survived and returned safely to Earth.",
      catImage: logo,
    },
    {
      message1: "Vikings Had Cats as Ship Guardians! 🛡️",
      message2: "Vikings kept cats on their ships to hunt rats and protect food supplies. Some say they even brought cats to new lands as companions",
      catImage: logo1,
    },
    {
      message1: "Cats Were Once Put on Trial! ⚖️",
      message2: "In medieval times, cats (especially black ones) were sometimes accused of witchcraft and put on trial!",
      catImage: logo2,
    },
    {
        message1: "A Mayor Cat Ruled an Alaskan Town for 20 Years! 🏛️",
        message2: "A cat named Stubbs was the honorary mayor of Talkeetna, Alaska, for 20 years! Residents loved him so much they never replaced him",
        catImage: logo3,
    }
  ];

const CarouselComponent1 = () => {
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
           
            <div style={styles.imageContainer}>
              <img src={slide.catImage} alt="Peeking Cat" style={styles.image} />
            </div>
             <div style={styles.textContainer}>
              <h2>{slide.message1}</h2>
              <p>{slide.message2}</p>
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
      backgroundColor: "rgba(123, 211, 174, 0.5)",
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

export default CarouselComponent1
