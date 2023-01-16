'use client';

import { AnimatePresence, motion } from "framer-motion";

const ListBox = ({children}) => {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
  };
  
  export default ListBox;
  