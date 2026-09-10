document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();

    tl.to(".title", { duration: 1, opacity: 1, y: 0, ease: "power3.out" })
      .to(".subtitle", { duration: 0.8, opacity: 1, y: 0, ease: "power3.out" }, "-=0.5")
      .to(".cta-btn", { duration: 0.6, opacity: 1, scale: 1, ease: "back.out(1.7)" }, "-=0.3");

    gsap.to(".card", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cards-section",
            start: "top 80%"
        }
    });

    const btn = document.querySelector(".cta-btn");
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.2 });
    });
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.2 });
    });
});