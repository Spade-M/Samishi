import { color } from 'framer-motion';
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8">
      <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <br />
        <nav className="flex flex-wrap gap-6 text-sm text-center md:text-left">
          <a href="/" className="hover:text-gray-400 transition px-3">Home</a>
          <a href="/about" className="hover:text-gray-400 transition px-3">About Us</a>
          <a href="/facts" className="hover:text-gray-400 transition px-3">Cat Facts</a>
        </nav>
        
        <div className="mt-6 md:mt-0 text-center md:text-right">
        <div className="flex justify-center md:justify-end gap-4 mt-2">
            <p>The content on SamishiCommunity is for education and information only.
               It should not be used as a substitute for professional  veterinary advice, diagnosis, or treatment.
                For medical advice about your cat, please see your veterinarian.</p>
          </div>
          <p className=" text-blue-400">&copy;  SamishiCommunity {new Date().getFullYear()} </p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
};

const styles = {
  carouselContainer: {
    color: "white",
  },
  a: {
    color:"rgb(189, 134, 172)", /* DodgerBlue */

  },
};

export default Footer



