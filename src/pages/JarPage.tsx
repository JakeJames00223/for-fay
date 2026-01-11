import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RotateCcw } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { getRandomJarNote, getRandomNickname } from "@/data/loveMessages";

const JarPage = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // Check for device shake
    const handleShake = (e: DeviceMotionEvent) => {
      const acceleration = e.accelerationIncludingGravity;
      if (acceleration) {
        const shake = Math.abs(acceleration.x || 0) + Math.abs(acceleration.y || 0) + Math.abs(acceleration.z || 0);
        if (shake > 25 && !isShaking && !showNote) {
          triggerJar();
        }
      }
    };

    if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleShake);
    }

    return () => {
      window.removeEventListener('devicemotion', handleShake);
    };
  }, [isShaking, showNote]);

  const triggerJar = () => {
    if (isShaking || showNote) return;
    
    setIsShaking(true);
    setCurrentNote(getRandomJarNote());
    setNickname(getRandomNickname());

    setTimeout(() => {
      setIsShaking(false);
      setShowNote(true);
    }, 600);
  };

  const handleReset = () => {
    setShowNote(false);
  };

  const handleJarClick = () => {
    triggerJar();
  };

  return (
    <PageTransition>
      <div className="min-h-screen gradient-warm px-6 pt-12 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-gold fill-gold-soft" />
            <h1 className="font-display text-2xl text-foreground">Love Jar</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Shake or tap to reveal a surprise!
          </p>
        </motion.div>

        {/* Jar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="relative my-8"
        >
          <motion.button
            onClick={handleJarClick}
            animate={isShaking ? { 
              rotate: [0, -5, 5, -5, 5, 0],
              x: [0, -10, 10, -10, 10, 0]
            } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Jar body */}
            <div className="relative w-48 h-64">
              {/* Jar lid */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-gradient-to-b from-gold to-gold-soft rounded-t-lg shadow-md z-10" />
              
              {/* Jar neck */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-blush/30 border-x-4 border-blush/20" />
              
              {/* Jar main body */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-52 rounded-3xl bg-gradient-to-b from-cream/90 via-blush/30 to-lavender/40 border-4 border-blush/20 shadow-lg overflow-hidden">
                {/* Glass shine effect */}
                <div className="absolute top-4 right-4 w-6 h-20 bg-white/40 rounded-full blur-sm transform rotate-12" />
                
                {/* Hearts inside */}
                <div className="absolute inset-4 flex flex-wrap gap-2 justify-center items-center opacity-60">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      <Heart
                        size={16 + Math.random() * 10}
                        className="text-blush-deep fill-blush"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sparkle effects */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-2"
            >
              <Sparkles size={16} className="text-gold" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              className="absolute bottom-20 left-0"
            >
              <Sparkles size={12} className="text-gold" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Note Card */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ type: "spring", damping: 15 }}
              className="love-card p-6 max-w-xs text-center relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-3 left-1/2 -translate-x-1/2"
              >
                <div className="h-8 w-8 rounded-full gradient-love shadow-soft flex items-center justify-center">
                  <Heart size={14} className="text-foreground fill-current" />
                </div>
              </motion.div>

              <div className="pt-4">
                <p className="font-display text-lg text-foreground leading-relaxed mb-4">
                  {currentNote}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  — A note for {nickname}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-blush/30 transition-colors"
              >
                <RotateCcw size={14} />
                <span className="text-sm">Pick Another</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {!showNote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground italic text-center"
          >
            Tap the jar or shake your phone! 💕
          </motion.p>
        )}
      </div>
    </PageTransition>
  );
};

export default JarPage;
