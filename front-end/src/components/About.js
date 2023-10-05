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

      <article className="our-story">
        <h3>Our Story</h3>
        <p>
          BookBuzz was founded by Christiyan Gyoshev with a simple yet powerful
          vision: to create an online bookstore that offers an extensive
          collection of books across various genres and provides a seamless
          shopping experience for our customers. Our journey began 2020, and
          since then, we have grown to become a trusted destination for book
          enthusiasts.
        </p>
      </article>

      <article className="our-mission">
        <h3>Our Mission</h3>
        <p>
          At BookBuzz, our mission goes beyond just selling books.We strive to
          be the platform where readers of all ages and interests can embark on
          literary journeys that inspire, educate, and entertain.
        </p>

        <p>
          Through our platform, we aim to foster a love for reading and promote
          literacy worldwide.
        </p>
      </article>

      <article className="benefits">
        <h3>What Sets Us Apart</h3>
        <p>
          <b>1: User-Friendly Interface: </b>
          Our website is designed with your convenience in mind. Browse, search,
          and find your next favorite book with ease.
        </p>
        <p>
          <b>2: Secure Shopping: </b>We take the security of your information
          seriously. Shop with confidence knowing your data is protected.
        </p>

        <p>
          <b>3: Expert Recommendations: </b>Looking for a new book to read? Our
          team of book enthusiasts curates special collections and
          recommendations to help you discover your next literary adventure.
        </p>
      </article>

      <article className="contact">
        <h3>Get in Tocuh</h3>
        <p>
          We'd love to hear from you! Whether you have a book suggestion, a
          question about our services, or just want to say hello, feel free to
          reach out to us at{" "}
        </p>
        <p>
          <a href="mailto:BookBuzz@book.bg">BookBuzz@book.bg</a>
        </p>

        <p>Thank you for choosing BookBuzz. Happy reading!</p>
      </article>
    </section>
  );
};

export default About;
