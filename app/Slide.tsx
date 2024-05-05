import React from 'react';

interface SlideProps {
  imageUrl: string;
  caption: string;
}

const Slide: React.FC<SlideProps> = ({ imageUrl, caption }) => {
  return (
    <div className="slide">
      <img src={imageUrl} alt="slide" />
      <p>{caption}</p>
    </div>
  );
};

export default Slide;
