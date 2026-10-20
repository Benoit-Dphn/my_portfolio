export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-6 text-xl">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/curiculum_v" className="hover:text-gray-400">
            Curiculum vitae
          </a>
        </li>
      </ul>
    </nav>
  );
}
