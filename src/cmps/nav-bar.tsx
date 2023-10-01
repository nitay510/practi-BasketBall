import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = (): JSX.Element => {
  const categories = [
    { name: 'חדירות', link: '/video/חדירות' },
    { name: 'הטעיות', link: '/video/הטעיות' },
    { name: 'כדרור', link: '/video/כדרור' },
    { name: 'קליעה', link: '/video/קליעה' },
    { name: 'הגנה', link: '/video/הגנה' },
    { name: 'פוסט אפ', link: '/video/פוסט' },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNextSlide = () => {
    if (startIndex + 3 < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCategories = categories.slice(startIndex, startIndex + 3);

  return (
    <nav className="nav-bar">
              <div className="slide-buttons">
        {startIndex > 0 && <button onClick={handlePreviousSlide}>&lt;</button>}
      </div>
      <div className="category-container">
        <div className="category-slider">
          {visibleCategories.map((category, index) => (
              <NavLink to={category.link}>
                {category.name}
              </NavLink>
          ))}
        </div>
      </div>
      <div className="slide-buttons">
        {startIndex + 3 < categories.length && <button onClick={handleNextSlide}>&gt;</button>}
      </div>
    </nav>
  );
};

export default NavBar;
