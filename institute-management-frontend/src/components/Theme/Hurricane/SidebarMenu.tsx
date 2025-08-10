import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { MenuItem } from '../../../types/menu';

interface SidebarMenuProps {
  menuItems: MenuItem[];
  currentPath: string;
  compactMenu: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menuItems,
  currentPath,
  compactMenu,
}) => {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (menuId: string) => {
    if (compactMenu) return; // Don't allow submenu expansion when compact
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subMenus && item.subMenus.length > 0) {
      toggleSubmenu(item.id);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item: MenuItem): boolean => {
    if (item.path === currentPath) return true;
    if (item.subMenus) {
      return item.subMenus.some((subItem) => isActive(subItem));
    }
    return false;
  };

  const hasActiveChild = (item: MenuItem): boolean => {
    if (item.subMenus) {
      return item.subMenus.some((subItem) => isActive(subItem) || hasActiveChild(subItem));
    }
    return false;
  };

  const getIcon = (iconName: string, className: string = '') => {
    if (!iconName) return null;
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedMenus.has(item.id);
    const active = isActive(item);
    const activeChild = hasActiveChild(item);
    const hasSubMenus = item.subMenus && item.subMenus.length > 0;

    // Handle dividers - check for specific divider items
    if (item.id.includes('divider') || item.title === 'Data & Resource Management' || item.title === 'Administration & Settings') {
      return (
        <div key={item.id} className="side-menu__divider">
          {item.title.replace(/[📊🎓⚙️]\s*/g, '')}
        </div>
      );
    }

    return (
      <div key={item.id}>
        <a
          href="#"
          className={`side-menu__link ${
            active ? 'side-menu__link--active' : ''
          } ${activeChild && !active ? 'side-menu__link--active-dropdown' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick(item);
          }}
          aria-expanded={hasSubMenus ? isExpanded : undefined}
        >
          <div className="side-menu__link__icon">
            {item.icon && getIcon(item.icon, 'w-5 h-5')}
          </div>
          <div className="side-menu__link__title">{item.title}</div>
          {item.badge && (
            <div className="side-menu__link__badge">{item.badge}</div>
          )}
          {hasSubMenus && (
            <div className={`side-menu__link__chevron ${
              isExpanded ? 'rotate-180' : ''
            } transition-transform duration-300`}>
              {getIcon('ChevronDown', 'w-4 h-4')}
            </div>
          )}
        </a>

        {/* Sub-menus */}
        {hasSubMenus && (
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded && !compactMenu ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="side-menu__sub-menu">
              {item.subMenus?.map((subItem) => (
                <a
                  key={subItem.id}
                  href="#"
                  className={`side-menu__link side-menu__link--sub ${
                    isActive(subItem) ? 'side-menu__link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (subItem.path) {
                      navigate(subItem.path);
                    }
                  }}
                >
                  <div className="side-menu__link__icon">
                    {subItem.icon && getIcon(subItem.icon, 'w-4 h-4')}
                  </div>
                  <div className="side-menu__link__title">{subItem.title}</div>
                  {subItem.badge && (
                    <div className="side-menu__link__badge">{subItem.badge}</div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="side-menu__nav">
      {menuItems.map((item) => renderMenuItem(item))}
    </nav>
  );
};

export default SidebarMenu;