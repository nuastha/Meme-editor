const nav = [
  {
    id: 1,
    title: "Link 1",
    href: "#",
  },
  {
    id: 2,
    title: "Link 2",
    href: "#",
  },
  {
    id: 3,
    title: "Link 3",
    href: "#",
  },
  {
    id: 4,
    title: "Link 4",
    href: "#",
  },
  {
    id: 5,
    title: "Link 5",
    href: "#",
  },
];

const NavLink = () => {
  return (
    <ul className="flex gap-4 text-white font-semibold">
      {nav.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            className="inline-block size-full px-2.5 py-1.5 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
