"use client";

import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { useRouter } from "next/navigation";
import ModalUpdatePassWord from "@/components/modal/modal.update-password";
import ModalUpdateAvatar from "@/components/modal/modal.update-avatar";
import CardInfoUser from "@/app/(private)/profile/components/card.info-user";
import ProfileSidebar from "@/app/(private)/profile/components/ProfileSidebar";
import ProfileTabs from "@/app/(private)/profile/components/ProfileTabs";
import SettingsModal from "@/app/(private)/profile/components/SettingsModal";
import { VaccinationRecord } from "@/app/(private)/profile/components/VaccinationHistoryTab";
import { AppointmentRecord } from "@/app/(private)/profile/components/AppointmentScheduleTab";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const router = useRouter();

  // Mock vaccination data
  const vaccinationHistory: VaccinationRecord[] = [
    {
      key: "1",
      vaccine: "COVID-19 (Pfizer)",
      date: "2024-03-15",
      status: "Completed",
      nextDose: "2024-09-15",
      batch: "PF2024-001",
      location: "SafeVax Center - District 1",
    },
    {
      key: "2",
      vaccine: "Hepatitis B",
      date: "2024-01-20",
      status: "Completed",
      nextDose: "2025-01-20",
      batch: "HB2024-003",
      location: "SafeVax Center - District 3",
    },
    {
      key: "3",
      vaccine: "Influenza",
      date: "2023-12-10",
      status: "Completed",
      nextDose: "2024-12-10",
      batch: "FLU2023-012",
      location: "General Hospital",
    },
  ];

  const upcomingAppointments: AppointmentRecord[] = [
    {
      key: "1",
      vaccine: "COVID-19 Booster",
      date: "2024-10-15",
      time: "10:30 AM",
      location: "SafeVax Center - District 1",
      status: "Confirmed",
    },
    {
      key: "2",
      vaccine: "Tetanus",
      date: "2024-11-02",
      time: "2:00 PM",
      location: "SafeVax Center - Thu Duc",
      status: "Pending",
    },
  ];

  const handleNewBooking = () => {
    router.push("/booking");
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleOpenSettings = () => {
    setSettingsModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <CardInfoUser
          setOpen={setAvatarModalVisible}
          editMode={editMode}
          setEditMode={setEditMode}
          setActiveTab={handleTabChange}
          onOpenSettings={handleOpenSettings}
        />

        <Row gutter={[24, 24]} className="mt-6">
          <Col xs={24} lg={6}>
            <ProfileSidebar
              totalVaccines={8}
              upcomingAppointments={2}
              coveragePercentage={85}
              nextAppointment="Oct 15, 2024"
              onNewBooking={handleNewBooking}
              onTabChange={handleTabChange}
              onOpenSettings={handleOpenSettings}
              activeTab={activeTab}
            />
          </Col>
          
          <Col xs={24} lg={18}>
            <Card className="rounded-xl shadow-sm border-0">
              <ProfileTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                editMode={editMode}
                setEditMode={setEditMode}
                vaccinationHistory={vaccinationHistory}
                upcomingAppointments={upcomingAppointments}
                onNewBooking={handleNewBooking}
              />
            </Card>
          </Col>
        </Row>

        <ModalUpdateAvatar
          open={avatarModalVisible}
          setOpen={setAvatarModalVisible}
        />

        <ModalUpdatePassWord
          open={securityModalVisible}
          setOpen={setSecurityModalVisible}
        />

        <SettingsModal
          open={settingsModalVisible}
          setOpen={setSettingsModalVisible}
          setSecurityModalVisible={setSecurityModalVisible}
        />
      </div>
    </div>
  );
};

export default Profile;
