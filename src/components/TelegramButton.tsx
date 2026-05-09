'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SendHorizontal } from 'lucide-react';

export function TelegramButton() {
  const telegramUrl = "https://t.me/webhousemedia?fbclid=IwY2xjawRrrAhleHRuA2FlbQIxMABicmlkETE4VmxOWlc1VXFaQjg0dU0xc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHrUOXDnEQHUduDqc2Q2GqukVLzsvQCOb7Y1780QCjtMhc3w5geTJVhBHJj8M_aem_7v1ySkmDS1_NG2eEf35YIg";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-[60]"
    >
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start gap-4 bg-[#0088cc] hover:bg-[#0077b5] text-white h-8 px-6 shadow-lg transition-all duration-300"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2"
        >
          <SendHorizontal size={14} className="animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">
            Latest Update: Join our Telegram Community for Daily Business Tips
          </span>
        </motion.div>
        
        <div className="hidden sm:flex items-center gap-2">
           <div className="w-1 h-1 rounded-full bg-white animate-ping" />
           <span className="text-[10px] font-black underline underline-offset-4 decoration-white/30 truncate">
             Join Now
           </span>
        </div>
      </a>
    </motion.div>
  );
}
