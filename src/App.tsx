import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import MoodPage from "./pages/MoodPage";
import HugPage from "./pages/HugPage";
import JarPage from "./pages/JarPage";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/for-fay">
        <div className="relative min-h-screen">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/hug" element={<HugPage />} />
              <Route path="/jar" element={<JarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
