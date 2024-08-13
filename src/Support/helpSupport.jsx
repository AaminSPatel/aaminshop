import React, { useContext } from 'react';
import ShoppingAppContext from '../ShoppingAppContext';

const HelpAndSupport = () => {
  const {isDarkMode} = useContext(ShoppingAppContext)

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black'}  p-8`}>
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <p className="mb-6">
        Welcome to our Help & Support page. We're here to assist you with any questions or issues you may have. Below, you'll find answers to common questions and details on how to get further assistance.
      </p>

      <div className="space-y-8">
        {/* Section 1: Account and Login */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Account and Login</h2>
          <p className="mb-4">
            Having trouble accessing your account? Here’s how you can resolve common issues:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Resetting Your Password:</strong> Click on the "Forgot Password" link on the login page and follow the instructions to reset your password.</li>
            <li><strong>Creating a New Account:</strong> You can sign up for a new account by clicking on the "Sign Up" button and entering your details.</li>
            <li><strong>Updating Account Information:</strong> Go to your account settings to update your email, password, and other personal details.</li>
          </ul>
        </div>

        {/* Section 2: Orders and Shipping */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Orders and Shipping</h2>
          <p className="mb-4">
            Find answers to your questions about order processing, tracking, and shipping:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Order Status:</strong> Log in to your account and navigate to "My Orders" to view your order status.</li>
            <li><strong>Tracking Your Order:</strong> Once your order has shipped, you will receive a tracking number via email, which you can use to monitor your package.</li>
            <li><strong>Shipping Options:</strong> We offer various shipping methods. Choose your preferred option at checkout.</li>
            <li><strong>Shipping Delays:</strong> If your order is delayed, please contact our customer service for assistance.</li>
          </ul>
        </div>

        {/* Section 3: Returns and Refunds */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Returns and Refunds</h2>
          <p className="mb-4">
            Need to return an item or request a refund? Here's how:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Return Policy:</strong> You can return items within 30 days of purchase. Please ensure the items are in original condition.</li>
            <li><strong>Initiating a Return:</strong> Go to "My Orders," select the item you wish to return, and follow the prompts to initiate a return.</li>
            <li><strong>Refund Processing:</strong> Refunds will be processed to your original payment method within 5-7 business days after we receive your return.</li>
            <li><strong>Exchange Options:</strong> If you wish to exchange an item, please contact customer support for assistance.</li>
          </ul>
        </div>

        {/* Section 4: Payments and Billing */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Payments and Billing</h2>
          <p className="mb-4">
            Here’s how to manage your payments and billing information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Payment Methods:</strong> We accept major credit cards, PayPal, and other secure payment methods.</li>
            <li><strong>Billing Information:</strong> You can update your billing information in your account settings.</li>
            <li><strong>Payment Issues:</strong> If your payment was declined, please check your payment details or contact your bank.</li>
            <li><strong>Invoice Requests:</strong> You can request an invoice for your order by contacting customer support.</li>
          </ul>
        </div>

        {/* Section 5: Technical Support */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Technical Support</h2>
          <p className="mb-4">
            Encountering technical issues on our site? We’re here to help:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Website Navigation:</strong> If you’re having trouble navigating the site, try clearing your browser’s cache or using a different browser.</li>
            <li><strong>Mobile App Support:</strong> For issues with our mobile app, ensure you have the latest version installed.</li>
            <li><strong>Error Messages:</strong> If you encounter an error message, please take a screenshot and contact our technical support team.</li>
          </ul>
        </div>

        {/* Section 6: Contacting Customer Support */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Contacting Customer Support</h2>
          <p className="mb-4">
            If you need further assistance, our customer support team is available to help:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Email Support:</strong> You can reach us at [your email address]. We strive to respond within 24 hours.</li>
            <li><strong>Phone Support:</strong> Call us at [your phone number] between 9 AM and 5 PM, Monday through Friday.</li>
            <li><strong>Live Chat:</strong> Our live chat feature is available on our website during business hours.</li>
            <li><strong>Help Center:</strong> Visit our Help Center for more FAQs and support articles.</li>
          </ul>
        </div>

        {/* Section 7: Additional Resources */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Additional Resources</h2>
          <p className="mb-4">
            Explore these additional resources for more help and information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>FAQ Page:</strong> Visit our <a href="/faqs" className="text-orange-500 underline">FAQs page</a> for answers to common questions.</li>
            <li><strong>Privacy Policy:</strong> Learn how we protect your information on our <a href="/privacy-policy" className="text-orange-500 underline">Privacy Policy page</a>.</li>
            <li><strong>Terms of Service:</strong> Review our terms and conditions on the <a href="/terms-of-service" className="text-orange-500 underline">Terms of Service page</a>.</li>
            <li><strong>Community Forum:</strong> Join our community forum to discuss with other customers and find solutions to common issues.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
