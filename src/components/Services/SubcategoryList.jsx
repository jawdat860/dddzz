import React, { useRef } from "react";
import { Link as ScrollLink } from "react-scroll";

const SubcategoryList = ({ services, activeCategory, activeSubcategory, setActiveSubcategory }) => {
  const ulRef2 = useRef(null); // Ref for subcategory scrolling

  const scrollToSubcategoryButton = (id) => {
    const button = document.getElementById(`btn-k-${id}`);
    if (button && ulRef2.current) {
      const ulRect = ulRef2.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const scrollPosition =
        buttonRect.left - ulRect.left + ulRef2.current.scrollLeft - ulRect.width / 2 + buttonRect.width / 2;
      ulRef2.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-white rounded-b-[20px] pl-3" style={{ top: "60px" }}>
      <div ref={ulRef2} className="flex space-x-2 overflow-x-auto">
        {services
          .find((cat) => cat.id === activeCategory)
          ?.subcategories.map((subcategory) => (
            <ScrollLink
              key={subcategory.id}
              to={subcategory.id} // Link to subcategory id
              smooth={true}
              duration={500}
              offset={-100}
              className={`px-4 py-1 block text-xs font-medium rounded cursor-pointer transition-all duration-300 whitespace-nowrap w-[max-content] ${
                activeSubcategory === subcategory.id ? "font-bold bg-primary text-white" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveSubcategory(subcategory.id);
                scrollToSubcategoryButton(subcategory.id);
              }}
              id={`btn-k-${subcategory.id}`} // Unique ID for button reference
            >
              {subcategory.title}
            </ScrollLink>
          ))}
      </div>
    </div>
  );
};

export default SubcategoryList;
