import React, { useState, useEffect, useCallback, useMemo } from "react";

// SVG Icon Components
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const HeartIcon = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ChevronDoubleDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
    />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const imageImport = {
  5: "./public/5.webp",
  11: "./public/11.webp",
};

const imageRandom = {
  1: "./public/2.webp",
  2: "./public/3.webp",
  3: "./public/4.webp",
  4: "./public/6.webp",
  5: "./public/7.webp",
  6: "./public/8.webp",
  7: "./public/9.webp",
  8: "./public/10.webp",
};

// Countdown Timer Component
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center space-x-4 md:space-x-8 text-center text-amber-800">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center bg-white/50 p-3 rounded-lg shadow-lg w-20 h-16 md:w-28 md:h-28"
        >
          <span className="text-3xl md:text-5xl font-bold">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-sm md:text-base uppercase">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

const FloatingImages = React.memo(() => {
  const allImages = Object.values(imageRandom);

  const getRandomImages = useCallback(() => {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [allImages]);

  const [selectedImages] = useState(getRandomImages);

  const generateFloatingAnimation = useCallback((index: number) => {
    const animationName = `floating-${index}`;
    const duration = 8 + (index % 4) * 8;
    const delay = index * 1.5;

    return {
      animationName,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
    };
  }, []);

  const floatingKeyframes = useMemo(
    () => `
    @keyframes floating-0 {
      0% { transform: translate(10vw, 10vh) rotate(0deg); }
      25% { transform: translate(80vw, 20vh) rotate(90deg); }
      50% { transform: translate(70vw, 80vh) rotate(180deg); }
      75% { transform: translate(20vw, 70vh) rotate(270deg); }
      100% { transform: translate(10vw, 10vh) rotate(360deg); }
    }
    @keyframes floating-1 {
      0% { transform: translate(80vw, 15vh) rotate(0deg); }
      25% { transform: translate(15vw, 60vh) rotate(-90deg); }
      50% { transform: translate(60vw, 75vh) rotate(-180deg); }
      75% { transform: translate(85vw, 30vh) rotate(-270deg); }
      100% { transform: translate(80vw, 15vh) rotate(-360deg); }
    }
    @keyframes floating-2 {
      0% { transform: translate(50vw, 5vh) rotate(45deg); }
      33% { transform: translate(5vw, 40vh) rotate(135deg); }
      66% { transform: translate(90vw, 85vh) rotate(225deg); }
      100% { transform: translate(50vw, 5vh) rotate(405deg); }
    }
    @keyframes floating-3 {
      0% { transform: translate(25vw, 85vh) rotate(-45deg); }
      30% { transform: translate(75vw, 10vh) rotate(45deg); }
      60% { transform: translate(10vw, 25vh) rotate(135deg); }
      100% { transform: translate(25vw, 85vh) rotate(315deg); }
    }
    @keyframes floating-4 {
      0% { transform: translate(90vw, 50vh) rotate(90deg); }
      40% { transform: translate(30vw, 90vh) rotate(180deg); }
      80% { transform: translate(5vw, 15vh) rotate(270deg); }
      100% { transform: translate(90vw, 50vh) rotate(450deg); }
    }
    @keyframes floating-5 {
      0% { transform: translate(60vw, 90vh) rotate(-90deg); }
      35% { transform: translate(95vw, 35vh) rotate(0deg); }
      70% { transform: translate(40vw, 5vh) rotate(90deg); }
      100% { transform: translate(60vw, 90vh) rotate(270deg); }
    }
  `,
    []
  );

  return (
    <>
      <style>{floatingKeyframes}</style>

      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {selectedImages.map((imageSrc, index) => (
          <div
            key={`${imageSrc}-${index}`}
            className="absolute opacity-80 hover:opacity-90 transition-opacity duration-300"
            style={generateFloatingAnimation(index)}
          >
            <img
              src={imageSrc}
              alt={`Wedding photo ${index + 1}`}
              className="w-36 h-36 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-xl border-2 border-white/60 hover:border-white/80 transition-all duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </>
  );
});

export default function App() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [guestName, setGuestName] = useState("Bạn");
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const weddingDate = useMemo(() => new Date("2025-11-30T11:00:00"), []);

  const handleBackButton = useCallback(() => {
    if (isAtTop) {
      setIsCurtainOpen(false);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isAtTop]);

  const handleCurtainOpen = useCallback(() => {
    const wasAlreadyTriggered = hasAutoTriggered;
    setIsCurtainOpen(true);
    setHasAutoTriggered(true);

    if (!wasAlreadyTriggered) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    }
  }, [hasAutoTriggered]);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get("t");
      if (name) {
        setGuestName(name.replace(/\+/g, " "));
      }
    } catch (error) {
      console.error("Could not parse URL params:", error);
      // Fallback to default name
      setGuestName("Bạn");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (isCurtainOpen) return;

      // Open curtain when scrolling down
      if (scrollY > 50) {
        handleCurtainOpen();
      }
    };

    window.addEventListener("scroll", handleScroll);

    const touchTimeout = setTimeout(() => {
      if (window.scrollY > 20 && !isCurtainOpen) {
        handleCurtainOpen();
      }
    }, 500);

    const autoScrollTimeout = !hasAutoTriggered
      ? setTimeout(() => {
          if (!isCurtainOpen) {
            handleCurtainOpen();
          }
        }, 1500)
      : null;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(touchTimeout);
      if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
    };
  }, [isCurtainOpen, hasAutoTriggered]);

  useEffect(() => {
    const handleScrollPosition = () => {
      if (!isCurtainOpen) return;
      const isNearTop = window.scrollY === 0;
      setIsAtTop(isNearTop);
    };

    window.addEventListener("scroll", handleScrollPosition);
    // Initial check
    handleScrollPosition();

    return () => window.removeEventListener("scroll", handleScrollPosition);
  }, [isCurtainOpen]);

  return (
    <div className="bg-[#fdf8f5] min-h-screen relative overflow-x-hidden">
      {/* Curtain Elements */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-[#ccc] z-50 transform transition-transform duration-1000 ease-in-out ${
          isCurtainOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-[#ccc] z-50 transform transition-transform duration-1000 ease-in-out ${
          isCurtainOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent"></div>
      </div>

      {/* Scroll Down Prompt */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-white transition-opacity duration-500 ${
          isCurtainOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${imageImport[11]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            {
              size: "h-4 w-4",
              color: "text-red-300",
              top: "20%",
              left: "15%",
              delay: "0s",
            },
            {
              size: "h-3 w-3",
              color: "text-pink-300",
              top: "60%",
              right: "20%",
              delay: "1s",
            },
            {
              size: "h-5 w-5",
              color: "text-red-400",
              top: "80%",
              left: "25%",
              delay: "2s",
            },
            {
              size: "h-3 w-3",
              color: "text-pink-400",
              top: "30%",
              right: "15%",
              delay: "1.5s",
            },
            {
              size: "h-4 w-4",
              color: "text-red-200",
              top: "70%",
              right: "30%",
              delay: "0.5s",
            },
          ].map((heart, index) => (
            <HeartIcon
              key={index}
              className={`absolute ${heart.size} ${heart.color} opacity-70 animate-bounce`}
              style={{
                top: heart.top,
                left: heart.left,
                right: heart.right,
                animationDelay: heart.delay,
              }}
            />
          ))}
        </div>

        <div className="text-center absolute z-10 px-4 top-[15px]">
          <div className="mb-2 inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
            <p className="text-sm md:text-base font-semibold tracking-wider">
              WEDDING INVITATION
            </p>
          </div>

          <div className="mb-8">
            <p className="font-dancing text-5xl md:text-7xl mb-2 drop-shadow-lg">
              Quốc Bảo
            </p>
            <div className="flex items-center justify-center">
              <div className="h-px bg-white/50 w-16"></div>
              <HeartIcon className="h-8 w-8 text-red-400 mx-4 animate-pulse" />
              <div className="h-px bg-white/50 w-16"></div>
            </div>
            <p className="font-dancing text-5xl md:text-7xl drop-shadow-lg">
              Kim Hồng
            </p>
          </div>

          <div
            className="cursor-pointer group fixed bottom-[28px] left-[50%] translate-x-[-50%]"
            onClick={() => setIsCurtainOpen(true)}
          >
            <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/30 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
              <ChevronDoubleDownIcon className="h-8 w-8 mb-2 animate-bounce" />
              <p className="text-sm font-semibold tracking-wider">CONTINUE</p>
            </div>
          </div>
        </div>

        {[
          { position: "top-8 left-8", borders: "border-l-2 border-t-2" },
          { position: "top-8 right-8", borders: "border-r-2 border-t-2" },
          { position: "bottom-8 left-8", borders: "border-l-2 border-b-2" },
          { position: "bottom-8 right-8", borders: "border-r-2 border-b-2" },
        ].map((corner, index) => (
          <div
            key={index}
            className={`absolute ${corner.position} w-16 h-16 ${corner.borders} border-white/30`}
          ></div>
        ))}
      </div>

      {isCurtainOpen && <FloatingImages />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 delay-500 ${
          isCurtainOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <header
          className="relative text-center pt-16 pb-8  md:py-24 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageImport[5]}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h1 className="font-dancing text-5xl md:text-8xl my-4">
              Quốc Bảo
              <HeartIcon className="h-8 w-8 text-red-500 inline-block mx-2 animate-pulse" />
              Kim Hồng
            </h1>
            <Countdown targetDate={weddingDate} />
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 md:p-12 text-center text-[#5c4033]">
          <section className="mb-12">
            <Countdown targetDate={weddingDate} />
          </section>

          <section className="mb-12">
            <h2 className="font-dancing text-4xl md:text-5xl mb-4 text-amber-800">
              Kính mời {guestName} đến tham dự lễ cưới.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-justify">
              Sự có mặt của bạn là món quà ý nghĩa nhất và là niềm vinh hạnh của
              chúng tôi.!
            </p>
          </section>

          <section className="mb-8 bg-white/60 p-6 md:p-8 rounded-xl shadow-lg border border-amber-200">
            <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
              <div className="flex flex-col items-center">
                <CalendarIcon className="h-12 w-12 text-amber-800 mb-2" />
                <h4 className="text-xl font-semibold">THỜI GIAN</h4>
                <p className="text-lg">11:00 Sáng</p>
                <p className="text-lg">Chủ Nhật, 30.11.2025</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col items-center mb-8">
              <MapPinIcon className="h-12 w-12 text-amber-800 mb-2" />
              <h4 className="text-xl font-semibold">ĐỊA ĐIỂM</h4>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d398.72379860440543!2d106.14823193293743!3d11.27420044370887!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b6aa36f2bc0d5%3A0xeef924c7e062ab3b!2zNzRGWCtNNlAsIFRyxrDhu51uZyBUaGnhu4duLCBIb8OgIFRow6BuaCwgVMOieSBOaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1763046562078!5m2!1svi!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bảo Hồng Wedding Address"
              />
            </div>
          </section>
        </main>

        <footer className="text-center py-12">
          <p className="font-dancing text-3xl text-amber-800">Thank You!</p>
          <HeartIcon className="h-8 w-8 text-red-500 inline-block mt-2" />
          <button
            onClick={handleBackButton}
            className={`fixed bottom-2 left-2 z-40 bg-white/90 backdrop-blur-sm hover:bg-white text-amber-800 hover:text-amber-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
              isCurtainOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full pointer-events-none"
            }`}
            aria-label={isAtTop ? "Quay lại" : "Lên đầu trang"}
          >
            <div
              style={{
                transform: isAtTop ? "rotate(0deg)" : "rotate(90deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </div>
          </button>
        </footer>
      </div>

      <div className={`h-screen ${isCurtainOpen ? "hidden" : "block"}`}></div>
    </div>
  );
}
