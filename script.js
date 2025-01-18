document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const overlay = document.querySelector(".overlay");

    if (menuToggle && navMenu && overlay) {
        menuToggle.addEventListener("change", () => {
            if (menuToggle.checked) {
                navMenu.style.right = "0"; // Show the menu
                overlay.style.display = "block"; // Show the overlay
                setTimeout(() => {
                    overlay.style.opacity = "1"; // Animate overlay fade-in
                }, 0);
            } else {
                navMenu.style.right = "-250px"; // Hide the menu
                overlay.style.opacity = "0"; // Animate overlay fade-out
                setTimeout(() => {
                    overlay.style.display = "none"; // Hide overlay after animation
                }, 400); // Match the CSS transition duration
            }
        });

        // Close the menu when the overlay is clicked
        overlay.addEventListener("click", () => {
            menuToggle.checked = false;
            navMenu.style.right = "-250px";
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
            }, 400);
        });
    }

    // --- Existing Code Below ---

    // Selectors for navigation functionality
    const showcaseContainer = document.querySelector(".showcase__projects .all");
    const leftButton = document.querySelector(".action__buttons .navigation.left");
    const rightButton = document.querySelector(".action__buttons .navigation.right");

    if (!showcaseContainer || !leftButton || !rightButton) {
        console.error("Required DOM elements not found.");
        return;
    }

    const cardContainers = Array.from(showcaseContainer.children); // All direct card containers
    if (cardContainers.length === 0) {
        console.error("No cards found in the showcase.");
        return;
    }

    // Calculate card width including margin
    const cardStyle = getComputedStyle(cardContainers[0]);
    const cardWidth = cardContainers[0].offsetWidth + parseFloat(cardStyle.marginRight);

    // Initial variables
    let currentOffset = 0; // Tracks the current offset position
    const totalCards = cardContainers.length;
    const visibleWidth = showcaseContainer.parentElement.offsetWidth; // Width of the viewport
    const maxOffset = -(totalCards * cardWidth - visibleWidth); // Maximum left scroll limit

    // Function to update the transform position
    function updateShowcasePosition() {
        showcaseContainer.style.transform = `translateX(${currentOffset}px)`;
        showcaseContainer.style.transition = "transform 0.5s ease"; // Smooth animation
    }

    // Event listener for left navigation button
    leftButton.addEventListener("click", () => {
        currentOffset = Math.min(currentOffset + cardWidth, 0); // Prevent overflow to the left
        updateShowcasePosition();
    });

    // Event listener for right navigation button
    rightButton.addEventListener("click", () => {
        currentOffset = Math.max(currentOffset - cardWidth, maxOffset); // Prevent overflow to the right
        updateShowcasePosition();
    });

    // Modal logic for video playback
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";
    modal.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    modal.style.opacity = "0";
    modal.style.transform = "scale(0.8)";
    document.body.appendChild(modal);

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.color = "#fff";
    closeButton.style.background = "transparent";
    closeButton.style.border = "none";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";
    modal.appendChild(closeButton);

    const modalVideo = document.createElement("video");
    modalVideo.style.maxWidth = "90%";
    modalVideo.style.maxHeight = "80%";
    modalVideo.controls = true;
    modal.appendChild(modalVideo);

    const closeModal = () => {
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.8)";
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = ""; // Stop the video
        }, 500); // Match the animation duration
    };

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.querySelectorAll(".vid__btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const videoSrc = btn.closest(".card").querySelector("video").getAttribute("src");
            modalVideo.src = videoSrc;
            modalVideo.autoplay = true; // Ensure autoplay
            modal.style.display = "flex";

            // Trigger animation
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.style.transform = "scale(1)";
                modalVideo.play(); // Explicitly start playback
            }, 50);
        });
    });
});
