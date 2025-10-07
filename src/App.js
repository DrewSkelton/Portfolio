import React, { useEffect } from 'react';
import './App.css';
import NetflixCarousel from './components/NetflixCarousel';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const aboutSection = document.querySelector('.about-me');
      if (!aboutSection) return;
      
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + scrolled;
      const aboutBottom = aboutTop + aboutRect.height;
      
      // Only apply parallax when about section is in view
      if (scrolled > aboutTop - window.innerHeight && scrolled < aboutBottom) {
        const sections = document.querySelectorAll('.floating-section:not(.tech-group)');
        const scrollSpeeds = [0.3, 0.1, 0.25, 0.10, 0.1]; // Reduced scroll rates for individual sections
        
        // Handle individual sections
        sections.forEach((section, index) => {
          const speed = scrollSpeeds[index] || 0.15;
          const yPos = (scrolled - aboutTop) * speed;
          section.style.transform = `translateY(${yPos}px)`;
        });
        
        // Handle achievements section separately
        const achievementsSection = document.querySelector('.achievements-section');
        if (achievementsSection) {
          const achievementSpeed = 0.2;
          const yPos = (scrolled - aboutTop) * achievementSpeed;
          achievementsSection.style.transform = `translateY(${yPos}px)`;
        }
        
        // Handle tech group container
        const techGroup = document.querySelector('.tech-group');
        if (techGroup) {
          const techSpeed = 0.2; // Very slow parallax for tech group
          const yPos = (scrolled - aboutTop) * techSpeed;
          techGroup.style.transform = `translateX(-50%) translateY(${yPos}px)`;
        }
        
        // Handle individual tech cards with sequential parallax
        const frontendCard = document.querySelector('.frontend-tech-card');
        const backendCard = document.querySelector('.backend-tech-card');
        const devopsCard = document.querySelector('.devops-tech-card');
        
        if (frontendCard && backendCard && devopsCard) {
          const baseSpeed = 0.15;
          const frontendSpeed = baseSpeed;
          const backendSpeed = baseSpeed * 0.7; // 30% slower
          const devopsSpeed = baseSpeed * 0.4; // 60% slower
          
          const frontendY = (scrolled - aboutTop) * frontendSpeed;
          const backendY = (scrolled - aboutTop) * backendSpeed;
          const devopsY = (scrolled - aboutTop) * devopsSpeed;
          
          frontendCard.style.transform = `translateY(${frontendY}px)`;
          backendCard.style.transform = `translateY(${backendY}px)`;
          devopsCard.style.transform = `translateY(${devopsY}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Drew Skelton</h1>
          <p>Software Developer & AI Engineer</p>
          

        </div>
      </header>

      <div className="about-me">

        <div className="floating-section profile-section">
          <div className="image-container">
            <img src="/assets/Drewga.png" onClick={() => window.open('https://www.linkedin.com/in/drew-skelton/', '_blank')} alt="Me" />
          </div>
        </div>

          <div className="achievements-section">
            <div className="floating-section text-card achievements-section">
            <div className="achievement-item">
                <i className="fa fa-cloud"></i>
                <span>AWS Cloud Practitioner</span>
              </div>
              <div className="achievement-item">
                <i className="fa fa-graduation-cap"></i>
                <span>3.95 GPA</span>
              </div>
              <div className="achievement-item">
                <i className="fa fa-dollar"></i>
                <span>Saved Filley Lab $2000/yr</span>
              </div>
              
              
            </div>
          </div>

          <div className="floating-section intro-text">
            <div className="text-card">
              <p>I'm a passionate software developer and AI engineer with experience across multiple technology stacks and domains. My work spans from generative AI applications and machine learning models to full-stack web development and IoT systems.</p>
            </div>
          </div>

        

        <div className="floating-section tech-group">
          <div className="floating-section tech-stack-title">Tech Stack</div>

          <div className="tech-group-container">
            <div className="floating-section frontend-tech-card">
              <div className="tech-card">
                <h4 className="category-title">Frontend</h4>
                <div className="tech-icons">
                  <div className="tech-icon" title="React">
                    <i className="devicon-react-original"></i>
                    <span className="tech-label">React</span>
                  </div>
                  <div className="tech-icon" title="JavaScript">
                    <i className="devicon-javascript-plain colored"></i>
                    <span className="tech-label">JavaScript</span>
                  </div>
                  <div className="tech-icon" title="TypeScript">
                    <i className="devicon-typescript-plain colored"></i>
                    <span className="tech-label">TypeScript</span>
                  </div>
                  <div className="tech-icon" title="Angular">
                    <i className="devicon-angular-plain colored"></i>
                    <span className="tech-label">Angular</span>
                  </div>
                  <div className="tech-icon" title="HTML5">
                    <i className="devicon-html5-plain colored"></i>
                    <span className="tech-label">HTML5</span>
                  </div>
                  <div className="tech-icon" title="CSS3">
                    <i className="devicon-css3-plain colored"></i>
                    <span className="tech-label">CSS3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-section backend-tech-card">
              <div className="tech-card">
                <h4 className="category-title">Backend</h4>
                <div className="tech-icons">
                  <div className="tech-icon" title="Node.js">
                    <i className="devicon-nodejs-plain colored"></i>
                    <span className="tech-label">Node.js</span>
                  </div>
                  <div className="tech-icon" title="Python">
                    <i className="devicon-python-plain colored"></i>
                    <span className="tech-label">Python</span>
                  </div>
                  <div className="tech-icon" title="C++">
                    <i className="devicon-cplusplus-plain colored"></i>
                    <span className="tech-label">C++</span>
                  </div>
                  <div className="tech-icon" title="Express.js">
                    <i className="devicon-express-original"></i>
                    <span className="tech-label">Express.js</span>
                  </div>
                  <div className="tech-icon" title="MongoDB">
                    <i className="devicon-mongodb-plain colored"></i>
                    <span className="tech-label">MongoDB</span>
                  </div>
                  <div className="tech-icon" title="SQL">
                  <i class="devicon-azuresqldatabase-plain colored"></i>
                  <span className="tech-label">SQL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-section devops-tech-card">
              <div className="tech-card">
                <h4 className="category-title">DevOps</h4>
                <div className="tech-icons">
                  <div className="tech-icon" title="AWS">
                    <i className="devicon-amazonwebservices-plain colored"></i>
                    <span className="tech-label">AWS</span>
                  </div>
                  <div className="tech-icon" title="Docker">
                    <i className="devicon-docker-plain colored"></i>
                    <span className="tech-label">Docker</span>
                  </div>
                  <div className="tech-icon" title="Git">
                    <i className="devicon-git-plain colored"></i>
                    <span className="tech-label">Git</span>
                  </div>
                  <div className="tech-icon" title="Linux">
                    <i className="devicon-linux-plain colored"></i>
                    <span className="tech-label">Linux</span>
                  </div>
                  <div className="tech-icon" title="Vercel">
                    <i className="devicon-vercel-plain colored"></i>
                    <span className="tech-label">Vercel</span>
                  </div>
                  <div className="tech-icon" title="RaspberryPi">
                    <i class="devicon-raspberrypi-plain colored"></i>
                    <span className="tech-label">IoT - RPi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="floating-section mission-text">
          <div className="text-card">
            <p>I enjoy tackling complex problems and building solutions that make a real impact, whether it's creating productivity tools with AI, developing award-winning web applications, or modernizing legacy systems.</p>
          </div>
        </div> 
      </div>


      <main className="main-content">
        <NetflixCarousel />
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Drew Skelton - Programming Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
