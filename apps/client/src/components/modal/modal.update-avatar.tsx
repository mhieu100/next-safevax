import { CameraOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal } from "antd";
import React from "react";

interface UpdateAvatarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalUpdateAvatar = ({ open, setOpen }: UpdateAvatarProps) => {
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
          // src={userInfo?.avatar}
          src="https://imgs.search.brave.com/CQwtZ5K2gC4p1MfW-jfewi9v1tMrgTcV0ecpWUcZ8do/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3V0/ZS1hbmltZS1wcm9m/aWxlLXBpY3R1cmVz/LXZtcmNoOTliZ281/bWptNHYuanBn"
          icon={<UserOutlined />}
          className="mb-6"
        />
        <div className="!space-y-4 !mt-3">
          <Button type="primary" icon={<CameraOutlined />}  block>
            Upload New Photo
          </Button>
          <Button icon={<DeleteOutlined />}  block>
            Remove Current Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdateAvatar;
