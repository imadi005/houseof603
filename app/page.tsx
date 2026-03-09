"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { PortalForm } from "./PortalForm";

export default function Home() {
  const [isTouchingPortal, setIsTouchingPortal] = useState(false);
  const [isTouchingLogo, setIsTouchingLogo] = useState(false);
  const [isTouchingEnter, setIsTouchingEnter] = useState(false);
  const [glitchText, setGlitchText] = useState("");
  
  // Email States Only
  const [topEmail, setTopEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  
  const [portalPower, setPortalPower] = useState(0);
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [catchGameActive, setCatchGameActive] = useState(false);
  const [catchScore, setCatchScore] = useState(0);
  const [catchMessage, setCatchMessage] = useState("");
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [sassyMessage, setSassyMessage] = useState("");
  const [showSassy, setShowSassy] = useState(false);
  const [cursorMessage, setCursorMessage] = useState("");
  const [showCursorMessage, setShowCursorMessage] = useState(false);
  const [viewerCount, setViewerCount] = useState(4382);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [portalOrbitText, setPortalOrbitText] = useState("ENTER IF YOU DARE");
  const [konami, setKonami] = useState<string[]>([]);
  const [portalTaps, setPortalTaps] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [floatingObjects, setFloatingObjects] = useState<any[]>([]);
  
  // ========== CRAZY COUNTER - NO REAL DATE ==========
  const [crazyCounter, setCrazyCounter] = useState({
    days: '88',
    hours: '88',
    minutes: '88',
    seconds: '88'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCrazyCounter({
        days: Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0'),
        hours: Math.floor(Math.random() * 24).toString().padStart(2, '0'),
        minutes: Math.floor(Math.random() * 60).toString().padStart(2, '0'),
        seconds: Math.floor(Math.random() * 60).toString().padStart(2, '0'),
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Mouse follower (desktop only)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // MYSTERIOUS POPUPS - Changed vibe from gaming to mysterious
  const mysteriousPopups = [
    "someone just discovered a secret gift 🎁",
    "a mysterious package is being prepared...",
    "bengaluru just entered the portal ✨",
    "new curated drop loading...",
    "someone unlocked a surprise 🎀",
    "your neighbor just joined the waitlist",
    "mumbai is watching 👀",
    "the internet is getting weirder...",
    "you're early. good things are coming.",
    "some things aren't meant to exist.",
    "bubble cigarettes restocking...",
    "water rocket spotted in the wild 💦",
  ];

  // SYSTEM LOGS ARRAY
  const logMessages = [
    "[portal] scanning the internet...",
    "[portal] curating weird finds",
    "[portal] preparing gift drops",
    "[portal] opening soon",
    "[system] anomaly detected",
    "[portal] bubble cigarettes located",
    "[portal] angry cat lamp charging",
    "[portal] water rocket launching",
    "[portal] momos clip manufacturing",
    "[portal] 603 energy rising",
  ];

  // PORTAL ORBIT TEXTS - More mysterious/gift focused
  const orbitTexts = [
    "DISCOVER THE WEIRD",
    "GIFTS FROM THE VOID",
    "THIS IS MYSTERIOUS",
    "PORTAL ACTIVE",
    "603% WEIRDER",
    "YOU SURE?",
    "TOO LATE TO LEAVE",
    "ENTER THE VOID",
    "NO REFUNDS",
    "CURATED CHAOS",
  ];

  // WEIRD GIFT OBJECTS
  const weirdObjects = [
    { emoji: '🚬', name: 'Bubble Cigarette', price: '₹xoxo' },
    { emoji: '💦', name: 'Water Rocket', price: '₹xoxo' },
    { emoji: '✏️', name: 'Transformer Pen', price: '₹xoxo' },
    { emoji: '🐱', name: 'Angry Cat Lamp', price: '₹xoxo' },
    { emoji: '🍔', name: 'Burger Slippers', price: '₹xoxo' },
    { emoji: '🧦', name: 'Mismatch Socks', price: '₹xoxo' },
    { emoji: '🎲', name: 'Chaos Dice', price: '₹xoxo' },
    { emoji: '👾', name: 'Void Plushie', price: '₹xoxo' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Glitch text
  useEffect(() => {
    const texts = ["603", "VOID", "GIFT", "???" , "BRUH", "SUS", "LOL", "NAH", "YOOO", "OMG", "WTF", "VIBE", "ZONK", "WOW", "COOL", "SICK", "FIRE", "LIT", "WHO", "WHAT", "WHEN", "WHERE", "WHY", "GIFT", "CURATED", "CATCH", "FREE"];
    const interval = setInterval(() => {
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // MYSTERIOUS POPUPS
  useEffect(() => {
    const interval = setInterval(() => {
      setSassyMessage(mysteriousPopups[Math.floor(Math.random() * mysteriousPopups.length)]);
      setShowSassy(true);
      setTimeout(() => setShowSassy(false), 3000);
    }, 8000 + Math.random() * 4000);
    
    return () => clearInterval(interval);
  }, []);

  // SYSTEM LOGS
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLogs(prev => {
        const newLogs = [...prev, logMessages[Math.floor(Math.random() * logMessages.length)]];
        if (newLogs.length > 5) newLogs.shift();
        return newLogs;
      });
    }, 15000 + Math.random() * 5000);
    
    return () => clearInterval(interval);
  }, []);

  // PORTAL ORBIT TEXT ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setPortalOrbitText(orbitTexts[Math.floor(Math.random() * orbitTexts.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // VIEWER COUNTER ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // KONAMI CODE DETECTION
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newCode = [...prev, e.key];
        if (newCode.length > konamiCode.length) {
          newCode.shift();
        }
        
        if (newCode.length === konamiCode.length && 
            newCode.every((key, i) => key === konamiCode[i])) {
          setShowSecret(true);
          setTimeout(() => setShowSecret(false), 5000);
        }
        
        return newCode;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // RANDOM CURSOR MESSAGES (desktop only)
  useEffect(() => {
    const messages = ["👀", "don't touch that", "too late", "hehe", "bro?", "sus", "👁️", "💀", "why here?", "no", "yes"];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && window.innerWidth > 768) {
        setCursorMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowCursorMessage(true);
        setTimeout(() => setShowCursorMessage(false), 2000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // FLOATING OBJECTS FROM PORTAL (on touch/hover)
  useEffect(() => {
    if (isTouchingPortal) {
      const interval = setInterval(() => {
        const newObject = {
          id: Date.now(),
          ...weirdObjects[Math.floor(Math.random() * weirdObjects.length)],
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          rotation: Math.random() * 360,
        };
        setFloatingObjects(prev => [...prev, newObject]);
        
        setTimeout(() => {
          setFloatingObjects(prev => prev.filter(obj => obj.id !== newObject.id));
        }, 2000);
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isTouchingPortal]);

  // Portal power surge
  useEffect(() => {
    if (isTouchingPortal) {
      const interval = setInterval(() => {
        setPortalPower(Math.random());
      }, 50);
      return () => clearInterval(interval);
    } else {
      setPortalPower(0);
    }
  }, [isTouchingPortal]);

  // Logo glitch effect
  useEffect(() => {
    if (isTouchingLogo) {
      const interval = setInterval(() => {
        setLogoGlitch(true);
        setTimeout(() => setLogoGlitch(false), 80);
      }, 200);
      return () => {
        clearInterval(interval);
        setLogoGlitch(false);
      };
    }
  }, [isTouchingLogo]);

  // Game - move logo randomly (renamed to catch game)
  useEffect(() => {
    if (catchGameActive && gameRef.current) {
      const moveLogo = () => {
        const container = gameRef.current;
        if (container) {
          const maxX = container.clientWidth - 100;
          const maxY = container.clientHeight - 100;
          const newX = Math.random() * maxX;
          const newY = Math.random() * maxY;
          setLogoPosition({ x: newX, y: newY });
        }
      };
      
      const interval = setInterval(moveLogo, 300);
      return () => clearInterval(interval);
    }
  }, [catchGameActive]);

  // Electric sparks
  const sparks = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      angle: (i * 9) * Math.PI / 180,
      length: 20 + Math.random() * 120,
      thickness: 1 + Math.random() * 6,
      color: i % 2 === 0 ? '#C084FC' : '#A7F3D0',
    })), []
  );

  // Background floating elements
  const floatingChaos = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      char: ['🎁', '✨', '🎀', '🎭', '🧿', '🎪', '🧸', '🪄', '👾', '603', '???', 'GIFT', 'VIBE', '💀', '👽', '🤡', '🎯', '🎲', '🧩'][i % 19],
      x: (i * 6) % 100,
      y: (i * 9) % 100,
      size: 8 + (i % 30),
      duration: 8 + (i % 20),
      delay: i * 0.08,
    })), []
  );

  // ========== EMAIL ONLY SUBMIT HANDLER ==========
  const handleEmailSubmit = async (
    value: string, 
    position: 'top' | 'bottom'
  ): Promise<boolean> => {
    
    console.log(`📬 ${position} email form submitted:`, value);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: "15460d80-5e69-46b0-a97d-8df8d85ee4d6",
          email: value,
          subject: "🎁 New Portal Discovery - HOUSE OF 603",
          from_name: "HOUSE OF 603",
          message: `✨ Someone discovered the portal!\n\nEmail: ${value}\nPosition: ${position} form`,
          replyto: value,
          autoresponse: `🎁 PORTAL DISCOVERED\n\nYou just found House of 603.\n\nThe internet's weirdest gifts are coming soon.\n\nStay mysterious.\n\n⚡ COMING SOON\n\n– 603 Portal\nhttps://houseof603.com`
        })
      });
      
      const data = await response.json();
      console.log('✅ Web3Forms response:', data);
      
      if (response.ok) {
        if (position === 'top') {
          setTopEmail("");
        } else {
          setBottomEmail("");
        }
        return true;
      }
      return false;
      
    } catch (error) {
      console.log('❌ Error:', error);
      if (position === 'top') {
        setTopEmail("");
      } else {
        setBottomEmail("");
      }
      return true;
    }
  };

  const handleCatchClick = () => {
    setCatchScore(prev => prev + 1);
    if (catchScore >= 4) {
      setCatchMessage("🎁 YOU FOUND THE SECRET GIFT! (IT'S A SURPRISE) 🎁");
      setCatchGameActive(false);
      setCatchScore(0);
    } else {
      setCatchMessage(`✨ KEEP EXPLORING... (${catchScore + 1}/5)`);
    }
  };

  const startCatchGame = () => {
    setCatchGameActive(true);
    setCatchScore(0);
    setCatchMessage("CATCH THE MYSTERY GIFT! GOOD LUCK 😈");
  };

  const handlePortalTap = () => {
    setPortalTaps(prev => prev + 1);
    if (portalTaps === 14) {
      setSassyMessage("OKAY OKAY WE GET IT YOU'RE EXCITED");
      setShowSassy(true);
      setTimeout(() => setShowSassy(false), 3000);
    }
  };

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen bg-[#FFF7EC] overflow-x-hidden"
    >
      
      {/* Custom Electric Cursor - Desktop only */}
      <motion.div
        className="fixed w-10 h-10 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="w-full h-full border-2 border-purple-600 rounded-full animate-ping opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-lime-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        <AnimatePresence>
          {showCursorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-8 -right-12 text-sm bg-purple-600 text-white px-2 py-1 rounded-full whitespace-nowrap"
            >
              {cursorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MYSTERIOUS POPUP */}
      <AnimatePresence>
        {showSassy && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 text-purple-600 font-bold text-sm z-50 drop-shadow-lg"
          >
            {sassyMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM LOGS */}
      <div className="fixed bottom-5 left-5 z-50 space-y-1 text-[10px] font-mono opacity-50 hidden md:block">
        {systemLogs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-purple-600"
          >
            {log}
          </motion.div>
        ))}
      </div>

      {/* SECRET EASTER EGG */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-lime-500 text-white p-8 rounded-3xl shadow-2xl z-50 text-center"
          >
            <p className="text-6xl mb-4">🎁</p>
            <p className="text-2xl font-black mb-2">SECRET GIFT DISCOVERED!</p>
            <p className="text-sm">You found it. Something special is coming.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND CHAOS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 via-transparent to-lime-100/60" />
        
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            backgroundImage: `linear-gradient(to right, #C084FC50 1px, transparent 1px),
                              linear-gradient(to bottom, #A7F3D050 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
          }}
        />

        {floatingChaos.map((item) => (
          <motion.div
            key={`chaos-${item.id}`}
            className="absolute font-black text-purple-200/40 whitespace-nowrap"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
              rotate: item.id * 8,
            }}
            animate={{
              x: [0, 400 * Math.sin(item.id), 0],
              y: [0, 300 * Math.cos(item.id), 0],
              rotate: [item.id * 8, item.id * 8 + 1080],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* ================= HERO SECTION ================= */}
        <section className="min-h-screen flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 relative pt-16 pb-8">

          {/* Glitch overlays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`glitch-${i}`}
              className="absolute font-black text-purple-600/20 select-none"
              style={{
                top: `${10 + i * 12}%`,
                left: `${5 + i * 8}%`,
                fontSize: `${15 + i * 25}px`,
              }}
              animate={{ 
                x: [0, -60, 60, -30, 30, 0],
                y: [0, 30, -30, 20, -20, 0],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, -10, 10, -8, 8, 0]
              }}
              transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.03 }}
            >
              {glitchText}
            </motion.div>
          ))}

          {/* DISCOVER THE PORTAL - Touch friendly */}
          <motion.div
            className="relative mb-4 z-20 cursor-pointer touch:active:scale-95"
            onHoverStart={() => setIsTouchingEnter(true)}
            onHoverEnd={() => setIsTouchingEnter(false)}
            onTouchStart={() => setIsTouchingEnter(true)}
            onTouchEnd={() => setIsTouchingEnter(false)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h2
              animate={isTouchingEnter ? {
                scale: [1, 1.2, 1],
                rotate: [0, 3, -3, 0],
                color: ['#6B21A5', '#84CC16', '#6B21A5'],
              } : {
                scale: 1,
                rotate: 0,
                color: '#6B21A5',
              }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl font-black tracking-widest"
            >
              <span className="bg-gradient-to-r from-purple-600 to-lime-500 text-transparent bg-clip-text">
                ⚡ DISCOVER THE PORTAL ⚡
              </span>
            </motion.h2>
          </motion.div>

          {/* Logo - Touch friendly */}
          <motion.div
            className="relative mb-6 md:mb-8 z-20 cursor-pointer touch:active:scale-95"
            onHoverStart={() => setIsTouchingLogo(true)}
            onHoverEnd={() => setIsTouchingLogo(false)}
            onTouchStart={() => setIsTouchingLogo(true)}
            onTouchEnd={() => setIsTouchingLogo(false)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {isTouchingLogo && (
                <>
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={`logo-spark-${i}`}
                      className="absolute w-1 h-16 bg-gradient-to-t from-purple-600 to-lime-400"
                      style={{
                        top: '50%',
                        left: '50%',
                        rotate: i * 22.5,
                        transformOrigin: '0 0',
                        filter: 'blur(3px)',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 3, 0],
                        x: Math.cos(i * 22.5 * Math.PI / 180) * 180,
                        y: Math.sin(i * 22.5 * Math.PI / 180) * 180,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, repeat: Infinity, delay: i * 0.01 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            <motion.div
              animate={logoGlitch ? {
                x: [0, -15, 15, -8, 8, 0],
                y: [0, 8, -8, 5, -5, 0],
                rotate: [0, -3, 3, -2, 2, 0],
                filter: [
                  'hue-rotate(0deg) brightness(1)',
                  'hue-rotate(120deg) brightness(1.5)',
                  'hue-rotate(240deg) brightness(1.2)',
                  'hue-rotate(360deg) brightness(1)',
                ],
              } : {
                x: 0,
                y: 0,
                rotate: 0,
                filter: 'none'
              }}
              transition={{ duration: 0.08 }}
            >
              <Image
                src="/logo.png"
                alt="HOUSE OF 603"
                width={400}
                height={200}
                className="w-64 md:w-96 h-auto relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* PORTAL - Touch friendly */}
          <motion.div
            className="relative cursor-pointer group mb-8 md:mb-10 z-20 touch:active:scale-95"
            onHoverStart={() => setIsTouchingPortal(true)}
            onHoverEnd={() => setIsTouchingPortal(false)}
            onTouchStart={() => {
              setIsTouchingPortal(true);
              handlePortalTap();
            }}
            onTouchEnd={() => setIsTouchingPortal(false)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {isTouchingPortal && floatingObjects.map((obj) => (
                <motion.div
                  key={obj.id}
                  className="absolute text-2xl"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{ 
                    opacity: 0,
                    x: obj.x * 3,
                    y: obj.y * 3,
                    rotate: obj.rotation * 3,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                >
                  {obj.emoji}
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTouchingPortal && sparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  className="absolute top-1/2 left-1/2 w-px"
                  style={{
                    height: spark.length,
                    width: spark.thickness,
                    rotate: spark.angle * 180 / Math.PI,
                    transformOrigin: '0 0',
                    background: `linear-gradient(to top, ${spark.color}, transparent)`,
                    filter: 'blur(2px)',
                    zIndex: 30,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 2.5, 0],
                    x: Math.cos(spark.angle) * (150 + 120 * portalPower),
                    y: Math.sin(spark.angle) * (150 + 120 * portalPower),
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.1,
                    repeat: Infinity,
                    delay: spark.id * 0.006,
                  }}
                />
              ))}
            </AnimatePresence>

            <motion.div
              animate={isTouchingPortal ? {
                rotate: [0, 15, -15, 20, -20, 15, -15, 0],
                scale: [1, 1.2, 0.9, 1.3, 0.85, 1.15, 1],
              } : {
                rotate: 0,
                scale: 1
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-56 h-56 md:w-80 md:h-80 rounded-full relative"
                animate={isTouchingPortal ? {
                  boxShadow: [
                    '0 0 40px #C084FC',
                    '0 0 80px #A7F3D0',
                    '0 0 120px #C084FC',
                  ]
                } : {
                  boxShadow: '0 0 20px #C084FC80'
                }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4"
                    style={{
                      borderColor: i % 2 === 0 ? '#C084FC' : '#A7F3D0',
                      opacity: 0.8 - i * 0.1,
                    }}
                    animate={isTouchingPortal ? {
                      rotate: [0, 360],
                      scale: [1, 1.2 - i * 0.02, 1],
                      borderWidth: [4, 10, 4],
                    } : {
                      rotate: 0,
                      scale: 1,
                      borderWidth: 4
                    }}
                    transition={{
                      rotate: { duration: 0.8 - i * 0.08, repeat: isTouchingPortal ? Infinity : 0, ease: "linear" },
                      scale: { duration: 0.2, repeat: isTouchingPortal ? Infinity : 0 },
                    }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isTouchingPortal ? {
                      scale: [1, 2.5, 1, 2, 1],
                      rotate: [0, 360, 0, 180, 0],
                      backgroundColor: ['#C084FC', '#A7F3D0', '#C084FC', '#A7F3D0', '#C084FC'],
                    } : {
                      scale: 1,
                      rotate: 0,
                      backgroundColor: '#C084FC',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-lime-400 to-purple-500 rounded-full"
                  />
                </div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={isTouchingPortal ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 8, repeat: isTouchingPortal ? Infinity : 0, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold text-purple-600 whitespace-nowrap">
                    {portalOrbitText}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isTouchingPortal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl"
                >
                  ⚡ {Math.floor(2000 + portalPower * 1000)}% MYSTERY ENERGY ⚡
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-purple-600 mb-2 text-center tracking-tighter drop-shadow-lg"
          >
            COMING SOON
          </motion.h1>

          <p className="text-gray-700 text-sm md:text-base mb-4 font-bold">SOMETHING WEIRD IS COMING</p>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 text-purple-600 font-bold text-sm bg-purple-100 px-4 py-2 rounded-full"
          >
            {viewerCount.toLocaleString()} CURIOUS SOULS WAITING
          </motion.div>

          {/* ========== CRAZY COUNTER - RANDOM NUMBERS ========== */}
          <div className="flex gap-3 md:gap-5 mb-6 flex-wrap justify-center">
            {[
              { label: 'DAYS', value: crazyCounter.days },
              { label: 'HOURS', value: crazyCounter.hours },
              { label: 'MINS', value: crazyCounter.minutes },
              { label: 'SECS', value: crazyCounter.seconds }
            ].map((unit, i) => (
              <motion.div
                key={unit.label}
                className="text-center"
                animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 2 : -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                <div className="bg-purple-600 w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-2xl">
                  <span className="text-xl md:text-3xl font-black text-white drop-shadow-lg">{unit.value}</span>
                </div>
                <span className="text-[8px] md:text-xs text-gray-700 font-bold mt-2 block tracking-widest">{unit.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ========== TOP EMAIL FORM ONLY ========== */}
          <div className="w-full max-w-md mb-3">
            <PortalForm
            
              position="top"
              value={topEmail}
              onChange={setTopEmail}
              onSubmit={handleEmailSubmit}
              placeholder="Enter your email for Portal Access"
              icon="📧"
              buttonText="LET ME IN"
            />
          </div>

        </section>

        {/* ================= WE STARTED COLLECTING ================= */}
        <section className="w-full max-w-6xl mx-auto px-4 py-20 md:py-28">
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-8 text-center tracking-tighter"
          >
            WE STARTED COLLECTING
          </motion.h2>

          <p className="text-center text-gray-600 text-lg mb-12">THE INTERNET'S WEIRDEST OBJECTS</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {weirdObjects.map((obj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{obj.emoji}</div>
                <h3 className="text-sm font-bold text-purple-600">{obj.name}</h3>
                <p className="text-xs text-purple-400 font-semibold mt-1">{obj.price}</p>
                <p className="text-xs text-gray-500 mt-1">coming soon</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT STARTED ================= */}
        <section className="w-full max-w-4xl mx-auto px-4 py-20 md:py-28">
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-12 text-center tracking-tighter"
          >
            HOW IT STARTED
          </motion.h2>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all cursor-pointer"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🎂 ALL STARTED WITH A BIRTHDAY.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-l from-white to-purple-50 p-6 rounded-2xl shadow-xl border-r-8 border-purple-400 hover:shadow-2xl transition-all cursor-pointer text-right"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">KEPT ASKING FOR GIFT CHOICES. 🤷‍♂️</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all cursor-pointer"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🎭 GOT SENT REELS OF PRODUCTS NOT FOUND IN INDIA.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-l from-white to-purple-50 p-6 rounded-2xl shadow-xl border-r-8 border-purple-400 hover:shadow-2xl transition-all cursor-pointer text-right"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🔍 SEARCHED ALL AROUND. FOUND NOTHING.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all cursor-pointer"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🏠 AND THAT'S HOW HOUSE OF 603 WAS BORN.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-lime-500 rounded-3xl text-white mx-auto max-w-sm shadow-2xl cursor-pointer"
          >
            <p className="text-xs mb-3 font-bold tracking-wider opacity-90">🎂 THE BIRTHDAY WAS</p>
            <p className="text-sm mb-2 font-bold tracking-[0.3em]">06 • 03</p>
            <motion.p
              className="text-5xl md:text-6xl font-black tracking-[0.4em]"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              603
            </motion.p>
          </motion.div>
        </section>

        {/* ================= WHO ARE WE ================= */}
        <section className="w-full max-w-6xl mx-auto px-4 py-20 md:py-28 bg-gradient-to-r from-purple-100/70 to-lime-100/70">
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-12 text-center tracking-tighter"
          >
            WHO ARE WE?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative cursor-pointer group flex justify-center"
              onHoverStart={() => setIsTouchingLogo(true)}
              onHoverEnd={() => setIsTouchingLogo(false)}
              onTouchStart={() => setIsTouchingLogo(true)}
              onTouchEnd={() => setIsTouchingLogo(false)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {isTouchingLogo && (
                  <>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={`who-spark-${i}`}
                        className="absolute w-1 h-20 bg-gradient-to-t from-purple-600 to-lime-400"
                        style={{
                          top: '50%',
                          left: '50%',
                          rotate: i * 18,
                          transformOrigin: '0 0',
                          filter: 'blur(4px)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 3, 0],
                          x: Math.cos(i * 18 * Math.PI / 180) * 250,
                          y: Math.sin(i * 18 * Math.PI / 180) * 250,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.008 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <motion.div
                animate={logoGlitch ? {
                  rotateY: [0, 720],
                  scale: [1, 1.4, 1],
                  filter: [
                    'hue-rotate(0deg) brightness(1)',
                    'hue-rotate(360deg) brightness(1.5)',
                    'hue-rotate(720deg) brightness(1)',
                  ],
                } : {
                  rotateY: 0,
                  scale: 1,
                  filter: 'none'
                }}
                transition={{ duration: 2 }}
                className="relative z-10"
              >
                <Image
                  src="/logo.png"
                  alt="HOUSE OF 603"
                  width={350}
                  height={175}
                  className="w-64 md:w-80 h-auto drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <motion.div
                animate={isTouchingLogo ? { 
                  scale: [1, 1.15, 1],
                  color: ['#6B21A5', '#84CC16', '#6B21A5'],
                } : {
                  scale: 1,
                  color: '#6B21A5'
                }}
                transition={{ duration: 1.5 }}
                className="text-3xl md:text-4xl font-black text-purple-600"
              >
                THE INTERNET SHOWS YOU WEIRD THINGS.
              </motion.div>

              <motion.div
                animate={isTouchingLogo ? { 
                  x: [0, 10, -10, 5, -5, 0],
                } : {
                  x: 0
                }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-lime-500"
              >
                WE ACTUALLY MAKE THEM.
              </motion.div>

              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                FROM BUBBLE CIGARETTES TO WATER ROCKETS, TRANSFORMER PENS TO ANGRY CAT LAMPS — 
                IF YOU SAW IT ON A REEL AND COULDN'T BUY IT, WE FIXED THAT.
              </p>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl cursor-pointer"
              >
                🚀 NO MIDDLEMEN. JUST WEIRD.
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= MYSTERY CATCH GAME ================= */}
        <section className="w-full max-w-4xl mx-auto px-4 py-20 md:py-28">
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-4 text-center tracking-tighter"
          >
            MYSTERY CATCH
          </motion.h2>

          <p className="text-center text-gray-600 mb-8 font-medium">CATCH THE GIFT. WIN A SURPRISE. (SPOILER: IT'S IMPOSSIBLE 💀)</p>

          <motion.div
            ref={gameRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-purple-200 to-lime-200 p-8 rounded-3xl shadow-2xl min-h-[400px] md:min-h-[500px] border-4 border-purple-400 overflow-hidden"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #C084FC20 1px, transparent 1px),
                                linear-gradient(to bottom, #A7F3D020 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />

            {!catchGameActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCatchGame}
                  className="bg-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:bg-purple-700 transition-all"
                >
                  🎁 CATCH THE GIFT 🎁
                </motion.button>
                {catchMessage && (
                  <p className="mt-4 text-purple-600 font-bold text-sm">{catchMessage}</p>
                )}
              </div>
            ) : (
              <>
                <motion.div
                  className="absolute cursor-pointer z-20"
                  style={{
                    left: logoPosition.x,
                    top: logoPosition.y,
                  }}
                  animate={{
                    scale: [1, 1.2, 0.8, 1],
                    rotate: [0, 360, -360, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                  }}
                  onClick={handleCatchClick}
                  onTouchStart={handleCatchClick}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-600 blur-xl opacity-50" />
                    <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-purple-600 to-lime-500 rounded-2xl flex items-center justify-center text-3xl relative z-10">
                      🎁
                    </div>
                  </div>
                </motion.div>

                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-purple-600 font-bold text-sm bg-white/80 inline-block px-4 py-2 rounded-full">
                    {catchMessage}
                  </p>
                </div>
              </>
            )}
          </motion.div>

          <p className="text-center text-xs text-gray-500 mt-4">*The gift doesn't exist. We lied. But the game is fun. IF YOU WIN WE'LL PANIC.</p>
        </section>

        {/* ================= DON'T MISS OUT ================= */}
        <section className="w-full py-20 md:py-28 flex flex-col items-center px-4 bg-gradient-to-t from-purple-100/80 to-transparent">
          
          <motion.div
            className="relative cursor-pointer group mb-6"
            onHoverStart={() => setIsTouchingPortal(true)}
            onHoverEnd={() => setIsTouchingPortal(false)}
            onTouchStart={() => setIsTouchingPortal(true)}
            onTouchEnd={() => setIsTouchingPortal(false)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isTouchingPortal ? { rotate: [0, 25, -25, 0], scale: [1, 1.4, 0.7, 1] } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full relative">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/50" />
                <div className="absolute inset-1 rounded-full border-2 border-lime-400/50 animate-ping opacity-50" />
                <div className="absolute inset-2 rounded-full border border-purple-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isTouchingPortal ? { 
                      scale: [1, 2.2, 1], 
                      backgroundColor: ['#C084FC', '#A7F3D0', '#C084FC'],
                      rotate: [0, 360],
                    } : {
                      scale: 1,
                      backgroundColor: '#C084FC',
                      rotate: 0
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-lime-400 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-black text-purple-600 mb-4 text-center"
          >
            DON'T MISS OUT
          </motion.h3>

          <p className="text-gray-600 text-sm md:text-base mb-6 text-center max-w-md font-medium">
            Be the first to know when the portal opens. No spam. Just weird.
          </p>

          {/* ========== BOTTOM EMAIL FORM ONLY ========== */}
          <div className="w-full max-w-md">
            <PortalForm
              position="bottom"
              value={bottomEmail}
              onChange={setBottomEmail}
              onSubmit={handleEmailSubmit}
              placeholder="Enter your email"
              icon="📧"
              buttonText="JOIN WAITLIST"
            />
          </div>

          <motion.div
            className="mt-10 text-purple-500 text-xs flex items-center gap-3 font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-lg">⚡</span>
            <span>HOUSE OF 603 • CURATED CHAOS</span>
            <span className="text-lg">⚡</span>
          </motion.div>
        </section>
      </div>
    </main>
  );
}