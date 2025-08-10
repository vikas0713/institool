import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignJustify, X } from 'lucide-react';
import { useAppSelector } from '../../../store/hooks';
import type { MenuItem } from '../../../types/menu';
import SidebarMenu from './SidebarMenu';

interface SidebarProps {
  compactMenu: boolean;
  compactMenuOnHover: boolean;
  setCompactMenuOnHover: (hover: boolean) => void;
  activeMobileMenu: boolean;
  setActiveMobileMenu: (active: boolean) => void;
  toggleCompactMenu: (event: React.MouseEvent) => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  compactMenu,
  compactMenuOnHover,
  setCompactMenuOnHover,
  activeMobileMenu,
  setActiveMobileMenu,
  toggleCompactMenu,
  currentPath,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { menuItems } = useAppSelector((state) => state.menu);
  const navigate = useNavigate();

  const getVisibleMenuItems = (items: MenuItem[]): MenuItem[] => {
    if (!user) return [];
    
    return items.map((item) => ({
      ...item,
      subMenus: item.subMenus ? getVisibleMenuItems(item.subMenus) : undefined
    })).filter((item) => {
      if (!item.visible || !item.enabled) return false;
      
      // Check permissions
      if (item.permissions && !item.permissions.includes(user.role)) {
        return false;
      }
      
      return true;
    });
  };

  const visibleMenuItems = getVisibleMenuItems(menuItems);

  return (
    <div
      className={`fixed top-0 left-0 z-50 side-menu group ${
        compactMenu ? 'side-menu--collapsed' : ''
      } ${compactMenuOnHover ? 'side-menu--on-hover' : ''}`}
    >
      {/* Header Bar */}
      <div className="fixed top-0 inset-x-0 mt-2.5 z-10 mx-2.5 h-[65px] bg-gradient-to-r from-blue-600 to-blue-800 rounded-[0.6rem] shadow-lg flex before:content-[''] before:absolute before:inset-x-0 before:-mt-2.5 before:h-2.5 before:backdrop-blur">
        <div
          className={`flex-none flex items-center z-10 px-5 h-full xl:w-[275px] overflow-hidden xl:-ml-2.5 relative duration-300 ${
            compactMenu
              ? 'group-[.side-menu--collapsed]:xl:w-[100px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]'
              : ''
          } before:content-[''] before:hidden before:xl:block before:absolute before:right-0 before:border-r before:border-dotted before:border-white/[0.15] before:h-4/6 before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:hidden after:content-[''] after:hidden after:xl:block after:absolute after:w-full after:h-full after:bg-[length:100vw_65px] after:z-[-1] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800`}
          onMouseOver={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(true);
          }}
          onMouseLeave={(event) => {
            event.preventDefault();
            setCompactMenuOnHover(false);
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            className="hidden xl:flex items-center ml-2.5 transition-[margin] group-[.side-menu--collapsed]:xl:ml-6 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-2.5"
          >
            <div className="transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180">
              <div className="w-[18px] h-[18px] relative -rotate-45 [&_div]:bg-white">
                <div className="absolute w-[21%] left-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
                <div className="absolute w-[21%] inset-0 m-auto h-[120%] rounded-full"></div>
                <div className="absolute w-[21%] right-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
              </div>
            </div>
            <div className="ml-3.5 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0 transition-opacity text-white font-medium">
              {user?.instituteName || 'INSTITUTE'}
            </div>
          </a>

          {/* Collapse Button */}
          <a
            href="#"
            onClick={toggleCompactMenu}
            className="hidden group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] xl:flex items-center justify-center w-[20px] h-[20px] ml-auto text-white border rounded-full border-white/40 hover:bg-white/5"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[1.3]" />
          </a>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-1 xl:hidden">
            <button
              onClick={(event) => {
                event.preventDefault();
                setActiveMobileMenu(true);
              }}
              className="p-2 rounded-full hover:bg-white/5"
            >
              <AlignJustify className="w-[18px] h-[18px] text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div
        className={`z-10 xl:ml-0 xl:z-0 fixed shadow-xl xl:shadow-none bg-white w-[275px] border-dotted border-slate-400/60 duration-300 transition-[width,margin] ${
          compactMenu
            ? 'group-[.side-menu--collapsed]:xl:w-[100px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-slate-50 group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px]'
            : ''
        } xl:pt-[65px] xl:pl-2.5 xl:relative overflow-hidden border-r h-screen flex flex-col dark:bg-darkmode-800 dark:group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-slate-50/10 before:content-[''] before:transition-colors before:w-screen before:h-screen before:absolute before:bg-texture-black before:bg-contain before:bg-fixed before:bg-[center_-20rem] before:bg-no-repeat before:bg-slate-50 group-[.side-menu--collapsed.side-menu--on-hover]:xl:before:bg-white dark:before:bg-darkmode-800 dark:group-[.side-menu--collapsed.side-menu--on-hover]:xl:before:bg-darkmode-800 dark:before:bg-texture-white after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:z-[-1] after:xl:hidden ${
          activeMobileMenu
            ? 'ml-0 after:block'
            : '-ml-[275px] after:hidden'
        }`}
        onMouseOver={(event) => {
          event.preventDefault();
          setCompactMenuOnHover(true);
        }}
        onMouseLeave={(event) => {
          event.preventDefault();
          setCompactMenuOnHover(false);
        }}
      >
        {/* Mobile Close Button */}
        <div
          className={`fixed ml-[275px] w-10 h-10 items-center justify-center xl:hidden ${
            activeMobileMenu ? 'flex' : 'hidden'
          }`}
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              setActiveMobileMenu(false);
            }}
            className="mt-5 ml-5"
          >
            <X className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="w-full h-full z-20 px-5 mt-3.5 overflow-y-auto overflow-x-hidden pb-3 scrollbar-hide">
          <SidebarMenu
            menuItems={visibleMenuItems}
            currentPath={currentPath}
            compactMenu={compactMenu && !compactMenuOnHover}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;