import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200",
    title: "Start Your Business Today",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
    title: "Top Trending Products",
  },
  {
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200",
    title: "50% Off for New Users",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="carousel">
      <img src={slides[index].img} alt={slides[index].title} />
      <div className="carousel__overlay" />

      <div className="carousel-text">
        <span className="carousel__eyebrow">EarlyBird Commerce</span>
        <h1>{slides[index].title}</h1>
        <p>Launch faster with a polished catalog, smart dashboard workflows, and an ecommerce experience designed to convert.</p>
      </div>

      <button
        className="prev"
        type="button"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        className="next"
        type="button"
        onClick={() => setIndex((index + 1) % slides.length)}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="carousel__dots">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            className={slideIndex === index ? "is-active" : ""}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
