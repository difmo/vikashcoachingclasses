// Importing the Phone icon from lucide-react
import { FaWhatsapp } from "react-icons/fa"; // Importing the WhatsApp icon from react-icons
import { motion } from "framer-motion";
import whatsapp from "../assets/whatsapp.svg";
const FloatingCallAndWhatsappButtons = () => {
  return (
    <div className="flex">
      <motion.a
        href="https://wa.me/918750919571"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className=" bottom-8 fixed left-12 rounded-full transition duration-300 flex items-center justify-center"
        initial={{ y: 20 }}
        animate={{ y: [20, -20, 20] }} // jump up and back down
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={whatsapp} className="h-10 w-10 rounded-full" />
      </motion.a>
    </div>
  );
};

export default FloatingCallAndWhatsappButtons;
