import { useState, useEffect } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import {
  MdMale,
  MdFemale,
  MdFavorite,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]); // Agora array para múltiplos se quiser
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteUsers");
    return saved ? JSON.parse(saved) : [];
  });
  const [gender, setGender] = useState(""); // '' = qualquer, 'male' ou 'female'

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Carrega usuários ao abrir ou mudar filtro
  useEffect(() => {
    fetchUsers();
  }, [gender]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://randomuser.me/api/?results=1"; // Mude para 3 ou mais se quiser múltiplos
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
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header toggleDark={setDarkMode} />

      <main className="flex-grow container mx-auto p-6 flex flex-col items-center justify-center">
        {/* Filtros de Gênero */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setGender("")}
            className={`px-4 py-2 rounded ${
              gender === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setGender("male")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              gender === "male"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <MdMale /> Homens
          </button>
          <button
            onClick={() => setGender("female")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              gender === "female"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <MdFemale /> Mulheres
          </button>
        </div>

        {/* Área dos usuários atuais */}
        {loading && (
          <div className="flex flex-col items-center my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
            <p className="mt-4 text-lg">Carregando usuários...</p>
          </div>
        )}

        {error && <p className="text-red-500 text-xl my-8">{error}</p>}

        {!loading && !error && currentUsers.length > 0 && (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentUsers.map((user) => (
              <UserCard
                key={user.login.uuid}
                user={user}
                onFavorite={addToFavorites}
              />
            ))}
          </div>
        )}

        {/* Botão gerar novo */}
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Carregando..." : "Gerar Novos Usuários"}
        </button>

        {/* Seção de Favoritos */}
        {favorites.length > 0 && (
          <section className="mt-16 w-full max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Usuários Favoritos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favorites.map((fav) => (
                <div key={fav.login.uuid} className="relative">
                  <UserCard user={fav} /> {/* Sem botão de favoritar aqui */}
                  <button
                    onClick={() => removeFavorite(fav.login.uuid)}
                    className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 shadow flex items-center gap-1"
                  >
                    <MdFavorite className="text-red-300" /> Remover
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {favorites.length === 0 && !loading && (
          <p className="mt-12 text-gray-500 dark:text-gray-400 italic text-center">
            Ainda não há favoritos. Clique em "Adicionar aos Favoritos" no card!
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
