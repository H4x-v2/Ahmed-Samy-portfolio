document.addEventListener("DOMContentLoaded", () => {
    // Create and style the modal
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
    modal.style.padding = "20px";
    modal.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    modal.style.opacity = "0"; // Start hidden
    modal.style.transform = "scale(0.8)"; // Start scaled down
    document.body.appendChild(modal);

    // Create and style the close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.color = "#fff";
    closeButton.style.fontSize = "24px";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    modal.appendChild(closeButton);

    // Create the video element
    const modalVideo = document.createElement("video");
    modalVideo.style.maxWidth = "90%";
    modalVideo.style.maxHeight = "80%";
    modalVideo.controls = true;
    modalVideo.autoplay = true; // Enable autoplay attribute
    modal.appendChild(modalVideo);

    // Function to close the modal
    const closeModal = () => {
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.8)";
        setTimeout(() => {
            modal.style.display = "none";
            modalVideo.src = ""; // Stop the video
        }, 500); // Match the animation duration
    };

    // Event listener for the close button
    closeButton.addEventListener("click", closeModal);

    // Event listener to close modal when clicking outside the video
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Add event listeners to video buttons
    const videoButtons = document.querySelectorAll(".vid__btn");
    videoButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            // Find the associated video source
            const videoCard = button.closest(".project__card");
            const videoSrc = videoCard.querySelector("video").getAttribute("src");

            // Set the video source and display the modal
            modalVideo.src = videoSrc;
            modal.style.display = "flex";

            // Trigger animation
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.style.transform = "scale(1)";
                modalVideo.play(); // Explicitly start playback
            }, 50); // Small delay to ensure CSS transition applies
        });
    });
});