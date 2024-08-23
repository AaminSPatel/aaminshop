import React, { useContext } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ShoppingAppContext from '../ShoppingAppContext';
import { FaGithub } from 'react-icons/fa6';

const Footer = () => {
  const {isDarkMode} = useContext(ShoppingAppContext)
  return (
    <footer className={` w-full px-6 ${isDarkMode ? 'text-white bg-slate-900' : 'text-black bg-white '}  py-10 shadow-sm shadow-black`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Categories Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul>
              {['Clothing', 'Footwear', 'Accessories', 'Sports', 'Mobile', 'Watches', 'Perfumes'].map((category, i) => (
                <li key={i} className="mb-2 hover:text-yellow-500">
                  <a href={`/aaminshop/shop`}>{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul>
              
              <li className='mb-2 hover:text-yellow-500'>
                <a href="/aaminshop/aboutus">About Us</a>
              </li>
              <li className='mb-2 hover:text-yellow-500'>
                <a href="/aaminshop/contact">Contact Us</a>
              </li>
              {['Terms of Service', 'Privacy Policy', 'FAQs','Help & Support'].map((link, i) => (
                <li key={i} className="mb-2 hover:text-yellow-500">
                  <a href={`/aaminshop/${link.replace(/\s+/g, '-').toLowerCase()}`}>{link}</a>
                </li>
              ))}
              
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="https://github.com/AaminSPatel" className="hover:text-yellow-400">
                  <FaGithub size={24} />
                </a>
              </li>
              <li>
                <a href="https://aaminspatel.github.io/portfolio1/" className="hover:text-yellow-400">
                  <FaInstagram size={24} />
                </a>
              </li>
              
              <li>
                <a href="https://www.linkedin.com/in/aamin-patel-149295255/" className="hover:text-yellow-400">
                  <FaLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company Info</h4>
            <p className="mb-2">123 AaminShop, Ujjain City, India</p>
            <p className="mb-2">Phone: (+91) 912345 67890</p>
            <p className="mb-2">Email: support@aaminshop.com</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          {/* Logo */}
          <div className="mb-4">
            <a href="https://aaminspatel.github.io/portfolio1/" target='_blank'> 
            <img src="./assets/logo1.png" alt="Company Logo" className={`mx-auto h-28 rounded-full ${isDarkMode ? '' : 'bg-slate-700 hover:bg-slate-900 '}`} />
            </a>
          </div>

          {/* Copyright Info */}
          <p>&copy; 2024 <a href="https://aaminspatel.github.io/portfolio1/" target='_blank'> Aamin Patel</a>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
