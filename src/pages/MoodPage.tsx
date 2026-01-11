import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Frown, Moon, Zap, Heart, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { getMoodResponse } from "@/data/loveMessages";

type MoodType = "happy" | "sad" | "tired" | "stressed";

const moods = [
  { type: "happy" as MoodType, icon: Smile, label: "Happy", color: "bg-gold", emoji: "😊" },
  { type: "sad" as MoodType, icon: Frown, label: "Sad", color: "bg-lavender", emoji: "😢" },
  { type: "tired" as MoodType, icon: Moon, label: "Tired", color: "bg-blush", emoji: "😴" },
  { type: "stressed" as MoodType, icon: Zap, label: "Stressed", color: "bg-peach", emoji: "😰" },
];

const moodBackgrounds: Record<MoodType, string> = {
  happy: "from-gold-soft via-gold/30 to-cream",
  sad: "from-lavender via-lavender-deep/20 to-cream",
  tired: "from-blush via-blush-deep/20 to-cream",
  stressed: "from-peach via-rose/20 to-cream",
};

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [response, setResponse] = useState<{ title: string; message: string } | null>(null);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    const moodResponse = getMoodResponse(mood);
    setResponse(moodResponse);
  };

  const handleBack = () => {
    setSelectedMood(null);
    setResponse(null);
  };

  return (
    <PageTransition>
      <motion.div
        className={`min-h-screen px-6 pt-12 transition-all duration-700 bg-gradient-to-b ${
          selectedMood ? moodBackgrounds[selectedMood] : "from-background via-cream to-blush/20"
        }`}
      >
        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div
              key="mood-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-3"
                >
                  <Heart size={20} className="text-blush-deep fill-blush" />
                  <h1 className="font-display text-2xl text-foreground">How Are You Feeling?</h1>
                </motion.div>
                <p className="text-sm text-muted-foreground">
                  Let me know, and I'll be here for you
                </p>
              </div>

              {/* Mood Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {moods.map((mood, index) => (
                  <motion.button
                    key={mood.type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(mood.type)}
                    className="love-card p-6 flex flex-col items-center gap-3 hover:shadow-glow transition-shadow"
                  >
                    <div className={`h-16 w-16 rounded-2xl ${mood.color}/50 flex items-center justify-center`}>
                      <span className="text-3xl">{mood.emoji}</span>
                    </div>
                    <span className="font-medium text-foreground">{mood.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mood-response"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-sm mx-auto"
            >
              {/* Back button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground mb-8 hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-sm">Back</span>
              </motion.button>

              {/* Response Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="love-card p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="mb-6"
                >
                  <span className="text-5xl">
                    {moods.find(m => m.type === selectedMood)?.emoji}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-xl text-foreground mb-4"
                >
                  {response?.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-muted-foreground leading-relaxed"
                >
                  {response?.message}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6"
                >
                  <Heart size={24} className="text-blush-deep fill-blush mx-auto animate-heartbeat" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageTransition>
  );
};

export default MoodPage;
