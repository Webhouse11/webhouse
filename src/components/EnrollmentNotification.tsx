'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

interface Enrollment {
  id: number;
  name: string;
  location: string;
  course: string;
  time: string;
}

const enrollments: Enrollment[] = [
  { id: 1, name: "Chinedu Oke", location: "Lagos, Nigeria", course: "AI Automation for Agencies", time: "2 mins ago" },
  { id: 2, name: "Kofi Mensah", location: "Accra, Ghana", course: "High-Ticket Sales Funnels", time: "5 mins ago" },
  { id: 3, name: "Sarah Williams", location: "London, UK", course: "AI SaaS Builder Guide", time: "12 mins ago" },
  { id: 4, name: "Olawale Johnson", location: "Ibadan, Nigeria", course: "AI Agents & Workflows", time: "15 mins ago" },
  { id: 5, name: "Ama Boateng", location: "Kumasi, Ghana", course: "Search Engine Optimization Pro", time: "18 mins ago" },
  { id: 6, name: "Thomas Müller", location: "Berlin, Germany", course: "Custom GPTs for Enterprise", time: "22 mins ago" },
  { id: 7, name: "Blessing Udoh", location: "Port Harcourt, Nigeria", course: "AI Automation for Agencies", time: "25 mins ago" },
  { id: 8, name: "James Anderson", location: "Manchester, UK", course: "High-Ticket Sales Funnels", time: "30 mins ago" },
  { id: 9, name: "Chioma Adeleke", location: "Abuja, Nigeria", course: "AI SaaS Builder Guide", time: "35 mins ago" },
  { id: 10, name: "Kwame Asare", location: "Akim Oda, Ghana", course: "AI Agents & Workflows", time: "40 mins ago" },
  { id: 11, name: "Elena Rossi", location: "Milan, Italy", course: "Search Engine Optimization Pro", time: "45 mins ago" },
  { id: 12, name: "Femi Balogun", location: "Lagos, Nigeria", course: "Custom GPTs for Enterprise", time: "50 mins ago" },
  { id: 13, name: "Abena Darko", location: "Tema, Ghana", course: "AI Automation for Agencies", time: "55 mins ago" },
  { id: 14, name: "Marc Dubois", location: "Paris, France", course: "High-Ticket Sales Funnels", time: "1 hour ago" },
  { id: 15, name: "Segun Arinze", location: "Kano, Nigeria", course: "AI SaaS Builder Guide", time: "1 hour ago" },
  { id: 16, name: "Efua Gyan", location: "Cape Coast, Ghana", course: "AI Agents & Workflows", time: "1 hour ago" },
  { id: 17, name: "Sophie Van Dijk", location: "Amsterdam, Netherlands", course: "Search Engine Optimization Pro", time: "1 hour ago" },
  { id: 18, name: "Tunde Ednut", location: "Lagos, Nigeria", course: "Custom GPTs for Enterprise", time: "2 hours ago" },
  { id: 19, name: "Yaw Frimpong", location: "Takoradi, Ghana", course: "AI Automation for Agencies", time: "2 hours ago" },
  { id: 20, name: "Lars Erikson", location: "Stockholm, Sweden", course: "High-Ticket Sales Funnels", time: "2 hours ago" },
];

export default function EnrollmentNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds initial delay
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000); // Show for 6 seconds

    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex]);

  useEffect(() => {
    if (isVisible) return;

    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % enrollments.length);
      setIsVisible(true);
    }, 8000); // Hide for 8 seconds before next one

    return () => clearTimeout(nextTimer);
  }, [isVisible]);

  const current = enrollments[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[320px]"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[13px] font-bold text-slate-900 truncate">
                  {current.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-slate-600 leading-tight mb-1">
                From <span className="font-semibold">{current.location}</span> just enrolled in{" "}
                <span className="font-semibold text-emerald-600">{current.course}</span>
              </p>
              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                {current.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
