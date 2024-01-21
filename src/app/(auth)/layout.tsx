export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-red-500 text-white">AuthLayout Navbar</nav>
      {children}
    </div>
  );
}
