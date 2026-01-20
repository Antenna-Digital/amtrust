window.Webflow ||= [];
window.Webflow.push(function () {

    console.log('Scripts loaded successfully! Local');

    function animateCountUp(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.textContent.replace(/,/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
              current += increment;
              if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCount);
              } else {
                stat.textContent = target.toLocaleString();
              }
            };
            
            updateCount();
            observer.unobserve(stat);
          }
        });
      }
    
      const observer = new IntersectionObserver(animateCountUp, {
        threshold: 0.5
      });
    
      document.querySelectorAll('[js-count-up]').forEach(stat => {
        observer.observe(stat);
      });
    
    // Initialize Accordion
    console.log('🔧 ACCORDION: Starting accordion initialization...');
    
    const accordionSections = document.querySelectorAll('.accordion');
    console.log(`🔧 ACCORDION: Found ${accordionSections.length} accordion section(s)`);
    
    accordionSections.forEach(function(accordion, sectionIndex) {
        console.log(`🔧 ACCORDION: Processing accordion section ${sectionIndex + 1}`);
        
        const accordionItems = accordion.querySelectorAll('.accordion_item');
        const accordionTitles = accordion.querySelectorAll('.accordion_title');
        
        console.log(`🔧 ACCORDION: Found ${accordionItems.length} accordion items and ${accordionTitles.length} titles`);
        
        // Generate dynamic IDs and set up ARIA attributes
        console.log('🔧 ACCORDION: Setting up dynamic ARIA attributes...');
        const timestamp = Date.now();
        
        accordionItems.forEach(function(item, itemIndex) {
            const title = item.querySelector('.accordion_title');
            const content = item.querySelector('.accordion_content');
            
            if (title && content) {
                // Generate unique IDs
                const titleId = `accordion-title-${timestamp}-${itemIndex}`;
                const contentId = `accordion-content-${timestamp}-${itemIndex}`;
                
                console.log(`🔧 ACCORDION: Overriding hardcoded attributes for item ${itemIndex + 1}`);
                
                // Clear hardcoded IDs and set dynamic ones
                title.id = titleId;
                content.id = contentId;
                
                // Clear and set proper ARIA relationships
                title.removeAttribute('aria-controls');
                title.setAttribute('aria-controls', contentId);
                
                title.removeAttribute('aria-expanded');
                title.setAttribute('aria-expanded', 'false');
                
                content.removeAttribute('aria-labelledby');
                content.setAttribute('aria-labelledby', titleId);
                
                // Remove any hardcoded style attributes
                content.removeAttribute('style');
                
                // Set tabindex via JavaScript - titles always tabbable, content based on state
                title.setAttribute('tabindex', '0');
                content.setAttribute('tabindex', '-1');
                
                console.log(`🔧 ACCORDION: Set dynamic IDs - Title: ${titleId}, Content: ${contentId}`);
                console.log(`🔧 ACCORDION: ARIA set - Title controls: ${contentId}, Content labeled by: ${titleId}`);
                console.log(`🔧 ACCORDION: Tabindex set - Title: 0, Content: -1`);
            } else {
                console.error('🔧 ACCORDION: Missing title or content in item', item);
            }
        });
        
        // Function to close all accordion items except the specified one
        function closeAllItems(exceptItem = null) {
            console.log('🔧 ACCORDION: Closing all accordion items...');
            
            accordionItems.forEach(function(item, index) {
                if (item !== exceptItem && item.classList.contains('accordion_item-active')) {
                    console.log(`🔧 ACCORDION: Closing item ${index + 1}`);
                    
                    item.classList.remove('accordion_item-active');
                    
                    const title = item.querySelector('.accordion_title');
                    const content = item.querySelector('.accordion_content');
                    
                    if (title && content) {
                        // Update ARIA attributes
                        title.setAttribute('aria-expanded', 'false');
                        
                        // Update tabindex - content not focusable when closed
                        content.setAttribute('tabindex', '-1');
                        
                        // Set max-height to 0 for slide animation
                        content.style.maxHeight = '0px';
                        
                        console.log('🔧 ACCORDION: Icon animation handled by CSS - closing state');
                    } else {
                        console.error('🔧 ACCORDION: Missing title or content element in item', item);
                    }
                }
            });
        }
        
        // Function to open an accordion item
        function openItem(item) {
            console.log('🔧 ACCORDION: Opening accordion item...');
            
            const title = item.querySelector('.accordion_title');
            const content = item.querySelector('.accordion_content');
            
            if (!title || !content) {
                console.error('🔧 ACCORDION: Cannot open item - missing title or content', item);
                return;
            }
            
            // Close all other items first
            closeAllItems(item);
            
            // Open the clicked item
            item.classList.add('accordion_item-active');
            title.setAttribute('aria-expanded', 'true');
            
            // Update tabindex - content is focusable when open
            content.setAttribute('tabindex', '0');
            
            // Calculate content height dynamically for slide animation
            const contentInner = content.querySelector('.accordion_content-inner');
            if (contentInner) {
                const contentHeight = contentInner.scrollHeight;
                console.log(`🔧 ACCORDION: Calculated content height: ${contentHeight}px`);
                content.style.maxHeight = contentHeight + 'px';
            }
            
            console.log('🔧 ACCORDION: Icon animation handled by CSS - opening state');
            console.log('🔧 ACCORDION: Item opened successfully');
        }
        
        // Function to close an accordion item
        function closeItem(item) {
            console.log('🔧 ACCORDION: Closing accordion item...');
            
            const title = item.querySelector('.accordion_title');
            const content = item.querySelector('.accordion_content');
            
            if (!title || !content) {
                console.error('🔧 ACCORDION: Cannot close item - missing title or content', item);
                return;
            }
            
            item.classList.remove('accordion_item-active');
            title.setAttribute('aria-expanded', 'false');
            
            // Update tabindex - content not focusable when closed
            content.setAttribute('tabindex', '-1');
            
            // Set max-height to 0 for slide animation
            content.style.maxHeight = '0px';
            
            console.log('🔧 ACCORDION: Icon animation handled by CSS - closing state');
            console.log('🔧 ACCORDION: Item closed successfully');
        }
        
        // Add click event listeners to accordion titles
        accordionTitles.forEach(function(title, index) {
            console.log(`🔧 ACCORDION: Adding click listener to title ${index + 1}`);
            
            title.addEventListener('click', function(e) {
                console.log(`🔧 ACCORDION: Click detected on title ${index + 1}`);
                
                const item = this.closest('.accordion_item');
                if (!item) {
                    console.error('🔧 ACCORDION: Could not find parent accordion_item');
                    return;
                }
                
                const isActive = item.classList.contains('accordion_item-active');
                console.log(`🔧 ACCORDION: Item is ${isActive ? 'active' : 'inactive'} - ${isActive ? 'closing' : 'opening'}`);
                
                if (isActive) {
                    closeItem(item);
                } else {
                    openItem(item);
                }
            });
            
            // Add keyboard support (Enter and Space)
            title.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log(`🔧 ACCORDION: Keyboard interaction (${e.key}) on title ${index + 1}`);
                    
                    const item = this.closest('.accordion_item');
                    if (!item) {
                        console.error('🔧 ACCORDION: Could not find parent accordion_item for keyboard event');
                        return;
                    }
                    
                    const isActive = item.classList.contains('accordion_item-active');
                    console.log(`🔧 ACCORDION: Keyboard - Item is ${isActive ? 'active' : 'inactive'} - ${isActive ? 'closing' : 'opening'}`);
                    
                    if (isActive) {
                        closeItem(item);
                    } else {
                        openItem(item);
                    }
                }
            });
        });
        
        // Initialize: Hide all accordion items first, then open only the first one
        console.log('🔧 ACCORDION: Initializing accordion state...');
        
        // First, ensure all items are closed
        accordionItems.forEach(function(item, index) {
            item.classList.remove('accordion_item-active');
            
            const title = item.querySelector('.accordion_title');
            const content = item.querySelector('.accordion_content');
            
            if (title && content) {
                title.setAttribute('aria-expanded', 'false');
                title.setAttribute('tabindex', '0');
                content.setAttribute('tabindex', '-1');
                content.style.maxHeight = '0px';
                
                console.log(`🔧 ACCORDION: Initialized item ${index + 1} - closed with tabindex 0/-1`);
            }
        });
        
        // Then open only the first item
        const firstItem = accordion.querySelector('.accordion_item');
        if (firstItem) {
            console.log('🔧 ACCORDION: Opening first accordion item by default');
            openItem(firstItem);
        } else {
            console.error('🔧 ACCORDION: No accordion items found to initialize');
        }
        
        console.log(`🔧 ACCORDION: Accordion section ${sectionIndex + 1} initialized successfully`);
    });
    
    console.log('🔧 ACCORDION: All accordion initialization complete!');
    
    // Find all project sections and initialize a Swiper for each
    const projectSections = document.querySelectorAll(".project-slider-section");

    projectSections.forEach(function (section) {
        const swiperContainer = section.querySelector(".project-slider");
        const pagination = section.querySelector(".project-pagination");
        const nextButton = section.querySelector(".project-swiper-button-next");
        const prevButton = section.querySelector(".project-swiper-button-prev");

        if (!swiperContainer) return;

        const swiper = new Swiper(swiperContainer, {
            // Swiper parameters
            slidesPerView: 1.1,
            spaceBetween: 12,
            loop: false,
            speed: 600,
            initialSlide: 1,

            // Pagination
            pagination: {
                el: pagination,
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },

            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 640px
                640: {
                    slidesPerView: 1.5,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 2.2,
                },
                // when window width is >= 1280px
                1280: {
                    slidesPerView: 2.5,
                },
            },

            // Optional: Enable keyboard control
            keyboard: {
                enabled: true,
            },

            // Optional: Enable mousewheel control
            mousewheel: {
                forceToAxis: true,
            },

            // Accessibility
            a11y: {
                prevSlideMessage: "Previous project",
                nextSlideMessage: "Next project",
            },
        });

        console.log("Project slider initialized successfully");
    });
});

