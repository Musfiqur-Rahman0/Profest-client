import { useState } from 'react';
import { AnimatePresence, motion } from "motion/react"

const tabData = {
  Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,
  Mission: `Our mission is to revolutionize logistics through technology and customer-first thinking. We believe that every package holds a story, and our responsibility is to deliver that story with precision, speed, and care.`,
  Success: `From a startup to an industry leader, our journey is powered by trust, innovation, and thousands of successful deliveries. We measure success not just by numbers, but by the satisfaction of each customer.`,
  'Team & Others': `Our team is our strength. With skilled professionals and partners across the globe, we ensure quality, consistency, and care in every delivery. Together, we move logistics forward.`,
};

const tabs = Object.keys(tabData);

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState('Story');

  return (
    <div className="">
      <div className="flex space-x-6 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-1 text-sm md:text-base font-medium transition-colors duration-200 ${
              activeTab === tab ? 'text-green-700' : 'text-gray-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-gray-700 text-sm md:text-base"
          >
            {tabData[activeTab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
