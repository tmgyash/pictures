const cat = document.querySelector(".letter-cat-heart");

let openingEnvelope = false;
let swapped = false;
let done = false;

let stage = 3;
let clickCount = 0;

cat.addEventListener("mouseenter", () => {
  if (done) return;

  gsap.to(cat, {
    scale: 1.04,
    duration: 0.25,
    ease: "power1.out",
  });
});

cat.addEventListener("mouseleave", () => {
  if (done) return;

  gsap.to(cat, {
    scale: 1,
    duration: 0.25,
    ease: "power1.out",
  });
});

function updateStageText(stage) {
  const title = document.querySelector(".letter-title");

  if (stage === 3) {
    title.textContent = "Wait—are you sure?? 😳";
  } else if (stage === 2) {
    title.textContent = "Ouch… that kinda hurt 💔";
  } else if (stage === 1) {
    title.textContent = "Please… don't do this 😢";
  } else if (stage <= 0) {
    title.textContent = "Yeah… you know the answer 💝";
  }
}

function updateEasterEgg() {
  if (done) return;

  clickCount++;

  if (clickCount === 5) {
    gsap.to("#easter-egg", {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // subtle "oh?" reaction
    gsap.fromTo(
      ".letter-cat-heart",
      { scale: 1 },
      { scale: 1.08, yoyo: true, repeat: 1, duration: 0.15 },
    );
  }
}

function onYes() {
  if (done) return;

  done = true;

  const cat = document.querySelector(".letter-cat-heart");
  const title = document.querySelector(".letter-title");

  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");

  // change text
  title.textContent = "Yippeeeeee! 🥰";

  // swap gif
  cat.src = "assets/letter/cat_dance.gif";

  // hide buttons smoothly
  gsap.to([yesBtn, noBtn], {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
    },
  });

  // scale the new gif
  gsap.set(cat, { scale: 0.75 });

  // move 10px left
  gsap.to(cat, { x: "-=10", duration: 0.2 });
}

function onNo() {
  if (done) return;

  const window = document.querySelector(".letter-window");
  const noBtn = document.querySelector(".no-btn");

  // update text for current stage
  updateStageText(stage);

  // update heart image
  if (stage === 3) {
    window.src = "assets/letter/heart-2.png";
  } else if (stage === 2) {
    window.src = "assets/letter/heart-1.png";
  } else if (stage === 1) {
    window.src = "assets/letter/heart-0.png";
  }

  stage--;

  // move NO button randomly each stage
  if (stage >= 0) {
    gsap.to(noBtn, {
      scale: "-=0.15",
      duration: 0.15,
      ease: "power2.out",
    });
  }

  // at heart stage < 0 → NO disappears
  if (stage < 0) {
    gsap.to(noBtn, {
      opacity: 0,
      scale: 0.3,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => {
        noBtn.style.display = "none";
      },
    });
  }
}

function catMoment() {
  if (done) return;

  const cat = document.querySelector(".letter-cat-heart");

  gsap
    .timeline()
    // playful pixel-friendly wink (tilt)
    .to(cat, {
      rotation: -6,
      duration: 0.12,
      ease: "power2.out",
    })
    .to(cat, {
      rotation: 0,
      duration: 0.12,
      ease: "power2.in",
    })

    // heart pulse
    .to(
      cat,
      {
        scale: 1.06,
        duration: 0.2,
        ease: "power2.out",
      },
      "<",
    )

    // tiny bounce
    .to(cat, {
      y: -4,
      duration: 0.15,
      ease: "power2.out",
    })
    .to(cat, {
      y: 0,
      duration: 0.15,
      ease: "power2.in",
    });
}

function openEnvelope() {
  if (done) return;

  if (openingEnvelope) return;
  openingEnvelope = true;

  gsap.to("#envelope", {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      document.getElementById("envelope").hidden = true;

      const letter = document.getElementById("letter");
      letter.hidden = false;

      gsap.fromTo(
        "#letter",
        { opacity: 0, scale: 1.25 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
        },
      );

      gsap.from(".letter-cat-heart", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      setTimeout(catMoment, 650);
    },
  });
}
