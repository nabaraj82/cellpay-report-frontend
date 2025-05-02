import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import reportAnimation from "../../assets/lottie/report.lottie";

const ReportLottie = () => {
    return (
      <div className='flex h-screen w-screen justify-center items-center'>
        <DotLottieReact src={reportAnimation} loop autoplay />
      </div>
    );
}

export default ReportLottie