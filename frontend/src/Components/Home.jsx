import { useRef } from "react";
import React from "react";
import Logo from "/logo.png";
import SplitText from "../TextAnimations/SplitText/SplitText";
import VariableProximity from "../TextAnimations/VariableProximity/VariableProximity";
import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";
import Footer from "./Footer";

const Home = () => {
  const containerRef = useRef(null);

  const items = [
    {
      content:
        "Do you think cats purr because they're happy, or are they secretly trying to hypnotize you into giving them more treats?",
    },
    {
      content: (
        <p>
          Cats purr like a fuzzy little massage machine, but it's not always
          because they're happy. They might be purring to say, "Hey, I’m
          stressed out!" or "Ouch, that hurts, but I’ll heal with my magical
          purr powers!" (Purr-fect for recovery!)
        </p>
      ),
    },
    {
      content:
        "Do you ever wonder if your cat’s just pretending to sleep so they don’t have to deal with the real world?",
    },
    {
      content: (
        <p>
          {" "}
          Cats are sleep champions—anywhere from 12-16 hours a day! If they were
          humans, they’d definitely be those people who say, “I work hard… at
          napping.” They’re nocturnal little creatures that prefer the quiet of
          dawn and dusk for their “crusades” (or maybe just looking for food).
        </p>
      ),
    },
    {
      content:
        "Are cats secretly trying to start a revolution, one scratched-up couch at a time",
    },
    {
      content: (
        <p>
          Cats have these retractable claws, like built-in Swiss Army knives for
          self-defense, climbing, or just scratching your favorite couch. One
          minute they’re sheathed like tiny ninja swords, and the next, they’re
          unleashed for maximum drama!
        </p>
      ),
    },
    {
      content:
        "If cats could run 30 miles per hour, how long do you think it would take for them to catch that “mouse” you definitely left for them to find?",
    },
    {
      content: (
        <p>
          {" "}
          Your cat might look like a couch potato, but don’t let that fool you.
          In the wild, they could run a 5K in less than 30 minutes—if they could
          be bothered to get off the couch, of course. Their reflexes are
          lightning-fast and they’re always on the prowl... for snacks.
        </p>
      ),
    },
    {
      content:
        "If your cat could demand a throne, would they choose a velvet pillow or your lap?",
    },
    {
      content: (
        <p>
          In Egypt, cats were basically the Kardashians of the animal world.
          They were worshipped, adored, and—fun fact—killing a cat was a major
          crime. So yeah, no pressure, but if you have a cat at home, you’re
          basically living with royalty.
        </p>
      ),
    },
    {
      content:
        "Is your cat trying to ask for food, or are they secretly running a stand-up comedy routine just for you?",
    },
    {
      content: (
        <p>
          Cats don’t meow at each other. Nope, they reserve that for you, their
          human. So when your cat is meowing at you, it’s basically them saying,
          “Excuse me, servant, I demand food, attention, or both... NOW.”{" "}
        </p>
      ),
    },
    {
      content:
        "Is your cat secretly trying to start a new beauty trend with their 'all-lick, all-day' skincare routine?",
    },
    {
      content: (
        <p>
          Cats are the original clean freaks. They spend hours licking
          themselves like tiny fuzzy hygiene experts. It’s their version of a
          spa day, and they’re really good at it. If you ever want to start a
          beauty vlog, just follow your cat for tips.{" "}
        </p>
      ),
    },
    {
      content:
        "Do you think your cat's night vision is why they always know when you're about to eat something they want?",
    },
    {
      content: (
        <p>
          {" "}
          Cats have night vision that would make Batman jealous. They can see in
          nearly total darkness, which helps them track their "prey" (or maybe
          just that piece of kibble that fell behind the fridge).
        </p>
      ),
    },
    {
      content:
        "Is your cat kneading you because they're still trying to get milk... or do they just want to make you a human pancake?",
    },
    {
      content: (
        <p>
          When cats knead with their paws, they’re not just being adorable.
          They’re channeling their inner baby cat instincts, pretending you're
          their mom and they're trying to get milk. It’s like a tiny massage...
          and sometimes, it's a little too real when your cat is kneading your
          lap at 3 AM.
        </p>
      ),
    },
    {
      content:
        "If your whiskers could talk, would they be like, 'Hey, you're about to walk into a door,' or 'Time to knock something off the counter!'?",
    },
    {
      content: (
        <p>
          {" "}
          Imagine if your hair could tell you when you were about to bump into
          something. That's basically what a cat's whiskers do! They’re like
          little GPS systems, guiding your feline friend through the dark. They
          even measure if they can squeeze into that "totally-too-small" box!
        </p>
      ),
    },
  ];
  const message = `
   Here You can adopt a cat as well as talk with cat owners and discuss the problem related to health issue and can admire the cutness of 
      adorable cats
      `;
  return (
    <div>
      <br />
      <div className="title">
        <h1>
          <SplitText
            text="Welcome To Samishi Community"
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
      <br />
      <div>
        <img src={Logo} className="logo" alt="Cat logo" />
      </div>

      <div className="login">
        <a href="/login">
          <button>LOGIN</button>
        </a>
        <p className="or">
          or
          <br />
          <a href="/SignUp">Sign Up</a>
        </p>
      </div>

      <div>
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
      <pre>{message}</pre>
      <br />
      <div style={{ height: "650px", width: "100%" }}>
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="left"
          autoplay={true}
          autoplaySpeed={0.1}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
      <br />
      <br />
      <Footer />
    </div>
    
  );
};

export default Home;
