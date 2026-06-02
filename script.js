document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });

        // Close menu when clicking on nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on page load in case of refresh at scroll position

    // ==========================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: Unobserve element once it reveals to stop animating again
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in full view
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // SCROLLSPY (ACTIVE LINK ON SCROLL)
    // ==========================================
    const sections = document.querySelectorAll('section, footer');
    
    const scrollspyHandler = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollspyHandler);
    scrollspyHandler();

    // ==========================================
    // CHATBOT WIDGET LOGIC
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBadge = document.querySelector('.chat-badge');

    // Open/Close chat box
    if (chatToggle && chatBox) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.add('active');
            if (chatBadge) {
                chatBadge.style.display = 'none'; // Hide badge once opened
            }
        });
    }

    if (closeChat && chatBox) {
        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }

    // Helper to scroll chat body to bottom
    const scrollToBottom = () => {
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    };

    // Helper to create typing indicator bubble
    const createTypingIndicator = () => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-message bot-message typing-bubble';
        bubble.innerHTML = `
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        return bubble;
    };

    // Send and process message
    const handleSendMessage = () => {
        if (!chatInput || !chatBody) return;

        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message bubble
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user-message';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        
        // Reset input immediately
        chatInput.value = '';
        scrollToBottom();

        // Add typing indicator bubble
        const typingIndicator = createTypingIndicator();
        chatBody.appendChild(typingIndicator);
        scrollToBottom();

        // Bot responds after a delay to simulate typing
        setTimeout(() => {
            // Remove typing indicator
            if (typingIndicator.parentNode) {
                typingIndicator.parentNode.removeChild(typingIndicator);
            }

            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot-message';
            
            let reply = "Ồ hay quá! Bạn kể thêm đi nhé, mình đang rất hào hứng đây! 😊";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('hạ long') || lowerText.includes('vịnh')) {
                reply = "Vịnh Hạ Long đẹp mê ly luôn! Bạn nên đi du thuyền ngắm hoàng hôn, ăn hải sản tươi rói, hoặc chèo thuyền kayak để cảm nhận làn nước mát rượi. Bạn đã đi bao giờ chưa? 🚤";
            } else if (lowerText.includes('phở') || lowerText.includes('ẩm thực') || lowerText.includes('ăn')) {
                reply = "Phở Việt Nam là đỉnh nhất thế giới nha! Nước dùng ngọt thanh từ xương ống ninh kèm nhiều gia vị gia truyền, bánh phở mềm. Bạn là team Phở Bò hay Phở Gà thế? 🍜";
            } else if (lowerText.includes('hội an') || lowerText.includes('đà nẵng') || lowerText.includes('miền trung')) {
                reply = "Phố cổ Hội An về đêm lung linh ánh đèn lồng lãng mạn lắm nha! Cần phải đi dạo quanh sông Hoài, ăn Cao Lầu ngon đúng điệu và thả đèn hoa đăng cầu may mắn. 🏮";
            } else if (lowerText.includes('sài gòn') || lowerText.includes('hồ chí minh') || lowerText.includes('tphcm')) {
                reply = "Sài Gòn (TP.HCM) cực kỳ sôi động luôn! Bạn có thích trà chanh vỉa hè nhà hát lớn, ngắm view Landmark 81 cực chill hay dạo phố đi bộ Bùi Viện xôm tụ? 🌃";
            } else if (lowerText.includes('hà nội')) {
                reply = "Hà Nội nghìn năm văn hiến mang nét đẹp thanh lịch hoài cổ. Ghé thăm Lăng Bác, Hồ Gươm, làm một ly cà phê trứng béo ngậy thơm ngon là quên hết sầu muộn! ☕";
            } else if (lowerText.includes('sapa') || lowerText.includes('sa pa')) {
                reply = "Sa Pa đẹp như bức tranh sơn dầu giữa mây trời Tây Bắc! Ruộng bậc thang mùa lúa chín vàng óng hay đỉnh Fansipan mù sương chắc chắn sẽ làm bạn say lòng. ⛰️";
            } else if (lowerText.includes('chào') || lowerText.includes('hello') || lowerText.includes('hi')) {
                reply = "Xin chào! Rất vui được gặp bạn. Hôm nay bạn muốn tìm hiểu thông tin gì về Việt Nam xinh đẹp nào? Mình sẵn sàng hỗ trợ! 😄";
            }

            botMsg.textContent = reply;
            chatBody.appendChild(botMsg);
            scrollToBottom();
        }, 1200);
    };

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // ==========================================
    // REGISTRATION FORM SUBMIT & TOAST
    // ==========================================
    const registrationForm = document.getElementById('registrationForm');
    const toast = document.getElementById('toast-notification');
    const toastClose = document.getElementById('toast-close');

    const showToast = () => {
        if (toast) {
            toast.classList.add('active');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                toast.classList.remove('active');
            }, 5000);
        }
    };

    if (toastClose && toast) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('active');
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data (for illustration purposes)
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            
            console.log(`Đăng ký mới: ${lastName} ${firstName} (${email})`);
            
            // Show custom success alert toast
            showToast();
            
            // Reset fields
            registrationForm.reset();
        });
    }

    // ==========================================
    // SHOPPING CART & PAYMENT LOGIC
    // ==========================================
    let cart = JSON.parse(localStorage.getItem('vietnam_discovery_cart')) || [];

    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const cartDrawerBody = document.getElementById('cart-drawer-body');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartBadgeCount = document.querySelector('.cart-badge-count');
    
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
    const checkoutClose = document.getElementById('checkout-close');
    const btnCheckout = document.getElementById('btn-checkout');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutItemsList = document.getElementById('checkout-items-list');
    const checkoutTotalAmount = document.getElementById('checkout-total-amount');
    const vietqrImage = document.getElementById('vietqr-image');
    
    // Toggle Cart Drawer
    if (cartToggleBtn && cartDrawer && cartDrawerOverlay) {
        cartToggleBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartDrawerOverlay.classList.add('active');
        });
    }

    const closeCart = () => {
        if (cartDrawer && cartDrawerOverlay) {
            cartDrawer.classList.remove('active');
            cartDrawerOverlay.classList.remove('active');
        }
    };

    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

    // Format Currency
    const formatPrice = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
    };

    // Calculate Total
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Save Cart to LocalStorage
    const saveCart = () => {
        localStorage.setItem('vietnam_discovery_cart', JSON.stringify(cart));
        updateBadge();
    };

    // Update Cart Badge Count
    const updateBadge = () => {
        if (cartBadgeCount) {
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            cartBadgeCount.textContent = count;
            
            // Pop animation on change
            cartBadgeCount.classList.remove('pop-anim');
            void cartBadgeCount.offsetWidth; // Trigger reflow
            cartBadgeCount.classList.add('pop-anim');
        }
    };

    // Render Cart Items
    const renderCart = () => {
        if (!cartDrawerBody || !cartTotalPrice) return;

        if (cart.length === 0) {
            cartDrawerBody.innerHTML = `
                <div class="cart-empty-message">
                    <i class="fas fa-shopping-basket" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px;"></i>
                    <p>Giỏ hàng của bạn đang trống.</p>
                    <a href="#destinations" class="btn btn-primary btn-shop-now" style="margin-top: 15px;">Chọn tour ngay</a>
                </div>
            `;
            cartTotalPrice.textContent = '0đ';
            
            // Bind close drawer to "Chọn tour ngay" link
            const shopNowLink = cartDrawerBody.querySelector('.btn-shop-now');
            if (shopNowLink) {
                shopNowLink.addEventListener('click', closeCart);
            }
            return;
        }

        let cartHTML = '';
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        <div class="cart-item-controls">
                            <div class="qty-controls">
                                <button class="qty-btn minus-btn" data-id="${item.id}">&minus;</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn plus-btn" data-id="${item.id}">&plus;</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartDrawerBody.innerHTML = cartHTML;
        cartTotalPrice.textContent = formatPrice(getCartTotal());

        // Event listeners for Quantity buttons & Delete buttons
        const minusBtns = cartDrawerBody.querySelectorAll('.minus-btn');
        const plusBtns = cartDrawerBody.querySelectorAll('.plus-btn');
        const removeBtns = cartDrawerBody.querySelectorAll('.cart-item-remove');

        minusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateQuantity(id, -1);
            });
        });

        plusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                updateQuantity(id, 1);
            });
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    };

    // Add Tour to Cart
    const addToCart = (id, name, price, img) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }
        saveCart();
        renderCart();
        
        // Open cart drawer immediately
        if (cartDrawer && cartDrawerOverlay) {
            cartDrawer.classList.add('active');
            cartDrawerOverlay.classList.add('active');
        }
    };

    // Update Quantity
    const updateQuantity = (id, change) => {
        const item = cart.find(item => item.id === id);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        saveCart();
        renderCart();
    };

    // Remove from Cart
    const removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    };

    // Attach Click Event to "Đặt Tour" buttons
    const bookTourBtns = document.querySelectorAll('.btn-book-tour');
    bookTourBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.destination-card');
            if (card) {
                const id = card.getAttribute('data-id');
                const name = card.getAttribute('data-name');
                const price = parseInt(card.getAttribute('data-price'));
                const img = card.getAttribute('data-img');
                
                addToCart(id, name, price, img);
            }
        });
    });

    // ==========================================
    // CHECKOUT MODAL LOGIC
    // ==========================================
    const openCheckout = () => {
        if (cart.length === 0) return;

        if (checkoutItemsList && checkoutTotalAmount && vietqrImage) {
            let itemsHTML = '';
            cart.forEach(item => {
                itemsHTML += `
                    <div class="checkout-summary-item">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `;
            });

            checkoutItemsList.innerHTML = itemsHTML;
            const total = getCartTotal();
            checkoutTotalAmount.textContent = formatPrice(total);

            // Update VietQR image link dynamically with correct amount and details
            const memo = encodeURIComponent(`Thanh toan Tour ${cart.map(i => i.id).join(' ')}`);
            vietqrImage.src = `https://img.vietqr.io/image/vietinbank-1133224455-compact2.png?amount=${total}&addInfo=${memo}&accountName=VIETNAM%20DISCOVERY`;
        }

        // Close cart drawer & Open modal
        closeCart();
        if (checkoutModal && checkoutModalOverlay) {
            checkoutModal.classList.add('active');
            checkoutModalOverlay.classList.add('active');
        }
    };

    const closeCheckout = () => {
        if (checkoutModal && checkoutModalOverlay) {
            checkoutModal.classList.remove('active');
            checkoutModalOverlay.classList.remove('active');
        }
    };

    if (btnCheckout) btnCheckout.addEventListener('click', openCheckout);
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
    if (checkoutModalOverlay) checkoutModalOverlay.addEventListener('click', closeCheckout);

    // Payment Methods toggler
    const methodQR = document.getElementById('method-qr');
    const methodMomo = document.getElementById('method-momo');
    const methodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    
    const handleMethodSelection = (selectedMethod) => {
        document.querySelectorAll('.payment-method-option').forEach(el => el.classList.remove('active'));
        
        if (selectedMethod === 'qr') {
            if (methodQR) methodQR.classList.add('active');
            const radioInput = methodQR.querySelector('input');
            if (radioInput) radioInput.checked = true;
            
            // Switch QR Code image parameters back to Bank Transfer
            if (vietqrImage) {
                const total = getCartTotal();
                const memo = encodeURIComponent(`Thanh toan Tour ${cart.map(i => i.id).join(' ')}`);
                vietqrImage.src = `https://img.vietqr.io/image/vietinbank-1133224455-compact2.png?amount=${total}&addInfo=${memo}&accountName=VIETNAM%20DISCOVERY`;
            }
        } else if (selectedMethod === 'momo') {
            if (methodMomo) methodMomo.classList.add('active');
            const radioInput = methodMomo.querySelector('input');
            if (radioInput) radioInput.checked = true;

            // Switch QR Code to Momo logo payment mock
            if (vietqrImage) {
                const total = getCartTotal();
                const memo = encodeURIComponent(`Thanh toan Tour ${cart.map(i => i.id).join(' ')}`);
                // Use Momo mock image (Momo wallet QR code style via VietQR card)
                vietqrImage.src = `https://img.vietqr.io/image/momo-0912345678-compact2.png?amount=${total}&addInfo=${memo}&accountName=VIETNAM%20DISCOVERY`;
            }
        }
    };

    if (methodQR) {
        methodQR.addEventListener('click', () => handleMethodSelection('qr'));
    }
    if (methodMomo) {
        methodMomo.addEventListener('click', () => handleMethodSelection('momo'));
    }

    // Checkout Form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear Cart
            cart = [];
            saveCart();
            renderCart();
            
            // Close checkout modal
            closeCheckout();
            
            // Show Success Notification Toast (using registration toast container with customized text)
            const mainToast = document.getElementById('toast-notification');
            if (mainToast) {
                const toastTitle = mainToast.querySelector('.toast-title');
                const toastDesc = mainToast.querySelector('.toast-desc');
                
                if (toastTitle && toastDesc) {
                    toastTitle.textContent = "Thanh toán thành công!";
                    toastDesc.textContent = "Hệ thống đã xác nhận đặt tour của bạn. Vé điện tử sẽ được gửi qua email.";
                }
                
                mainToast.classList.add('active');
                setTimeout(() => {
                    mainToast.classList.remove('active');
                    // Reset toast title/desc back to default registration info
                    setTimeout(() => {
                        if (toastTitle && toastDesc) {
                            toastTitle.textContent = "Thành công!";
                            toastDesc.textContent = "Cảm ơn bạn đã đăng ký nhận thông tin.";
                        }
                    }, 500);
                }, 6000);
            }
        });
    }

    // Initial Badge & Cart render
    updateBadge();
    renderCart();

});
