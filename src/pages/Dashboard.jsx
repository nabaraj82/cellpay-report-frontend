
const Dashboard = () => {


  return (
    <div>
      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
       Error Generator
      </button>
      ;
    </div>
  );
}

export default Dashboard