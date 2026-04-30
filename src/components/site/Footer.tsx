import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/RitaLi3711' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rita-li-051044374' },
  ];

  return (
    <footer className="bg-[#0d1821] border-t border-[#344966] py-6 mt-auto">
      <div className="max-w-[1600px] mx-auto px-5 flex sm:flex-row justify-between items-center gap-4 flex-col">
        <p className="text-gray-400 text-sm">
          Built with React, Vite, Tailwind and React Router
        </p>
        
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};