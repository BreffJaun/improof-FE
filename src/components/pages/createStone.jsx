import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// ICONS
import { BiCheck } from "react-icons/bi";
import { SlTrash } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const createStone = () => {
  const [stone, setStone] = useState({});

  return <div>createStone</div>;
};

export default createStone;
