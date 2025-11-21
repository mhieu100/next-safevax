"use client";

import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { useRouter } from "next/navigation";
import ModalUpdatePassWord from "@/components/modal/modal.update-password";
import ModalUpdateAvatar from "@/components/modal/modal.update-avatar";
import CardInfoUser from "@/app/(private)/profile/components/card.info-user";
import ProfileSidebar from "@/app/(private)/profile/components/profile-sidebar";
import ProfileTabs from "@/app/(private)/profile/components/profile-tabs";
import SettingsModal from "@/app/(private)/profile/components/settings-modal";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const router = useRouter();

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