// Portfolio Filter - Dynamic Result Text
window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'list',
  (listInstances) => {
    console.log('Portfolio Filter: Finsweet list instances loaded');
    console.log('Total instances:', listInstances.length);
    
    // DEBUG: Check what filters each instance has
    listInstances.forEach((instance, index) => {
        console.log(`Instance ${index} filters:`, instance.filters.value);
        console.log(`Instance ${index} groups:`, instance.filters.value.groups);
        console.log(`Instance ${index} has filters?`, instance.hasFilters.value);
    });
    
    // Find the portfolio filter instance (look for one with groups)
    let portfolioInstance = listInstances.find(instance => {
        const groups = instance.filters.value.groups;
        return groups && groups.length > 0;
    });
    
    if (!portfolioInstance) {
        console.log('No instance with filter groups found - using first instance');
        portfolioInstance = listInstances[0];
    }
    
    console.log('Using portfolio instance:', portfolioInstance);
    
    // Function to update the filter result text
    function updateFilterText() {
        // Find filter text element
        const filterTextElement = document.querySelector('.filter-text');
        if (!filterTextElement) {
            console.log('Filter text element (.filter-text) not found');
            return;
        }
        
        // Find clear button
        const clearButton = document.querySelector('[fs-list-element="clear"]');
        
        // Get current filter values from groups/conditions structure
        const filters = portfolioInstance.filters.value;
        let selectedLocation = '';
        let selectedType = '';
        
        // Parse the filter conditions to extract location and type values
        if (filters.groups && filters.groups.length > 0) {
            filters.groups.forEach(group => {
                if (group.conditions) {
                    group.conditions.forEach(condition => {
                        if (condition.fieldKey === 'location' && condition.value) {
                            selectedLocation = condition.value;
                        }
                        if (condition.fieldKey === 'type' && condition.value) {
                            selectedType = condition.value;
                        }
                    });
                }
            });
        }
        
        // Show/hide clear button based on whether filters are active
        const hasActiveFilters = selectedLocation || selectedType;
        if (clearButton) {
            clearButton.style.display = hasActiveFilters ? 'flex' : 'none';
        }
        
        // Count visible items
        const visibleItems = portfolioInstance.renderedItems.size;
        
        console.log('Filter update:', {
            visibleItems,
            selectedLocation,
            selectedType,
            hasActiveFilters,
            filters: filters
        });
        
        // Generate text based on active filters
        let resultText = '';
        const propertyText = visibleItems === 1 ? 'property' : 'properties';
        
        if (visibleItems === 0) {
            resultText = 'No properties found.';
        } else if (selectedLocation && selectedType) {
            // Both filters: {count} {type} properties found in {location}.
            resultText = `${visibleItems} <strong>${selectedType}</strong> ${propertyText} found in <strong>${selectedLocation}</strong>.`;
        } else if (selectedLocation) {
            // Location only: {count} properties found in {location}.
            resultText = `${visibleItems} ${propertyText} found in <strong>${selectedLocation}</strong>.`;
        } else if (selectedType) {
            // Type only: {count} {type} properties found.
            resultText = `${visibleItems} <strong>${selectedType}</strong> ${propertyText} found.`;
        } else {
            // No filters: {count} properties found.
            resultText = `Use the filters to focus your search.`;
        }
        
        filterTextElement.innerHTML = resultText;
        console.log('Filter text updated:', resultText);
    }
    
    // Hook into the afterRender lifecycle phase
    portfolioInstance.addHook('afterRender', (items) => {
        console.log('afterRender hook fired! Items:', items.length);
        updateFilterText();
        return items; // Must return items for the lifecycle to continue
    });
    
    // Initial update
    setTimeout(updateFilterText, 500);
    
    console.log('Portfolio filter text initialized successfully!');
  },
]);

