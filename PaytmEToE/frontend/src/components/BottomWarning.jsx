import { Link } from "react-router-dom";

export function BottomWarning({ warning, btnText, to }) {
  return (
    <div className="flex items-center gap-2">
      <div>{warning}</div>
      <Link className={"cursor-pointer underline hover:text-gray-700"} to={to}>
        {btnText}
      </Link>
    </div>
  );
}
