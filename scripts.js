// Placeholder for client-side scripts
document.addEventListener("DOMContentLoaded", function() {
    console.log("Sciatius Bulk Emailer loaded");
});

    // index webpage start

// Tabs Switching
        const tabBulk = document.getElementById('tab-bulk');
        const tabCompany = document.getElementById('tab-company');
        const contentBulk = document.getElementById('content-bulk');
        const contentCompany = document.getElementById('content-company');

        tabBulk.addEventListener('click', () => {
            tabBulk.classList.add('active');
            tabCompany.classList.remove('active');
            contentBulk.style.display = 'block';
            contentCompany.style.display = 'none';
            tabBulk.style.background = '#667eea'; tabBulk.style.color = '#fff';
            tabCompany.style.background = '#031119'; tabCompany.style.color = '#e3a119';
        });

        tabCompany.addEventListener('click', () => {
            tabCompany.classList.add('active');
            tabBulk.classList.remove('active');
            contentBulk.style.display = 'none';
            contentCompany.style.display = 'block';
            tabCompany.style.background = '#667eea'; tabCompany.style.color = '#fff';
            tabBulk.style.background = '#031119'; tabBulk.style.color = '#e3a119';
        });

        // Sidebar feature click tooltip
        const lockedFeatures = document.querySelectorAll('.feature-list li');
        lockedFeatures.forEach(feature => {
            feature.addEventListener('click', function(e) {
                e.preventDefault();
                const tooltip = document.createElement('div');
                tooltip.textContent = "Please login to access this feature";
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0,0,0,0.8);
                    color: #fff;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    top: -40px;
                    right: 0;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                feature.appendChild(tooltip);
                requestAnimationFrame(() => { tooltip.style.opacity = '1'; });
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => { feature.removeChild(tooltip); }, 300);
                }, 1500);
            });
        });

         // index webpage end

          // login webpage start
          
           // Initialize 3D background animation
    function initBackgroundAnimation() {
      const container = document.getElementById('bg-animation');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
      initBackgroundAnimation();

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const loginBtn = document.getElementById('login-btn');

      const validCredentials = {
        'admin@sciatiusresearch.com': 'admin123',
        'user@sciatiusresearch.com': 'user123',
        'demo@sciatiusresearch.com': 'demo123'
      };

      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
          alert('Please fill in all fields');
          return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address');
          return;
        }

        loginBtn.textContent = 'Signing In...';
        setTimeout(() => {
          if (validCredentials[email] && validCredentials[email] === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('loginTime', new Date().toISOString());
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
          } else {
            alert('Invalid email or password. Try demo@sciatiusresearch.com / demo123');
          }
          loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        }, 1500);
      });

      document.getElementById('signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Demo Account Info:\nEmail: demo@sciatiusresearch.com\nPassword: demo123\n\nOr try:\nadmin@sciatiusresearch.com / admin123');
      });

      document.getElementById('forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('For demo purposes, please use:\ndemo@sciatiusresearch.com / demo123');
      });

      if (localStorage.getItem('isLoggedIn') === 'true') {
        alert('Already logged in! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
      }

      emailInput.value = 'demo@sciatiusresearch.com';
      passwordInput.value = 'demo123';
    });
          
          // login webpage end

          // dashboard webpage start

          // Check authentication
        function checkAuth() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Please login to access the dashboard');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Initialize dashboard
        function initDashboard() {
            if (!checkAuth()) return;

            // Load user info
            loadUserInfo();
            loadStats();
            loadRecentActivity();
        }

        // Load user information
        function loadUserInfo() {
                        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
            const userName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
            
            document.getElementById('user-email').textContent = userEmail;
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-avatar').textContent = userName.charAt(0);
            document.getElementById('welcome-title').textContent = `Welcome back, ${userName}!`;
        }

        // Load dashboard statistics
        function loadStats() {
            // Get stored data
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
            
            // Calculate stats
            const totalContacts = contacts.length;
            const totalCampaigns = campaigns.length;
            const successRate = campaigns.length > 0 ? Math.round(campaigns.filter(c => c.status === 'sent').length / campaigns.length * 100) : 0;
            
            // Update UI with animation
            animateNumber('total-contacts', totalContacts);
            animateNumber('total-campaigns', totalCampaigns);
            animateNumber('success-rate', successRate, '%');
        }

        // Animate numbers
        function animateNumber(elementId, targetValue, suffix = '') {
            const element = document.getElementById(elementId);
            const startValue = 0;
            const duration = 1000;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
                
                element.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }

        // Load recent activity
        function loadRecentActivity() {
            const activities = [
                {
                    icon: 'fas fa-upload',
                    title: 'Contact List Uploaded',
                    description: 'Successfully imported 150 contacts',
                    time: '2 hours ago'
                },
                {
                    icon: 'fas fa-rocket',
                    title: 'Campaign Created',
                    description: 'New product launch campaign ready',
                    time: '5 hours ago'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'Report Generated',
                    description: 'Monthly performance report available',
                    time: '1 day ago'
                },
                {
                    icon: 'fas fa-envelope',
                    title: 'Emails Sent',
                    description: 'Newsletter sent to 500 subscribers',
                    time: '2 days ago'
                }
            ];

            const activityList = document.getElementById('activity-list');
            activityList.innerHTML = '';

            activities.forEach((activity, index) => {
                const activityItem = document.createElement('li');
                activityItem.className = 'activity-item';
                activityItem.style.animationDelay = `${index * 0.1}s`;
                
                activityItem.innerHTML = `
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <h4>${activity.title}</h4>
                        <p>${activity.description}</p>
                    </div>
                    <div class="activity-time">${activity.time}</div>
                `;
                
                activityList.appendChild(activityItem);
            });
        }

        // Navigation function
        function navigateTo(url) {
            window.location.href = url;
        }

        // Logout functionality
        document.addEventListener('DOMContentLoaded', function() {
            initDashboard();

            // Logout button
            document.getElementById('logout-btn').addEventListener('click', function() {
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('loginTime');
                    window.location.href = 'logout.html';
                }
            });

            // Add hover effects to feature cards
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Update login time
            localStorage.setItem('lastActivity', new Date().toISOString());
        });

        // Auto-logout after inactivity (30 minutes)
        let inactivityTimer;
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                alert('Session expired due to inactivity. Please login again.');
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }, 30 * 60 * 1000); // 30 minutes
        }

        // Track user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetInactivityTimer, true);
        });

        // Initialize inactivity timer
        resetInactivityTimer();

          // dashboard webpage end
           

          // upload contacts webpage start

          // Check authentication
        function checkAuth() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Please login to access this page');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            if (!checkAuth()) return;

            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');
            const uploadBtn = document.getElementById('upload-btn');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');
            const resultsSection = document.getElementById('results-section');

            // File upload handlers
            uploadBtn.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('click', () => fileInput.click());

            // Drag and drop handlers
            uploadArea.addEventListener('dragover', handleDragOver);
            uploadArea.addEventListener('dragleave', handleDragLeave);
            uploadArea.addEventListener('drop', handleDrop);

            // File input change
            fileInput.addEventListener('change', handleFileSelect);

            function handleDragOver(e) {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            }

            function handleDragLeave(e) {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
            }

            function handleDrop(e) {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    processFile(files[0]);
                }
            }

            function handleFileSelect(e) {
                const file = e.target.files[0];
                if (file) {
                    processFile(file);
                }
            }

            function processFile(file) {
                if (!file.name.toLowerCase().endsWith('.csv')) {
                    alert('Please select a CSV file');
                    return;
                }

                // Show progress
                uploadBtn.classList.add('processing');
                uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                progressContainer.style.display = 'block';

                // Simulate file processing
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 20;
                    if (progress > 100) progress = 100;
                    
                    progressBar.style.width = progress + '%';
                    progressBar.textContent = Math.round(progress) + '%';
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            readCSVFile(file);
                        }, 500);
                    }
                }, 200);
            }

            function readCSVFile(file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const csv = e.target.result;
                    const contacts = parseCSV(csv);
                    displayResults(contacts);
                };
                reader.readAsText(file);
            }

            function parseCSV(csv) {
                const lines = csv.split('\n').filter(line => line.trim());
                const headers = lines[0].split(',').map(h => h.trim());
                const contacts = [];

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    if (values.length >= headers.length) {
                        const contact = {};
                        headers.forEach((header, index) => {
                            contact[header] = values[index] || '';
                        });
                        
                        // Validate email
                        contact.isValid = isValidEmail(contact.email || '');
                        contacts.push(contact);
                    }
                }

                return contacts;
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function displayResults(contacts) {
                const validContacts = contacts.filter(c => c.isValid);
                const invalidContacts = contacts.filter(c => !c.isValid);
                const successRate = contacts.length > 0 ? Math.round((validContacts.length / contacts.length) * 100) : 0;

                // Update statistics
                animateNumber('total-uploaded', contacts.length);
                animateNumber('valid-emails', validContacts.length);
                animateNumber('invalid-emails', invalidContacts.length);
                animateNumber('success-rate', successRate, '%');

                // Populate table
                populateTable(contacts);

                // Store contacts in localStorage
                const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                const allContacts = [...existingContacts, ...validContacts];
                localStorage.setItem('contacts', JSON.stringify(allContacts));

                // Show results section
                setTimeout(() => {
                    resultsSection.style.display = 'block';
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }, 500);

                // Reset upload section
                uploadBtn.classList.remove('processing');
                uploadBtn.innerHTML = '<i class="fas fa-file-upload"></i> Select File';
                progressContainer.style.display = 'none';
                progressBar.style.width = '0%';
            }

            function populateTable(contacts) {
                const tbody = document.getElementById('contacts-table-body');
                tbody.innerHTML = '';

                contacts.forEach((contact, index) => {
                    const row = document.createElement('tr');
                    row.style.animationDelay = `${index * 0.05}s`;
                    
                    row.innerHTML = `
                        <td>${contact.email || 'N/A'}</td>
                        <td>${(contact.first_name || '') + ' ' + (contact.last_name || '')}</td>
                        <td>${contact.company || 'N/A'}</td>
                        <td>
                            <span class="status-badge ${contact.isValid ? 'status-valid' : 'status-invalid'}">
                                ${contact.isValid ? 'Valid' : 'Invalid'}
                            </span>
                        </td>
                    `;
                    
                    tbody.appendChild(row);
                });
            }

            function animateNumber(elementId, targetValue, suffix = '') {
                const element = document.getElementById(elementId);
                const startValue = 0;
                const duration = 1000;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
                    
                    element.textContent = currentValue + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                
                requestAnimationFrame(update);
            }

            // Download valid contacts
            document.getElementById('download-valid').addEventListener('click', function() {
                const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                if (contacts.length === 0) {
                    alert('No valid contacts to download');
                    return;
                }

                const csv = convertToCSV(contacts);
                downloadCSV(csv, 'valid-contacts.csv');
            });

            function convertToCSV(contacts) {
                if (contacts.length === 0) return '';
                
                const headers = Object.keys(contacts[0]).filter(key => key !== 'isValid');
                const csvContent = [
                    headers.join(','),
                    ...contacts.map(contact => 
                        headers.map(header => contact[header] || '').join(',')
                    )
                ].join('\n');
                
                return csvContent;
            }

            function downloadCSV(csv, filename) {
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }

            // Upload another file
            document.getElementById('upload-another').addEventListener('click', function() {
                resultsSection.style.display = 'none';
                fileInput.value = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

           // upload contacts webpage end 


            // create campaign webpage start

            // Check authentication
        function checkAuth() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Please login to access this page');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Campaign creation state
        let currentStep = 1;
        let campaignData = {
            template: '',
            content: '',
            name: '',
            subject: '',
            senderName: '',
            senderEmail: '',
            sendDate: '',
            sendTime: '',
            targetList: ''
        };

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            if (!checkAuth()) return;

            initializeSteps();
            initializeTemplateSelection();
            initializeDragAndDrop();
            initializePersonalizationTags();
            initializeNavigation();
            setDefaultDateTime();
        });

        function initializeSteps() {
            updateStepDisplay();
        }

        function initializeTemplateSelection() {
            const templateCards = document.querySelectorAll('.template-card');
            templateCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selection from other cards
                    templateCards.forEach(c => c.classList.remove('selected'));
                    // Select current card
                    this.classList.add('selected');
                    campaignData.template = this.dataset.template;
                    
                    // Enable next button
                    document.getElementById('next-btn').disabled = false;
                });
            });
        }

        function initializeDragAndDrop() {
            const emailCanvas = document.getElementById('email-canvas');
            const toolbarBtns = document.querySelectorAll('.toolbar-btn');
            
            // Toolbar button clicks
            toolbarBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const elementType = this.dataset.element;
                    addElement(elementType);
                });
            });

            // Make existing items draggable
            initializeDraggableItems();

            function addElement(type) {
                const newElement = document.createElement('div');
                newElement.className = 'drag-item';
                newElement.draggable = true;
                
                switch (type) {
                    case 'text':
                        newElement.innerHTML = '<p>New text element - click to edit</p>';
                        break;
                    case 'image':
                        newElement.innerHTML = '<div style="background: rgba(255, 255, 255, 0.1); padding: 2rem; text-align: center; border-radius: 5px;"><i class="fas fa-image" style="font-size: 2rem; color: #ccc;"></i><br>Image placeholder</div>';
                        break;
                    case 'button':
                        newElement.innerHTML = '<div style="text-align: center;"><button style="background: linear-gradient(135deg, #e3a119 0%, #f7c948 100%); color: white; padding: 1rem 2rem; border: none; border-radius: 5px;">Call to Action</button></div>';
                        break;
                    case 'divider':
                        newElement.innerHTML = '<hr style="border: 1px solid rgba(255, 255, 255, 0.2); margin: 1rem 0;">';
                        break;
                }
                
                emailCanvas.appendChild(newElement);
                initializeDraggableItems();
            }

            function initializeDraggableItems() {
                const dragItems = emailCanvas.querySelectorAll('.drag-item');
                dragItems.forEach(item => {
                    item.addEventListener('dragstart', handleDragStart);
                    item.addEventListener('dragend', handleDragEnd);
                    item.addEventListener('click', handleEdit);
                });

                emailCanvas.addEventListener('dragover', handleDragOver);
                emailCanvas.addEventListener('drop', handleDrop);
            }

            function handleDragStart(e) {
                e.dataTransfer.setData('text/html', this.outerHTML);
                this.classList.add('dragging');
            }

            function handleDragEnd(e) {
                this.classList.remove('dragging');
            }

            function handleDragOver(e) {
                e.preventDefault();
            }

            function handleDrop(e) {
                e.preventDefault();
                const draggedElement = document.querySelector('.dragging');
                if (draggedElement) {
                    const rect = emailCanvas.getBoundingClientRect();
                    const afterElement = getDragAfterElement(emailCanvas, e.clientY);
                    
                    if (afterElement == null) {
                        emailCanvas.appendChild(draggedElement);
                    } else {
                        emailCanvas.insertBefore(draggedElement, afterElement);
                    }
                }
            }

            function getDragAfterElement(container, y) {
                const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];
                
                return draggableElements.reduce((closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                }, { offset: Number.NEGATIVE_INFINITY }).element;
            }

            function handleEdit(e) {
                e.preventDefault();
                const content = prompt('Edit content:', this.textContent || this.innerHTML);
                if (content !== null) {
                    if (this.querySelector('p')) {
                        this.querySelector('p').textContent = content;
                    } else {
                        this.innerHTML = content;
                    }
                }
            }
        }

        function initializePersonalizationTags() {
            const tags = document.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.addEventListener('click', function() {
                    const tagText = this.dataset.tag;
                    
                    // Simple way to insert tag - in a real app, you'd track cursor position
                    const lastEditedElement = document.querySelector('.drag-item:last-child');
                    if (lastEditedElement) {
                        lastEditedElement.innerHTML += ' ' + tagText;
                    }
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                });
            });
        }

        function initializeNavigation() {
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            prevBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStepDisplay();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (validateCurrentStep()) {
                    if (currentStep < 4) {
                        currentStep++;
                        updateStepDisplay();
                    } else {
                        launchCampaign();
                    }
                }
            });
        }

        function updateStepDisplay() {
            // Update step indicators
            const steps = document.querySelectorAll('.step');
            steps.forEach((step, index) => {
                const stepNumber = index + 1;
                step.classList.remove('active', 'completed');
                
                if (stepNumber === currentStep) {
                    step.classList.add('active');
                } else if (stepNumber < currentStep) {
                    step.classList.add('completed');
                }
            });

            // Show/hide form sections
            const sections = document.querySelectorAll('.form-section');
            sections.forEach((section, index) => {
                section.classList.remove('active');
                if (index === currentStep - 1) {
                    section.classList.add('active');
                }
            });

            // Update navigation buttons
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            
            prevBtn.disabled = currentStep === 1;
            
            if (currentStep === 4) {
                nextBtn.innerHTML = '<i class="fas fa-rocket"></i> Launch Campaign';
                nextBtn.classList.add('btn-success');
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
                nextBtn.classList.remove('btn-success');
            }

            // Update campaign summary on step 4
            if (currentStep === 4) {
                updateCampaignSummary();
            }
        }

        function validateCurrentStep() {
            switch (currentStep) {
                case 1:
                    if (!campaignData.template) {
                        alert('Please select a template');
                        return false;
                    }
                    break;
                case 2:
                    // Content is optional for demo
                    campaignData.content = document.getElementById('email-canvas').innerHTML;
                    break;
                case 3:
                    const requiredFields = ['campaign-name', 'subject-line', 'sender-name', 'sender-email', 'send-date', 'send-time', 'target-list'];
                    for (const field of requiredFields) {
                        const element = document.getElementById(field);
                        if (!element.value) {
                            alert(`Please fill in ${element.previousElementSibling.textContent}`);
                            element.focus();
                            return false;
                        }
                        campaignData[field.replace('-', '')] = element.value;
                    }
                    break;
            }
            return true;
        }

        function updateCampaignSummary() {
            const summary = document.getElementById('campaign-summary');
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            
            summary.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                    <div><strong>Campaign Name:</strong> ${campaignData.campaignname || 'Not set'}</div>
                    <div><strong>Subject Line:</strong> ${campaignData.subjectline || 'Not set'}</div>
                    <div><strong>Template:</strong> ${campaignData.template || 'Not selected'}</div>
                    <div><strong>Sender:</strong> ${campaignData.sendername || 'Not set'}</div>
                    <div><strong>Send Date:</strong> ${campaignData.senddate || 'Not set'}</div>
                    <div><strong>Send Time:</strong> ${campaignData.sendtime || 'Not set'}</div>
                    <div><strong>Recipients:</strong> ${contacts.length} contacts</div>
                    <div><strong>Status:</strong> Ready to launch</div>
                </div>
            `;
        }

        function setDefaultDateTime() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            document.getElementById('send-date').value = tomorrow.toISOString().split('T')[0];
            document.getElementById('send-time').value = '09:00';
            document.getElementById('sender-name').value = 'Sciatius Research';
            document.getElementById('sender-email').value = 'noreply@sciatiusresearch.com';
        }

        function launchCampaign() {
            // Save campaign data
            const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
            const newCampaign = {
                id: Date.now(),
                ...campaignData,
                createdAt: new Date().toISOString(),
                status: 'scheduled',
                sent: 0,
                delivered: 0,
                opened: 0,
                clicked: 0
            };
            
            campaigns.push(newCampaign);
            localStorage.setItem('campaigns', JSON.stringify(campaigns));
            
            // Show success modal
            document.getElementById('success-modal').style.display = 'block';
            
            // Simulate sending (in real app, this would be handled by backend)
            setTimeout(() => {
                newCampaign.status = 'sent';
                newCampaign.sent = JSON.parse(localStorage.getItem('contacts') || '[]').length;
                newCampaign.delivered = Math.floor(newCampaign.sent * 0.95);
                newCampaign.opened = Math.floor(newCampaign.delivered * 0.25);
                newCampaign.clicked = Math.floor(newCampaign.opened * 0.15);
                localStorage.setItem('campaigns', JSON.stringify(campaigns));
            }, 2000);
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('success-modal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });


              // create campaign webpage end

              // view temp webpage start
              
               // Check authentication
        function checkAuth() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Please login to access this page');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        // Template data
        const templates = [
            {
                id: 1,
                name: 'Modern Newsletter',
                description: 'Clean and professional newsletter template perfect for company updates and announcements.',
                category: 'newsletter',
                industry: 'technology',
                icon: 'fas fa-newspaper',
                rating: 5,
                popularity: 95,
                bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            {
                id: 2,
                name: 'Flash Sale Promotion',
                description: 'Eye-catching promotional template designed to drive immediate action and boost sales.',
                category: 'promotional',
                industry: 'retail',
                icon: 'fas fa-bolt',
                rating: 4,
                popularity: 88,
                bgGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)'
            },
            {
                id: 3,
                name: 'Event Invitation',
                description: 'Elegant event invitation template suitable for webinars, conferences, and corporate events.',
                category: 'event',
                industry: 'technology',
                icon: 'fas fa-calendar-alt',
                rating: 5,
                popularity: 82,
                bgGradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
            },
            {
                id: 4,
                name: 'Welcome Email',
                description: 'Warm and engaging welcome email template to onboard new subscribers and customers.',
                category: 'transactional',
                industry: 'technology',
                icon: 'fas fa-hand-paper',
                rating: 4,
                popularity: 90,
                bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            },
            {
                id: 5,
                name: 'Product Launch',
                description: 'Dynamic product launch template that showcases new products with compelling visuals.',
                category: 'promotional',
                industry: 'technology',
                icon: 'fas fa-rocket',
                rating: 5,
                popularity: 85,
                bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            },
            {
                id: 6,
                name: 'Healthcare Newsletter',
                description: 'Professional healthcare newsletter template for medical practices and health organizations.',
                category: 'newsletter',
                industry: 'healthcare',
                icon: 'fas fa-heartbeat',
                rating: 4,
                popularity: 75,
                bgGradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
            },
            {
                id: 7,
                name: 'Financial Report',
                description: 'Clean and trustworthy template for financial services and investment updates.',
                category: 'newsletter',
                industry: 'finance',
                icon: 'fas fa-chart-line',
                rating: 5,
                popularity: 78,
                bgGradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
            },
            {
                id: 8,
                name: 'Seasonal Sale',
                description: 'Festive promotional template perfect for holiday and seasonal marketing campaigns.',
                category: 'promotional',
                industry: 'retail',
                icon: 'fas fa-gift',
                rating: 4,
                popularity: 92,
                bgGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
            }
        ];

        let filteredTemplates = [...templates];
        let currentTemplate = null;

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            if (!checkAuth()) return;

            setTimeout(() => {
                loadTemplates();
                initializeFilters();
                initializeSearch();
                initializeSort();
            }, 1000); // Simulate loading
        });

        function loadTemplates() {
            const grid = document.getElementById('templates-grid');
            grid.innerHTML = '';

            if (filteredTemplates.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #ccc;">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>No templates found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
                return;
            }

            filteredTemplates.forEach((template, index) => {
                const templateCard = document.createElement('div');
                templateCard.className = 'template-card';
                templateCard.style.animationDelay = `${index * 0.1}s`;
                templateCard.style.setProperty('--template-bg', template.bgGradient);
                
                templateCard.innerHTML = `
                    <div class="template-preview">
                        <div class="template-icon">
                            <i class="${template.icon}"></i>
                        </div>
                    </div>
                    <div class="template-info">
                        <div class="template-meta">
                            <span class="template-category">${template.category}</span>
                            <div class="template-rating">
                                ${'★'.repeat(template.rating)}${'☆'.repeat(5 - template.rating)}
                            </div>
                        </div>
                        <h3>${template.name}</h3>
                        <p>${template.description}</p>
                        <div class="template-actions">
                            <button class="template-btn btn-preview" onclick="previewTemplate(${template.id})">
                                <i class="fas fa-eye"></i> Preview
                            </button>
                            <button class="template-btn btn-use" onclick="useTemplateDirectly(${template.id})">
                                <i class="fas fa-rocket"></i> Use Template
                            </button>
                        </div>
                    </div>
                `;

                grid.appendChild(templateCard);
            });

            // Add 3D hover effects
            const cards = grid.querySelectorAll('.template-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotateY(0) scale(1)';
                });
            });
        }

        function initializeFilters() {
            const filterOptions = document.querySelectorAll('.filter-option');
            
            filterOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from siblings
                    this.parentElement.querySelectorAll('.filter-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    
                    // Add active class to clicked option
                    this.classList.add('active');
                    
                    applyFilters();
                });
            });
        }

        function initializeSearch() {
            const searchInput = document.getElementById('template-search');
            
            searchInput.addEventListener('input', function() {
                applyFilters();
            });
        }

        function initializeSort() {
            const sortSelect = document.getElementById('sort-select');
            
            sortSelect.addEventListener('change', function() {
                sortTemplates(this.value);
                loadTemplates();
            });
        }

        function applyFilters() {
            const searchTerm = document.getElementById('template-search').value.toLowerCase();
            const activeCategory = document.querySelector('.filter-option[data-filter].active')?.dataset.filter || 'all';
            const activeIndustry = document.querySelector('.filter-option[data-industry].active')?.dataset.industry || 'all';
            
            filteredTemplates = templates.filter(template => {
                const matchesSearch = template.name.toLowerCase().includes(searchTerm) || 
                                    template.description.toLowerCase().includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
                const matchesIndustry = activeIndustry === 'all' || template.industry === activeIndustry;
                
                return matchesSearch && matchesCategory && matchesIndustry;
            });
            
            loadTemplates();
        }

        function sortTemplates(sortBy) {
            switch (sortBy) {
                case 'popular':
                    filteredTemplates.sort((a, b) => b.popularity - a.popularity);
                    break;
                case 'newest':
                    filteredTemplates.sort((a, b) => b.id - a.id);
                    break;
                case 'alphabetical':
                    filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'rating':
                    filteredTemplates.sort((a, b) => b.rating - a.rating);
                    break;
            }
        }

        function previewTemplate(templateId) {
            const template = templates.find(t => t.id === templateId);
            if (!template) return;
            
            currentTemplate = template;
            
            document.getElementById('modal-title').textContent = template.name;
            document.getElementById('modal-preview').innerHTML = `
                <div class="template-icon" style="color: ${template.bgGradient}">
                    <i class="${template.icon}"></i>
                </div>
                <h3>${template.name}</h3>
                <p style="margin-bottom: 2rem;">${template.description}</p>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: left;">
                    <h4 style="color: #e3a119; margin-bottom: 1rem;">Template Features:</h4>
                    <ul style="color: #ccc; line-height: 1.8;">
                        <li>✓ Responsive design for all devices</li>
                        <li>✓ Customizable colors and fonts</li>
                        <li>✓ Pre-built content blocks</li>
                        <li>✓ Social media integration</li>
                        <li>✓ A/B testing ready</li>
                        <li>✓ GDPR compliant</li>
                    </ul>
                </div>
            `;
            
            document.getElementById('preview-modal').style.display = 'block';
        }

        function useTemplate() {
            if (currentTemplate) {
                // Store selected template
                localStorage.setItem('selectedTemplate', JSON.stringify(currentTemplate));
                
                // Redirect to campaign creation
                window.location.href = 'create-campaign.html';
            }
        }

         function useTemplateDirectly(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (template) {
        localStorage.setItem('selectedTemplate', JSON.stringify(template));
        window.location.href = 'create-campaign.html';
    }
}

function closeModal() {
    document.getElementById('preview-modal').style.display = 'none';
    currentTemplate = null;
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('preview-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

              // view temp webpage end

        // view reports webpage start

       // Check authentication
        function checkAuth() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                alert('Please login to access this page');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        let performanceChart, engagementChart;

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            if (!checkAuth()) return;

            setDefaultDateRange();
            loadReportsData();
            initializeCharts();
            loadCampaignsTable();
        });

        function setDefaultDateRange() {
            const today = new Date();
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);
            
            document.getElementById('end-date').value = today.toISOString().split('T')[0];
            document.getElementById('start-date').value = thirtyDaysAgo.toISOString().split('T')[0];
        }

        function loadReportsData() {
            const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            
            // Calculate aggregate statistics
            const totalSent = campaigns.reduce((sum, campaign) => sum + (campaign.sent || 0), 0);
            const totalDelivered = campaigns.reduce((sum, campaign) => sum + (campaign.delivered || 0), 0);
            const totalOpened = campaigns.reduce((sum, campaign) => sum + (campaign.opened || 0), 0);
            const totalClicked = campaigns.reduce((sum, campaign) => sum + (campaign.clicked || 0), 0);
            
            const deliveryRate = totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0;
            const openRate = totalDelivered > 0 ? Math.round((totalOpened / totalDelivered) * 100) : 0;
            const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;
            
            // Animate statistics
            animateNumber('total-sent', totalSent);
            animateNumber('delivery-rate', deliveryRate, '%');
            animateNumber('open-rate', openRate, '%');
            animateNumber('click-rate', clickRate, '%');
        }

        function animateNumber(elementId, targetValue, suffix = '') {
            const element = document.getElementById(elementId);
            const startValue = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
                
                element.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }

        function initializeCharts() {
            // Performance Over Time Chart
            const performanceCtx = document.getElementById('performance-chart').getContext('2d');
            performanceChart = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: generateDateLabels(30),
                    datasets: [{
                        label: 'Emails Sent',
                        data: generateRandomData(30, 100, 500),
                        borderColor: '#e3a119',
                        backgroundColor: 'rgba(227, 161, 25, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Emails Opened',
                        data: generateRandomData(30, 20, 150),
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: '#fff' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#ccc' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#ccc' }
                        }
                    }
                }
            });

            // Engagement Pie Chart
            const engagementCtx = document.getElementById('engagement-chart').getContext('2d');
            engagementChart = new Chart(engagementCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Opened', 'Clicked', 'Unsubscribed', 'Bounced'],
                    datasets: [{
                        data: [45, 15, 5, 8],
                        backgroundColor: [
                            '#e3a119',
                            '#28a745',
                            '#ffc107',
                            '#dc3545'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#fff' }
                        }
                    }
                }
            });
        }

        function loadCampaignsTable() {
            const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
            const tableBody = document.getElementById('campaigns-table-body');
            
            if (campaigns.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="8" style="text-align: center; color: #ccc; padding: 2rem;">
                            <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i><br>
                            No campaigns found. <a href="create-campaign.html" style="color: #e3a119;">Create your first campaign</a>
                        </td>
                    </tr>
                `;
                return;
            }
            
            tableBody.innerHTML = '';
            
            campaigns.reverse().forEach((campaign, index) => {
                const row = document.createElement('tr');
                row.style.animationDelay = `${index * 0.1}s`;
                
                const deliveryRate = campaign.sent > 0 ? Math.round((campaign.delivered / campaign.sent) * 100) : 0;
                const openRate = campaign.delivered > 0 ? Math.round((campaign.opened / campaign.delivered) * 100) : 0;
                const clickRate = campaign.opened > 0 ? Math.round((campaign.clicked / campaign.opened) * 100) : 0;
                
                row.innerHTML = `
                    <td>
                        <strong>${campaign.campaignname || 'Untitled Campaign'}</strong><br>
                        <small style="color: #ccc;">${campaign.subjectline || 'No subject'}</small>
                    </td>
                    <td>${formatDate(campaign.createdAt)}</td>
                    <td>${campaign.sent || 0}</td>
                    <td>
                        ${campaign.delivered || 0}
                        <div class="performance-bar">
                            <div class="performance-fill" style="width: ${deliveryRate}%"></div>
                        </div>
                        <small>${deliveryRate}%</small>
                    </td>
                    <td>
                        ${campaign.opened || 0}
                        <div class="performance-bar">
                            <div class="performance-fill" style="width: ${openRate}%"></div>
                        </div>
                        <small>${openRate}%</small>
                    </td>
                    <td>
                        ${campaign.clicked || 0}
                        <div class="performance-bar">
                            <div class="performance-fill" style="width: ${clickRate}%"></div>
                        </div>
                        <small>${clickRate}%</small>
                    </td>
                    <td>
                        <span class="status-badge status-${campaign.status || 'draft'}">
                            ${(campaign.status || 'draft').charAt(0).toUpperCase() + (campaign.status || 'draft').slice(1)}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <div class="performance-bar" style="margin-right: 0.5rem;">
                                <div class="performance-fill" style="width: ${(openRate + clickRate) / 2}%"></div>
                            </div>
                            <small>${Math.round((openRate + clickRate) / 2)}%</small>
                        </div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }

        function generateDateLabels(days) {
            const labels = [];
            const today = new Date();
            
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            }
            
            return labels;
        }

        function generateRandomData(length, min, max) {
            const data = [];
            for (let i = 0; i < length; i++) {
                data.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            return data;
        }

        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function applyDateFilter() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (!startDate || !endDate) {
                alert('Please select both start and end dates');
                return;
            }
            
            // Reload data with date filter
            loadReportsData();
            loadCampaignsTable();
            
                        // Update charts with filtered data
            const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
            
            performanceChart.data.labels = generateDateLabels(days);
            performanceChart.data.datasets[0].data = generateRandomData(days, 100, 500);
            performanceChart.data.datasets[1].data = generateRandomData(days, 20, 150);
            performanceChart.update();
            
            // Show success message
            showNotification('Date filter applied successfully!', 'success');
        }

        function exportReports() {
            const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
            
            if (campaigns.length === 0) {
                alert('No campaign data to export');
                return;
            }
            
            // Create CSV content
            const headers = ['Campaign Name', 'Subject', 'Date Created', 'Recipients', 'Delivered', 'Opened', 'Clicked', 'Status'];
            const csvContent = [
                headers.join(','),
                ...campaigns.map(campaign => [
                    `"${campaign.campaignname || 'Untitled'}"`,
                    `"${campaign.subjectline || 'No subject'}"`,
                    `"${formatDate(campaign.createdAt)}"`,
                    campaign.sent || 0,
                    campaign.delivered || 0,
                    campaign.opened || 0,
                    campaign.clicked || 0,
                    campaign.status || 'draft'
                ].join(','))
            ].join('\n');
            
            // Download CSV
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sciatius-email-reports-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            showNotification('Report exported successfully!', 'success');
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : '#e3a119'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add CSS for notification animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // view reports webpage end

        // logout webpage start

            // Clear user data from localStorage
        function clearUserData() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('lastActivity');
            console.log('User data cleared successfully');
        }

        // Redirect to index.html after 3 seconds
        document.addEventListener('DOMContentLoaded', function() {
            clearUserData();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 6000);
        });

        // Prevent back navigation
        if (window.history && window.history.pushState) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', function() {
                window.history.pushState(null, null, window.location.href);
            });
        }

         // logout webpage start



