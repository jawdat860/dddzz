import React, { useState, useEffect, useContext } from "react";
import ServiceCardDisFa from "./ServiceCardDisFa";

// import ServiceModalFa from "./ServiceModalFa";

import FooterFlex from "../FooterFlex/FooterFlex";
import like from "../../assets/ico-like-2.svg"

import CartContext from "../store/CartContext";
import ServiceModal from "../Services/ServiceModal";
import ServiceCard from "../Services/ServiceCard";
import { LocalText } from "../LocakText/LocalText";

const ServicesDisFa = () => {
  const [services, setServices] = useState([]);
  // const [loading, setLoading] = useState(true);
 
  // const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const ctxCart = useContext(CartContext)
  useEffect(() => {
    setServices(ctxCart.itemsDisFavourite)
  }, [ctxCart.itemsDisFavourite]);

  const handleCardClick = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };
  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };
 
  // const filteredServices =
  //   selectedCategory === "All"
  //     ? services
  //     : services.filter((service) => service.category === selectedCategory);

  

  // if (error) {
  //   return <p className="text-center text-red-500">{error}</p>;
  // }

  return (
    <div className=" bg-[#eee] min-h-[100vh]  relative z-[11] ">
    <h5 className=" p-[50px] leading-[1] text-[#8ba2be] font-bold mb-[15px] text-[20px] text-center">{LocalText.disLikeServices.titleHead}</h5>
    { ctxCart.itemsDisFavourite.length === 0 && <><p className="py-[20px] leading-[1.2] text-center  ">{LocalText.disLikeServices.discriptionHead}</p>
      <div className="w-[100%] flex justify-center items-center p-[50px]">
      <div className="border-[3px] border-solid border-[#8ba2be] rounded-[200px] p-[50px] bg-like-nolike " >
        <img src={like} className="w-[80px]"/></div></div>  </>    }
    {ctxCart.itemsDisFavourite.length > 0 &&
    <>
    <div className="grid gap-4 p-4 pb-[100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative mt-[10px]">
          
        
           {services.map((service)=> <ServiceCard
            
              key={service.id}
              service={service}
              onClick={() => handleCardClick(service)}
             
            />
          )
          }
        </div>
      
        
       <ServiceModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        service={activeService}

        
      /> 
      </>
      }
      <FooterFlex /> 
    </div>
    
  );
};

export default ServicesDisFa;

