import React, { useState } from 'react';
import { 
  Database, 
  AppWindow, 
  Box, 
  PanelsTopLeft, 
  PlusSquare, 
  ChevronUp, 
  ChevronDown,
  MoreVertical,
  Copy,
  Send,
  Settings,
  Clock,
  KanbanSquare,
  Link as LinkIcon
} from 'lucide-react';

const TestDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  const statsData = [
    {
      icon: Database,
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      changeType: 'up' as const,
      gradient: true
    },
    {
      icon: AppWindow,
      title: 'Active Teachers',
      value: '124',
      change: '-3%',
      changeType: 'down' as const,
      gradient: false
    },
    {
      icon: Box,
      title: 'Total Courses',
      value: '749',
      change: '+4%',
      changeType: 'up' as const,
      gradient: false
    },
    {
      icon: PanelsTopLeft,
      title: 'Active Classes',
      value: '273',
      change: '+9%',
      changeType: 'up' as const,
      gradient: false
    }
  ];

  const teamMembers = [
    { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@institute.edu', role: 'Dean of Academics' },
    { name: 'Prof. Michael Chen', email: 'michael.chen@institute.edu', role: 'Head of Computer Science' },
    { name: 'Dr. Emily Davis', email: 'emily.davis@institute.edu', role: 'Director of Student Affairs' }
  ];

  const projectDetails = [
    {
      title: 'Digital Learning Platform Implementation',
      link: 'https://institute.edu/projects/digital-learning',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=center',
      contributors: [
        { name: 'Dr. Sarah Johnson', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
        { name: 'Prof. Michael Chen', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
        { name: 'Dr. Emily Davis', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
      ]
    },
    {
      title: 'Student Assessment System Upgrade',
      link: 'https://institute.edu/projects/assessment-upgrade',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center',
      contributors: [
        { name: 'Prof. James Wilson', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
        { name: 'Dr. Lisa Rodriguez', photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      {/* Statistics Section */}
      <div className="col-span-12">
        <div className="mb-6">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium group-[.mode--light]:text-white">
              Institute Statistics
            </div>
            <div className="w-auto md:ml-auto bg-white rounded-[0.6rem] border border-slate-200 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!border-slate-700">
              <div className="flex">
                {['Daily', 'Monthly', 'Yearly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] transition-colors ${
                      activeTab === tab 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-1.5 bg-white rounded-[0.6rem] border border-slate-200 shadow-sm">
          <div className="flex flex-col xl:flex-row gap-2">
            <div className="grid w-full grid-cols-4 gap-2">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className={`col-span-4 sm:col-span-2 xl:col-span-1 flex-1 p-5 border-0 relative rounded-[0.6rem] overflow-hidden ${
                    stat.gradient
                      ? 'bg-gradient-to-b from-blue-500/90 to-blue-600/85 text-white before:content-[\'\'] before:w-full before:h-[130%] before:bg-gradient-to-b before:from-black/[0.15] before:to-transparent before:absolute before:right-0 before:top-0 before:rotate-45 before:-mr-[62%]'
                      : 'bg-slate-50/50 dark:bg-darkmode-400'
                  }`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 border rounded-full ${
                    stat.gradient 
                      ? 'border-white/10 bg-white/10' 
                      : 'border-blue-500/10 bg-blue-500/10'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.gradient 
                        ? 'text-white fill-white/10' 
                        : 'text-blue-500 fill-blue-500/10'
                    }`} />
                  </div>
                  <div className="flex items-center mt-12">
                    <div className={`text-2xl font-medium ${
                      stat.gradient ? 'text-white' : 'text-slate-700'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`flex items-center ml-3.5 border rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium ${
                      stat.changeType === 'up'
                        ? 'border-green-500/50 bg-green-500/50 text-white/90'
                        : 'border-red-500/50 bg-red-500/70 text-white/90'
                    }`}>
                      {stat.change}
                      {stat.changeType === 'up' ? (
                        <ChevronUp className="w-4 h-4 ml-px stroke-[1.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-px stroke-[1.5]" />
                      )}
                    </div>
                  </div>
                  <div className={`mt-1 text-base ${
                    stat.gradient ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {stat.title}
                  </div>
                  <button className="absolute top-0 right-0 mt-5 mr-5">
                    <MoreVertical className={`w-6 h-6 ${
                      stat.gradient ? 'stroke-white/70 fill-white/70' : 'stroke-slate-400/70 fill-slate-400/70'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <button className="bg-slate-50 xl:w-20 text-slate-400/80 flex flex-col justify-center items-center p-5 border border-slate-300/80 rounded-[0.6rem] hover:bg-slate-100 border-dashed group dark:bg-darkmode-400">
              <PlusSquare className="w-6 h-6 transition-transform transform group-hover:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details & Invite Team Member */}
      <div className="flex flex-col col-span-12 xl:col-span-6 gap-y-10">
        {/* Recent Activities */}
        <div>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Recent Activities</div>
          </div>
          <div className="p-5 mt-3.5 bg-white rounded-[0.6rem] border border-slate-200 shadow-sm">
            <div className="flex flex-col items-center pb-5 mb-5 border-b border-dashed gap-y-2 sm:flex-row border-slate-300/70">
              <div className="overflow-hidden rounded-full w-14 h-14 border-[3px] border-slate-200/70">
                <img
                  alt="Principal"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left sm:ml-4">
                <div className="text-base font-medium">Dr. Robert Anderson</div>
                <div className="text-slate-500 mt-0.5">Principal</div>
              </div>
              <div className="flex items-center px-3 py-1 font-medium border rounded-full sm:ml-auto border-green-500/10 bg-green-500/10 text-green-600">
                <div className="w-1.5 h-1.5 mr-2 rounded-full border border-green-500/50 bg-green-500/50"></div>
                Active
              </div>
            </div>
            <div className="flex flex-col text-center gap-y-3 sm:flex-row">
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Students Enrolled</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">2,176</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-green-600">
                    11%
                    <ChevronUp className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Courses Completed</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">2,027</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-green-600">
                    2%
                    <ChevronUp className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Faculty Meetings</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">342</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-red-600">
                    4%
                    <ChevronDown className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invite Team Member */}
        <div>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Invite Team Member</div>
          </div>
          <div className="p-5 mt-3.5 bg-white rounded-[0.6rem] border border-slate-200 shadow-sm">
            <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
              <div>Everyone at the institute can access this system</div>
              <div className="relative mt-3">
                <input
                  type="email"
                  placeholder="everyone@institute.edu"
                  className="w-full sm:py-3 px-4 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button className="w-full sm:w-auto sm:absolute inset-y-0 right-0 pl-3.5 pr-4 my-auto mt-2 sm:mt-auto mr-2 h-9 sm:h-8 bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Send className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]" />
                  Send Invitation
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 pb-5 mb-5 border-b border-dashed border-slate-300/70">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-12 h-12 overflow-hidden rounded-full border-[3px] border-slate-200/70">
                    <img
                      alt={member.name}
                      src={`https://images.unsplash.com/photo-${1494790108755 + index}?w=50&h=50&fit=crop&crop=face`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:items-center gap-y-2.5 sm:flex-row">
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{member.email}</div>
                    </div>
                    <div className="relative sm:ml-auto">
                      <Settings className="absolute inset-y-0 w-3.5 h-3.5 my-auto ml-2.5 stroke-[1.2]" />
                      <select className="bg-slate-50 sm:w-48 pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded">
                        <option value={member.role}>{member.role}</option>
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <div>Share invitation link</div>
              <div className="flex gap-3 mt-3">
                <input
                  type="text"
                  value="https://institute.edu/invitation?token=abcdefgh12345678"
                  disabled
                  className="flex-1 px-3 py-2 text-slate-500 border border-slate-200 rounded bg-slate-50"
                />
                <button
                  title="Copy link"
                  className="px-3 py-2 border border-slate-300 rounded hover:bg-slate-50"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Collaboration */}
      <div className="flex flex-col col-span-12 xl:col-span-6 gap-y-10">
        <div>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Academic Progress</div>
          </div>
          <div className="p-5 mt-3.5 bg-white rounded-[0.6rem] border border-slate-200 shadow-sm">
            <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
              <div>Current semester progress report</div>
              <div className="flex items-center w-full px-3 py-3 mt-3 border rounded-lg bg-green-500/10 border-green-500/10 text-green-600">
                <Clock className="w-5 h-5 mr-2" />
                Semester start date:
                <div className="ml-2">September 1, 2024</div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex flex-col items-center sm:flex-row gap-y-2">
                  <div className="sm:w-36 text-slate-500">Academic Year</div>
                  <div className="flex items-center font-medium sm:ml-5 sm:h-7">
                    2024-2025 Fall Semester
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row gap-y-2">
                  <div className="sm:w-36 text-slate-500">Total Students</div>
                  <div className="flex items-center h-5 sm:ml-5">
                    <div className="w-6 h-6 overflow-hidden border-2 rounded-full border-slate-200/70 bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">2.8K</span>
                    </div>
                    <div className="ml-2.5 underline decoration-dotted decoration-blue-500/30 underline-offset-[3px]">
                      2,847 Active Students
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row gap-y-2">
                  <div className="sm:w-36 text-slate-500">Total Faculty</div>
                  <div className="flex items-center sm:ml-5 sm:h-7">
                    <div className="w-6 h-6 overflow-hidden border-2 rounded-full border-slate-200/70 bg-green-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">124</span>
                    </div>
                    <div className="ml-2.5 underline decoration-dotted decoration-green-500/30 underline-offset-[3px]">
                      124 Active Faculty Members
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center w-full px-3 py-3 font-medium border rounded-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                <KanbanSquare className="w-5 h-5 mr-2 stroke-[1.3]" />
                Recent Projects for Team Members
                <button className="ml-auto">
                  <MoreVertical className="w-5 h-5 stroke-slate-500/70 fill-slate-500/70" />
                </button>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                {projectDetails.map((project, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center gap-5 p-3 border border-dashed rounded-lg sm:flex-row border-slate-300/60"
                  >
                    <div className="absolute top-0 right-0 mt-3 mr-3">
                      <input
                        type="checkbox"
                        className="border"
                        defaultChecked={index === 0}
                      />
                    </div>
                    <div>
                      <div className="w-40 h-24 rounded-md border-[3px] border-slate-200/70 overflow-hidden">
                        <img
                          alt={project.title}
                          className="w-full h-full object-cover"
                          src={project.image}
                        />
                      </div>
                    </div>
                    <div className="-mt-1">
                      <a
                        href="#"
                        className="block font-medium text-center sm:text-left hover:text-blue-600"
                      >
                        {project.title}
                      </a>
                      <div className="flex items-center mt-2.5 text-xs text-slate-500">
                        <LinkIcon className="w-2.5 h-2.5 mr-1.5 stroke-[2]" />
                        <a
                          href="#"
                          className="truncate underline decoration-dotted underline-offset-[3px] decoration-slate-300"
                        >
                          {project.link}
                        </a>
                      </div>
                      <div className="flex items-center justify-center mt-4 sm:justify-start">
                        <div className="flex">
                          {project.contributors.map((contributor, cIndex) => (
                            <div key={cIndex} className="w-6 h-6 -ml-2.5 first:ml-0">
                              <img
                                alt={contributor.name}
                                className="w-full h-full rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                src={contributor.photo}
                                title={contributor.name}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="ml-3 text-xs text-slate-500">
                          {project.contributors.length}+ Members
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;