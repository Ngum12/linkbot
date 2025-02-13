import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const categories = ['2D', '3D', 'Done Selection', 'Maps', 'Vision', 'Other'];
const initialLinks = {
  '2D': [],
  '3D': [],
  'Done Selection': [],
  'Maps': [],
  'Vision': [],
  'Other': []
};

export default function LinkLibraryChatbot() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [selectedCategory, setSelectedCategory] = useState('2D');
  const [links, setLinks] = useState(initialLinks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [newLink, setNewLink] = useState('');

  const filteredLinks = links[selectedCategory].filter(link =>
    link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (event, info) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };

  const addLink = (link) => {
    setLinks(prevLinks => ({
      ...prevLinks,
      [selectedCategory]: [...prevLinks[selectedCategory], link]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLink) {
      addLink(newLink);
      setNewLink('');
    }
  };

  return (
    <motion.div
      className="fixed z-50 bg-white shadow-2xl rounded-2xl p-4"
      drag
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }}
      style={{ x: position.x, y: position.y }}
      onDragEnd={handleDragEnd}
    >
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Link Library</h2>
              <button className="p-2" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-md border"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-md border"
            />
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Add new link..."
                className="w-full p-2 rounded-md border"
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Add
              </button>
            </form>
            <ul className="space-y-2">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => (
                  <li key={index} className="text-blue-500 underline cursor-pointer">
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No links found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <button className="p-2" onClick={() => setIsOpen(true)}>
          <Search className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
