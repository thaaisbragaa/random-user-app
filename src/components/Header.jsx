import { MdWbSunny, MdNightlight } from "react-icons/md";

export default function Header({ darkMode, toggleDark }) {
  const handleToggle = () => {
    toggleDark(!darkMode);
  };

  return (
    <header
      className={`
        p-4 flex justify-between items-center shadow-lg 
        transition-colors duration-300
        ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}
        
      `}
    >
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
        Gerador de Perfil
      </h1>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
          className="sr-only peer"
        />

        <div
          className={`
            w-14 h-8 rounded-full
            transition-colors duration-500
            ${darkMode ? "bg-blue-900" : "bg-amber-400"}
            peer-focus:outline-none peer-focus:ring-0
          `}
        />

        <div
          className={`
            absolute top-1 left-[4px]
            w-6 h-6 rounded-full shadow-md
            flex items-center justify-center text-xl
            transform transition-all duration-500 ease-in-out
            peer-checked:translate-x-6
            ${darkMode ? "bg-blue-500 text-white" : "bg-yellow-400 text-white"}
          `}
        >
          {darkMode ? (
            <MdNightlight className="text-white" />
          ) : (
            <MdWbSunny className="text-white" />
          )}
        </div>
      </label>
    </header>
  );
}
