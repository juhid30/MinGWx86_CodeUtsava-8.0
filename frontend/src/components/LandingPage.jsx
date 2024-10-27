import React from "react";
import { motion } from "framer-motion";
import Layout from "./Layout";
import mental from "../assets/mental.png";
import health from "../assets/health.png";
import leaf from "../assets/leaf.png";
import medicine from "../assets/medicine.png";
import logo from "../assets/logo.png"; // Adjust the path to your logo image
import { Link } from "react-router-dom";
const LandingPage = () => {
  // Define the animation variants
  const pillVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      {/* <Layout> */}
      <div className="flex items-center justify-center h-[100vh] w-[100%] relative">
        <div className="absolute top-5 left-5">
          <img src={logo} alt="Logo" className="h-24 w-auto" />{" "}
          {/* Adjust size as needed */}
        </div>

        <div className="h-full w-[60%] flex items-center justify-center">
          <div className="w-full h-[70%] py-10 pl-8 flex-col items-center justify-center">
            <motion.div
              className="pills flex gap-4 w-[60%] mb-4 mt-[4.5%]"
              initial="hidden"
              animate="visible"
              variants={pillVariants}
            >
              {["Balance", "Mobility", "Strength", "Flexibility"].map(
                (label) => (
                  <motion.div
                    key={label}
                    className="border-2 border-[#7c4776] cursor-default hover:bg-[#7c4776] hover:text-white transition-all duration-200 flex items-center justify-center rounded-full px-4 py-1"
                    variants={pillVariants}
                  >
                    {label}
                  </motion.div>
                )
              )}
            </motion.div>
            <motion.h1
              className="main-heading text-[3.5rem] leading-tight font-extrabold text-[#7c4776]-800 mb-4"
              initial="hidden"
              animate="visible"
              variants={headingVariants}
            >
              Enhancing Health and Fitness for an Improved Lifestyle
            </motion.h1>
            <motion.h2
              className="sub-heading text-xl font-semibold text-[#7c4776]-600 mb-6"
              initial="hidden"
              animate="visible"
              variants={headingVariants}
            >
              Empowering Your Journey!
            </motion.h2>
            <div className="buttons flex gap-4">
              <motion.button
                className="bg-[#7c4776] text-white px-6 py-2 rounded-full shadow hover:bg-[#7c4776]-600 transition-all duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/login"
                  className="w-full h-full flex items-center justify-center"
                >
                  {" "}
                  {/* Ensuring Link covers the button */}
                  Get Started
                </Link>
              </motion.button>
              <motion.button
                className="border border-[#7c4776] text-[#7c4776] px-6 py-2 rounded-full shadow hover:bg-[#7c4776] hover:text-white transition-all duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
        <div className="h-full w-[40%] relative">
          {/* Circles with animations */}
          <motion.div
            style={{
              backgroundImage: `url('../src/assets/landing.avif')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute w-[350px] h-[350px] rounded-full bg-[#7c4776] bg-opacity-80 shadow-lg top-[20%] right-[20%] z-[100]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute w-[150px] h-[150px] rounded-full bg-[#7c4776] bg-opacity-80 shadow-lg top-[60.5%] right-[60.5%] z-[120]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full bg-[#7c4776] bg-opacity-80 shadow-lg top-[15%] right-[15%]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
          ></motion.div>
        </div>
      </div>
      <div className="flex justify-center bg-[#7c4776] h-[40vh] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-[100%] text-center flex justify-center w-[90%] items-center">
          {[
            { title: "Mental Wellness Support", icon: mental },
            { title: "Medication Management Services", icon: medicine },
            { title: "Health Assessments and Screenings", icon: health },
            { title: "Ayurvedic Life Sciences", icon: leaf },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="bg-white w-[100%] h-[62.5%] p-5 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-[#7c4776] transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex w-[100%] h-[50%] items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <img
                    src={item.icon}
                    width={100}
                    height={100}
                    alt={item.title}
                  />
                </div>
              </div>
              <h3 className="text-lg flex items-center justify-center h-[100%] w-[100%] font-semibold text-[#7c4776]">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default LandingPage;
