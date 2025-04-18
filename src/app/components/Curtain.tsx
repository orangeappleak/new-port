'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Curtain({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 bg-black z-[9999] pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom' }}
        />
      )}
    </AnimatePresence>
  );
}
