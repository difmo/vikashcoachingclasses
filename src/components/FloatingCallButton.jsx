// Importing the Phone icon from lucide-react
import { FaWhatsapp } from "react-icons/fa"; // Importing the WhatsApp icon from react-icons
import { motion } from "framer-motion";
const FloatingCallAndWhatsappButtons = () => {
  return (
    <div className="flex">
      {/* Floating Call Button */}
      {/* <a
        href="tel:+919455831123"
        aria-label="Call us at +91 9455831123"
        className="fixed bottom-24 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
      >
        <Phone size={24} />
      </a> */}

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919582699555"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
        initial={{ y: 20 }}
        animate={{ y: [20, -20, 20] }} // jump up and back down
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaWhatsapp size={24} />
      </motion.a>
    </div>
  );
};

export default FloatingCallAndWhatsappButtons;