// Hamburger Menu Toggle
window.Webflow ||= [];
window.Webflow.push(function () {
    console.log('🔧 HAMBURGER: Starting hamburger menu initialization...');
    
    const navButtons = document.querySelectorAll('.w-nav-button');
    console.log(`🔧 HAMBURGER: Found ${navButtons.length} navigation button(s)`);
    
    navButtons.forEach(function(button, index) {
        console.log(`🔧 HAMBURGER: Setting up button ${index + 1}`);
        
        // Click event to toggle w--open class
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔧 HAMBURGER: Click detected - toggling w--open class');
            this.classList.toggle('w--open');
        });
        
        // Keyboard support (Enter and Space)
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log(`🔧 HAMBURGER: Keyboard interaction (${e.key}) - toggling w--open class`);
                this.classList.toggle('w--open');
            }
        });
        
        // Set ARIA attributes
        button.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when class changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isOpen = button.classList.contains('w--open');
                    button.setAttribute('aria-expanded', isOpen.toString());
                    console.log(`🔧 HAMBURGER: Menu state changed - ${isOpen ? 'open' : 'closed'}`);
                }
            });
        });
        
        observer.observe(button, { attributes: true });
    });
    
    console.log('🔧 HAMBURGER: Hamburger menu initialization complete!');
});