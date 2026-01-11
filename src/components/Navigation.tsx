import { useLocation, Link } from "react-router-dom";
import { Heart, BookHeart, Smile, Hand, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Heart, label: "Home" },
  { path: "/timeline", icon: BookHeart, label: "Memories" },
  { path: "/mood", icon: Smile, label: "Mood" },
  { path: "/hug", icon: Hand, label: "Hug" },
  { path: "/jar", icon: Sparkles, label: "Jar" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around rounded-3xl bg-card/90 p-2 shadow-card backdrop-blur-lg border border-border/50">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative flex flex-col items-center p-2"
              >
                <motion.div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "gradient-love shadow-soft"
                      : "hover:bg-muted"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                    fill={isActive ? "currentColor" : "none"}
                  />
                </motion.div>
                <span
                  className={`mt-1 text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-blush-deep"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
