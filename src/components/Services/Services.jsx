import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";
import { Spinner } from "@telegram-apps/telegram-ui";
import FooterFlex from "../FooterFlex/FooterFlex";
import axios from "axios";
import { Link as ScrollLink, Element } from "react-scroll"; // Import scroller
import ModelLink from "./ModelLink";
import Example from "../Example";
import { LocalText } from "../LocakText/LocalText";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "All";
  const ulRef = useRef(null); // Ref for category scrolling
  const ulRef2 = useRef(null); // Ref for subcategory scrolling

  // Fetch services data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("https://menuapp.ru/api/v1");
        setServices(data.categories);
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 console.log(services)
  useEffect(() => {
    if (activeSubcategory) {
      scrollToSubcategoryButton(activeSubcategory);
    }
  }, [activeSubcategory]);

  // Set active category based on URL params and scroll to it
  useEffect(() => {
    if (selectedCategory !== "All") {
      setActiveCategory(selectedCategory);
      scrollToCategoryButton(selectedCategory); // Scroll to the active category button
    }
  }, [selectedCategory]);

  // Automatically set the first subcategory as active when the category becomes active
  useEffect(() => {
    if (activeCategory) {
      const category = services.find((cat) => cat.id === activeCategory);
      if (category && category.subcategories.length > 0) {
        setActiveSubcategory(category.subcategories[0].id); // Auto-select first subcategory
        scrollToSubcategoryButton(category.subcategories[0].id); // Scroll to the first subcategory
      }
    }
  }, [activeCategory, services]);

  
  useEffect(() => {
    const handleScroll = () => {
      let foundActive = false;

      // Calculate 70% of the viewport height
      const seventyPercentVisible = window.innerHeight * 0.7;

      // Check for active category
      for (const category of services) {
        const categoryElement = document.getElementById(category.id);
        if (categoryElement) {
          const rect = categoryElement.getBoundingClientRect();

          // Check if 70% of the section is in the viewport
          if (rect.top <= window.innerHeight && rect.bottom >= (window.innerHeight - seventyPercentVisible)) {
            setActiveCategory(category.id);
            scrollToCategoryButton(category.id);

          
            foundActive = true;
            break; // Break out of loop after finding the active category
          }
        }
      }

      // Check for active subcategory
      for (const category of services) {
        if (category.subcategories) {
          for (const subcategory of category.subcategories) {
            const subcategoryElement = document.getElementById(subcategory.id);
            if (subcategoryElement) {
              const rect = subcategoryElement.getBoundingClientRect();

              // Check if 70% of the subcategory section is in the viewport
              if (rect.top <= window.innerHeight && rect.bottom >= (window.innerHeight - seventyPercentVisible)) {
                setActiveSubcategory(subcategory.id);
                scrollToSubcategoryButton(subcategory.id);
                foundActive = true;
                break; // Break out of the loop once found
              }
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [services]); // Only depend on services

  const handleCardClick = (item) => {
    setActiveItem(item);
    setIsModalOpen(true);
  };

  // Scroll the category button into view
  const scrollToCategoryButton = (id) => {
    const button = document.getElementById(`btn-${id}`);
    if (button && ulRef.current) {
      const ulRect = ulRef.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const scrollPosition =
        buttonRect.left - ulRect.left + ulRef.current.scrollLeft - ulRect.width / 2 + buttonRect.width / 2;

      ulRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll the subcategory button into view
  const scrollToSubcategoryButton = (id) => {
    const button = document.getElementById(`btn-${id}`);
    if (button && ulRef2.current) {
      const ulRect = ulRef2.current.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const scrollPosition =
        buttonRect.left - ulRect.left + ulRef2.current.scrollLeft - ulRect.width / 2 + buttonRect.width / 2;

      ulRef2.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return (
      <div className=" min-h-[700px] bg-appColor relative justify-center items-center">
           <div className="absolute h-[40px] w-[100%] bg-appColor top-[-30px] rounded-t-[40px] "></div>
           <div>
        <Example service={services} onClick ={handleCardClick} loading={loading} />
        </div>
        <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-appColor rounded-b-[20px] pl-3" style={{ top: 0, zIndex: 10 }}>
         <div  className="flex space-x-4 overflow-x-auto py-2">
         {Array.from({ length: 7 }).map((_, index) => (
  <div
    key={index}
    className="px-4 shimmer min-w-[80px] min-h-[36px] py-2 bg-[white] flex text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap"
  >
    
    
  </div>
))}
        </div>
       
   
</div> 
        <div>
        <ServiceCard loading={loading} service={[]}  titleLoad={[{title:LocalText.Services.title1 },{title:LocalText.Services.title2},{title:LocalText.Services.title3} ,{title:LocalText.Services.title4} ,{title:LocalText.Services.title5 },{title:LocalText.Services.title6} ,{title:LocalText.Services.title7} ,{title:LocalText.Services.title8} ,{title:LocalText.Services.title9 },{title:LocalText.Services.title10} ,{title:LocalText.Services.title11},{title:LocalText.Services.title12} ,{ title:LocalText.Services.title13}]}/>
        </div>
      </div>
    );
  }

  return (
    <div className=" relative z-[11] bg-appColor">
      
      <div className="absolute h-[40px] w-[100%] bg-appColor top-[-30px] rounded-t-[40px] "></div>
     
      <div className="container relative jawdat">
        
       <Example service={services} onClick ={handleCardClick} loading={loading}/> 
        {/* Categories List */}
        {
         <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-appColor rounded-b-[20px] pl-3" style={{ top: 0, zIndex: 10 }}>
         <div ref={ulRef} className="flex space-x-4 overflow-x-auto py-2">
         {services.map((category) => (
          <ScrollLink
          key={category.id}
          to={category.id}
          smooth={true}
          duration={500}
          offset={-150}
          className={`px-4 w-[max-content] py-2 flex text-sm font-medium rounded-full transition-all m-[0] duration-300 whitespace-nowrap ${
            activeCategory === category.id ? "font-bold bg-primary text-white" : "text-gray-700"
          }`}
          onClick={() => {
            setActiveCategory(category.id);
            setActiveSubcategory(category.subcategories[0]?.id || null); // Set first subcategory when category changes
          }}
          id={`btn-${category.id}`} // Unique ID for button reference
         >
          {category.title}
         </ScrollLink>
          ))}
        </div>
        <ModelLink services={services} activeCategory={activeCategory} activeSubcategory={activeSubcategory} />
   
</div> 
}

        {/* Subcategory List */}
        { activeCategory && services.find((cat) => cat.id === activeCategory)?.subcategories.length > 0 && (
  <div className="flex z-[1000] items-center top-0 h-16 sticky inset-x-0 bg-subcategories rounded-b-[20px] pl-3" style={{ top: '60px' }}>
    
    <div ref={ulRef2} className="flex space-x-2 overflow-x-auto">
      {services.find((cat) => cat.id === activeCategory).subcategories.map((subcategory) => (
        <ScrollLink
          key={subcategory.id}
          to={subcategory.id} // Link to subcategory id
          smooth={true}
          duration={500}
          offset={-150} // Adjust scroll position (header offset)
          className={`px-4 py-1 block text-xs font-medium rounded cursor-pointer transition-all duration-300 whitespace-nowrap w-[max-content] ${
            activeSubcategory === subcategory.id ? "font-bold bg-primary text-white" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveSubcategory(subcategory.id);
            scrollToSubcategoryButton(subcategory.id); // Scroll to the subcategory button
          }}
          id={`btn-${subcategory.id}`} // Unique ID for button reference
        >
          {subcategory.title}
        </ScrollLink>
      ))}
    </div>
  </div>
)}

        

        {/* Services Grid */}
        <div className="grid gap-4 p-4 pb-[100px] grid-cols-1 h-[] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative">
          {services.map((category) => (
            <div key={category.id} id={category.id}>
              <Element name={category.id}>
                <h1 className="text-lg text-center my-[20px] font-bold">{category.title}</h1>
                {category.items.length > 0 ? (
                  category.items.map((item) => (
                    <ServiceCard key={item.id} service={item} onClick={() => handleCardClick(item)} loading={loading} />
                  ))
                ) : (
                  ""
                )}

                {/* Subcategory section */}
                {category.subcategories && category.subcategories.length > 0 ? (
                  category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} id={subcategory.id} className="mt-[69px]">
                      <Element name={subcategory.id}>
                        {subcategory.items && subcategory.items.length > 0 && (
                          <div>
                            <h2 className="text-md mb-[30px] text-center my-4 font-semibold">{subcategory.title}</h2>
                            {subcategory.items.map((item) => (
                              <ServiceCard key={item.id} service={item} onClick={() => handleCardClick(item)}  loading={loading}/>
                            ))}
                          </div>
                        )}
                      </Element>
                    </div>
                  ))
                ) : (
                  ""
                )}
              </Element>
            </div>
          ))}
        </div>

        <ServiceModal isOpen={isModalOpen} onClose={setIsModalOpen} service={activeItem} />
        <FooterFlex />
      </div>
    </div>
  );
};

export default Services;
