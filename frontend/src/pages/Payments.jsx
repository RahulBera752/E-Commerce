// src/pages/Payments.jsx
import React from "react";

export default function Payments() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 leading-relaxed">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mb-2">
        How do I pay for a GhoroaStore purchase?
      </h2>
      <p className="mb-4">
        GhoroaStore offers you multiple payment methods. Whatever your online mode of payment,
        you can rest assured that our trusted payment gateway partners use secure encryption
        technology to keep your transaction details confidential at all times.
      </p>
      <p className="mb-4">
        You may use Internet Banking, Gift Card, Cash on Delivery and Wallet to make your purchase.
      </p>
      <p className="mb-6">
        GhoroaStore also accepts payments made using Visa, MasterCard, Maestro and American Express
        credit/debit cards in India and 21 other countries.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mb-2">
        Are there any hidden charges when I make a purchase?
      </h2>
      <p className="mb-4">
        There are <strong>NO hidden charges</strong> when you make a purchase on GhoroaStore.
        The prices listed for all the items are final and all-inclusive. The price you see on the
        product page is exactly what you pay.
      </p>
      <p className="mb-6">
        Delivery charges may be extra depending on the seller policy. Please check the individual
        seller for the same.
      </p>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mb-2">What is Cash on Delivery?</h2>
      <p className="mb-6">
        If you are not comfortable making an online payment, you can opt for the Cash on Delivery
        (C-o-D) payment method instead. With C-o-D you can pay in cash at the time of delivery,
        without requiring you to make any advance payment online.
        <br />
        <br />
        The maximum order value for C-o-D is ₹50,000. It is strictly a cash-only method. Gift Cards
        or store credit cannot be used. Foreign currency is not accepted.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mb-2">
        How do I pay using a credit/debit card?
      </h2>
      <p className="mb-4">
        We accept payments made by credit/debit cards issued in India and 21 other countries.
      </p>

      <h3 className="text-lg font-medium mt-4 mb-2">Credit cards</h3>
      <p className="mb-4">
        Visa, MasterCard and American Express credit cards are accepted. You will need your card
        number, expiry date and CVV. You may be asked for your 3D Secure password.
      </p>

      <h3 className="text-lg font-medium mt-4 mb-2">Debit cards</h3>
      <p className="mb-6">
        Visa, MasterCard and Maestro debit cards are accepted. You may need to provide your card
        number, expiry date (optional for Maestro), CVV (optional for Maestro) and your bank-issued
        online password.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mb-2">
        Is it safe to use my credit/debit card on GhoroaStore?
      </h2>
      <p className="mb-4">
        Yes, all transactions are secured with 256-bit encryption and processed through trusted
        payment gateways managed by leading banks. Banks now use the 3D Secure password for extra
        verification.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mb-2">
        What steps does GhoroaStore take to prevent fraud?
      </h2>
      <p className="mb-6">
        Transactions are monitored continuously for suspicious activity. In rare cases, we may
        request identity documents to confirm the cardholder’s authenticity. This ensures safe and
        secure online shopping.
      </p>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mb-2">What is a 3D Secure password?</h2>
      <p className="mb-6">
        The 3D Secure password, implemented by VISA ("Verified by VISA") and MasterCard ("MasterCard
        SecureCode"), adds an additional layer of security for your online transactions. This
        password is created and known only by you.
      </p>

      {/* --- Payment Methods Table --- */}
      <h2 className="text-2xl font-bold mb-4">Available Payment Methods</h2>
      <div className="overflow-x-auto shadow rounded-lg border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">Payment Method</th>
              <th className="border p-3 text-left">Details</th>
              <th className="border p-3 text-left">Limits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3 font-medium">Credit Card</td>
              <td className="border p-3">Visa, MasterCard, American Express</td>
              <td className="border p-3">As per card issuer</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border p-3 font-medium">Debit Card</td>
              <td className="border p-3">Visa, MasterCard, Maestro</td>
              <td className="border p-3">As per bank policy</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Net Banking</td>
              <td className="border p-3">All major Indian banks</td>
              <td className="border p-3">No specific limit</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border p-3 font-medium">Cash on Delivery</td>
              <td className="border p-3">Pay in cash upon delivery</td>
              <td className="border p-3">Max order value ₹50,000</td>
            </tr>
            <tr>
              <td className="border p-3 font-medium">Wallet</td>
              <td className="border p-3">Accepted wallets supported by our gateway</td>
              <td className="border p-3">As per wallet provider</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border p-3 font-medium">Gift Card</td>
              <td className="border p-3">Redeem GhoroaStore Gift Cards</td>
              <td className="border p-3">As per card balance</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

