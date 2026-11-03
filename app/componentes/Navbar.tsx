export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-6 text-xl">
      <ul className="flex space-x-4">
        <li>
          <a href="/Home" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/curiculum_v" className="hover:text-gray-400">
            Curiculum vitae
          </a>
        </li>
        <li>
          <a href="/todo" className="hover:text-gray-400">
            To do list
          </a>
        </li>
        <li>
          <a href="/blog" className="hover:text-gray-400">
            Blog
          </a>
        </li>
      </ul>
    </nav>
  );
}
