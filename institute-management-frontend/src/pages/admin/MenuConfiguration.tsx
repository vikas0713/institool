import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Eye, EyeOff, Settings, Save, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
  updateMenuItemVisibility, 
  updateMenuItemEnabled, 
  resetMenuToDefaults 
} from '../../features/menu/menuSlice';
import type { MenuItem } from '../../types/menu';

const MenuConfiguration: React.FC = () => {
  const { menuItems } = useAppSelector((state) => state.menu);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleVisibilityToggle = (itemId: string, visible: boolean) => {
    dispatch(updateMenuItemVisibility({ id: itemId, visible }));
  };

  const handleEnabledToggle = (itemId: string, enabled: boolean) => {
    dispatch(updateMenuItemEnabled({ id: itemId, enabled }));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all menu settings to defaults?')) {
      dispatch(resetMenuToDefaults());
      setExpandedItems(new Set());
    }
  };

  const filterMenuItems = (items: MenuItem[], searchTerm: string): MenuItem[] => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingSubMenu = item.subMenus && 
        filterMenuItems(item.subMenus, searchTerm).length > 0;
      return titleMatch || hasMatchingSubMenu;
    }).map(item => ({
      ...item,
      subMenus: item.subMenus ? filterMenuItems(item.subMenus, searchTerm) : undefined
    }));
  };

  const filteredMenuItems = filterMenuItems(menuItems, searchTerm);

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    // Skip dividers in configuration
    if (item.title.includes('📊') || item.title.includes('Administration')) {
      return (
        <div key={item.id} className="py-2">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {item.title}
          </div>
        </div>
      );
    }

    const hasSubMenus = item.subMenus && item.subMenus.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const indentClass = level > 0 ? 'ml-' + (level * 6) : '';

    return (
      <div key={item.id} className="mb-2">
        <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${indentClass}`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasSubMenus && (
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                )}
                {!hasSubMenus && <div className="w-6" />}
                
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    {item.path && (
                      <p className="text-xs text-gray-500">{item.path}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Permissions */}
                <div className="flex flex-wrap gap-1">
                  {item.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>

                {/* Visibility Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Visible:</span>
                  <Switch
                    checked={item.visible}
                    onChange={(checked) => handleVisibilityToggle(item.id, checked)}
                    className={`${
                      item.visible ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        item.visible ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                  {item.visible ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {/* Enabled Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Enabled:</span>
                  <Switch
                    checked={item.enabled}
                    onChange={(checked) => handleEnabledToggle(item.id, checked)}
                    className={`${
                      item.enabled ? 'bg-green-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        item.enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-menus */}
        {hasSubMenus && isExpanded && (
          <div className="mt-2 ml-6 space-y-2">
            {item.subMenus?.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800">Access Denied</h2>
          <p className="text-red-600 mt-1">
            You don't have permission to access menu configuration. Only administrators can configure menu items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Configuration</h1>
        <p className="text-gray-600 mt-1">
          Configure which menu items are visible and enabled for different user roles.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <Settings className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <button
              onClick={() => setExpandedItems(new Set(menuItems.map(item => item.id)))}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Expand All
            </button>
            
            <button
              onClick={() => setExpandedItems(new Set())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Collapse All
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetToDefaults}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </button>
            
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredMenuItems.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No menu items match "${searchTerm}"`
                : 'No menu items are configured'
              }
            </p>
          </div>
        ) : (
          filteredMenuItems.map((item) => renderMenuItem(item))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Menu Items</p>
              <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visible Items</p>
              <p className="text-2xl font-bold text-green-600">
                {menuItems.filter(item => item.visible).length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enabled Items</p>
              <p className="text-2xl font-bold text-blue-600">
                {menuItems.filter(item => item.enabled).length}
              </p>
            </div>
            <Settings className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuConfiguration;