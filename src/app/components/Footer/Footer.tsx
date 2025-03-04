// src/app/components/Footer/Footer.tsx

function Footer() {
  return (
    <footer className="grid place-items-center w-full bg-zinc-900 text-zinc-300 py-6">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
