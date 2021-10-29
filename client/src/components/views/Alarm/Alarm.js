import React from "react";

import { Modal } from "antd";

function Alarm(props) {
  return (
    <>
      <Modal
        centered
        visible={props.visible}
        onOk={() => props.setVisible(false)}
        okButtonProps={{
          style: {
            display: "flex",
            margin: "auto",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>{props.message}</p>
      </Modal>
    </>
  );
}

export default Alarm;
