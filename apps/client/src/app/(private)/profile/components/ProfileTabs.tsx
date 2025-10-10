"use client";

import React from "react";
import { Typography } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  CalendarOutlined,
  HeartOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import TabEditUser from "@/components/tab/tab.edit-user";
import VaccinationHistoryTab, { VaccinationRecord } from "./VaccinationHistoryTab";
import AppointmentScheduleTab, { AppointmentRecord } from "./AppointmentScheduleTab";
import HealthRemindersTab from "./HealthRemindersTab";
import FamilyManagerTab from "./FamilyManagerTab";
import VaccinePassportTab from "./VaccinePassportTab";

const { Title } = Typography;

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  vaccinationHistory: VaccinationRecord[];
  upcomingAppointments: AppointmentRecord[];
  onNewBooking: () => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  editMode,
  setEditMode,
  vaccinationHistory,
  upcomingAppointments,
  onNewBooking,
}) => {
  const tabConfig = {
    "1": {
      title: "Health Profile",
      icon: <UserOutlined className="text-xl" />,
      content: <TabEditUser editMode={editMode} setEditMode={setEditMode} />,
    },
    "2": {
      title: "Vaccination History",
      icon: <HistoryOutlined className="text-xl" />,
      content: (
        <VaccinationHistoryTab
          vaccinationHistory={vaccinationHistory}
          onNewBooking={onNewBooking}
        />
      ),
    },
    "3": {
      title: "Appointments",
      icon: <CalendarOutlined className="text-xl" />,
      content: (
        <AppointmentScheduleTab
          upcomingAppointments={upcomingAppointments}
          onNewBooking={onNewBooking}
        />
      ),
    },
    "4": {
      title: "Health Reminders",
      icon: <HeartOutlined className="text-xl" />,
      content: <HealthRemindersTab />,
    },
    "5": {
      title: "Family Manager",
      icon: <TeamOutlined className="text-xl" />,
      content: <FamilyManagerTab />,
    },
    "6": {
      title: "Vaccine Passport",
      icon: <SafetyCertificateOutlined className="text-xl" />,
      content: <VaccinePassportTab />,
    },
  };

  const currentTab = tabConfig[activeTab as keyof typeof tabConfig] || tabConfig["1"];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
            {currentTab.icon}
          </div>
          <Title level={3} className="!mb-0 !text-gray-800">
            {currentTab.title}
          </Title>
        </div>
      </div>

      {/* Tab Content */}
      <div className="profile-tab-content">
        {currentTab.content}
      </div>
    </div>
  );
};

export default ProfileTabs;