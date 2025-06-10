export function Button({ placeholder, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-black rounded-md text-center text-white font-semibold w-full py-1.5 pb-2 my-3 cursor-pointer hover:opacity-85"
    >
      {placeholder}
    </button>
  );
}
