const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 fixed bottom-0 left-0 w-full bg-white z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {currentYear} Bookit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
