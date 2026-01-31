import { useState, useEffect } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import { MdMale, MdFemale } from "react-icons/md";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [currentUsers, setCurrentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteUsers");
    return saved ? JSON.parse(saved) : [];
  });
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchUsers();
  }, [gender]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://randomuser.me/api/?results=1";
      if (gender) url += `&gender=${gender}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro na requisição");
      const data = await res.json();
      setCurrentUsers(data.results);
    } catch (err) {
      setError("Erro ao carregar usuário. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (user) => {
    if (favorites.some((fav) => fav.login.uuid === user.login.uuid)) {
      alert("Este usuário já está nos favoritos!");
      return;
    }
    const newFavs = [...favorites, user];
    setFavorites(newFavs);
    localStorage.setItem("favoriteUsers", JSON.stringify(newFavs));
  };

  const removeFavorite = (uuid) => {
    const newFavs = favorites.filter((fav) => fav.login.uuid !== uuid);
    setFavorites(newFavs);
    localStorage.setItem("favoriteUsers", JSON.stringify(newFavs));
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <Header darkMode={darkMode} toggleDark={setDarkMode} />

      <main className="flex-grow container mx-auto p-6 flex flex-col items-center">
        {/* Filtros */}
        <div className="mb-8 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setGender("")}
            className={`px-6 py-3 rounded-lg font-medium ${gender === "" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
          >
            Todos
          </button>
          <button
            onClick={() => setGender("male")}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${gender === "male" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
          >
            <MdMale /> Homens
          </button>
          <button
            onClick={() => setGender("female")}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${gender === "female" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
          >
            <MdFemale /> Mulheres
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="mt-4 text-lg">Carregando...</p>
          </div>
        )}

        {error && <p className="text-red-500 text-xl my-8">{error}</p>}

        {!loading && !error && currentUsers.length > 0 && (
          <div className="w-full max-w-lg mb-12">
            {currentUsers.map((user) => (
              <UserCard
                key={user.login.uuid}
                user={user}
                onFavorite={addToFavorites}
                isFavorited={favorites.some(
                  (f) => f.login.uuid === user.login.uuid,
                )}
              />
            ))}
          </div>
        )}

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 shadow-lg transition-all"
        >
          {loading ? "Carregando..." : "Gerar Novos Usuários"}
        </button>

        {favorites.length > 0 && (
          <section className="mt-16 w-full">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Usuários Favoritos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((fav) => (
                <UserCard
                  key={fav.login.uuid}
                  user={fav}
                  isFavorited={true}
                  onFavorite={() => removeFavorite(fav.login.uuid)}
                />
              ))}
            </div>
          </section>
        )}

        {favorites.length === 0 && !loading && (
          <p className="mt-12 text-gray-500 dark:text-gray-400 italic text-center">
            Ainda não há favoritos. Clique no coração rosa para adicionar!
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
