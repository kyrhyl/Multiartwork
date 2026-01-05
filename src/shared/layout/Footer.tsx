import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-[#0d121b] text-gray-300 py-12 mt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Multi-Artworks &amp; Signages</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium signage solutions, large-format printing, and expert steel fabrication.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/gallery" className="hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@multiartworks.com</li>
              <li>+1 234 567 8900</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Multi-Artworks &amp; Signages. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
