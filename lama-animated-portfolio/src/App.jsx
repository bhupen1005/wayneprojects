import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import LazyLoad from "react-lazyload";
import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="container">
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#home">
            <Hero />
          </section>
        </LazyLoad>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#services">
            <Services />
          </section>
        </LazyLoad>
        <LazyLoad height={"600vh"} offset={-100}>
          <Portfolio />
        </LazyLoad>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#contact">
            <Contact />
          </section>
        </LazyLoad>
      </div>
    </ErrorBoundary>
  );
};

export default App;
