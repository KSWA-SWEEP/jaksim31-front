'use client';

import Image from 'next/image';
import exampleImg from '../../../public/images/landing-example.webp'
import { motion } from "framer-motion";

const ExampleScreen = () => {
    return (
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 text-center aspect-video lg:mx-40">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -3 }}
            >
              <div className="relative flex flex-col w-full h-full mb-8 break-words bg-white rounded-lg shadow-lg shadow-zinc-300">
                <div className="flex-auto overflow-hidden rounded-lg">
                  <Image 
                    alt={"예시 화면"} 
                    src={exampleImg}
                    sizes="(max-width: 1200px) 100vw,
                            (max-height: 1200px) 100vw,
                            33vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
    );
  };
  
  export default ExampleScreen;
  