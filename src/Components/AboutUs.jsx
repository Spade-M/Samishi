import React from "react";
import Logo from "/logo.png";

const AboutUs = () => {
  const message1 = `
    At Samishi, we are passionate about giving stray cats a second chance at life. 
    Our mission is simple yet powerful: to rescue, rehabilitate, and rehome stray cats in need of loving forever homes.
    Every cat deserves a chance to be cared for, and we work tirelessly to ensure that they find not just a home, but a place where they can feel safe, loved, and valued.
    `;
    const message2 = `
    Stray cats often face harsh conditions on the streets – hunger, disease, and loneliness. 
    When you adopt a stray, you’re not just gaining a new family member, you’re also making a difference in a life that’s been overlooked. 
    By choosing adoption, you're helping to reduce the number of homeless cats and supporting a cycle of compassion that benefits both the animals and the community.
    `;
    const message3 = `
    We work closely with local shelters and foster homes to rescue stray cats, providing them with medical care, socialization, and love. 
    We assess each cat’s personality and health to ensure they are a good fit for adoption, and we match them with families who are ready to offer them a lifetime of care. 
    Our process is designed to be smooth and supportive, helping both you and the cat transition into your new life together.

    `;
  return (
    <div>
      <br />
      <div className="title">
        <h1>More About Us</h1>
      </div>
      <div>
        <img src={Logo} className="logo" alt="Cat logo" />
      </div>
      <br/>
      <h2>Our Mission</h2>
      <pre>{message1}</pre>
      <br/>
      <h2>Why Adopt a Stray?</h2>
      <pre>{message2}</pre>
      <br/>
      <h2>Our Process</h2>
      <pre>{message3}</pre>
      <br/>
      
    </div>
  );
};

export default AboutUs;
