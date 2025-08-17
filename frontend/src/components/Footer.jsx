import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-sm text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-gray-800">ABOUT</h4>
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Stories</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-800">HELP</h4>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-800">CONSUMER POLICY</h4>
            <ul>
              <li>Return Policy</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-800">SOCIAL</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-800">Mail Us:</h4>
            <p>
              Rahul Internet Pvt Ltd, Policepara,Garia,
              <br />
              Kolkata, India - 700152
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-800">
              Registered Office Address:
            </h4>
            <p>
              Rahul Internet Pvt Ltd, Policepara,Garia
              <br />
              Kolkat, India - 700152
            </p>
            <p className="mt-2">CIN : U123456WB2025PTC123456</p>
            <p>Telephone: 044-12345678</p>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-gray-600">
          <p>© 2025 Rahul.com</p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            <span>Become a Seller</span>
            <span>Advertise</span>
            <span>Gift Cards</span>
            <span>Help Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
