import React, { useState, useEffect } from "react";

const Home = () => {
  const images = ["/דף בית 1.avif", "/דף בית 2.jpeg", "/דף בית 3.jpg","/דף בית.jpg","/דף בית 5.avif"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontFamily: "Brush Script MT",
            color: "white",
            fontSize: "8rem",
            textShadow: "3px 3px 8px black",
            position: "absolute",
            top: "23%", 
            transform: "translateY(-50%)",
          }}
        >
          Flavors of Festivity
        </h1>
      </div>
    </>
  );
};

export default Home;
