import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const memories = [
  {
    id: 1,
    date: "Our Start",
    title: "The Beginning of Us",
    description:
      "The day everything changed ❤️ The moment our story truly began.",
    emoji: "✨",
    image: "memories/1.jpg",
  },
  {
    id: 2,
    date: "First Conversation",
    title: "It All Felt Natural",
    description:
      "From small talk to lasting forever. We didn't even realize how special it was back then.",
    emoji: "💬",
    image: "memories/2.jpg",
  },
  {
    id: 3,
    date: "First Promise",
    title: "Nervous but Real",
    description:
      "I was so nervous, but you were perfect. A promise straight from the heart.",
    emoji: "🤞",
    image: "memories/3.jpg",
  },
  {
    id: 4,
    date: "First Heart",
    title: "A Shared Feeling",
    description: "A beautiful memory we shared, filled with warmth and love.",
    emoji: "❤️",
    image: "memories/4.jpg",
  },
  {
    id: 5,
    date: "First Meme",
    title: "Laughing Together",
    description:
      "It all started with a smile, and laughter became our language.",
    emoji: "😂",
    image: "memories/5.jpg",
  },
  {
    id: 6,
    date: "Cute Promise",
    title: "Forever Us",
    description:
      "Together until the end. A simple promise with endless meaning.",
    emoji: "💍",
    image: "memories/6.jpg",
  },
  {
    id: 7,
    date: "First Call",
    title: "Voices That Connected",
    description:
      "We were discussing old cartoons, not knowing we were creating memories.",
    emoji: "📞",
    image: "memories/7.jpg",
  },
  {
    id: 8,
    date: "Second Heart",
    title: "Growing Closer",
    description:
      "We got closer as time went by, our hearts learning each other.",
    emoji: "💖",
    image: "memories/8.jpg",
  },
  {
    id: 9,
    date: "Lock Screens",
    title: "Matching Hearts",
    description:
      "Sharing lock screens and making that beautiful hand gesture together.",
    emoji: "📱",
    image: "memories/9.jpg",
  },
  {
    id: 10,
    date: "My First Gift",
    title: "Unforgettable",
    description: "The best gift I ever received, because it came from you.",
    emoji: "🎁",
    image: "memories/10.jpg",
  },
  {
    id: 11,
    date: "Your First Gift",
    title: "Your Smile",
    description:
      "I can still see the smile on your face that day. A moment frozen in my heart.",
    emoji: "😊",
    image: "memories/11.jpg",
  },
  {
    id: 12,
    date: "First Ramadan",
    title: "Hope & Prayers",
    description: "I never prayed for something that much in my whole life.",
    emoji: "🌙",
    image: "memories/12.jpg",
  },
  {
    id: 13,
    date: "First Eid",
    title: "A Blessed Day",
    description:
      "Hearing you that day was a blessing I'll always be thankful for.",
    emoji: "🕌",
    image: "memories/13.jpg",
  },
  {
    id: 14,
    date: "Note Trend",
    title: "Always Mine",
    description: "It's always sweet to see that you're all mine.",
    emoji: "📝",
    image: "memories/14.jpg",
  },
];

const TimelinePage = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <PageTransition>
      <div className="min-h-screen gradient-warm px-6 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Heart size={20} className="text-blush-deep fill-blush" />
            <h1 className="font-display text-2xl">Our Love Timeline</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-sm mx-auto">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blush via-lavender to-gold" />

          <div className="space-y-8">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="relative pl-16"
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-3 top-6 h-6 w-6 rounded-full gradient-love shadow-soft flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span className="text-xs">{memory.emoji}</span>
                </motion.div>

                {/* Card */}
                <motion.div
                  layoutId={`card-${memory.id}`}
                  onClick={() => setSelectedMemory(memory)}
                  whileHover={{ scale: 1.03 }}
                  className="love-card p-4 cursor-pointer overflow-hidden"
                >
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />

                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {memory.date}
                    </span>
                  </div>

                  <h3 className="font-display text-lg mb-1">{memory.title}</h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {memory.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Ending Heart */}
          <div className="flex justify-center py-10">
            <div className="h-12 w-12 rounded-full gradient-sunset shadow-glow flex items-center justify-center animate-heartbeat">
              <Heart size={24} className="fill-current" />
            </div>
          </div>
        </div>

        {/* FULLSCREEN MODAL */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                layoutId={`card-${selectedMemory.id}`}
                className="bg-background rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-3 right-3 bg-black/40 rounded-full p-1"
                >
                  <X size={16} className="text-white" />
                </button>

                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />

                <div className="p-6">
                  <span className="text-xs text-muted-foreground">
                    {selectedMemory.date}
                  </span>

                  <h2 className="font-display text-2xl my-2">
                    {selectedMemory.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selectedMemory.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default TimelinePage;
