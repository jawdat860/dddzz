import React from 'react';

const Example = ({ service, onClick, loading }) => {
  return (
    <div className='pb-[10px] overflow-x-scroll mb-[20px] h-[140px]'>
      <div className="flex pl-[1rem]">
        {loading
          ? // Render placeholder loading cards
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[260px] h-[120px] rounded-[25px] shadow-md bg-[white] mr-[1rem] animate-pulse flex items-center justify-center shimmer"
              >
                <p className="text-gray-500"></p>
              </div>
            ))
          : // Render actual content when loading is false
            service.map((slide) =>
              slide.items.map((slide1) => (
                <div
                  key={slide1.id}
                  className="min-w-[260px] h-[120px] relative rounded-[25px] shadow-md bg-cover mr-[1rem] bg-[url('./assets/jawdat.jpg')]"
                  onClick={() => onClick(slide1)}
                >
                  <div className="mt-2 max-h-[100%] px-[10px] flex justify-between">
                    <div className='text-[17px] leading-4 p-[10px] max-w-[70%] h-[100%] font-semibold text-white'>
                      {slide1.title}
                    </div>
                  </div>
                  <p className='text-lg text-white font-bold bg-gray-600 px-[10px] p-[5px] rounded-tl-[25px] rounded-br-[25px] absolute right-0 bottom-0'>
                    {slide1.price}$
                  </p>
                </div>
              ))
            )}
      </div>
    </div>
  );
};

export default Example;
