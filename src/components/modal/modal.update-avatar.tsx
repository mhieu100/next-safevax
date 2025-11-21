import { CameraOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, message, Upload } from "antd";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { uploadFile } from "@/services/file.service";
import { updateAvatar } from "@/services/auth.service";
import type { UploadProps } from "antd";

interface UpdateAvatarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalUpdateAvatar = ({ open, setOpen }: UpdateAvatarProps) => {
  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      
      // Step 1: Upload file to /files
      const uploadRes = await uploadFile(file, "user");
      if (!uploadRes?.data?.fileName) {
        throw new Error("Upload failed: no file URL returned");
      }

      const avatarUrl = uploadRes.data.fileName;

      // Step 2: Update avatar via /auth/avatar
      const updateRes = await updateAvatar(avatarUrl);
      if (!updateRes?.data) {
        throw new Error("Update avatar failed");
      }

      // Step 3: Update store with new user data (response is IUser, not IAccount)
      const token = localStorage.getItem("token") || "";
      setAuth(updateRes.data, token);

      message.success("Cập nhật ảnh đại diện thành công!");
      setOpen(false);
    } catch (error: unknown) {
      console.error("Avatar upload error:", error);
      message.error((error as Error)?.message || "Không thể cập nhật ảnh đại diện");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setRemoving(true);
      
      // Update avatar to empty string
      const updateRes = await updateAvatar("http://localhost:8080/storage/user/default.png");
      if (!updateRes?.data) {
        throw new Error("Remove avatar failed");
      }

      const token = localStorage.getItem("token") || "";
      setAuth(updateRes.data, token);

      message.success("Đã xóa ảnh đại diện!");
      setOpen(false);
    } catch (error: unknown) {
      console.error("Remove avatar error:", error);
      message.error((error as Error)?.message || "Không thể xóa ảnh đại diện");
    } finally {
      setRemoving(false);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được tải lên file ảnh!");
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Kích thước ảnh phải nhỏ hơn 5MB!");
        return Upload.LIST_IGNORE;
      }
      handleUpload(file);
      return false; // Prevent auto upload
    },
    showUploadList: false,
  };

  return (
    <Modal
      title="Update Profile Picture"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="avatar-modal"
    >
      <div className="text-center !py-6">
        <Avatar
          size={120}
          src={user?.avatar}
          icon={<UserOutlined />}
          className="mb-6"
        />
        <div className="!space-y-4 !mt-3">
          <Upload {...uploadProps}>
            <Button 
              type="primary" 
              icon={<CameraOutlined />} 
              block 
              loading={uploading}
              disabled={uploading || removing}
            >
              {uploading ? "Đang tải lên..." : "Upload New Photo"}
            </Button>
          </Upload>
          <Button 
            icon={<DeleteOutlined />} 
            block
            onClick={handleRemove}
            loading={removing}
            disabled={uploading || removing || !user?.avatar}
          >
            Remove Current Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdateAvatar;
