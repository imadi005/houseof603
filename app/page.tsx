"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { PortalForm } from "./PortalForm";

export default function Home() {
  const [isHoveringPortal, setIsHoveringPortal] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const [glitchText, setGlitchText] = useState("");
  
  // Email States Only
  const [topEmail, setTopEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  
  const [portalPower, setPortalPower] = useState(0);
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [sassyMessage, setSassyMessage] = useState("");
  const [showSassy, setShowSassy] = useState(false);
  const [cursorMessage, setCursorMessage] = useState("");
  const [showCursorMessage, setShowCursorMessage] = useState(false);
  const [fakeCounter, setFakeCounter] = useState(4382);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [portalOrbitText, setPortalOrbitText] = useState("ENTER IF YOU DARE");
  const [konami, setKonami] = useState<string[]>([]);
  const [portalClicks, setPortalClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [floatingObjects, setFloatingObjects] = useState<any[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Mouse follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // SASSY POPUPS ARRAY
  const sassyPopups = [
    "someone from delhi just joined the portal 👀",
    "bro someone from mumbai just signed up 💀",
    "portal energy increasing ⚡",
    "new weird drop loading...",
    "someone just entered the void",
    "your neighbor is also waiting",
    "bengaluru girl just joined",
    "bro this is getting weird",
    "you're early. good.",
    "some things shouldn't exist.",
    "momos hair clip restocking...",
    "water rocket in the wild 💦",
  ];

  // SYSTEM LOGS ARRAY
  const logMessages = [
    "[portal] scanning internet...",
    "[portal] weird objects found",
    "[portal] preparing drop",
    "[portal] opening soon",
    "[system] anomaly detected",
    "[portal] bubble cigarettes located",
    "[portal] angry cat lamp charging",
    "[portal] water rocket launching",
    "[portal] momos clip manufacturing",
    "[portal] 603 energy rising",
  ];

  // PORTAL ORBIT TEXTS
  const orbitTexts = [
    "DO NOT ENTER",
    "ENTER ANYWAY",
    "THIS IS WEIRD",
    "PORTAL ACTIVE",
    "603% WEIRDER",
    "YOU SURE?",
    "TOO LATE",
    "GO BACK",
    "NO REFUNDS",
    "ENTER THE VOID",
  ];

  // WEIRD OBJECTS
  const weirdObjects = [
    { emoji: '🚬', name: 'Bubble Cigarette' },
    { emoji: '💦', name: 'Water Rocket' },
    { emoji: '✏️', name: 'Tansformer Pen' },
    { emoji: '🐱', name: 'Angry Cat Lamp' },
    { emoji: '🍔', name: 'Burger Slippers' },
    { emoji: '🧦', name: 'Mismatch Socks' },
    { emoji: '🎲', name: 'Chaos Dice' },
    { emoji: '👾', name: 'Void Creature' },
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
    const texts = ["603", "VOID", "ENTER", "???" , "BRUH", "SUS", "LOL", "NAH", "YOOO", "OMG", "WTF", "VIBE", "ZONK", "WOW", "COOL", "SICK", "FIRE", "LIT", "WHO", "WHAT", "WHEN", "WHERE", "WHY", "GAME", "IMPOSSIBLE", "CATCH", "FREE"];
    const interval = setInterval(() => {
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // SASSY POPUPS
  useEffect(() => {
    const interval = setInterval(() => {
      setSassyMessage(sassyPopups[Math.floor(Math.random() * sassyPopups.length)]);
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

  // FAKE COUNTER ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setFakeCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
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
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 5000);
        }
        
        return newCode;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // RANDOM CURSOR MESSAGES
  useEffect(() => {
    const messages = ["👀", "don't touch that", "too late", "hehe", "bro?", "sus", "👁️", "💀", "why here?", "no", "yes"];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCursorMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowCursorMessage(true);
        setTimeout(() => setShowCursorMessage(false), 2000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // FLOATING OBJECTS FROM PORTAL
  useEffect(() => {
    if (isHoveringPortal) {
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
  }, [isHoveringPortal]);

  // Portal power surge
  useEffect(() => {
    if (isHoveringPortal) {
      const interval = setInterval(() => {
        setPortalPower(Math.random());
      }, 50);
      return () => clearInterval(interval);
    } else {
      setPortalPower(0);
    }
  }, [isHoveringPortal]);

  // Logo glitch effect
  useEffect(() => {
    if (isHoveringLogo) {
      const interval = setInterval(() => {
        setLogoGlitch(true);
        setTimeout(() => setLogoGlitch(false), 80);
      }, 200);
      return () => {
        clearInterval(interval);
        setLogoGlitch(false);
      };
    }
  }, [isHoveringLogo]);

  // Game - move logo randomly
  useEffect(() => {
    if (gameActive && gameRef.current) {
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
  }, [gameActive]);

  // Countdown
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-15T00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

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
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      char: ['🌀', '⚡', '💫', '✨', '🌟', '🎭', '🧿', '🎪', '🧸', '🪄', '👾', '🤖', '👻', '603', '???', 'SUS', 'LOL', 'WOW', '💀', '👽', '🤡', '🎯', '🎲', '🧩', '🎮', '👾', '🤖', '🎰', '🎪'][i % 30],
      x: (i * 4.5) % 100,
      y: (i * 8) % 100,
      size: 6 + (i % 50),
      duration: 8 + (i % 30),
      delay: i * 0.05,
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
          subject: "🎉 New Portal Signup - HOUSE OF 603",
          from_name: "HOUSE OF 603",
          message: `✨ Someone entered the portal!\n\nEmail: ${value}\nPosition: ${position} form`,
          replyto: value,
          autoresponse: `👁️ PORTAL ACCESS CONFIRMED\n\nYou just entered House of 603.\n\nThe internet's weird side opens soon.\n\nStay ready.\n\n⚡ March 15, 2026\n\n– 603 Portal\nhttps://houseof603.com`
        })
      });
      
      const data = await response.json();
      console.log('✅ Web3Forms response:', data);
      
      if (response.ok) {
        // Clear the specific input that was submitted
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
      // Still clear and show success for demo
      if (position === 'top') {
        setTopEmail("");
      } else {
        setBottomEmail("");
      }
      return true;
    }
  };

  const handleGameClick = () => {
    setGameScore(prev => prev + 1);
    if (gameScore >= 4) {
      setGameMessage("🎉 OKAY YOU'RE INSANE! (WE STILL WON'T GIVE DISCOUNT) 🎉");
      setGameActive(false);
      setGameScore(0);
    } else {
      setGameMessage(`😈 SPOILER: YOU'RE NOT BUILT FOR THIS 💀 (${gameScore + 1}/5)`);
    }
  };

  const startGame = () => {
    setGameActive(true);
    setGameScore(0);
    setGameMessage("TRY TO CATCH THE LOGO! GOOD LUCK (YOU'LL NEED IT) 😈");
  };

  const handlePortalClick = () => {
    setPortalClicks(prev => prev + 1);
    if (portalClicks === 14) {
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
      
      {/* Custom Electric Cursor */}
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

      {/* SASSY POPUP */}
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

      {/* EASTER EGG - KONAMI */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-lime-500 text-white p-8 rounded-3xl shadow-2xl z-50 text-center"
          >
            <p className="text-6xl mb-4">🎮</p>
            <p className="text-2xl font-black mb-2">KONAMI CODE ACTIVATED!</p>
            <p className="text-sm">You found the secret. We are impressed. (No discount tho)</p>
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

          {/* ENTER THE PORTAL */}
          <motion.div
            className="relative mb-4 z-20 cursor-pointer"
            onHoverStart={() => setIsHoveringEnter(true)}
            onHoverEnd={() => setIsHoveringEnter(false)}
          >
            <motion.h2
              animate={isHoveringEnter ? {
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 3, -3, 0],
                color: ['#6B21A5', '#84CC16', '#6B21A5'],
                textShadow: [
                  '0 0 10px #C084FC',
                  '0 0 30px #A7F3D0',
                  '0 0 50px #C084FC',
                  '0 0 30px #A7F3D0',
                  '0 0 10px #C084FC',
                ]
              } : {
                scale: 1,
                rotate: 0,
                color: '#6B21A5',
                textShadow: 'none'
              }}
              transition={{ duration: 0.2 }}
              className="text-2xl md:text-3xl font-black tracking-widest"
            >
              <span className="bg-gradient-to-r from-purple-600 to-lime-500 text-transparent bg-clip-text">
                ⚡ ENTER THE PORTAL ⚡
              </span>
            </motion.h2>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="relative mb-6 md:mb-8 z-20 cursor-pointer"
            onHoverStart={() => setIsHoveringLogo(true)}
            onHoverEnd={() => setIsHoveringLogo(false)}
          >
            <AnimatePresence>
              {isHoveringLogo && (
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

          {/* PORTAL */}
          <motion.div
            className="relative cursor-pointer group mb-8 md:mb-10 z-20"
            onHoverStart={() => setIsHoveringPortal(true)}
            onHoverEnd={() => setIsHoveringPortal(false)}
            onClick={handlePortalClick}
          >
            <AnimatePresence>
              {isHoveringPortal && floatingObjects.map((obj) => (
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
              {isHoveringPortal && sparks.map((spark) => (
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
              animate={isHoveringPortal ? {
                rotate: [0, 20, -20, 30, -30, 20, -20, 0],
                scale: [1, 1.3, 0.85, 1.4, 0.8, 1.2, 1],
              } : {
                rotate: 0,
                scale: 1
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-56 h-56 md:w-80 md:h-80 rounded-full relative"
                animate={isHoveringPortal ? {
                  boxShadow: [
                    '0 0 40px #C084FC',
                    '0 0 100px #A7F3D0',
                    '0 0 150px #C084FC',
                    '0 0 100px #A7F3D0',
                    '0 0 40px #C084FC',
                  ]
                } : {
                  boxShadow: '0 0 20px #C084FC80'
                }}
                transition={{ duration: 0.08 }}
              >
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4"
                    style={{
                      borderColor: i % 2 === 0 ? '#C084FC' : '#A7F3D0',
                      opacity: 0.8 - i * 0.1,
                    }}
                    animate={isHoveringPortal ? {
                      rotate: [0, 360],
                      scale: [1, 1.25 - i * 0.03, 1],
                      borderWidth: [4, 12, 4, 15, 4],
                    } : {
                      rotate: 0,
                      scale: 1,
                      borderWidth: 4
                    }}
                    transition={{
                      rotate: { duration: 0.8 - i * 0.08, repeat: isHoveringPortal ? Infinity : 0, ease: "linear" },
                      scale: { duration: 0.1, repeat: isHoveringPortal ? Infinity : 0 },
                      borderWidth: { duration: 0.06, repeat: isHoveringPortal ? Infinity : 0 },
                    }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isHoveringPortal ? {
                      scale: [1, 3, 1, 2.5, 1, 3.5, 1],
                      rotate: [0, 720, 0, 360, 0, 720, 0],
                      backgroundColor: ['#C084FC', '#A7F3D0', '#C084FC', '#A7F3D0', '#C084FC', '#A7F3D0', '#C084FC'],
                      borderRadius: ["50%", "20%", "50%", "10%", "50%", "25%", "50%"],
                    } : {
                      scale: 1,
                      rotate: 0,
                      backgroundColor: '#C084FC',
                      borderRadius: "50%"
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-lime-400 to-purple-500"
                  />
                </div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={isHoveringPortal ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 8, repeat: isHoveringPortal ? Infinity : 0, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold text-purple-600 whitespace-nowrap">
                    {portalOrbitText}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isHoveringPortal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl"
                >
                  ⚡ {Math.floor(2000 + portalPower * 1000)}% PORTAL ENERGY ⚡
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-purple-600 mb-2 text-center tracking-tighter drop-shadow-lg"
          >
            THE INTERNET'S WEIRD SIDE
          </motion.h1>

          <p className="text-gray-700 text-sm md:text-base mb-4 font-bold">OPENS MARCH 15, 2026</p>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 text-purple-600 font-bold text-sm bg-purple-100 px-4 py-2 rounded-full"
          >
            {fakeCounter.toLocaleString()} PEOPLE WAITING
          </motion.div>

          <div className="flex gap-3 md:gap-5 mb-6 flex-wrap justify-center">
            {[
              { label: 'DAYS', value: countdown.days },
              { label: 'HOURS', value: countdown.hours },
              { label: 'MINS', value: countdown.minutes },
              { label: 'SECS', value: countdown.seconds }
            ].map((unit, i) => (
              <motion.div
                key={unit.label}
                className="text-center"
                animate={{ y: [0, -6, 0] }}
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
              type="email"
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
                className="bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-3">{obj.emoji}</div>
                <h3 className="text-sm font-bold text-purple-600">{obj.name}</h3>
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
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all hover:scale-105"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🎂 ALL STARTED WITH A BIRTHDAY.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-gradient-to-l from-white to-purple-50 p-6 rounded-2xl shadow-xl border-r-8 border-purple-400 hover:shadow-2xl transition-all hover:scale-105 text-right"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">KEPT ASKING FOR GIFT CHOICES. 🤷‍♂️</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all hover:scale-105"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🎭 GOT SENT REELS SARCASTICALLY - PRODUCTS NOT FOUND IN INDIA.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-gradient-to-l from-white to-purple-50 p-6 rounded-2xl shadow-xl border-r-8 border-purple-400 hover:shadow-2xl transition-all hover:scale-105 text-right"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🔍 SEARCHED ALL AROUND. FOUND NOTHING.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-2xl shadow-xl border-l-8 border-lime-400 hover:shadow-2xl transition-all hover:scale-105"
            >
              <p className="text-lg md:text-xl font-bold text-gray-800">🏠 AND THAT'S HOW HOUSE OF 603 WAS BORN.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-lime-500 rounded-3xl text-white mx-auto max-w-sm shadow-2xl"
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
              onHoverStart={() => setIsHoveringLogo(true)}
              onHoverEnd={() => setIsHoveringLogo(false)}
            >
              <AnimatePresence>
                {isHoveringLogo && (
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
                animate={isHoveringLogo ? {
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
                animate={isHoveringLogo ? { 
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
                animate={isHoveringLogo ? { 
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
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl"
              >
                🚀 NO MIDDLEMEN. JUST WEIRD.
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= IMPOSSIBLE GAME ================= */}
        <section className="w-full max-w-4xl mx-auto px-4 py-20 md:py-28">
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-4 text-center tracking-tighter"
          >
            IMPOSSIBLE GAME
          </motion.h2>

          <p className="text-center text-gray-600 mb-8 font-medium">CATCH THE LOGO. WIN 100% OFF. (SPOILER: YOU'RE NOT BUILT FOR THIS 💀)</p>

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

            {!gameActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="bg-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:bg-purple-700 transition-all"
                >
                  🎮 START GAME 🎮
                </motion.button>
                {gameMessage && (
                  <p className="mt-4 text-purple-600 font-bold text-sm">{gameMessage}</p>
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
                  onClick={handleGameClick}
                  whileHover={{ scale: 1.3 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-600 blur-xl opacity-50" />
                    <Image
                      src="/logo.png"
                      alt="Catch me!"
                      width={80}
                      height={40}
                      className="w-16 md:w-20 h-auto relative z-10"
                    />
                  </div>
                </motion.div>

                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-purple-600 font-bold text-sm bg-white/80 inline-block px-4 py-2 rounded-full">
                    {gameMessage}
                  </p>
                </div>
              </>
            )}
          </motion.div>

          <p className="text-center text-xs text-gray-500 mt-4">*The discount doesn't exist. We lied. But the game is fun. IF YOU WIN WE'LL PANIC.</p>
        </section>

        {/* ================= DON'T MISS OUT ================= */}
        <section className="w-full py-20 md:py-28 flex flex-col items-center px-4 bg-gradient-to-t from-purple-100/80 to-transparent">
          
          <motion.div
            className="relative cursor-pointer group mb-6"
            onHoverStart={() => setIsHoveringPortal(true)}
            onHoverEnd={() => setIsHoveringPortal(false)}
          >
            <motion.div
              animate={isHoveringPortal ? { rotate: [0, 25, -25, 0], scale: [1, 1.4, 0.7, 1] } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full relative">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/50" />
                <div className="absolute inset-1 rounded-full border-2 border-lime-400/50 animate-ping opacity-50" />
                <div className="absolute inset-2 rounded-full border border-purple-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isHoveringPortal ? { 
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
              type="email" 
              position="bottom"
              value={bottomEmail}
              onChange={setBottomEmail}
              onSubmit={handleEmailSubmit}
              placeholder="slide into the portal"
              icon="📧"
              buttonText="LET ME IN"
            />
          </div>

          <motion.div
            className="mt-10 text-purple-500 text-xs flex items-center gap-3 font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-lg">⚡</span>
            <span>HOUSE OF 603 • WHERE WEIRD LIVES</span>
            <span className="text-lg">⚡</span>
          </motion.div>
        </section>
      </div>
    </main>
  );
}