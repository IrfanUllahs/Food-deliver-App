import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white py-8 px-4 md:px-8 lg:px-16 mt-10">
      <div className=" mx-auto grid grid-cols-2 md:grid-cols-4 sm:gap-8 gap-4">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">FOODI</h2>
          <p className="mt-4 text-gray-600">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </div>
        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold">Useful links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        {/* Main Menu */}
        <div>
          <h3 className="text-xl font-semibold">Main Menu</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Offers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Menus
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Reservation
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="mailto:example@email.com"
                className="text-gray-600 hover:text-green-600 break-words   "
              >
                example@email.com
              </a>
            </li>
            <li>
              <a
                href="tel:+64958248966"
                className="text-gray-600 hover:text-green-600"
              >
                +64 958 248 966
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Social media
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200  text-gray-600 flex sm:gap-28 gap-10 py-8 sm:flex-row flex-col">
        <div className="flex gap-5">
          <FaFacebookF className="text-green-600" size={24} />
          <FaInstagram className="text-green-600" size={24} />
          <FaTwitter className="text-green-600" size={24} />
          <FaYoutube className="text-green-600" size={24} />
        </div>
        <p>Copyright © 2023 Dscode | All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
