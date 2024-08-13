import React, { useContext } from 'react';
import ShoppingAppContext from '../ShoppingAppContext';

const FAQs = () => {
  const {isDarkMode} = useContext(ShoppingAppContext)

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black'}  p-8`}>
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-8">
        {/* FAQ Item 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. What is your return policy?</h2>
          <p>
            We offer a 30-day return policy on most items. Products must be returned in their original condition with all packaging intact. Please refer to our Return Policy page for more details.
          </p>
        </div>

        {/* FAQ Item 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">2. How long does shipping take?</h2>
          <p>
            Shipping times vary depending on your location and the shipping method selected at checkout. Standard shipping typically takes 3-7 business days, while express shipping takes 1-3 business days.
          </p>
        </div>

        {/* FAQ Item 3 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Do you ship internationally?</h2>
          <p>
            Yes, we offer international shipping to many countries. Shipping rates and times will vary depending on the destination. Please check our Shipping Information page for more details.
          </p>
        </div>

        {/* FAQ Item 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">4. How can I track my order?</h2>
          <p>
            Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on the carrier's website.
          </p>
        </div>

        {/* FAQ Item 5 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">5. What payment methods do you accept?</h2>
          <p>
            We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods. All transactions are encrypted to ensure your safety.
          </p>
        </div>

        {/* FAQ Item 6 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Can I change or cancel my order?</h2>
          <p>
            Orders can be changed or canceled within 1 hour of placing the order. Please contact our customer service team as soon as possible to request changes or cancellation.
          </p>
        </div>

        {/* FAQ Item 7 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Do you offer gift cards?</h2>
          <p>
            Yes, we offer digital gift cards in various denominations. Gift cards can be purchased online and sent directly to the recipient's email.
          </p>
        </div>

        {/* FAQ Item 8 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">8. How do I contact customer service?</h2>
          <p>
            You can contact our customer service team via email at [your email address] or by using the contact form on our website. Our team is available Monday through Friday, 9 AM to 5 PM.
          </p>
        </div>

        {/* FAQ Item 9 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">9. Are your products authentic?</h2>
          <p>
            Yes, all of our products are 100% authentic and sourced directly from the manufacturers or authorized distributors.
          </p>
        </div>

        {/* FAQ Item 10 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">10. How do I create an account?</h2>
          <p>
            Creating an account is easy! Simply click on the "Sign Up" button on our website, and follow the prompts to enter your information. Having an account allows you to track orders, save items to your wishlist, and more.
          </p>
        </div>

        {/* FAQ Item 11 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">11. How do I apply a discount code?</h2>
          <p>
            You can apply a discount code at checkout. Enter the code in the "Discount Code" field and click "Apply." The discount will be applied to your total if the code is valid.
          </p>
        </div>

        {/* FAQ Item 12 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">12. What if I receive a damaged or incorrect item?</h2>
          <p>
            If you receive a damaged or incorrect item, please contact our customer service team immediately. We will arrange for a replacement or refund as needed.
          </p>
        </div>

        {/* FAQ Item 13 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">13. Do you have a loyalty program?</h2>
          <p>
            Yes, we offer a loyalty program where you can earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up for our newsletter to learn more about our loyalty program.
          </p>
        </div>

        {/* FAQ Item 14 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">14. How do I unsubscribe from your emails?</h2>
          <p>
            You can unsubscribe from our emails by clicking the "Unsubscribe" link at the bottom of any promotional email. You can also manage your email preferences in your account settings.
          </p>
        </div>

        {/* FAQ Item 15 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">15. Is my personal information secure?</h2>
          <p>
            Yes, we take your privacy and security seriously. We use advanced encryption technology to protect your personal information and ensure a safe shopping experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
