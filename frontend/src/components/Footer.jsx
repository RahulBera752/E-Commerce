import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-sm text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-gray-800">ABOUT</h4>
            <ul>
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-800">HELP</h4>
            <ul>
              <li>
                <Link to="/payments" className="hover:underline">
                  Payments
                </Link>
              </li>
              <li>
                <Link to="/cancellation-returns" className="hover:underline">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-800">CONSUMER POLICY</h4>
            <ul>
              <li>
                <Link to="/return-policy" className="hover:underline">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-800">SOCIAL</h4>
            <ul>
            <li>
  <a
    href="https://www.facebook.com/profile.php?id=100073309894467"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Facebook
  </a>
</li>
<li>
  <a
    href="https://www.instagram.com/rahulbera_52/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Instagram
  </a>
</li>
              <li>
  <a
    href="https://x.com/PapaiBera161978"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    X(Formerly Twitter)
  </a>
</li>
<li>
  <a
    href="https://www.youtube.com/@rahulbera3564"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Youtube
  </a>
</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-800">Mail Us:</h4>
            <p>
              ghoroastore@gmail.com
              <br />
              033-98654422
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-800">
              Registered Office Address:
            </h4>
            <p>
              GhoroaStore Internet Pvt Ltd, Policepara,Garia
              <br />
              Kolkata, India - 700152
            </p>
            <p className="mt-2">CIN : U123456WB2025PTC123456</p>
            <p>Telephone: 044-12345678</p>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-gray-600">
          <p>© 2025 GhoroaStore.com</p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            {/*<Link to="/become-seller" className="hover:underline">
              Become a Seller
            </Link>
            <Link to="/advertise" className="hover:underline">
              Advertise
            </Link>
            <Link to="/gift-card" className="hover:underline">
              Gift Cards
            </Link>*/}
            <Link to="/help-center" className="hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
