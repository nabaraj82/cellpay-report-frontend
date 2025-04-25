
const Badge = ({badge}) => {
  return (
    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
      {badge} 
    </span>
  );
}

export default Badge