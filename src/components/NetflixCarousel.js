import React, { useState, useRef, useEffect } from 'react';
import './NetflixCarousel.css';

const NetflixCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [middleCardIndex, setMiddleCardIndex] = useState(1); // Track which card should be highlighted as middle
  const carouselRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const totalGeneratedCards = useRef(0);
  const lastGenerationIndex = useRef(0); // Track the last index where cards were generated
  const queuedClick = useRef(null); // Store queued click target

  // Project data with tech stacks, descriptions, and links
  const projects = [
    {
      id: 'psl-lab',
      title: 'Filley Lab - PSL',
      subtitle: 'IoT System',
      image: '/assets/PSL.png',
      techStack: ['Angular', 'Express.js', 'AWS', 'Node.js', 'Node-RED', 'Arduino', 'Raspberry Pi'],
      description: 'Developed an Angular-Express-Node-RED modern full stack IoT system from an old Node-RED only system. Saved over $2000/yr on external SaaS usage by implementing AWS remote access and WiFi capability hardware.',
      links: [
        { type: 'github', url: 'https://github.com/DrewSkelton/PSLPoster', label: 'Github' }
      ],
      category: 'IoT Systems'
    },
    {
      id: 'fresh-start',
      title: 'AI Farm Planning Dashboard',
      subtitle: 'Fresh Start',
      image: '/assets/FreshStart.png',
      techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'OpenAI API', 'Python', 'TensorFlow'],
      description: 'Award-winning web dashboard with 7 views and 50+ customization fields that integrates an OpenAI API to generate maintenance tasks and a TensorFlow model to predict crop yield based on user-designed farms.',
      links: [
        { type: 'demo', url: 'https://fresh-start-mbqm485yh-drews-projects-9439d10f.vercel.app/', label: 'Live Demo' },
        { type: 'devpost', url: 'https://devpost.com/software/fresh-start-q5f92s', label: 'Ranked 2nd out of 74 projects in Hacklahoma' }
      ],
      category: 'Web Applications'
    },
    {
      id: 'os-simulation',
      title: 'OS Simulation',
      subtitle: 'C++ Implementation',
      image: '/assets/OS.png',
      techStack: ['C++', 'POSIX', 'Memory Allocation', 'Job Scheduling', 'Multiprogramming'],
      description: 'This is an OS simulation that handles job scheduling using the round robin method and memory management using a contiguous segment table to store non-contiguous blocks of memory.',
      links: [
        { type: 'github', url: 'https://github.com/DrewSkelton/OS_Simulation', label: 'Github' }
      ],
      category: 'Other Projects'
    },
    {
      id: 'gemini-planner',
      title: 'Generative AI Planners',
      subtitle: 'Plan With A Prompt',
      image: '/assets/Plan.png',
      techStack: ['Google Gemini API', 'JavaScript', 'Vercel'],
      description: 'Google Gemini based web app that supports multimodal input and generates 6 types of productivity tools: Calendars, Trip Plans, Event Plans, Practice Tests, Study Guides, and Study Calendars.',
      links: [
        { type: 'demo', url: 'https://planwithaprompt.vercel.app/', label: 'Live Demo' },
        { type: 'github', url: 'https://github.com/DrewSkelton', label: 'Github' }
      ],
      category: 'AI Projects'
    },
    {
      id: 'blueprint-ai',
      title: 'Stable Diffusion App',
      subtitle: 'BlueprintAI',
      image: '/assets/Blueprint.png',
      techStack: ['Stable Diffusion', 'Python FastAPI', 'REST API'],
      description: 'Python FastAPI based REST API to generate images on top of a background with the Inpainting model for event venue visualization.',
      links: [
        { type: 'demo', url: 'https://drewskelton.github.io/BlueprintAI-deploy/index.html', label: 'Live Demo' },
        { type: 'github', url: 'https://github.com/DrewSkelton', label: 'Github' }
      ],
      category: 'AI Projects'
    },
    {
      id: 'biggie-bot',
      title: 'BiggieBot',
      subtitle: 'Discord Bot',
      image: '/assets/Biggie.png',
      techStack: ['TypeScript', 'Discord.js', 'Node.js'],
      description: 'Started an Open-Source discord bot project to track food events on OU\'s campus and serve daily questions to discord servers of friends. Over 100 users, 2 contributors as of September 2nd.',
      links: [
        { type: 'github', url: 'https://github.com/DrewSkelton/BiggieBot', label: 'Github' }
      ],
      category: 'Web Applications'
    }
  ];

  // Generate infinite cards by cycling through projects
  const generateInfiniteCards = (startIndex = 0, count = 7) => { // Generate cards starting from a specific index
    const infiniteProjects = [];
    for (let i = 0; i < count; i++) {
      const projectIndex = (startIndex + i) % projects.length;
      const project = projects[projectIndex];
      infiniteProjects.push({
        ...project,
        uniqueId: `${project.id}-${startIndex + i}`, // Unique ID for each generated card
        displayIndex: startIndex + i
      });
    }
    return infiniteProjects;
  };

  // Initialize displayed projects
  useEffect(() => {
    const initialProjects = generateInfiniteCards(0, 42); // Start with 42 cards (6 sets) for better buffer
    setDisplayedProjects(initialProjects);
    totalGeneratedCards.current = initialProjects.length;
  }, []);

  const scrollToIndex = (index) => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const cardWidth = 370; // Width of each card + gap (350px + 20px)
      const scrollPosition = index * cardWidth;
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setCurrentIndex(index);
      // Update middle card position when scrolling programmatically
      // The middle card should be the center of the visible 3-card view
      setMiddleCardIndex(index + 1);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset scrolling state after animation
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        // Check if there's a queued click to execute
        if (queuedClick.current !== null) {
          const queuedTargetIndex = queuedClick.current;
          queuedClick.current = null; // Clear the queue
          scrollToIndex(queuedTargetIndex);
        }
      }, 500);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current && !isScrolling) {
      const cardWidth = 370; // 350px card width + 20px gap
      const scrollLeft = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
      
      // Calculate which card should be the middle card based on scroll position
      // The middle card should be the center of the visible 3-card view
      // Visible cards are: newIndex, newIndex+1, newIndex+2
      // So the middle card is always newIndex + 1
      const newMiddleCardIndex = newIndex + 1;
      setMiddleCardIndex(newMiddleCardIndex);
      
      // Check if we're getting close to the end and need to generate more cards
      const threshold = totalGeneratedCards.current - 4; // Generate more when 4 cards from end
      if (newIndex >= threshold && newIndex > lastGenerationIndex.current) {
        const additionalCards = generateInfiniteCards(totalGeneratedCards.current, 21); // Generate 21 more cards (3 complete cycles)
        setDisplayedProjects(prev => [...prev, ...additionalCards]);
        totalGeneratedCards.current += 21;
        lastGenerationIndex.current = newIndex;
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
    
    if (isScrolling) return; // Prevent multiple wheel events during transition
    
    const deltaY = e.deltaY;
    const threshold = 50; // Minimum wheel movement to trigger navigation
    
    // Only trigger if wheel movement is significant enough
    if (Math.abs(deltaY) < threshold) return;
    
    if (deltaY > 0) {
      // Scrolling down/right - go to next
      nextSlide();
    } else {
      // Scrolling up/left - go to previous
      prevSlide();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling) return; // Prevent touch events during transition
    
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance to trigger navigation
    
    // Only trigger if swipe distance is significant enough
    if (Math.abs(diff) < threshold) return;
    
    if (diff > 0) {
      // Swiped left - go to next
      nextSlide();
    } else {
      // Swiped right - go to previous
      prevSlide();
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      carousel.addEventListener('wheel', handleWheel, { passive: false });
      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
        carousel.removeEventListener('wheel', handleWheel);
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isScrolling]);

  const nextSlide = () => {
    scrollToIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (cardIndex) => {
    // Calculate the scroll position to center the clicked card
    // To center the clicked card, we need to scroll so that the clicked card becomes the middle card
    // Middle card is always at position: currentIndex + 1
    // So to make cardIndex the middle card: cardIndex = targetScrollIndex + 1
    // Therefore: targetScrollIndex = cardIndex - 1
    const targetScrollIndex = Math.max(0, cardIndex - 1);
    
    if (isScrolling) {
      // If currently scrolling, queue this click (only one queued click allowed)
      queuedClick.current = targetScrollIndex;
    } else {
      // If not scrolling, execute immediately
      scrollToIndex(targetScrollIndex);
    }
  };

  return (
    <div className="netflix-carousel">
        

      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-track">
          {displayedProjects.map((project, index) => {
            // Check if this card should be highlighted as the middle card based on scroll position
            const isMiddleCard = index === middleCardIndex;
            return (
              <ProjectCard 
                key={project.uniqueId} 
                project={project} 
                isActive={index === currentIndex}
                isMiddleCard={isMiddleCard}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>

      <div className="carousel-indicators">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === (currentIndex % projects.length) ? 'active' : ''}`}
            onClick={() => {
              // Calculate which set of projects to show
              const targetIndex = Math.floor(currentIndex / projects.length) * projects.length + index;
              scrollToIndex(targetIndex);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, isActive, isMiddleCard, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(project.displayIndex);
    }
  };

  return (
    <div 
      className={`project-card ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''} ${isMiddleCard ? 'middle-card' : ''}`}
      data-project-id={project.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="card-image">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="no-image-placeholder" style={{ display: project.image ? 'none' : 'flex' }}>
          <div className="placeholder-content">
            <div className="placeholder-icon">💻</div>
            <div className="placeholder-text">{project.title}</div>
          </div>
        </div>
        <div className="card-overlay">
          <div className="project-category">{project.category}</div>
        </div>
      </div>

      <div className="card-content">
        <div className="project-header">
          <h4 className="project-title">{project.title}</h4>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        <div className="tech-stack">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <p className="project-description">{project.description}</p>

        {project.note && (
          <p className="project-note">{project.note}</p>
        )}

        {project.highlight && (
          <div className="project-highlight-inline">{project.highlight}</div>
        )}

        <div className="project-links">
          {project.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-link ${link.type}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetflixCarousel;