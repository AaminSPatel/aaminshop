import React, { useContext } from 'react';
import ShoppingAppContext from '../ShoppingAppContext';

const TermsOfService = () => {
  const {isDarkMode} = useContext(ShoppingAppContext)
  return (
    <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black'}  p-8`}>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>1. Acceptance of Terms:</strong> By using our services, you agree to these terms.
        </li>
        <li>
          <strong>2. Modifications:</strong> We reserve the right to modify these terms at any time.
        </li>
        <li>
          <strong>3. User Accounts:</strong> You are responsible for maintaining the confidentiality of your account.
        </li>
        <li>
          <strong>4. Prohibited Activities:</strong> You may not use our services for unlawful purposes.
        </li>
        <li>
          <strong>5. Product Descriptions:</strong> We strive to be as accurate as possible in product descriptions.
        </li>
        <li>
          <strong>6. Pricing:</strong> All prices are subject to change without notice.
        </li>
        <li>
          <strong>7. Payments:</strong> Payments must be made through accepted methods only.
        </li>
        <li>
          <strong>8. Shipping:</strong> Shipping times and costs vary by location and product.
        </li>
        <li>
          <strong>9. Returns and Refunds:</strong> Our return and refund policy is outlined in a separate section.
        </li>
        <li>
          <strong>10. Intellectual Property:</strong> All content on our site is owned by us or our licensors.
        </li>
        <li>
          <strong>11. Limitation of Liability:</strong> We are not liable for any damages arising from the use of our services.
        </li>
        <li>
          <strong>12. Termination:</strong> We may terminate your account for violating these terms.
        </li>
        <li>
          <strong>13. Governing Law:</strong> These terms are governed by the laws of your jurisdiction.
        </li>
        <li>
          <strong>14. Dispute Resolution:</strong> Any disputes will be resolved through binding arbitration.
        </li>
        <li>
          <strong>15. Contact Information:</strong> For any questions regarding these terms, contact us.
        </li>
      </ul>
    </div>
  );
};

export default TermsOfService;
