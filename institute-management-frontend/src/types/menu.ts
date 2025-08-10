export interface MenuConfig {
  id: string;
  title: string;
  icon: string;
  path: string;
  enabled: boolean;
  visible: boolean;
  permissions: string[];
  subMenus?: MenuConfig[];
}

export interface MenuSettings {
  [key: string]: {
    enabled: boolean;
    visible: boolean;
  };
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  enabled: boolean;
  visible: boolean;
  permissions: string[];
  subMenus?: MenuItem[];
  badge?: string;
  activeDropdown?: boolean;
  active?: boolean;
}