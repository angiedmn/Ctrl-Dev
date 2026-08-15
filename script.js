document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Swap Navbar Layout (Profile to Right, Logo to Left) ---
    const nav = document.querySelector('nav.glass');
    const authSlot = document.getElementById('auth-nav-slot');
    if (nav && authSlot) {
        const logoSlot = nav.lastElementChild;
        if (logoSlot && logoSlot !== authSlot && logoSlot.classList.contains('nav-links') === false) {
            nav.insertBefore(logoSlot, nav.firstChild);
            nav.appendChild(authSlot);
        }
    }
    
    // --- 1. Theme Toggle & Local Storage ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const applyThemeUI = (theme) => {
        const icon = theme === 'dark' ? '☀️' : '🌙';
        const mainToggle = document.getElementById('theme-toggle');
        if (mainToggle) mainToggle.innerText = icon;
        
        const dropToggle = document.getElementById('dropdown-theme-toggle');
        if (dropToggle) dropToggle.innerHTML = `Toggle <span style="float: right; margin-right: 0.5rem;">${icon}</span>`;
    };

    const toggleTheme = () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        applyThemeUI(newTheme);
    };

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    applyThemeUI(currentTheme);

    // --- 2. Custom Toast Notification System ---
    const showToast = (message, type = 'success') => {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast glass ${type}`;
        toast.innerHTML = `<p>${message}</p>`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // --- 3. Spinning Letters Hover Effect ---
    const initSpinners = () => {
        const textElements = document.querySelectorAll('.spin-text:not(.processed)');
        textElements.forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            const words = text.split(' ');

            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'spin-word';
                for (let char of word) {
                    const charSpan = document.createElement('span');
                    charSpan.innerText = char;
                    charSpan.className = 'spin-char';
                    wordSpan.appendChild(charSpan);
                }
                el.appendChild(wordSpan);
                if (index < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });
            el.classList.add('processed');
        });
    };
    initSpinners();

    // --- 4. Master Events Database ---
    const eventsData = [
        { 
            id: 1, name: "Web3 Summit India", date: "Oct 12, 2026", category: "Blockchain", venue: "IISc Bangalore Convention Center, Karnataka",
            desc: "Dive into decentralized web tech and the future of Indian crypto.",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*rYEeRW5mdOsp2f28LLugGg.png",
            stats: { attendees: "1,200+", progress1: "90%", speakers: "15+", progress2: "65%", tracks: "3", progress3: "40%" },
            whyAttend: [
                { title: "Smart Contracts", desc: "Hands-on coding with Solidity and Rust." },
                { title: "VC Networking", desc: "Meet top Web3 investors from Peak XV." },
                { title: "Grants", desc: "₹40 Lakhs in equity-free grants for winning projects." }
            ],
            speakers: [
                { name: "Sandeep Nailwal", title: "Co-founder, Polygon", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Kunal Shah", title: "Founder, CRED", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: The Protocol Layer", items: ["09:00 AM: Keynote", "11:30 AM: ZK Rollups", "02:00 PM: DApp Arch"] },
                { day: "Day 2: Adoption", items: ["10:00 AM: Crypto in India", "01:00 PM: Pitches"] }
            ],
            sponsors: ["Polygon", "CoinDCX", "Ethereum Foundation"],
            testimonial: { quote: "The connections I made here got my DeFi startup funded.", author: "Rajat D." }
        },
        { 
            id: 2, name: "AI Engineering Hackathon", date: "Oct 15, 2026", category: "AI/ML", venue: "IIIT Hyderabad Campus, Telangana",
            desc: "Build intelligent apps, fine-tune LLMs, and deploy AI at scale.",
            image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/69f8987ac1da0_ai-hackathon-for-builders.png?d=700x400",
            stats: { attendees: "800+", progress1: "75%", speakers: "10+", progress2: "50%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Compute Credits", desc: "Free GPU access for all participants." },
                { title: "Mentorship", desc: "1-on-1 guidance from top ML engineers." },
                { title: "Hiring", desc: "On-the-spot interviews for top 10 teams." }
            ],
            speakers: [
                { name: "Bhavish Aggarwal", title: "Founder, Ola & Krutrim AI", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
                { name: "Srikanth V.", title: "Co-founder, Fractal", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Build Phase", items: ["09:00 AM: Kickoff", "12:00 PM: Fine-tuning Llama 3"] },
                { day: "Day 2: Demo Day", items: ["08:00 AM: Code Freeze", "04:00 PM: Winners"] }
            ],
            sponsors: ["NVIDIA", "Krutrim", "Google Cloud"],
            testimonial: { quote: "Intense 48 hours, learned more than a whole semester.", author: "Priya S." }
        },
        { 
            id: 3, name: "Data Science & Scale", date: "Oct 20, 2026", category: "Data", venue: "IIT Bombay, Mumbai",
            desc: "Master large-scale databases, analytics, and FinTech data infrastructure.",
            image: "https://cdn.itm.ac.in/2026/02/Data-Science-Courses-After-12th.jpeg",
            stats: { attendees: "2,000+", progress1: "95%", speakers: "25+", progress2: "80%", tracks: "4", progress3: "60%" },
            whyAttend: [
                { title: "Case Studies", desc: "Breakdowns of Indian tech giant scaling." },
                { title: "Data Viz", desc: "Storytelling through data." },
                { title: "Backend Mastery", desc: "Postgres and real-time streaming." }
            ],
            speakers: [
                { name: "Nithin Kamath", title: "CEO, Zerodha", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
                { name: "Mukesh Bansal", title: "Founder, CureFit", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: FinTech Scale", items: ["10:00 AM: Market Open Load", "02:00 PM: Data Streaming"] },
                { day: "Day 2: Analytics", items: ["09:00 AM: AI in E-commerce", "01:00 PM: Panel"] }
            ],
            sponsors: ["AWS", "Supabase", "Zerodha Tech"],
            testimonial: { quote: "Nithin's breakdown of Zerodha's backend was mind-blowing.", author: "Amit K." }
        },
        {
            id: 4, name: "CyberSec 101", date: "Oct 25, 2026", category: "Security", venue: "IIT Delhi, New Delhi",
            desc: "Ethical hacking, infrastructure security, and zero-trust architectures.",
            image: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/03/internships-for-cyber-security.jpg",
            stats: { attendees: "600+", progress1: "60%", speakers: "8+", progress2: "40%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "CTF Challenges", desc: "Compete in live Capture The Flag events." },
                { title: "Bug Bounties", desc: "Find vulnerabilities for cash." },
                { title: "Certifications", desc: "Earn platform credits toward certs." }
            ],
            speakers: [
                { name: "Trishneet Arora", title: "Founder, TAC Security", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                { name: "Sridhar Vembu", title: "CEO, Zoho", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Defense", items: ["09:00 AM: Zero Trust", "01:00 PM: Cloud Security"] },
                { day: "Day 2: Offense", items: ["10:00 AM: CTF Kickoff", "03:00 PM: Pen Testing"] }
            ],
            sponsors: ["CrowdStrike", "Zoho", "Cloudflare"],
            testimonial: { quote: "The CTF was perfectly balanced for beginners and pros.", author: "Sneha V." }
        },
        {
            id: 5, name: "React India: New Delhi Edition", date: "Nov 02, 2026", category: "Web Dev", venue: "Pragati Maidan, New Delhi",
            desc: "The ultimate gathering for frontend developers focusing on React and Next.js.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,500+", progress1: "85%", speakers: "20+", progress2: "70%", tracks: "3", progress3: "50%" },
            whyAttend: [
                { title: "Server Components", desc: "Deep dive into React 19 architecture." },
                { title: "Performance", desc: "Optimizing Web Vitals for scale." },
                { title: "UI/UX", desc: "Framer Motion and Tailwind mastery." }
            ],
            speakers: [
                { name: "Guillermo Rauch", title: "CEO, Vercel", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
                { name: "Siddharth Kshetrapal", title: "Frontend Architect", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Fundamentals", items: ["10:00 AM: State Management", "02:00 PM: Next.js App Router"] },
                { day: "Day 2: Advanced", items: ["09:00 AM: Micro-frontends", "03:00 PM: WebGL Animations"] }
            ],
            sponsors: ["Vercel", "Netlify", "GitHub"],
            testimonial: { quote: "Changed the way I approach component architecture.", author: "Rohan M." }
        },
        {
            id: 6, name: "Algorithm Masters", date: "Nov 08, 2026", category: "AI/ML", venue: "IIT Kanpur, Uttar Pradesh",
            desc: "A competitive programming bootcamp focusing on advanced C programming and recursion.",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "500+", progress1: "50%", speakers: "5+", progress2: "20%", tracks: "1", progress3: "10%" },
            whyAttend: [
                { title: "C Programming", desc: "Master memory management and pointers." },
                { title: "Recursion", desc: "Break down complex recursive problems." },
                { title: "Competitive Edge", desc: "Prepare for FAANG technical interviews." }
            ],
            speakers: [
                { name: "Dr. HC Verma", title: "Computer Science Dept", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                { name: "Anudeep Nekkanti", title: "Competitive Programmer", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Theory", items: ["09:00 AM: Pointers in C", "01:00 PM: Recursion Trees"] },
                { day: "Day 2: Practice", items: ["10:00 AM: Tower of Hanoi Challenge", "04:00 PM: Code Review"] }
            ],
            sponsors: ["Codeforces", "LeetCode", "HackerRank"],
            testimonial: { quote: "Finally understood dynamic programming and recursion.", author: "Karan S." }
        },
        {
            id: 7, name: "Hardware Hackathon", date: "Nov 15, 2026", category: "Web Dev", venue: "T-Hub, Hyderabad",
            desc: "Bridge the gap between hardware and software. Build logic gates and IoT devices.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "400+", progress1: "45%", speakers: "6+", progress2: "30%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Logic Design", desc: "Build NAND/NOR gates from scratch." },
                { title: "IoT Integration", desc: "Connect Arduino boards to web dashboards." },
                { title: "Prototyping", desc: "Rapid testing using simulations." }
            ],
            speakers: [
                { name: "Massimo Banzi", title: "Co-founder, Arduino", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
                { name: "Limor Fried", title: "Maker Specialist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Breadboards", items: ["09:00 AM: Basic Circuits", "02:00 PM: Simulation"] },
                { day: "Day 2: Web Sync", items: ["10:00 AM: API endpoints for Hardware", "03:00 PM: Final Showcase"] }
            ],
            sponsors: ["Autodesk", "Arduino", "Raspberry Pi"],
            testimonial: { quote: "Built my first smart-home prototype here!", author: "Karan T." }
        },
        {
            id: 8, name: "Material Science Deep Dive", date: "Nov 22, 2026", category: "Data", venue: "IIT Gandhinagar, Gujarat",
            desc: "Explore the intersection of hardware engineering, glass wettability, and deep tech.",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "300+", progress1: "35%", speakers: "8+", progress2: "40%", tracks: "1", progress3: "20%" },
            whyAttend: [
                { title: "Nano-Tech", desc: "Understand laser interaction with glass surfaces." },
                { title: "Wettability", desc: "Study hydrophobic and hydrophilic surface engineering." },
                { title: "Research Grants", desc: "Opportunities for research placements." }
            ],
            speakers: [
                { name: "Dr. A. K. Sharma", title: "IIT Gandhinagar", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
                { name: "Dr. Meera V.", title: "Optics Researcher", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Physics", items: ["10:00 AM: Laser Dynamics", "02:00 PM: Surface Chemistry"] },
                { day: "Day 2: Lab Work", items: ["09:00 AM: SEM Analysis", "01:00 PM: Paper Publishing Workshop"] }
            ],
            sponsors: ["Zeiss", "Corning", "IITGN"],
            testimonial: { quote: "Incredible deep dive into surface tech and optics.", author: "Neha P." }
        },
        {
            id: 9, name: "Product Management Leadership", date: "Dec 01, 2026", category: "Management", venue: "NIMHANS Convention Centre, Bangalore",
            desc: "Learn to build roadmaps, manage developer teams, and scale tech products.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "900+", progress1: "80%", speakers: "12+", progress2: "60%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Agile Scrums", desc: "Master sprint planning." },
                { title: "User Metrics", desc: "Tracking retention and DAU." },
                { title: "Case Studies", desc: "Swiggy and Zomato PM teardowns." }
            ],
            speakers: [
                { name: "Deepinder Goyal", title: "CEO, Zomato", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
                { name: "Rahul Jaimini", title: "Co-founder, Swiggy", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Strategy", items: ["09:00 AM: Finding PMF", "02:00 PM: Pricing Models"] },
                { day: "Day 2: Execution", items: ["10:00 AM: Sprint Demos", "03:00 PM: Board Management"] }
            ],
            sponsors: ["Atlassian", "Jira", "Notion"],
            testimonial: { quote: "Helped me transition from dev to product lead.", author: "Vikram S." }
        },
        {
            id: 10, name: "Quantum Computing Summit", date: "Dec 05, 2026", category: "AI/ML", venue: "IIT Madras, Chennai",
            desc: "Explore quantum equations applied to modern Quantum ML models.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "500+", progress1: "50%", speakers: "8+", progress2: "40%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Qubits", desc: "Programming IBM Qiskit." },
                { title: "Wave Functions", desc: "Solving equations mathematically for tech." },
                { title: "Future Tech", desc: "Cryptography in a post-quantum world." }
            ],
            speakers: [
                { name: "Dr. Arvind K.", title: "Quantum Researcher", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                { name: "Shohini G.", title: "IBM Quantum", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Mechanics", items: ["09:00 AM: Wave Equations", "02:00 PM: Superposition Labs"] },
                { day: "Day 2: Applied", items: ["10:00 AM: Qiskit Python", "03:00 PM: Quantum Cryptography"] }
            ],
            sponsors: ["IBM", "Google Quantum AI", "Rigetti"],
            testimonial: { quote: "Made complex quantum math actually understandable.", author: "Arjun R." }
        },
        {
            id: 11, name: "Solana Build Station", date: "Dec 10, 2026", category: "Blockchain", venue: "BIEC, Bangalore",
            desc: "A massive hacker house focused on building high-speed dApps on Solana.",
            image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,100+", progress1: "80%", speakers: "10+", progress2: "50%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Rust Programming", desc: "Write native Solana programs." },
                { title: "Bounties", desc: "Win from a ₹20 Lakh prize pool." },
                { title: "Networking", desc: "Meet the Superteam India crew." }
            ],
            speakers: [
                { name: "Akshay BD", title: "Superteam", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Anatoly Yakovenko", title: "Founder, Solana", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Anchor Framework", items: ["09:00 AM: Rust Basics", "01:00 PM: Deploying Smart Contracts"] },
                { day: "Day 2: Hack", items: ["All Day: Hacking", "06:00 PM: Demo Pitches"] }
            ],
            sponsors: ["Solana Foundation", "Superteam", "Phantom"],
            testimonial: { quote: "The energy in the hacker house was unmatched.", author: "Dev S." }
        },
        {
            id: 12, name: "Cloud Native DevOps India", date: "Dec 15, 2026", category: "Data", venue: "Jio World Convention Centre, Mumbai",
            desc: "Mastering Kubernetes, Docker, and CI/CD pipelines for enterprise scale.",
            image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,800+", progress1: "95%", speakers: "20+", progress2: "80%", tracks: "4", progress3: "60%" },
            whyAttend: [
                { title: "Kubernetes", desc: "Cluster management and scaling." },
                { title: "Automation", desc: "GitHub actions and Jenkins." },
                { title: "Observability", desc: "Prometheus and Grafana setups." }
            ],
            speakers: [
                { name: "Kelsey Hightower", title: "Cloud Tech Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
                { name: "Priyanka Sharma", title: "CNCF", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Containers", items: ["09:00 AM: Docker Deep Dive", "02:00 PM: Intro to K8s"] },
                { day: "Day 2: Pipelines", items: ["10:00 AM: Advanced CI/CD", "03:00 PM: Serverless Deployments"] }
            ],
            sponsors: ["Docker", "DigitalOcean", "CNCF"],
            testimonial: { quote: "Completely automated our startup's deployment pipeline after this.", author: "Ravi K." }
        },
        {
            id: 13, name: "Python Data Science Con", date: "Dec 20, 2026", category: "AI/ML", venue: "IIT Kharagpur, West Bengal",
            desc: "From Pandas to PyTorch: A complete summit for Python data professionals.",
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,400+", progress1: "85%", speakers: "15+", progress2: "60%", tracks: "3", progress3: "40%" },
            whyAttend: [
                { title: "Data Wrangling", desc: "Advanced Pandas and NumPy." },
                { title: "Neural Networks", desc: "Building models in PyTorch." },
                { title: "Deployments", desc: "Serving ML models via FastAPI." }
            ],
            speakers: [
                { name: "Wes McKinney", title: "Creator of Pandas", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Soumith Chintala", title: "Creator of PyTorch", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Analytics", items: ["10:00 AM: Data Cleaning at Scale", "02:00 PM: Statistical Modeling"] },
                { day: "Day 2: Machine Learning", items: ["09:00 AM: Deep Learning Basics", "02:00 PM: NLP with HuggingFace"] }
            ],
            sponsors: ["Anaconda", "Meta", "HuggingFace"],
            testimonial: { quote: "Best Python-focused data event in the country.", author: "Sonia P." }
        },
        {
            id: 14, name: "Zero Day Security Conference", date: "Dec 28, 2026", category: "Security", venue: "Vigyan Bhawan, New Delhi",
            desc: "India's most intense technical security and penetration testing conference.",
            image: "https://images.unsplash.com/photo-1510511459019-5efa326ae580?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "700+", progress1: "65%", speakers: "12+", progress2: "50%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Exploit Dev", desc: "Writing zero-day exploits." },
                { title: "Reverse Engineering", desc: "Decompiling malware." },
                { title: "Red Teaming", desc: "Simulating adversary attacks." }
            ],
            speakers: [
                { name: "Vivek Ramachandran", title: "Founder, Pentester Academy", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
                { name: "Jayson E. Street", title: "Social Eng Expert", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Red Team", items: ["09:00 AM: Network Breaches", "01:00 PM: Physical Security"] },
                { day: "Day 2: Blue Team", items: ["10:00 AM: Incident Response", "03:00 PM: Forensics"] }
            ],
            sponsors: ["OffSec", "Palo Alto", "Trend Micro"],
            testimonial: { quote: "The reverse engineering workshop blew my mind.", author: "Ankit D." }
        },
        {
            id: 15, name: "Agile Scrum Masterclass", date: "Jan 05, 2027", category: "Management", venue: "IIM Bangalore, Karnataka",
            desc: "Get certified in Scrum methodologies and lead high-performing tech teams.",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "400+", progress1: "45%", speakers: "4+", progress2: "15%", tracks: "1", progress3: "10%" },
            whyAttend: [
                { title: "Certification", desc: "Official CSM Prep." },
                { title: "Workflows", desc: "Kanban vs Scrum breakdowns." },
                { title: "Leadership", desc: "Managing remote dev teams." }
            ],
            speakers: [
                { name: "Jeff Sutherland", title: "Co-creator of Scrum", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Ashish M.", title: "Agile Coach", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Foundations", items: ["10:00 AM: Agile Manifesto", "02:00 PM: Sprint Planning"] },
                { day: "Day 2: Implementation", items: ["09:00 AM: Daily Standups", "01:00 PM: Retrospectives"] }
            ],
            sponsors: ["Scrum Alliance", "Monday.com", "Miro"],
            testimonial: { quote: "Helped me double my team's velocity in one month.", author: "Preeti K." }
        },
        {
            id: 16, name: "Metaverse & Roblox Dev", date: "Jan 12, 2027", category: "Web Dev", venue: "Hitex Exhibition Center, Hyderabad",
            desc: "Building immersive 3D experiences, Lua scripting, and virtual economies.",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,000+", progress1: "80%", speakers: "10+", progress2: "40%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Lua Scripting", desc: "Code interactive mechanics." },
                { title: "Monetization", desc: "Building virtual economies." },
                { title: "3D Modeling", desc: "Blender to Engine pipelines." }
            ],
            speakers: [
                { name: "David Baszucki", title: "CEO, Roblox", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
                { name: "Tim Sweeney", title: "CEO, Epic Games", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Engine Basics", items: ["10:00 AM: World Building", "02:00 PM: Lua Scripting"] },
                { day: "Day 2: Advanced", items: ["09:00 AM: Multiplayer Sync", "01:00 PM: Moderation API"] }
            ],
            sponsors: ["Roblox", "Epic Games", "Unity"],
            testimonial: { quote: "Learned how to secure my games against exploiters perfectly.", author: "Sahil R." }
        },
        {
            id: 17, name: "Computer Vision Expo", date: "Jan 18, 2027", category: "AI/ML", venue: "IIT Roorkee, Uttarakhand",
            desc: "Image processing, object detection, and real-time facial recognition.",
            image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "850+", progress1: "75%", speakers: "12+", progress2: "50%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "OpenCV", desc: "Real-time image manipulation." },
                { title: "YOLO Models", desc: "Deploying object detection." },
                { title: "Edge AI", desc: "Running vision models on mobile." }
            ],
            speakers: [
                { name: "Fei-Fei Li", title: "AI Researcher", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
                { name: "Lex Fridman", title: "AI Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Algorithms", items: ["09:00 AM: CNNs Deep Dive", "01:00 PM: PyTorch Vision"] },
                { day: "Day 2: Deployment", items: ["10:00 AM: CoreML", "03:00 PM: Auto-Driving Tech"] }
            ],
            sponsors: ["OpenAI", "Tesla AI", "Qualcomm"],
            testimonial: { quote: "Built a working object detector by the end of day 1.", author: "Manish K." }
        },
        {
            id: 18, name: "Fullstack Web Bootcamp", date: "Jan 25, 2027", category: "Web Dev", venue: "Manpho Convention Centre, Bangalore",
            desc: "From HTML/CSS basics to complex Node.js microservices.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "2,500+", progress1: "95%", speakers: "15+", progress2: "60%", tracks: "3", progress3: "40%" },
            whyAttend: [
                { title: "MERN Stack", desc: "MongoDB, Express, React, Node." },
                { title: "UI/CSS", desc: "Mastering Flexbox, Grid, and Animations." },
                { title: "Auth", desc: "Implementing JWT and OAuth." }
            ],
            speakers: [
                { name: "Brad Traversy", title: "Educator", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Hitesh Choudhary", title: "Developer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Frontend", items: ["09:00 AM: Modern CSS", "02:00 PM: React State"] },
                { day: "Day 2: Backend", items: ["10:00 AM: Node APIs", "03:00 PM: DB Schema Design"] }
            ],
            sponsors: ["MongoDB", "Tailwind Labs", "Figma"],
            testimonial: { quote: "Solidified all my web dev fundamentals.", author: "Aman S." }
        },
        {
            id: 19, name: "Indian FinTech Data Summit", date: "Feb 02, 2027", category: "Data", venue: "Bombay Stock Exchange, Mumbai",
            desc: "How UPI, Open Banking, and AI are reshaping financial data in India.",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,200+", progress1: "85%", speakers: "18+", progress2: "70%", tracks: "3", progress3: "40%" },
            whyAttend: [
                { title: "UPI Tech", desc: "Handling million-TPS infrastructure." },
                { title: "Fraud Detection", desc: "ML models for transaction security." },
                { title: "Compliance", desc: "Navigating RBI data regulations." }
            ],
            speakers: [
                { name: "Vijay Shekhar", title: "CEO, Paytm", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
                { name: "Sameer Nigam", title: "Founder, BharatPe", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Payments", items: ["10:00 AM: UPI Architecture", "02:00 PM: Scale Tech"] },
                { day: "Day 2: Lending Data", items: ["09:00 AM: Credit Risk ML", "01:00 PM: Security Panel"] }
            ],
            sponsors: ["NPCI", "Razorpay", "Pine Labs"],
            testimonial: { quote: "Great insights into how Indian fintech handles massive data.", author: "Rishabh J." }
        },
        {
            id: 20, name: "CISO Leadership Forum", date: "Feb 10, 2027", category: "Security", venue: "Cyberabad, Hyderabad",
            desc: "Exclusive summit for Chief Information Security Officers and enterprise defenders.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "300+", progress1: "35%", speakers: "10+", progress2: "40%", tracks: "1", progress3: "15%" },
            whyAttend: [
                { title: "Policy", desc: "Data protection laws and enterprise risk." },
                { title: "Threat Intel", desc: "State-sponsored attack analysis." },
                { title: "Vendor Mgt", desc: "Securing the supply chain." }
            ],
            speakers: [
                { name: "Sanjay Sahay", title: "Security Researcher", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
                { name: "Brijesh Singh", title: "Cyber Security IG", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Strategy", items: ["09:00 AM: Threat Landscape 2027", "02:00 PM: Budget Allocation"] },
                { day: "Day 2: Tactics", items: ["10:00 AM: Ransomware Negotiation", "03:00 PM: Zero Trust"] }
            ],
            sponsors: ["Cisco", "Fortinet", "Symantec"],
            testimonial: { quote: "High-level networking with the country's top security minds.", author: "Lt. Col. Roy" }
        },
        {
            id: 21, name: "DeFi Innovations Con", date: "Feb 18, 2027", category: "Blockchain", venue: "BCC, Goregaon, Mumbai",
            desc: "Next-gen decentralized finance, liquidity pools, and automated market makers.",
            image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "800+", progress1: "70%", speakers: "15+", progress2: "60%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Yield Farming", desc: "Math behind AMMs." },
                { title: "Auditing", desc: "Smart contract security protocols." },
                { title: "L2 Chains", desc: "Arbitrum and Optimism deployments." }
            ],
            speakers: [
                { name: "Hayden Adams", title: "Creator of Uniswap", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Stani Kulechov", title: "Founder, Aave", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Mechanics", items: ["10:00 AM: AMM Math", "02:00 PM: Flash Loans"] },
                { day: "Day 2: Security", items: ["09:00 AM: Preventing Hacks", "01:00 PM: L2 Architecture"] }
            ],
            sponsors: ["Uniswap", "Aave", "Chainlink"],
            testimonial: { quote: "Deepest technical dive into DeFi I've ever experienced.", author: "Karthik P." }
        },
        {
            id: 22, name: "AR/VR Immersive Web", date: "Feb 25, 2027", category: "Web Dev", venue: "India Habitat Centre, New Delhi",
            desc: "Building WebXR experiences, 3D commerce, and spatial computing interfaces.",
            image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "650+", progress1: "60%", speakers: "12+", progress2: "50%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Three.js", desc: "Rendering 3D models in the browser." },
                { title: "WebXR", desc: "Building VR for Oculus via web." },
                { title: "E-Commerce", desc: "Interactive product showcases." }
            ],
            speakers: [
                { name: "Mr.doob", title: "Creator of Three.js", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
                { name: "Sarah Drasner", title: "DX Developer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: 3D Web", items: ["09:00 AM: Three.js Basics", "02:00 PM: Shaders"] },
                { day: "Day 2: VR/AR", items: ["10:00 AM: WebXR API", "03:00 PM: Headset Testing"] }
            ],
            sponsors: ["Meta Quest", "Vercel", "Spline"],
            testimonial: { quote: "Took my frontend skills to the next dimension.", author: "Tanya M." }
        },
        {
            id: 23, name: "NLP Deep Dive", date: "Mar 05, 2027", category: "AI/ML", venue: "IIT Guwahati, Assam",
            desc: "Natural Language Processing, Transformer architectures, and RAG systems.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "1,200+", progress1: "85%", speakers: "18+", progress2: "70%", tracks: "3", progress3: "45%" },
            whyAttend: [
                { title: "Transformers", desc: "Attention mechanism math." },
                { title: "RAG Systems", desc: "Retrieval-Augmented Generation." },
                { title: "Vector DBs", desc: "Pinecone and Milvus integrations." }
            ],
            speakers: [
                { name: "Clem Delangue", title: "CEO, HuggingFace", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80" },
                { name: "Harrison Chase", title: "Creator of LangChain", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: Theory", items: ["09:00 AM: Attention is All You Need", "02:00 PM: RAG Architectures"] },
                { day: "Day 2: Build", items: ["10:00 AM: Langchain Apps", "03:00 PM: Vector DB Setup"] }
            ],
            sponsors: ["Pinecone", "LangChain", "OpenAI"],
            testimonial: { quote: "Built my own custom LLM chatbot completely from scratch.", author: "Pooja V." }
        },
        {
            id: 24, name: "Tech Leadership Summit", date: "Mar 12, 2027", category: "Management", venue: "Leela Palace, Bangalore",
            desc: "For CTOs, VPs of Engineering, and aspiring tech leaders.",
            image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
            stats: { attendees: "500+", progress1: "50%", speakers: "15+", progress2: "60%", tracks: "2", progress3: "30%" },
            whyAttend: [
                { title: "Scaling Teams", desc: "Hiring and retaining 10x devs." },
                { title: "Architecture", desc: "Monolith to Microservices decisions." },
                { title: "Culture", desc: "Fostering engineering excellence." }
            ],
            speakers: [
                { name: "Binny Bansal", title: "Founder, Paytm", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
                { name: "Rajan Anandan", title: "Co-founder, Flipkart", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
            ],
            schedule: [
                { day: "Day 1: People", items: ["09:00 AM: Engineering Ladders", "02:00 PM: Remote Culture"] },
                { day: "Day 2: Tech", items: ["10:00 AM: Tech Debt Mgt", "03:00 PM: Serverless Transition"] }
            ],
            sponsors: ["AWS", "Stripe", "Sequoia Capital"],
            testimonial: { quote: "Invaluable insights on managing large-scale tech organizations.", author: "Gaurav H." }
        }
    ];

    // --- 5. Global Wishlist Logic ---
    const toggleWishlist = (evId, btnElement) => {
        let userSession = JSON.parse(localStorage.getItem('userSession'));
        if (!userSession) {
            showToast("Please log in to wishlist events.", "error");
            const authModal = document.getElementById('auth-modal');
            if (authModal) authModal.classList.add('active');
            return;
        }

        if (!userSession.wishlist) userSession.wishlist = [];
        const idx = userSession.wishlist.indexOf(evId);

        if (idx > -1) {
            userSession.wishlist.splice(idx, 1);
            if(btnElement) {
                btnElement.classList.remove('active');
                btnElement.innerHTML = '♡';
            }
            showToast("Removed from Wishlist.");
        } else {
            userSession.wishlist.push(evId);
            if(btnElement) {
                btnElement.classList.add('active');
                btnElement.innerHTML = '♥';
            }
            showToast("Added to Wishlist!");
        }

        localStorage.setItem('userSession', JSON.stringify(userSession));

        let appUsers = JSON.parse(localStorage.getItem('appUsers')) || [];
        let uIdx = appUsers.findIndex(u => u.email === userSession.email);
        if (uIdx !== -1) {
            appUsers[uIdx].wishlist = userSession.wishlist;
            localStorage.setItem('appUsers', JSON.stringify(appUsers));
        }

        const countEl = document.getElementById('wishlist-count');
        if (countEl) countEl.innerText = userSession.wishlist.length;
    };


    // --- 6. Render Events in Listing Page ---
    const eventsGrid = document.getElementById('events-grid');
    if (eventsGrid && !document.getElementById('wishlist-grid') && !document.getElementById('registrations-grid')) { 
        function renderEvents(events) {
            eventsGrid.innerHTML = '';
            
            if (events.length === 0) {
                eventsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--secondary-color);">
                        <h3 class="spin-text" style="color: var(--text-color); margin-bottom: 1rem;">No Events Found</h3>
                        <p>We couldn't find any events matching your search or category filter. Try adjusting your criteria.</p>
                    </div>
                `;
                initSpinners();
                return;
            }

            let userSession = JSON.parse(localStorage.getItem('userSession'));
            let wishlist = userSession && userSession.wishlist ? userSession.wishlist : [];

            events.forEach(event => {
                const isWishlisted = wishlist.includes(event.id);
                const heartClass = isWishlisted ? 'wishlist-btn active' : 'wishlist-btn';
                const heartIcon = isWishlisted ? '♥' : '♡';

                const card = document.createElement('div');
                card.className = 'event-card glass focus-target';
                card.innerHTML = `
                    <button class="${heartClass}" data-id="${event.id}" title="Wishlist Event">${heartIcon}</button>
                    <span class="category">${event.category}</span>
                    <h3 class="spin-text">${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p style="margin: 10px 0;">${event.desc}</p>
                    <div style="display: flex; gap: 10px; margin-top: auto; padding-top: 15px;">
                        <a href="event-details.html?id=${event.id}" class="cta-btn" style="background: transparent; border: 1px solid var(--primary-color); color: var(--text-color); padding: 0.5rem 1rem; font-size: 0.9rem;">Details</a>
                        <a href="register.html?event=${event.id}" class="cta-btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Register</a>
                    </div>
                `;
                eventsGrid.appendChild(card);
            });
            initSpinners();
        }

        renderEvents(eventsData);

        const searchInput = document.getElementById('search-event');
        const categoryFilter = document.getElementById('filter-category');

        const filterEvents = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            
            const filtered = eventsData.filter(e => {
                const matchName = e.name.toLowerCase().includes(searchTerm);
                const matchCat = category === 'all' || e.category === category;
                return matchName && matchCat;
            });
            
            renderEvents(filtered);
        };
        
        searchInput.addEventListener('input', filterEvents);
        categoryFilter.addEventListener('change', filterEvents);

        eventsGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.wishlist-btn');
            if (btn) {
                e.preventDefault();
                const evId = parseInt(btn.getAttribute('data-id'));
                toggleWishlist(evId, btn);
            }
        });
    }

    // --- 7. Render Individual Event Page ---
    const detailContainer = document.getElementById('event-detail-content');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = parseInt(urlParams.get('id')) || 1;
        const event = eventsData.find(e => e.id === eventId);

        if (event) {
            let userSession = JSON.parse(localStorage.getItem('userSession'));
            let wishlist = userSession && userSession.wishlist ? userSession.wishlist : [];
            const isWishlisted = wishlist.includes(event.id);
            const heartClass = isWishlisted ? 'wishlist-btn-large active' : 'wishlist-btn-large';
            const heartIcon = isWishlisted ? '♥' : '♡';

            detailContainer.innerHTML = `
                <div class="glass focus-target" style="padding: 3rem; border-radius: 16px; margin-bottom: 3rem; display: flex; flex-wrap: wrap; gap: 3rem; align-items: center;">
                    <img src="${event.image}" alt="${event.name}" style="flex: 1; min-width: 300px; height: 350px; object-fit: cover; border-radius: 12px; border: 2px solid var(--border-color);">
                    <div style="flex: 1; min-width: 300px;">
                        <span class="category" style="background: rgba(196, 80, 106, 0.12); color: var(--accent-red); padding: 0.3rem 1rem; border-radius: 20px; font-weight: 600; text-transform: uppercase;">${event.category} | ${event.date}</span>
                        <h1 class="spin-text" style="font-size: 3rem; margin: 1rem 0;">${event.name}</h1>
                        <p style="font-size: 1.1rem; color: var(--secondary-color); margin-bottom: 2rem;">${event.desc}</p>
                        
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <a href="register.html?event=${event.id}" class="cta-btn" style="font-size: 1.1rem; padding: 1rem 2.5rem;">Register for Event</a>
                            <button class="${heartClass} detail-wishlist" data-id="${event.id}" title="Wishlist Event">${heartIcon}</button>
                        </div>
                    </div>
                </div>
                <div class="glass focus-target" style="padding: 2rem; margin-bottom: 3rem; text-align: center;">
                    <h2 class="spin-text section-title">Event Scale</h2>
                    <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 2rem;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div class="stat-ring" style="--progress: ${event.stats.progress1};"><span>${event.stats.attendees}</span></div>
                            <p style="margin-top: 1rem; font-weight: 600; color: var(--secondary-color);">Attendees</p>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div class="stat-ring" style="--progress: ${event.stats.progress2};"><span>${event.stats.speakers}</span></div>
                            <p style="margin-top: 1rem; font-weight: 600; color: var(--secondary-color);">Speakers</p>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div class="stat-ring" style="--progress: ${event.stats.progress3};"><span>${event.stats.tracks}</span></div>
                            <p style="margin-top: 1rem; font-weight: 600; color: var(--secondary-color);">Tracks</p>
                        </div>
                    </div>
                </div>
                <h2 class="spin-text section-title" style="text-align: center;">What You'll Get</h2>
                <div class="three-col-grid" style="margin-bottom: 3rem;">
                    ${event.whyAttend.map(w => `
                        <div class="glass feature-card focus-target">
                            <h3>${w.title}</h3>
                            <p>${w.desc}</p>
                        </div>
                    `).join('')}
                </div>
                <h2 class="spin-text section-title" style="text-align: center;">Featured Speakers</h2>
                <div class="speakers-grid" style="margin-bottom: 3rem;">
                    ${event.speakers.map(s => `
                        <div class="glass speaker-card focus-target" style="text-align: center;">
                            <img src="${s.img}" alt="${s.name}">
                            <h3 style="color: var(--text-color);">${s.name}</h3>
                            <p>${s.title}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="glass focus-target" style="padding: 2.5rem; margin-bottom: 3rem;">
                    <h2 class="spin-text section-title" style="text-align: center; margin-bottom: 2rem;">Schedule Overview</h2>
                    <div class="timeline-grid">
                        ${event.schedule.map(day => `
                            <div class="timeline-day">
                                <h3>${day.day}</h3>
                                <ul>
                                    ${day.items.map(item => `<li><strong>${item.split(': ')[0]}:</strong> ${item.split(': ')[1]}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass focus-target" style="padding: 2.5rem; margin-bottom: 3rem; display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
                    <div style="flex: 1; min-width: 300px;">
                        <h2 class="spin-text section-title" style="margin-bottom: 1rem;">Venue Location</h2>
                        <p style="font-size: 1.2rem; color: var(--text-color); font-weight: 600; margin-bottom: 0.5rem;">${event.venue}</p>
                        <p style="color: var(--secondary-color); margin-bottom: 1.5rem;">Join us on-site. Parking is available for VIP pass holders. Please arrive 30 minutes early for smooth check-in.</p>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}" target="_blank" class="cta-btn" style="padding: 0.6rem 1.5rem; font-size: 0.9rem;">Get Directions</a>
                    </div>
                    <div style="flex: 1; min-width: 300px; height: 300px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--card-shadow);">
                        <iframe 
                            src="https://maps.google.com/maps?q=${encodeURIComponent(event.venue)}&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style="border:0; filter: grayscale(15%) contrast(1.05);" 
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
                <h2 class="spin-text section-title" style="text-align: center;">Event Sponsors</h2>
                <div class="sponsors-strip glass focus-target" style="margin-bottom: 3rem;">
                    ${event.sponsors.map(sponsor => `<div class="sponsor-logo">${sponsor}</div>`).join('')}
                </div>
                <div class="glass focus-target" style="padding: 2rem; text-align: center; font-style: italic; color: var(--secondary-color);">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem; font-style: normal;">What Past Attendees Say</h3>
                    <p style="font-size: 1.2rem;">"${event.testimonial.quote}"</p>
                    <h4 style="margin-top: 1rem; font-style: normal;">- ${event.testimonial.author}</h4>
                </div>
            `;
            initSpinners();

            const detailWishlistBtn = detailContainer.querySelector('.detail-wishlist');
            if (detailWishlistBtn) {
                detailWishlistBtn.addEventListener('click', () => {
                    const evId = parseInt(detailWishlistBtn.getAttribute('data-id'));
                    toggleWishlist(evId, detailWishlistBtn);
                });
            }

        } else {
            detailContainer.innerHTML = `
                <div style="text-align:center; padding: 4rem; color: var(--secondary-color);">
                    <h2>Event not found.</h2>
                    <p style="margin-top: 1rem;"><a href="events.html" class="cta-btn">Back to Events</a></p>
                </div>
            `;
        }
    }

    // --- 8. Render Dedicated Wishlist Page ---
    const wishlistGrid = document.getElementById('wishlist-grid');
    if (wishlistGrid) {
        const renderWishlistPage = () => {
            let userSession = JSON.parse(localStorage.getItem('userSession'));
            
            if (!userSession || !userSession.wishlist || userSession.wishlist.length === 0) {
                wishlistGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--secondary-color);">
                        <h3 class="spin-text" style="color: var(--text-color); margin-bottom: 1rem;">Your Wishlist is Empty</h3>
                        <p>Browse events and click the heart icon to add them here.</p>
                        <a href="events.html" class="cta-btn" style="margin-top: 1.5rem;">Explore Events</a>
                    </div>
                `;
                initSpinners();
                return;
            }

            const wishlistedEvents = eventsData.filter(e => userSession.wishlist.includes(e.id));
            wishlistGrid.innerHTML = '';
            
            wishlistedEvents.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card glass focus-target';
                card.innerHTML = `
                    <button class="wishlist-btn active" data-id="${event.id}" title="Remove from Wishlist">♥</button>
                    <span class="category">${event.category}</span>
                    <h3 class="spin-text">${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p style="margin: 10px 0;">${event.desc}</p>
                    <div style="display: flex; gap: 10px; margin-top: auto; padding-top: 15px;">
                        <a href="event-details.html?id=${event.id}" class="cta-btn" style="background: transparent; border: 1px solid var(--primary-color); color: var(--text-color); padding: 0.5rem 1rem; font-size: 0.9rem;">Details</a>
                        <a href="register.html?event=${event.id}" class="cta-btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Register</a>
                    </div>
                `;
                wishlistGrid.appendChild(card);
            });
            initSpinners();
        };

        renderWishlistPage();

        wishlistGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.wishlist-btn');
            if (btn) {
                e.preventDefault();
                const evId = parseInt(btn.getAttribute('data-id'));
                toggleWishlist(evId, btn);
                renderWishlistPage(); 
            }
        });
    }

    // --- 9. Render Dedicated Registrations Page ---
    const registrationsGrid = document.getElementById('registrations-grid');
    if (registrationsGrid) {
        const renderRegistrationsPage = () => {
            let userSession = JSON.parse(localStorage.getItem('userSession'));
            
            if (!userSession) {
                registrationsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--secondary-color);">
                        <h3 class="spin-text" style="color: var(--text-color); margin-bottom: 1rem;">Please Sign In</h3>
                        <p>You need to be logged in to view your event registrations.</p>
                    </div>
                `;
                initSpinners();
                return;
            }

            let allRegistrations = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            let myRegistrations = allRegistrations.filter(reg => reg.email === userSession.email);

            if (myRegistrations.length === 0) {
                registrationsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--secondary-color);">
                        <h3 class="spin-text" style="color: var(--text-color); margin-bottom: 1rem;">No Registrations Found</h3>
                        <p>You haven't registered for any events yet. Secure your spot today!</p>
                        <a href="events.html" class="cta-btn" style="margin-top: 1.5rem;">Explore Events</a>
                    </div>
                `;
                initSpinners();
                return;
            }

            // Map registration data to the master events array
            const myEvents = myRegistrations.map(reg => {
                return eventsData.find(e => e.id === parseInt(reg.event));
            }).filter(Boolean); // Filter out any undefined matches

            registrationsGrid.innerHTML = '';
            
            myEvents.forEach(event => {
                let wishlist = userSession && userSession.wishlist ? userSession.wishlist : [];
                const isWishlisted = wishlist.includes(event.id);
                const heartClass = isWishlisted ? 'wishlist-btn active' : 'wishlist-btn';
                const heartIcon = isWishlisted ? '♥' : '♡';

                const card = document.createElement('div');
                card.className = 'event-card glass focus-target';
                card.innerHTML = `
                    <button class="${heartClass}" data-id="${event.id}" title="Wishlist Event">${heartIcon}</button>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                        <span class="category">${event.category}</span>
                        <span class="category" style="background: rgba(46, 204, 113, 0.12); color: #27AE60;">✓ Registered</span>
                    </div>
                    <h3 class="spin-text">${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p style="margin: 10px 0;">${event.desc}</p>
                    <div style="display: flex; gap: 10px; margin-top: auto; padding-top: 15px;">
                        <a href="event-details.html?id=${event.id}" class="cta-btn" style="background: transparent; border: 1px solid var(--primary-color); color: var(--text-color); padding: 0.5rem 1rem; font-size: 0.9rem;">View Event Details</a>
                    </div>
                `;
                registrationsGrid.appendChild(card);
            });
            initSpinners();
        };

        renderRegistrationsPage();

        registrationsGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.wishlist-btn');
            if (btn) {
                e.preventDefault();
                const evId = parseInt(btn.getAttribute('data-id'));
                toggleWishlist(evId, btn);
            }
        });
    }

    // --- 10. Registration Form Logic & Auto-Sync ---
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event');
        if(eventId) document.getElementById('event-select').value = eventId;

        regForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => input.classList.remove('input-error'));
        });

        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                college: document.getElementById('college'),
                event: document.getElementById('event-select')
            };

            let hasError = false;

            Object.values(inputs).forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('input-error');
                    hasError = true;
                }
            });

            if (hasError) {
                showToast("Please fill out all required fields.", "error");
                return;
            }

            const userData = { 
                name: inputs.name.value.trim(), 
                email: inputs.email.value.trim(), 
                college: inputs.college.value.trim(), 
                event: inputs.event.value, 
                date: new Date().toISOString() 
            };
            
            let userSession = JSON.parse(localStorage.getItem('userSession'));
            if (userSession && userSession.email === userData.email) {
                userSession.name = userData.name;
                userSession.college = userData.college;
                localStorage.setItem('userSession', JSON.stringify(userSession));
                
                let appUsers = JSON.parse(localStorage.getItem('appUsers')) || [];
                let userIndex = appUsers.findIndex(u => u.email === userData.email);
                if (userIndex !== -1) {
                    appUsers[userIndex].name = userData.name;
                    appUsers[userIndex].college = userData.college;
                    localStorage.setItem('appUsers', JSON.stringify(appUsers));
                }
            }

            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            users.push(userData);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            showToast(`Success! ${userData.name} has been registered.`);
            regForm.reset();
            
            if (userSession) {
                setTimeout(() => {
                    inputs.name.value = userSession.name;
                    inputs.email.value = userSession.email;
                    inputs.college.value = userSession.college;
                }, 500);
            }
        });
    }

    // --- 11. Page Transition Interceptor ---
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (!link) return;

        const targetUrl = link.getAttribute('href');
        const isTargetBlank = link.getAttribute('target') === '_blank';
        
        if (!targetUrl || targetUrl.startsWith('#') || isTargetBlank) return;

        e.preventDefault();
        const container = document.querySelector('.dull-container');
        if (container) container.classList.add('fade-out');
        else document.body.classList.add('fade-out');
        
        setTimeout(() => { window.location.href = targetUrl; }, 400); 
    });

    // --- 12. Interactive Features: Countdown & Scroll Slider ---
    const heroContainer = document.getElementById('hero-scroll-container');
    const heroTrack = document.getElementById('hero-track');
    const dotsContainer = document.getElementById('slider-dots');

    const countdownEl = document.getElementById('event-countdown');
    if (countdownEl) {
        const targetDate = new Date('Oct 12, 2026 09:00:00').getTime();
        
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                countdownEl.innerHTML = "Web3 Summit is Live!";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownEl.innerHTML = `Starts in: <strong>${days}d ${hours}h ${mins}m ${secs}s</strong>`;
        }, 1000);
    }

    if (heroContainer && heroTrack && dotsContainer) {
        const cursorGlow = document.getElementById('cursor-glow');
        if (cursorGlow) {
            heroContainer.addEventListener('mousemove', (e) => {
                const rect = heroContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                cursorGlow.style.left = `${x}px`;
                cursorGlow.style.top = `${y}px`;
            });
        }

        const featuredEvents = eventsData.slice(0, 4);
        featuredEvents.forEach(ev => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide glass focus-target';
            slide.innerHTML = `
                <img src="${ev.image}" alt="${ev.name}" class="hero-slide-img" draggable="false">
                <div class="hero-slide-content">
                    <h2 class="spin-text">${ev.name}</h2>
                    <p style="margin: 0.5rem 0 1rem; color: var(--secondary-color);">${ev.date} | ${ev.category}</p>
                    <a href="event-details.html?id=${ev.id}" class="cta-btn">View Details</a>
                </div>
            `;
            heroTrack.appendChild(slide);
        });

        const slides = Array.from(heroTrack.querySelectorAll('.hero-slide'));
        let currentIndex = 0;
        let autoScrollInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            const slideWidth = slides[0].clientWidth;
            heroTrack.scrollTo({ left: (slideWidth + 32) * index, behavior: 'smooth' });
            updateDots(index);
        }

        heroTrack.addEventListener('scroll', () => {
            const slideWidth = slides[0].clientWidth + 32;
            const scrollPosition = heroTrack.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
                currentIndex = newIndex;
                updateDots(currentIndex);
            }
        });

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                goToSlide(currentIndex);
            }, 4000); 
        }

        startAutoScroll();
        heroContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        heroContainer.addEventListener('mouseleave', startAutoScroll);
    }

    // --- 13. Full Authentication & Dropdown System ---
    const initAuth = () => {
        const modalHTML = `
            <div class="modal-overlay" id="auth-modal">
                <div class="modal-content glass">
                    <button class="modal-close" id="close-modal">&times;</button>
                    <h2 class="spin-text" id="auth-title" style="text-align: center; margin-bottom: 1.5rem;">Sign In</h2>
                    <form id="auth-form">
                        <div class="form-group auth-signup-only" style="display: none;">
                            <label>Full Name</label>
                            <input type="text" id="auth-name" placeholder="Full Name">
                        </div>
                        <div class="form-group auth-signup-only" style="display: none;">
                            <label>College / University</label>
                            <input type="text" id="auth-college" placeholder="E.g., Tech University">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="auth-email" placeholder="student@university.edu" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="auth-password" placeholder="••••••••" required>
                        </div>
                        <button type="submit" class="cta-btn" id="auth-submit-btn" style="width: 100%; margin-top: 1rem;">Sign In</button>
                    </form>
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--secondary-color);">
                        <span id="auth-toggle-text">Don't have an account?</span> 
                        <a href="#" id="auth-toggle-link" style="color: var(--primary-color); font-weight: 600;">Sign Up</a>
                    </p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        let isLoginMode = true;
        let appUsers = JSON.parse(localStorage.getItem('appUsers')) || [];

        const loginBtn = document.getElementById('login-btn');
        const authModal = document.getElementById('auth-modal');
        const closeModal = document.getElementById('close-modal');
        const authForm = document.getElementById('auth-form');
        const authTitle = document.getElementById('auth-title');
        const authToggleLink = document.getElementById('auth-toggle-link');
        const authToggleText = document.getElementById('auth-toggle-text');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const signupOnlyFields = document.querySelectorAll('.auth-signup-only');

        const updateNav = () => {
            let userSession = JSON.parse(localStorage.getItem('userSession'));
            const authSlot = document.getElementById('auth-nav-slot');
            const existingBtn = document.getElementById('login-btn');
            const existingDropdown = document.querySelector('.user-dropdown-container');

            if (userSession) {
                if (!userSession.wishlist) userSession.wishlist = [];

                if (existingBtn) existingBtn.style.display = 'none';
                
                const mainThemeToggle = document.getElementById('theme-toggle');
                if (mainThemeToggle) mainThemeToggle.style.display = 'none';

                if (!existingDropdown && authSlot) {
                    const container = document.createElement('div');
                    container.className = 'user-dropdown-container';

                    const avatar = document.createElement('div');
                    avatar.className = 'user-avatar';
                    avatar.innerText = userSession.name.charAt(0).toUpperCase();

                    const menu = document.createElement('div');
                    menu.className = 'user-dropdown-menu glass';
                    
                    const themeIcon = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';

                    menu.innerHTML = `
                        <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.5rem;">
                            <strong style="color: var(--text-color);">${userSession.name}</strong><br>
                            <small style="color: var(--secondary-color);">${userSession.email}</small>
                        </div>
                        <a href="#" class="dropdown-item">Account</a>
                        <a href="registrations.html" class="dropdown-item">Registrations</a>
                        <a href="wishlists.html" class="dropdown-item">Wishlist (<span id="wishlist-count">${userSession.wishlist.length}</span>)</a>
                        <button id="dropdown-theme-toggle" class="dropdown-item" style="width: 100%; text-align: left; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.95rem; border-bottom: 1px solid var(--border-color); color: var(--text-color);">
                            Toggle <span style="float: right; margin-right: 0.5rem;">${themeIcon}</span>
                        </button>
                        <button id="logout-btn" class="dropdown-item" style="color: var(--accent-red); width: 100%; text-align: left; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.95rem;">Sign Out</button>
                    `;

                    container.appendChild(avatar);
                    container.appendChild(menu);
                    authSlot.appendChild(container);

                    avatar.addEventListener('click', (e) => {
                        e.stopPropagation();
                        menu.classList.toggle('active');
                    });

                    document.addEventListener('click', (e) => {
                        if (!container.contains(e.target)) {
                            menu.classList.remove('active');
                        }
                    });

                    const dropThemeBtn = document.getElementById('dropdown-theme-toggle');
                    if (dropThemeBtn) {
                        dropThemeBtn.addEventListener('click', (e) => {
                            e.stopPropagation(); 
                            toggleTheme();
                        });
                    }

                    document.getElementById('logout-btn').addEventListener('click', () => {
                        localStorage.removeItem('userSession');
                        showToast("Logged out successfully.", "success");
                        setTimeout(() => window.location.reload(), 800);
                    });
                } else if (existingDropdown) {
                    const countEl = document.getElementById('wishlist-count');
                    if (countEl) countEl.innerText = userSession.wishlist.length;
                }

                const regName = document.getElementById('name');
                const regEmail = document.getElementById('email');
                const regCollege = document.getElementById('college');
                if(regName && !regName.value) regName.value = userSession.name;
                if(regEmail && !regEmail.value) regEmail.value = userSession.email;
                if(regCollege && !regCollege.value) regCollege.value = userSession.college;

            } else {
                if (existingBtn) existingBtn.style.display = 'inline-block';
                if (existingDropdown) existingDropdown.remove();
                
                const mainThemeToggle = document.getElementById('theme-toggle');
                if (mainThemeToggle) mainThemeToggle.style.display = 'flex';
            }
        };

        updateNav();

        authToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            
            if (isLoginMode) {
                authTitle.innerText = "Sign In";
                authSubmitBtn.innerText = "Sign In";
                authToggleText.innerText = "Don't have an account?";
                authToggleLink.innerText = "Sign Up";
                signupOnlyFields.forEach(f => {
                    f.style.display = 'none';
                    f.querySelector('input').removeAttribute('required');
                });
            } else {
                authTitle.innerText = "Create Account";
                authSubmitBtn.innerText = "Sign Up";
                authToggleText.innerText = "Already have an account?";
                authToggleLink.innerText = "Sign In";
                signupOnlyFields.forEach(f => {
                    f.style.display = 'flex';
                    f.querySelector('input').setAttribute('required', 'true');
                });
            }
            initSpinners(); 
        });

        if(loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                authModal.classList.add('active');
            });
        }
        if(closeModal) {
            closeModal.addEventListener('click', () => authModal.classList.remove('active'));
        }

        if(authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('auth-email').value.trim();
                const password = document.getElementById('auth-password').value;

                authSubmitBtn.innerText = 'Processing...';
                
                setTimeout(() => {
                    if (isLoginMode) {
                        const existingUser = appUsers.find(u => u.email === email);
                        if (existingUser && existingUser.password === password) {
                            let userSession = { 
                                name: existingUser.name, 
                                email: existingUser.email, 
                                college: existingUser.college,
                                wishlist: existingUser.wishlist || []
                            };
                            localStorage.setItem('userSession', JSON.stringify(userSession));
                            authModal.classList.remove('active');
                            showToast(`Welcome back, ${existingUser.name.split(' ')[0]}!`);
                            setTimeout(() => window.location.reload(), 800);
                        } else {
                            showToast("Invalid email or password.", "error");
                            authSubmitBtn.innerText = "Sign In";
                        }
                    } else {
                        const existingUser = appUsers.find(u => u.email === email);
                        if (existingUser) {
                            showToast("An account with this email already exists.", "error");
                            authSubmitBtn.innerText = "Sign Up";
                            return;
                        }
                        
                        const name = document.getElementById('auth-name').value.trim();
                        const college = document.getElementById('auth-college').value.trim();
                        
                        const newUser = { name, email, college, password, wishlist: [] };
                        appUsers.push(newUser);
                        localStorage.setItem('appUsers', JSON.stringify(appUsers));
                        
                        let userSession = { name, email, college, wishlist: [] };
                        localStorage.setItem('userSession', JSON.stringify(userSession));
                        
                        authModal.classList.remove('active');
                        showToast(`Account created successfully! Welcome, ${name.split(' ')[0]}!`);
                        setTimeout(() => window.location.reload(), 800);
                    }
                }, 800);
            });
        }
    };
    
    initAuth();

});