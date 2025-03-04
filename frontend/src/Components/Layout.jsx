import { Outlet, useNavigation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Layout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Trigger NProgress based on the navigation state
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={navigation.location?.pathname} // ensures new animation for each route change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
