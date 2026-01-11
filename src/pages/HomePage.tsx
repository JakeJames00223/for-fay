import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import TypewriterText from "@/components/TypewriterText";
import FloatingHearts from "@/components/FloatingHearts";
import { getRandomLoveLetter, getRandomNickname } from "@/data/loveMessages";

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loveLetter, setLoveLetter] = useState("");
  const [nickname, setNickname] = useState("");
  const [letterComplete, setLetterComplete] = useState(false);

  useEffect(() => {
    setNickname(getRandomNickname());
    setLoveLetter(getRandomLoveLetter());

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const refreshLetter = () => {
    setLetterComplete(false);
    setLoveLetter(getRandomLoveLetter());
    setNickname(getRandomNickname());
  };

  if (showWelcome) {
    return (
      <div className="fixed inset-0 flex items-center justify-center gradient-warm">
        <FloatingHearts />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <Heart size={80} className="text-blush-deep fill-blush mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-3xl text-foreground italic"
          >
            Welcome back, my love
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen gradient-warm">
        <FloatingHearts />
        <div className="relative z-10 px-6 pt-12 pb-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-lg text-muted-foreground mb-1">
              Today's Love Letter
            </h2>
            <p className="text-sm text-blush-deep font-medium">
              for {nickname}
            </p>
          </motion.div>

          {/* Love Letter Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="love-card mx-auto max-w-sm"
          >
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full gradient-love flex items-center justify-center shadow-soft">
                <Sparkles size={24} className="text-foreground" />
              </div>
            </div>

            <div className="min-h-[180px] text-center">
              <p className="font-display text-lg leading-relaxed text-foreground">
                <TypewriterText
                  text={loveLetter}
                  speed={35}
                  onComplete={() => setLetterComplete(true)}
                />
              </p>
            </div>

            {letterComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-muted-foreground mb-4 italic">
                  — With all my love ❤️
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={refreshLetter}
                  className="love-button text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Heart size={16} className="fill-current" />
                    Another Letter
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Daily reminder section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/50 border border-lavender-deep/20">
              <Heart size={14} className="text-lavender-deep fill-lavender" />
              <span className="text-sm text-lavender-deep font-medium">
                You are loved beyond words
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
