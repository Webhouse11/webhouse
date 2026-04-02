import React from 'react';
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = "" }) => {
  const [copied, setCopied] = React.useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877F2]'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#1DA1F2]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0A66C2]'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25D366]'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {shareLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-black/40 transition-all duration-300 ${social.color} hover:text-white`}
          title={`Share on ${social.name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <social.icon size={16} />
        </motion.a>
      ))}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          copyToClipboard();
        }}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative ${
          copied ? 'bg-emerald-500 text-white' : 'bg-black/5 text-black/40 hover:bg-black/10'
        }`}
        title="Copy Link"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Check size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="link"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Link2 size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
