import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Button = () => {
    return (
        <button className="group relative flex items-center gap-2 py-4 pl-14 pr-4">
            <motion.div className="absolute left-0 z-0 h-12 w-12 rounded-3xl bg-orange-600 p-4 text-white transition-all duration-300 group-hover:w-[102%]">
                <FaChevronRight />
            </motion.div>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Learn More</span>
        </button>
    );
};

export default Button;
