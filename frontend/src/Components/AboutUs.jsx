import React from "react";
import Logo from "/logo.png";
import Footer from "./Footer";
import { useRef } from "react";
import SplitText from "../TextAnimations/SplitText/SplitText";
import VariableProximity from "../TextAnimations/VariableProximity/VariableProximity";
const AboutUs = () => {
  const containerRef = useRef(null);
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
      <br />
      <br />
      <div className="title">
        <h1>
          <SplitText
            text="More About Us"
            className="text-2xl font-semibold text-center"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h1>
      </div>
      

      <div>
        <img src={Logo} className="logo" alt="Cat logo" />
      </div>
      <div>
        <p id="variable-proximity-demo">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Our Mission"}
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

      <pre>{message1}</pre>
      <br />
      <div>
        <p id="variable-proximity-demo">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Why Adopt a Stray?"}
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

      <pre>{message2}</pre>
      <br />
      <div>
        <p id="variable-proximity-demo">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Our Process"}
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

      <pre>{message3}</pre>
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

export default AboutUs;
