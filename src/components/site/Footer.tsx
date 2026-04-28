import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#0d1821] border-t border-[#344966] py-6 mt-auto">
      <div className="max-w-[1600px] mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          Built with React, Vite, Tailwind and React Router
        </p>
        
        <div className="flex gap-4">
          <a
            href="https://github.com/RitaLi3711"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaGithub size={20} />
            <span className="text-sm">GitHub</span>
          </a>
          
          <a
            href="https://linkedin.com/in/rita-li-051044374"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaLinkedin size={20} />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};