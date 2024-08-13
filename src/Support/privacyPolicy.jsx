import React, { useContext } from 'react';
import ShoppingAppContext from '../ShoppingAppContext';

const PrivacyPolicy = () => {
  const {isDarkMode} = useContext(ShoppingAppContext)

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black'}  p-8`}>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6">
        This Privacy Policy outlines how we collect, use, and protect your personal information
        when you visit our website and use our services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <strong>Personal Information:</strong> We collect information such as your name, email address, phone number, and payment details when you register, place an order, or contact us.
        </li>
        <li>
          <strong>Non-Personal Information:</strong> We collect data such as IP addresses, browser type, and usage data to improve our services.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies to enhance your experience, remember your preferences, and track site usage.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>To process transactions and manage your account.</li>
        <li>To provide customer support and respond to inquiries.</li>
        <li>To personalize your experience and improve our website.</li>
        <li>To send promotional emails and offers with your consent.</li>
        <li>To analyze data and improve our products and services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>We do not sell or rent your personal information to third parties.</li>
        <li>We may share your information with trusted third-party service providers to perform tasks on our behalf (e.g., payment processing, shipping).</li>
        <li>We may disclose your information to comply with legal obligations or protect our rights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">4. Security of Your Information</h2>
      <p className="mb-6">
        We implement a variety of security measures to protect your personal information.
        However, no method of transmission over the Internet is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Your Choices and Rights</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>You can update your personal information in your account settings.</li>
        <li>You can opt out of receiving promotional emails by following the unsubscribe link.</li>
        <li>You have the right to request access to, correction of, or deletion of your personal data.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">6. Children's Privacy</h2>
      <p className="mb-6">
        Our services are not directed to individuals under the age of 13, and we do not knowingly collect
        personal information from children under 13.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page,
        and the effective date will be updated accordingly.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at
        [your email address].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
