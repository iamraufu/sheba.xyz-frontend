import { useState, useEffect, useRef } from 'react';
import MenuIcon from '../images/menu.svg'

const Sidebar = () => {
      const [isSidebarVisible, setIsSidebarVisible] = useState(false);
      const sidebarRef = useRef();

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                        closeFilter();
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);

      const toggleFilter = () => {
            setIsSidebarVisible(!isSidebarVisible);
      };

      const closeFilter = () => {
            setIsSidebarVisible(false);
      };

      return (
            <div className="relative">
                  <button
                        className="flex gap-2 justify-center items-center px-3 py-1 text-sm  shadow border border-gray-100 my-4 rounded-md w-fit transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={toggleFilter}
                  >
                        <img src={MenuIcon} alt="menu" />
                  </button>

                  {
                        isSidebarVisible && <div className="fixed inset-0 bg-black opacity-40 z-10" onClick={closeFilter}></div>
                  }

                  <div
                        ref={sidebarRef}
                        className={`fixed top-0 right-0 w-60 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'} z-20`}
                  >
                        <div className="h-screen">
                              <button onClick={closeFilter} className='bg-black'>Close</button>
                        </div>
                  </div>
            </div>
      );
};

export default Sidebar;