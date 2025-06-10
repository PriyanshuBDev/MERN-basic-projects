export function InputBox({ placeholder, label, type, onChange }) {
  return (
    <div className="w-full">
      <div className="font-semibold text-lg">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="border-2 rounded px-2 w-full py-1 my-1.5 border-gray-200"
      />
    </div>
  );
}
