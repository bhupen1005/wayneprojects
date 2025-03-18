import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadComponentProps {
  children: ReactNode;
}

const LazyLoadComponent = ({ children }: LazyLoadComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.2 } // Trigger when 10% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ height: "200px" }} />}
    </div>
  );
};

export default LazyLoadComponent;
