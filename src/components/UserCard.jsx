import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa"; // Ícones para detalhes

export default function UserCard({ user, onFavorite }) {
  if (!user) return null;

  const { name, picture, email, phone, location, dob } = user;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-auto transition-all duration-300 hover:shadow-xl">
      <img
        src={picture.large}
        alt={`${name.first} ${name.last}`}
        className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600 dark:border-blue-400"
      />
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
        <FaUser /> {name.title} {name.first} {name.last}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
        <FaBirthdayCake /> Idade: {dob.age}
      </p>
      <p className="mt-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
        <FaEnvelope /> <strong>Email:</strong> {email}
      </p>
      <p className="text-gray-800 dark:text-gray-200 flex items-center gap-2">
        <FaPhone /> <strong>Telefone:</strong> {phone}
      </p>
      <p className="text-gray-800 dark:text-gray-200 flex items-center gap-2">
        <FaMapMarkerAlt /> <strong>Localização:</strong> {location.city},{" "}
        {location.country}
      </p>
      {onFavorite && (
        <button
          onClick={() => onFavorite(user)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <FaUser className="text-lg" /> Adicionar aos Favoritos
        </button>
      )}
    </div>
  );
}
