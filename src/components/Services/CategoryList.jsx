import React, { useRef } from "react";
import { Link as ScrollLink } from "react-scroll";

const CategoryList = ({ services, activeCategory, setActiveCategory, setActiveSubcategory }) => {
  const ulRef = useRef(null); // Ref for category scrolling

  const scrollToCategoryButton = (id) => {
    const button = document.getElementById(`btn-${id}`);
    if (button && ulRef.current) {
      const ulRect = ulRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const scrollPosition =
        buttonRect.left - ulRect.left + ulRef.current.scrollLeft - ulRect.width / 2 + buttonRect.width / 2;
      ulRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-[#eee] rounded-b-[20px] pl-3" style={{ top: 0, zIndex: 10 }}>
      <div ref={ulRef} className="flex space-x-4 overflow-x-auto py-2">
        {services.map((category) => (
          <ScrollLink
            key={category.id}
            to={category.id}
            smooth={true}
            duration={500}
            offset={-100}
            className={`px-4 w-[max-content] py-2 flex text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
              activeCategory === category.id ? "font-bold bg-primary text-white" : "text-gray-700"
            }`}
            onClick={() => {
              setActiveCategory(category.id);
              setActiveSubcategory(category.subcategories[0]?.id || null);
              scrollToCategoryButton(category.id);
            }}
            id={`btn-${category.id}`} // Unique ID for button reference
          >
            {category.title}
          </ScrollLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
