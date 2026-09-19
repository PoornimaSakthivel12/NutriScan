import { NavLink } from 'react-router-dom';
import { Home, Camera, Salad, ClipboardList, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/scan', icon: Camera, label: 'Scan' },
    { to: '/diet', icon: Salad, label: 'Diet' },
    { to: '/history', icon: ClipboardList, label: 'History' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary-green' : 'text-gray-400'}`}>
          {({ isActive }) => (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <item.icon size={24} className={isActive ? 'stroke-current stroke-2' : 'stroke-current'} />
              </motion.div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
