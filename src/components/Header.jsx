import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Ícones para dark/light

export default function Header({ toggleDark }) {
  const [dark, setDark] = useState(false);

  const handleToggle = () => {
    const newDark = !dark;
    setDark(newDark);
    toggleDark(newDark);
  };

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MdDarkMode className="text-yellow-400" /> Random User Generator
      </h1>
      <button
        onClick={handleToggle}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        {dark ? <MdLightMode /> : <MdDarkMode />}
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
