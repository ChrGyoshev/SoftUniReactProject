import BookLogo from "../assets/pictures/book_about.png";

const About = () => {
  return (
    <section className="about-wrapper">
      <div className="image-about">
        <img src={BookLogo} alt="" />
      </div>
      <article className="about-us">
        <h2>About Us</h2>
        <p>Welcome to BookBuzz!</p>
        <p>
          At BookBuzz, we are passionate about books and reading. We believe
          that books have the power to inspire, educate, and entertain, and we
          are dedicated to bringing the joy of reading to book lovers worldwide.
        </p>
      </article>
    </section>
  );
};

export default About;
