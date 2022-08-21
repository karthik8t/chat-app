import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "./RequestCard";

const RequestList = ({ addFriend, userid }) => {
  const [requestlist, setRequestlist] = useState([]);
  const url = "https://afternoon-dawn-75866.herokuapp.com/";
  const getRequestList = async () => {
    console.log("getting request ___))))))))))))))))", userid);
    await axios.post(url + "requestlist", { to: userid }).then((res) => {
      console.log("requset list obtained ==========_______+++++_+++");
      console.log(res.data.list);
      setRequestlist([...res.data.list]);
    });
  };
  useEffect(() => {
    getRequestList();
  }, [userid]);

  return (
    <div>
      <p className="fs-6 fw-normal ps-2">Friend Requests</p>
      {requestlist.length == 0 && (
        <p className="card bg-glass p-3">no requests</p>
      )}
      {requestlist.map((val) => {
        console.log("olaaaa", val.from);
        return <RequestCard username={val.from} addFriend={addFriend} />;
      })}
    </div>
  );
};

export default RequestList;
