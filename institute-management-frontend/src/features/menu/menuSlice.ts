import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem, MenuSettings } from '../../types/menu';

interface MenuState {
  menuItems: MenuItem[];
  settings: MenuSettings;
  isLoading: boolean;
  error: string | null;
}

// Default menu configuration based on the comprehensive menu structure
const defaultMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'Home',
    path: '/dashboard',
    enabled: true,
    visible: true,
    permissions: ['admin', 'teacher', 'student', 'staff'],
  },
  {
    id: 'academics',
    title: 'Academics',
    icon: 'BookOpen',
    enabled: true,
    visible: true,
    permissions: ['admin', 'teacher'],
    subMenus: [
      {
        id: 'programs-courses',
        title: 'Programs & Courses',
        icon: 'Book',
        enabled: true,
        visible: true,
        permissions: ['admin'],
        subMenus: [
          {
            id: 'manage-programs',
            title: 'Manage Programs',
            icon: 'Settings',
            path: '/academics/programs/manage',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'course-catalog',
            title: 'Course Catalog',
            icon: 'BookMarked',
            path: '/academics/courses/catalog',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher'],
          },
          {
            id: 'curriculum-builder',
            title: 'Curriculum Builder',
            icon: 'PenTool',
            path: '/academics/curriculum/builder',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
        ],
      },
      {
        id: 'classes-timetables',
        title: 'Classes & Timetables',
        icon: 'Calendar',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
        subMenus: [
          {
            id: 'class-scheduling',
            title: 'Class Scheduling',
            icon: 'CalendarDays',
            path: '/academics/classes/schedule',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'timetable-view',
            title: 'Timetable View',
            icon: 'Clock',
            path: '/academics/timetable/view',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher', 'student'],
          },
          {
            id: 'substitute-management',
            title: 'Substitute Management',
            icon: 'UserCheck',
            path: '/academics/substitute/manage',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
        ],
      },
      {
        id: 'exams-assessments',
        title: 'Exams & Assessments',
        icon: 'FileText',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
        subMenus: [
          {
            id: 'exam-scheduling',
            title: 'Exam Scheduling',
            icon: 'Calendar',
            path: '/academics/exams/schedule',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'question-bank',
            title: 'Question Bank',
            icon: 'HelpCircle',
            path: '/academics/exams/question-bank',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher'],
          },
          {
            id: 'grading-results',
            title: 'Grading & Results',
            icon: 'Award',
            path: '/academics/exams/grades',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher'],
          },
        ],
      },
      {
        id: 'attendance',
        title: 'Attendance',
        icon: 'CheckSquare',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
        subMenus: [
          {
            id: 'student-attendance',
            title: 'Student Attendance',
            icon: 'Users',
            path: '/academics/attendance/students',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher'],
          },
          {
            id: 'staff-attendance',
            title: 'Staff Attendance',
            icon: 'UserCheck',
            path: '/academics/attendance/staff',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
        ],
      },
      {
        id: 'assignments-homework',
        title: 'Assignments & Homework',
        icon: 'FileEdit',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
        subMenus: [
          {
            id: 'upload-assignments',
            title: 'Upload Assignments',
            icon: 'Upload',
            path: '/academics/assignments/upload',
            enabled: true,
            visible: true,
            permissions: ['teacher'],
          },
          {
            id: 'submissions-tracking',
            title: 'Submissions Tracking',
            icon: 'Eye',
            path: '/academics/assignments/submissions',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher'],
          },
        ],
      },
      {
        id: 'learning-resources',
        title: 'Learning Resources',
        icon: 'Folder',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher', 'student'],
        subMenus: [
          {
            id: 'study-materials',
            title: 'Study Materials',
            icon: 'FolderOpen',
            path: '/academics/resources/materials',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher', 'student'],
          },
          {
            id: 'video-lectures',
            title: 'Video Lectures',
            icon: 'Play',
            path: '/academics/resources/videos',
            enabled: true,
            visible: true,
            permissions: ['admin', 'teacher', 'student'],
          },
        ],
      },
    ],
  },
  {
    id: 'students',
    title: 'Students',
    icon: 'GraduationCap',
    enabled: true,
    visible: true,
    permissions: ['admin', 'teacher'],
    subMenus: [
      {
        id: 'student-directory',
        title: 'Student Directory',
        icon: 'Users',
        path: '/students/directory',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
      },
      {
        id: 'admissions-enrollments',
        title: 'Admissions & Enrollments',
        icon: 'UserPlus',
        path: '/students/admissions',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'student-profile-progress',
        title: 'Student Profile & Progress',
        icon: 'User',
        path: '/students/profiles',
        enabled: true,
        visible: true,
        permissions: ['admin', 'teacher'],
      },
      {
        id: 'certificates-transcripts',
        title: 'Certificates & Transcripts',
        icon: 'Award',
        path: '/students/certificates',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'faculty-staff',
    title: 'Faculty / Staff',
    icon: 'Users',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'faculty-directory',
        title: 'Faculty Directory',
        icon: 'UserCheck',
        path: '/faculty/directory',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'class-assignments',
        title: 'Class Assignments',
        icon: 'Calendar',
        path: '/faculty/assignments',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'performance-reviews',
        title: 'Performance & Reviews',
        icon: 'Star',
        path: '/faculty/reviews',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  // Divider
  {
    id: 'divider-1',
    title: 'Data & Resource Management',
    icon: '',
    enabled: true,
    visible: true,
    permissions: ['admin'],
  },
  {
    id: 'data-resources',
    title: 'Data Sources',
    icon: 'Database',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'integrations',
        title: 'Integrations',
        icon: 'Link',
        enabled: true,
        visible: true,
        permissions: ['admin'],
        subMenus: [
          {
            id: 'sis-integration',
            title: 'Student Information System (SIS)',
            icon: 'Database',
            path: '/data/integrations/sis',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'lms-integration',
            title: 'Learning Management System (LMS)',
            icon: 'Globe',
            path: '/data/integrations/lms',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'external-apis',
            title: 'External APIs',
            icon: 'Zap',
            path: '/data/integrations/apis',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
        ],
      },
      {
        id: 'import-export',
        title: 'Import / Export Data',
        icon: 'ArrowUpDown',
        enabled: true,
        visible: true,
        permissions: ['admin'],
        subMenus: [
          {
            id: 'data-mapping',
            title: 'Data Mapping',
            icon: 'Map',
            path: '/data/mapping',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
          {
            id: 'sync-status',
            title: 'Sync Status & Logs',
            icon: 'Activity',
            path: '/data/sync-logs',
            enabled: true,
            visible: true,
            permissions: ['admin'],
          },
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: 'Building',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'campus-management',
        title: 'Campus / Branch Management',
        icon: 'MapPin',
        path: '/infrastructure/campus',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'room-lab-allocation',
        title: 'Room & Lab Allocation',
        icon: 'Home',
        path: '/infrastructure/rooms',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'equipment-inventory',
        title: 'Equipment Inventory',
        icon: 'Package',
        path: '/infrastructure/equipment',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'library',
    title: 'Library',
    icon: 'BookOpen',
    enabled: true,
    visible: true,
    permissions: ['admin', 'staff'],
    subMenus: [
      {
        id: 'book-catalog',
        title: 'Book Catalog',
        icon: 'Book',
        path: '/library/catalog',
        enabled: true,
        visible: true,
        permissions: ['admin', 'staff'],
      },
      {
        id: 'borrow-return',
        title: 'Borrow & Return Logs',
        icon: 'RefreshCw',
        path: '/library/transactions',
        enabled: true,
        visible: true,
        permissions: ['admin', 'staff'],
      },
      {
        id: 'digital-library',
        title: 'Digital Library',
        icon: 'Monitor',
        path: '/library/digital',
        enabled: true,
        visible: true,
        permissions: ['admin', 'staff', 'teacher', 'student'],
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Accounts',
    icon: 'DollarSign',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'fee-structure',
        title: 'Fee Structure',
        icon: 'CreditCard',
        path: '/finance/fee-structure',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'fee-collection',
        title: 'Fee Collection',
        icon: 'Banknote',
        path: '/finance/fee-collection',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'payroll',
        title: 'Payroll',
        icon: 'Wallet',
        path: '/finance/payroll',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'scholarships',
        title: 'Scholarships & Grants',
        icon: 'Gift',
        path: '/finance/scholarships',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: 'Bus',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'vehicle-management',
        title: 'Vehicle Management',
        icon: 'Truck',
        path: '/transport/vehicles',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'routes-scheduling',
        title: 'Routes & Scheduling',
        icon: 'Route',
        path: '/transport/routes',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'driver-assignments',
        title: 'Driver Assignments',
        icon: 'User',
        path: '/transport/drivers',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'hostel',
    title: 'Hostel / Accommodation',
    icon: 'Building2',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'room-allocation',
        title: 'Room Allocation',
        icon: 'Bed',
        path: '/hostel/rooms',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'visitor-logs',
        title: 'Visitor Logs',
        icon: 'UserX',
        path: '/hostel/visitors',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'maintenance-requests',
        title: 'Maintenance Requests',
        icon: 'Wrench',
        path: '/hostel/maintenance',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  // Administration Divider
  {
    id: 'divider-2',
    title: 'Administration & Settings',
    icon: '',
    enabled: true,
    visible: true,
    permissions: ['admin'],
  },
  {
    id: 'user-management',
    title: 'User Management',
    icon: 'Settings',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: 'Shield',
        path: '/admin/roles',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'staff-accounts',
        title: 'Staff Accounts',
        icon: 'UserCog',
        path: '/admin/staff-accounts',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'student-portal-access',
        title: 'Student Portal Access',
        icon: 'Key',
        path: '/admin/student-access',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'tenant-settings',
    title: 'Tenant / Institute Settings',
    icon: 'Building',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'academic-year-setup',
        title: 'Academic Year Setup',
        icon: 'Calendar',
        path: '/admin/academic-year',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'branding-themes',
        title: 'Branding & Themes',
        icon: 'Palette',
        path: '/admin/branding',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'menu-configuration',
        title: 'Menu Configuration',
        icon: 'Menu',
        path: '/admin/menu-configuration',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notification Management',
    icon: 'Bell',
    enabled: true,
    visible: true,
    permissions: ['admin'],
    subMenus: [
      {
        id: 'email-sms-templates',
        title: 'Email / SMS Templates',
        icon: 'Mail',
        path: '/admin/templates',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
      {
        id: 'alerts-announcements',
        title: 'Alerts & Announcements',
        icon: 'Megaphone',
        path: '/admin/alerts',
        enabled: true,
        visible: true,
        permissions: ['admin'],
      },
    ],
  },
  {
    id: 'audit-logs',
    title: 'Audit Logs',
    icon: 'FileText',
    path: '/admin/audit-logs',
    enabled: true,
    visible: true,
    permissions: ['admin'],
  },
  {
    id: 'system-backups',
    title: 'System Backups',
    icon: 'HardDrive',
    path: '/admin/backups',
    enabled: true,
    visible: true,
    permissions: ['admin'],
  },
];

const initialState: MenuState = {
  menuItems: defaultMenuItems,
  settings: {},
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuSettings: (state, action: PayloadAction<MenuSettings>) => {
      state.settings = action.payload;
    },
    updateMenuItemVisibility: (
      state,
      action: PayloadAction<{ id: string; visible: boolean }>
    ) => {
      const updateItem = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, visible: action.payload.visible };
          }
          if (item.subMenus) {
            return { ...item, subMenus: updateItem(item.subMenus) };
          }
          return item;
        });
      };
      state.menuItems = updateItem(state.menuItems);
    },
    updateMenuItemEnabled: (
      state,
      action: PayloadAction<{ id: string; enabled: boolean }>
    ) => {
      const updateItem = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, enabled: action.payload.enabled };
          }
          if (item.subMenus) {
            return { ...item, subMenus: updateItem(item.subMenus) };
          }
          return item;
        });
      };
      state.menuItems = updateItem(state.menuItems);
    },
    resetMenuToDefaults: (state) => {
      state.menuItems = defaultMenuItems;
      state.settings = {};
    },
  },
});

export const {
  setMenuSettings,
  updateMenuItemVisibility,
  updateMenuItemEnabled,
  resetMenuToDefaults,
} = menuSlice.actions;

export default menuSlice.reducer;