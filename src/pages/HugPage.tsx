import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { getRandomHugMessage, getRandomNickname } from "@/data/loveMessages";

const HugPage = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [hugMessage, setHugMessage] = useState("");
  const [nickname, setNickname] = useState("");

  const handleHug = () => {
    setHugMessage(getRandomHugMessage());
    setNickname(getRandomNickname());
    setIsHugging(true);
  };

  const handleRelease = () => {
    setIsHugging(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen gradient-warm px-6 pt-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Warm overlay when hugging */}
        <AnimatePresence>
          {isHugging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 gradient-hug z-10"
            />
          )}
        </AnimatePresence>

        <div className="relative z-20 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-display text-2xl text-foreground mb-2">
              Need a Hug?
            </h1>
            <p className="text-sm text-muted-foreground">
              Press and hold for a warm embrace
            </p>
          </motion.div>

          {/* Hug Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onTouchStart={handleHug}
            onTouchEnd={handleRelease}
            onMouseDown={handleHug}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            className={`relative h-48 w-48 rounded-full transition-all duration-500 ${
              isHugging
                ? "gradient-sunset shadow-glow scale-110"
                : "gradient-love shadow-card"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isHugging ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={isHugging ? { duration: 1.2, repeat: Infinity } : {}}
              >
                <Heart
                  size={80}
                  className={`transition-all duration-500 ${
                    isHugging
                      ? "text-foreground fill-current"
                      : "text-blush-deep fill-blush"
                  }`}
                />
              </motion.div>
            </div>

            {/* Pulse rings when hugging */}
            <AnimatePresence>
              {isHugging && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 rounded-full border-2 border-blush-deep/30"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hug Message */}
          <AnimatePresence>
            {isHugging && hugMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
                className="mt-10 max-w-xs mx-auto"
              >
                <p className="font-display text-lg text-foreground mb-2">
                  {hugMessage}
                </p>
                <p className="text-sm text-muted-foreground">
                  — For you, {nickname}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instruction text */}
          {!isHugging && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-muted-foreground italic"
            >
              Hold to feel my love wrap around you ❤️
            </motion.p>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default HugPage;
