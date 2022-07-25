import { useEffect, useRef, useState } from "react";

const LazyImage = ({ styleClass, src, alt }) => {
  const imageRef = useRef(null);

  const [showImage, setShowImage] = useState(false);

  const intObserver = (ref, setShowImage) => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting) {
        setShowImage(true);
        observer.disconnect();
      }
    });
    observer.observe(ref);
  };

  useEffect(() => {
    intObserver(imageRef.current, setShowImage);
  }, []);

  if (showImage) {
    return <img src={src} alt={alt} className={"image-style " + styleClass} />;
  }

  return (
    <span
      ref={imageRef}
      src={src}
      alt={alt}
      className={"image-style " + styleClass}
    ></span>
  );
};

export default LazyImage;
