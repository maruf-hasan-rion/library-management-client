const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="footer footer-center mx-auto max-w-7xl p-4">
        <aside>
          <p>© {new Date().getFullYear()} Library Hero. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
