import { useState, useEffect } from "react";

function useWindowWidth(
  mobile = 768,
  tablet = 1024,
  desktop = 1280,
  desktopLarge = 1536
) {
  const [screenWidth, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    setWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth <= mobile;
  const isTablet = screenWidth <= tablet;
  const isDesktop = screenWidth <= desktop;
  const isDesktopLarge = screenWidth <= desktopLarge;

  return { screenWidth, isMobile, isTablet, isDesktop, isDesktopLarge };
}

export default useWindowWidth;
