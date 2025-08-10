import React from 'react';
import { Search, LayoutGrid, Expand, Bell, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  instituteName?: string;
}

interface HeaderProps {
  user: User | null;
  compactMenu: boolean;
  quickSearch: boolean;
  setQuickSearch: (show: boolean) => void;
  notificationsPanel: boolean;
  setNotificationsPanel: (show: boolean) => void;
  activitiesPanel: boolean;
  setActivitiesPanel: (show: boolean) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  compactMenu,
  quickSearch: _quickSearch,
  setQuickSearch,
  notificationsPanel: _notificationsPanel,
  setNotificationsPanel,
  activitiesPanel: _activitiesPanel,
  setActivitiesPanel,
  onLogout,
}) => {
  const requestFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  };

  return (
    <div
      className={`fixed top-0 inset-x-0 mt-2.5 z-10 mx-2.5 h-[65px] bg-gradient-to-r from-blue-600 to-blue-800 rounded-[0.6rem] shadow-lg transition-[padding] duration-100 pl-[84px] xl:pl-[275px] ${
        compactMenu ? 'group-[.side-menu--collapsed]:xl:pl-[100px]' : ''
      } xl:-ml-2.5`}
    >
      <div className="flex items-center w-full h-full px-5">
        {/* Breadcrumb */}
        <div className="flex-1 hidden xl:block">
          <nav className="flex items-center space-x-2 text-white/70">
            <span>App</span>
            <span>/</span>
            <span>Dashboards</span>
            <span>/</span>
            <span className="text-white">Institute Management</span>
          </nav>
        </div>

        {/* Search */}
        <div className="relative justify-center flex-1 hidden xl:flex">
          <button
            onClick={() => setQuickSearch(true)}
            className="bg-white/[0.12] w-[350px] flex items-center py-2 px-3.5 rounded-[0.5rem] text-white/60 cursor-pointer hover:bg-white/20 transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
            <div className="ml-2.5 mr-auto">Quick search...</div>
            <div>⌘K</div>
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center flex-1">
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setActivitiesPanel(true)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              title="Activities"
            >
              <LayoutGrid className="text-white w-[18px] h-[18px]" />
            </button>
            
            <button
              onClick={requestFullscreen}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              title="Fullscreen"
            >
              <Expand className="text-white w-[18px] h-[18px]" />
            </button>
            
            <button
              onClick={() => setNotificationsPanel(true)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors relative"
              title="Notifications"
            >
              <Bell className="text-white w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </button>
          </div>

          {/* User Menu */}
          <div className="ml-5 relative group">
            <button className="overflow-hidden rounded-full w-[36px] h-[36px] border-[3px] border-white/[0.15] bg-white/20 flex items-center justify-center text-white font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b border-gray-100">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
                <div className="text-xs text-blue-600 mt-1">{user?.role}</div>
              </div>
              
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                  <LayoutGrid className="w-4 h-4 mr-3" />
                  Settings
                </button>
              </div>
              
              <div className="border-t border-gray-100">
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;