import React, { useEffect, useState } from "react";

const ChatComponent = ({ message, from, time }) => {
  const [adate, setAdate] = useState("");
  const [atime, setAtime] = useState("");
  useEffect(() => {
    let temp = new Date(Date.parse(time));
    setAdate(temp.toDateString());
    setAtime(temp.toLocaleTimeString());
    // console.log(temp.toLocaleTimeString());
  }, []);

  return (
    <>
      {from == "me" && (
        <div className="row text-end my-4">
          <div
            className="shadow me fw-light fs-4 bg-glass rounded py-1 pe-3"
            style={{ maxWidth: "40%" }}
          >
            <p className="text-wrap text-break fs-5 lh-l pb-1 mb-0">
              {message}
            </p>
            <div className="d-flex justify-content-between">
              <span
                className="lh-lg fw-light text-muted"
                style={{ fontSize: "14px" }}
              >
                {adate}
              </span>
              <span className="fs-6 lh-lg fw-light">{atime}</span>
            </div>
          </div>
        </div>
      )}
      {from == "them" && (
        <div className="row my-4">
          <div
            className="shadow them fw-light fs-4 bg-glass rounded py-1 pe-3"
            style={{ maxWidth: "40%" }}
          >
            <p className="text-wrap text-break fs-5 lh-l pb-1 mb-0">
              {message}
            </p>
            <div className="d-flex justify-content-between">
              <span
                className="lh-lg fw-light text-muted"
                style={{ fontSize: "14px" }}
              >
                {adate}
              </span>
              <span className="fs-6 lh-lg fw-light">{atime}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
