import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">MedCare</h2>
            <p className="text-sm leading-6">
              Providing quality healthcare services with experienced doctors and
              modern facilities. Your health is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Services
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Doctors
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Appointment
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>General Checkup</li>
              <li>Dental Care</li>
              <li>Cardiology</li>
              <li>Emergency Care</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@medcare.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Location: Karachi, Pakistan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm px-4">
        © {new Date().getFullYear()} MedCare. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
