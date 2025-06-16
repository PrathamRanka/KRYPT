import React, { useContext, useEffect, useRef } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

gsap.registerPlugin(ScrollTrigger);

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) {
      alert("Please fill in all fields.");
      return;
    }
    sendTransaction();
  };

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    gsap.from(cardRef.current, {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <div className="flex w-full justify-center items-center" ref={containerRef}>
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        
        <motion.div 
          className="flex flex-1 justify-start items-start flex-col mf:mr-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>

          {!currentAccount && (
            <motion.button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">Connect Wallet</p>
            </motion.button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Ethereum</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>Blockchain</div>
          </div>
        </motion.div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10" ref={cardRef}>
          {currentAccount ? (
            <motion.div 
              className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism"
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {shortenAddress(currentAccount)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="p-3 flex justify-center items-center rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism"
            >
              <p className="text-white font-light">Connect your wallet</p>
            </motion.div>
          )}

          <motion.div 
            className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} value={formData.addressTo} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} value={formData.amount} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} value={formData.keyword} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} value={formData.message} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send now
              </motion.button>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
