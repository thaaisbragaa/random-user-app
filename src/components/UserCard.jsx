import { FaHeart } from "react-icons/fa";

export default function UserCard({ user, onFavorite, isFavorited = false }) {
  if (!user) return null;

  const { name, picture, email, phone, location, dob } = user;

  return (
    <div
      className="
        relative
        rounded-lg shadow-lg p-6 
        transition-all duration-300 hover:shadow-xl
        bg-[--card-bg] text-[--card-text] border border-[--border]
        max-w-md w-full mx-auto
      "
    >
      {onFavorite && (
        <button
          onClick={() => onFavorite(user)}
          className="
      absolute top-4 right-4
      w-10 h-10 rounded-full
      bg-pink-600 hover:bg-pink-700
      shadow-md transition-all duration-200
      hover:scale-110 active:scale-95
      z-10 flex items-center justify-center
      text-white text-2xl
    "
          title={
            isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFavorited ? "🤍" : "♡"}
        </button>
      )}

      <img
        src={picture.large}
        alt={`${name.first} ${name.last}`}
        className="
          w-48 h-48 rounded-full mx-auto mb-6 object-cover 
          border-4 border-[--accent]
        "
      />

      <h2 className="text-2xl font-bold text-left mb-4">
        {name.title} {name.first} {name.last}
      </h2>

      <div className="space-y-3 text-left">
        <p>
          <strong>Idade:</strong> {dob.age}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Telefone:</strong> {phone}
        </p>
        <p>
          <strong>Localização:</strong> {location.city}, {location.country}
        </p>
      </div>
    </div>
  );
}
