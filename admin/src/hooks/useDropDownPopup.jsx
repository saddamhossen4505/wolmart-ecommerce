import { useEffect, useRef, useState } from "react";

const useDropDownPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  // Call-back from isOpen.
  const dropDownMenu = () => {
    setIsOpen(!isOpen);
  };

  // handleFindOutSideArea.
  const handleFindOutSideArea = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect((e) => {
    document.addEventListener("click", handleFindOutSideArea);
    return () => {
      document.removeEventListener("click", handleFindOutSideArea);
    };
  }, []);

  return { isOpen, dropDownMenu, dropDownRef };
};

export default useDropDownPopup;
