import { useState, useRef, useEffect } from "react";
import { LocalText } from "./LocakText/LocalText";
import image1 from "../assets/logo-b29-marino.svg";
import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { Fa500Px } from "react-icons/fa";
import iconYandex from "../assets/ico/ico-ya-r.svg"
import iconYandexMap from "../assets/ico/ico-ya-map.svg"
import iconShare from "../assets/ico/ico-share.svg"
import iconNelegram from "../assets/ico/ico-telegram.svg"
import iconUserIco from "../assets/ico/ico-logo-genn.svg"
import WebApp from "@twa-dev/sdk"; // Assuming this package works in JavaScript
const TG_BOT_TOKEN = "7347780887:AAGiNI5Pvs1iHHONlBV3zQibnC_UFm7slys"; // Replace with your actual Bot Token

const LandingPages = () => {
  const [userPhotoUrl, setUserPhotoUrl] = useState(iconUserIco); // Default icon
  const [showReadMore, setShowReadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [showIframeComment, setShowIframeComment] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const paragraphRef = useRef(null);
  const [initData, setInitData] = useState(null); 
  useEffect(() => {
    const data = WebApp.initDataUnsafe;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      console.error("❌ Open this app in Telegram");
      return;
    }
    console.log("✅ Telegram WebApp Available", data);
    setInitData(data); // Store as an object
    WebApp.expand();
  }, []);
  useEffect(() => {
    // Check the height of the paragraph element to determine if "Read More" should be shown
    if (paragraphRef.current && paragraphRef.current.clientHeight >= 16) {
      setShowReadMore(true);
    }
  }, []);

  const handleModalOpenChange = (open) => {
    setIsModalOpen(open);
    if (!open) setShowIframe(false); // Reset iframe state when modal closes
  };

  const handleModalCommentOpenChange = (open) => {
    setShowIframeComment(open);
  };
  const handleModalShareOpenChange = (open) => {
    setShowShareModel(open);
  };

  // Extract user_id and fetch profile photo using Telegram Bot API
  useEffect(() => {
    const data = WebApp.initDataUnsafe;
    if (!data || !data.user) {
      console.error("❌ User data is not available. Ensure the app is launched within Telegram.");
      return;
    }

    const userId = data.user.id; // Fetch the user ID from initDataUnsafe

    const fetchUserPhoto = async () => {
      try {
        const response = await fetch(
          `https://api.telegram.org/bot${TG_BOT_TOKEN}/getUserProfilePhotos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, limit: 1 }),
            cache: "no-store" // Prevent cache on the main request
          }
        );

        const data = await response.json();
        if (data.ok && data.result.photos.length > 0) {
          const fileId = data.result.photos[0][0].file_id;

          const fileResponse = await fetch(
            `https://api.telegram.org/bot${TG_BOT_TOKEN}/getFile`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ file_id: fileId }),
              cache: "no-store" // Prevent cache on the file fetch request
            }
          );

          const fileData = await fileResponse.json();
          if (fileData.ok) {
            const fileUrl = `https://api.telegram.org/file/bot${TG_BOT_TOKEN}/${fileData.result.file_path}`;
            setUserPhotoUrl(`${fileUrl}?t=${new Date().getTime()}`); // Cache-bust by adding timestamp
          }
        }
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };

    fetchUserPhoto();
  }, []);

  return (
    <div className="relative bg-[url('./assets/bg/bg-1.webp')] bg-cover bg-center bg-no-repeat dark:text-white text-center pb-20 px-6">
     
      <div className="absolute inset-0 bg-black opacity-50"></div>


  <div id="genn-LandingPage-TelegramHeader " className="flex justify-between pt-[10px] z-[9999] relative p-[10px] bg-[#0000045] rounded-b-[30px] rounded-left-[30px] border-[2px] border-[#7a329f] border-top-[0] " >
    <div className="flex ">
      <div className="twailweenchange1"><img src={userPhotoUrl} alt={LocalText.LandingPagesOrg.description} className="w-[35px]" /></div>
      <div className="text-[white] text-[20px] ml-[10px]">{initData?.user?.first_name || "jawdat"}</div>
    </div>
    <div className="flex twailweenchange2">
      <div className="w-[30px]"><img src={iconNelegram} alt={LocalText.LandingPagesOrg.description} /></div>
      <div className="twailweenchange3"><div 
  className="twailweenchange3" 
  onClick={() => WebApp.openTelegramLink(LocalText.LandingPagesOrg.telegramLink)}
>
  {LocalText.LandingPagesOrg.telegramTitl}
</div>
 </div>
    </div>
    </div>    
      
      <div className="relative mx-auto text-white">
        {/* Header Section */}
        <div id="genn-LandingPage-Org-logo" className="flex justify-center py-[40px] ">
          <img src={image1} alt="Logo" className="w-[180px] h-[45px]" />
        </div>
        <h1 id="genn-LandingPage-Org-titl-h1"className="p-0 m-0 text-[26px] leading-[20px] text-white font-[100] font-bold">
          <>
            <span className="text-[26px]">{LocalText.LandingPagesOrg.titleH1}</span>            
            <br />
            <span className="text-[14px]">{LocalText.LandingPagesOrg.titleH1sub}</span>
          </>
        </h1>

        {/* Paragraph with Read More functionality */}
        <div id="genn-LandingPage-Org-description" ref={paragraphRef} className="mt-[20px] max-h-[168px] overflow-hidden text-ellipsis">
          {LocalText.LandingPagesOrg.description}
        </div>
        <div id="genn-LandingPage-Org-blok-Ici" className="flex justify-between mt-[20px]"> {/* Иконки карта, отзывы, расшарить */}
        {showReadMore && LocalText.LandingPagesOrg.descriptionLong !== "" &&        
        (
           
          <button
            onClick={() => {
              setShowIframe(false); // Show text in modal
              setIsModalOpen(true);
            }}
            className=" block genn-ico-redmore  bg-[#fff] rounded-[100px] py-[0] px-[20px]  text-buttonOrgReadMore text-[14px]"
          >
            {LocalText.LandingPagesOrg.readMoreButton}
          </button>
        )}
       
        {/* Button to show map iframe in modal */}
        <div id="genn-LandingPage-Org-Ici" className="flex gap-[10px]">
        <button
          onClick={() => {
            setShowIframe(true); // Show map iframe in modal
            setIsModalOpen(true);
          }}
          className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px] decoration-auto"
        >
          <img src={iconYandexMap} alt={LocalText.LandingPagesOrg.description} />
        </button>
        <button
          onClick={() => {
            setShowIframeComment(true); // Show comments iframe in modal
          }}
          className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px]"
        >
          <span>
          
          <img src={iconYandex} alt={LocalText.LandingPagesOrg.showCommentsButton}  />
          </span>
        </button>
        <button
          onClick={() => {
            setShowShareModel(true); // Show comments iframe in modal
          }}
          className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px]"
        >
          <span>
          
          <img src={iconShare} alt={LocalText.LandingPagesOrg.showCommentsButton}  />
          </span>
        </button>
        </div>
        </div>


        {/* Модальные окна для иконок организации - начало */}
        {/* Modal to show either text or map iframe */}
        <Modal
          header={<ModalHeader style={{ backgroundColor: "transparent" }}>Service Details</ModalHeader>}
          open={isModalOpen}
          onOpenChange={handleModalOpenChange}
        >
          <div className="p-6">
            {showIframe ? (
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeea953657fb7f2652860a7c81e04f3adb78e6e68ebd873b32760a348ff0fd9c7&amp;source=constructor"
                width="100%"
                height="600"
                frameBorder="0"
              ></iframe>
            ) : (
             
              <p>{LocalText.LandingPagesOrg.descriptionLong}</p>
            )}
          </div>
        </Modal>

        {/* Button to show comments iframe in a second modal */}
        

        {/* Second modal for comments iframe */}
        <Modal
          header={<ModalHeader style={{ backgroundColor: "transparent" }}>Comments</ModalHeader>}
          open={showIframeComment}
          onOpenChange={handleModalCommentOpenChange}
        >
          <div className="p-6">
            <iframe
              style={{
                width: "100%",
                height: "600px",
                border: "1px solid #e6e6e6",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              src="https://yandex.ru/maps-reviews-widget/107780353451?comments"
              frameBorder="0"
            ></iframe>
          </div>
        </Modal>
       
        
        <Modal
          header={<ModalHeader style={{ backgroundColor: "transparent" }}>Comments</ModalHeader>}
          open={showShareModel}
          onOpenChange={handleModalShareOpenChange}
        >
          <div className="p-6">
            <div>{LocalText.LandingPagesOrg.shareText}</div>
          </div>
        </Modal>
        {/* Модальные окна для иконок организации - окончание */}
      </div>
    </div>
  );
};

export default LandingPages;
