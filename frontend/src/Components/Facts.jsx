import React from "react";
import BlurText from "../TextAnimations/BlurText/BlurText";
import Footer from "./Footer";
import cat1 from "/cat2Logo.png";
import cat2 from "/cat1Logo.png";
import CarouselComponent from "./CarouselComponents/CarouselComponent";
import CarouselComponent1 from "./CarouselComponents/CarouselComponent1";

const Facts = () => {
  const message1 = `
    Do you think cats purr because they're happy, or are they secretly
        trying to hypnotize you into giving them more treats?`;
  const message2 = `Cats purr like a fuzzy little massage machine, but it's not always
    because they're happy. They might be purring to say, "Hey, I’m stressed
    out!" or "Ouch, that hurts, but I’ll heal with my magical purr powers!"
    (Purr-fect for recovery!)
    `;
  const message3 = `
  Is your cat trying to ask for food, or are they secretly running 
  a stand-up comedy routine just for you?`;
  const message4 = `Cats don’t meow at each other. Nope, they reserve that for you, their
          human. So when your cat is meowing at you, it’s basically them saying,
          “Excuse me, servant, I demand food, attention, or both... NOW.”`;

  return (
    <div>
      <br /><br />
      <br /><br />
      <h2>🐾 "Curious about cats? We’ve got all the pawsome facts!"</h2>
      <br />
      <h5>🐾 "Unleashing knowledge, one paw at a time!"</h5>
      <br />
      <h5>
        🐱 "The more we learn about animals, the more we appreciate them."
      </h5>
      <br />

      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "rgba(117, 216, 167, 0.5)",
          padding: "15px",
          margin: "40px",
        }}
      >
        <div style={{ position: "relative", left: "100px" }}>
          <h2>
            <pre>{message1}</pre>
          </h2>
          <pre>{message2}</pre>
          <br />
        </div>

        <div style={{ width: "200px", position: "absolute", right: "170px" }}>
          <img
            src={cat1}
            alt="Peeking Cat"
            className="img-fluid"
            style={{ width: "200px" }}
          ></img>
        </div>
      </div>
      <p>
        Cats purr like a fuzzy little massage machine, but it's not always
        because they're happy. They might be purring to say, "Hey, I’m stressed
        out!" or "Ouch, that hurts, but I’ll heal with my magical purr powers!"
        (Purr-fect for recovery!)
      </p>

      <div>
        <h2 style={{ textAlign: "center" }}>🐾 Fun Facts About Cats 🐾</h2>
        <br />
        <CarouselComponent />
      </div>


      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "rgba(209, 240, 124, 0.5)",
          padding: "16px",
          margin: "40px",
        }}
      >
        
        <div style={{ width: "200px", position: "relative", left: "130px" }}>
          <img
            src={cat2}
            alt="Peeking Cat"
            className="img-fluid"
            style={{ width: "200px" }}
          ></img>
        </div>
        <div style={{ position: "absolute", right: "160px" }}>
          <h2>
            <pre>{message3}</pre>
          </h2>
          <pre>{message4}</pre>
          <br />
        </div>
       
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>
          🐾 More You Know, More You Fall For Them 🐾
        </h2>
        <br />
        <CarouselComponent1 />
      </div>
      <br />
      <BlurText
        text="🐾 More curious about cats now? Join our samishi community to learn about them more!"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-2xl font-bold mb-8"
      />
      <br />
      
          <div
        style={{
          backgroundColor: "rgba(104, 123, 230, 0.5)",
          padding: "10px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Facts;
