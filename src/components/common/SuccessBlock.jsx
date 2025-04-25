
const SuccessBlock = ({message}) => {
  return (
    <div className="text-green-500 mt-2 text-center">
      {message}
      <span className="font-[1.2em] animate-ping">✓</span>.
    </div>
  );
}

export default SuccessBlock