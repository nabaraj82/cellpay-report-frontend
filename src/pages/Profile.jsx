import React from 'react'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import reportAnimation from '../assets/lottie/report.lottie'; // or report.json


const Profile = () => {
  return (
    <div>
      <DotLottieReact src={reportAnimation} loop autoplay />
    </div>
  );
}

export default Profile