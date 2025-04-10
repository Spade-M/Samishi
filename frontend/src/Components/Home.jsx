import { useRef } from "react";
import React from "react";
import Logo from "/logo.png";
import SplitText from "../TextAnimations/SplitText/SplitText";
import VariableProximity from "../TextAnimations/VariableProximity/VariableProximity";
import Footer from "./Footer";

const message = `
Here You can adopt a cat as well as talk with cat owners and discuss the problem related to health issue and can admire the cuteness of 
adorable cats.`;

const message3 = `We work closely with local shelters and foster homes to rescue stray cats, providing them with medical care, socialization, and love. 
We assess each cat’s personality and health to ensure they are a good fit for adoption, and we match them with families who are ready to offer them a lifetime of care. 
Our process is designed to be smooth and supportive, helping both you and the cat transition into your new life together.`;

const Home = () => {
  const containerRef = useRef(null);

  return (
    <div style={{  fontFamily: "Arial, sans-serif" }}>
      <div className="title" style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>
          <SplitText
            text="Welcome To Samishi Community"
            className="text-2xl font-semibold"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h1>
      </div>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <img src={Logo} className="logo" alt="Cat logo" style={{ width: "200px", height: "220px" }} />
      </div>

      <div className="login" style={{ textAlign: "center", marginBottom: "10px" }}>
        <a href="/login">
          <button>
            LOGIN
          </button>
        </a>
        <p className="or" style={{ margin: "10px 0" }}>
          or
          <br />
          <a href="/SignUp" style={{ color: "#6c63ff", textDecoration: "none" }}>Sign Up</a>
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <p id="variable-proximity-demo">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Welcome to the heaven of cats"}
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 300, 'opsz' 9"
              toFontVariationSettings="'wght' 700, 'opsz' 20"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <pre>{message}</pre>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <pre>{message3}</pre>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#6c63ff" }}>Why Adopt a Cat?</h2>
        <p>
          Adopting a cat is a rewarding experience. Cats are loving, playful, and make great companions. By adopting, you are giving a homeless cat a second chance at life and helping reduce the number of stray animals.
        </p>
        <h3 style={{ color: "#6c63ff" }}>Adoption Benefits:</h3>
        <div>
        <ul>Save a life and provide a loving home.</ul>
          <ul>Enjoy the companionship of a loyal pet.</ul>
          <ul>Support local shelters and rescue organizations.</ul>
          <ul>Reduce stress and improve mental health with a furry friend.</ul>
          <ul>Help control the stray animal population.</ul>
        
        </div>
         
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#6c63ff" }}>How to Adopt?</h2>
        <p>
          Our adoption process is simple and supportive. Browse through our list of adorable cats available for adoption, fill out an application, and our team will guide you through the next steps.
        </p>
        <a href="/signup">
          <button style={{ padding: "10px 20px", backgroundColor: "#6c63ff", color: "#fff", border: "none", borderRadius: "5px" }}>
            View Cats for Adoption
          </button>
        </a>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#6c63ff" }}>Fun Facts About Cats</h2>
        <div>
          <ul>Cats sleep for 12-16 hours a day on average.</ul>
          <ul>Each cat's nose print is unique, just like human fingerprints.</ul>
          <ul>Cats have five toes on their front paws but only four on their back paws.</ul>
          <ul>A group of cats is called a "clowder."</ul>
          <ul>Cats can rotate their ears 180 degrees.</ul>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#6c63ff" }}>Testimonials</h2>
        <blockquote style={{ fontStyle: "italic", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
          "Adopting a cat from Samishi was the best decision I ever made. My cat, Luna, has brought so much joy to my life!" - Sarah
        </blockquote>
        <blockquote style={{ fontStyle: "italic", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px", marginTop: "10px" }}>
          "The adoption process was smooth and easy. The team was so supportive and helpful!" - John
        </blockquote>
      </div>

      <div
        style={{
          backgroundColor: "rgba(104, 123, 230, 0.5)",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
