import React, { useState, useEffect } from 'react';

interface NavBarProps {
  topic: string;
  setTopic: (topic: string) => void;
  setFilterBy: (filterBy: string) => void;
}

/* this component is the bar where you choose category of videos */
export const NavBar = ({ setTopic, topic, setFilterBy }: NavBarProps): JSX.Element => {
  // Array of video categories
  const categories = [
    'חדירות',
    'הטעיות',
    'כדרור',
    'קליעה',
    'פוסט אפ',
  ];

  // Maximum number of visible categories at a time
  const maxVisibleCategories = 3;

  // State to track the start index of visible categories
  const [startIndex, setStartIndex] = useState(categories.indexOf(topic));

  // State to store the visible categories based on the start index
  const [visibleCategories, setVisibleCategories] = useState(
    categories.slice(startIndex, startIndex + maxVisibleCategories)
  );

  // Effect to update the visible categories when the topic changes
  useEffect(() => {
    const selectedIndex = categories.indexOf(topic);
    if (selectedIndex > 0) {
      setStartIndex(selectedIndex - 1);
    }
    setVisibleCategories(categories.slice(startIndex, startIndex + maxVisibleCategories));
  }, [topic]);

  // Effect to update the visible categories when the start index changes
  useEffect(() => {
    setVisibleCategories(categories.slice(startIndex, startIndex + maxVisibleCategories));
  }, [startIndex]);

  // Handle the click event on a category
  const handleCategoryClick = (selectedCategory: string) => {

    setTopic(selectedCategory);
    setFilterBy(selectedCategory);

    const selectedIndex = categories.indexOf(selectedCategory);
    if (selectedIndex !== -1) {
      if (selectedIndex < maxVisibleCategories / 2) {
        // Scroll to the beginning if selected category is too close to the start
        setStartIndex(0);
      } else if (selectedIndex > categories.length - maxVisibleCategories / 2) {
        // Scroll to the end if selected category is too close to the end
        setStartIndex(categories.length - maxVisibleCategories);
      } else {
        // Center the selected category
        setStartIndex(selectedIndex - Math.floor(maxVisibleCategories / 2));
      }
    }
  };

  // Handle the click event on the next slide button
  const handleNextSlide = () => {
    if (startIndex + maxVisibleCategories < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Handle the click event on the previous slide button
  const handlePreviousSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <nav className="nav-bar">
      <div className="slide-buttons">
        {/* Show previous slide button if not at the beginning */}
        {startIndex > 0 && <button onClick={handlePreviousSlide}>&lt;</button>}
      </div>
      <div className="category-container">
        <div className="category-slider">
          {/* Map through visible categories and create category items */}
          {visibleCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`category-item ${topic === category ? 'bold-category' : ''}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="slide-buttons">
        {/* Show next slide button if not at the end */}
        {startIndex + maxVisibleCategories < categories.length && (
          <button onClick={handleNextSlide}>&gt;</button>
        )}
      </div>
    </nav>
  );
};
