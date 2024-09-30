//------------------- Matrix Effect -------------------//
var q = document.getElementById("matrix"),
  s = window.screen,
  w = (q.width = s.width),
  h = (q.height = s.height),
  p = Array(256).join(1).split(""),
  c = q.getContext("2d"),
  m = Math;

const characters = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "一二三四五六七八九十百千万亿个上下左右前后内外大中小长短高低好坏远近新旧多少多少",
  "1234567890",
];
const rL = m.floor(m.random() * characters.length) - m.floor(m.random());

setInterval(function () {
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0, 0, w, h);
  c.fillStyle = "rgba(255,255,255,1)";
  p = p.map(function (v, i) {
    r = m.random();
    const char = characters[rL][m.floor(r * characters[rL].length)];
    c.fillText(char, i * 10, v);
    v += 10;
    return v > 768 + r * 1e4 ? 0 : v;
  });
}, 33);
//------------------- Matrix Effect -------------------//

//----------------- Glitch Text Reveal -----------------//
function initializeGlitchText(element) {
  const text_length = element.innerText.length;
  const baseTime = 5000; // Base time for 15 characters
  const minTime = 2000; // Minimum reveal time

  // Calculate reveal time
  let revealTime = baseTime;
  if (text_length > 15) {
    revealTime = Math.max(
      minTime,
      Math.floor(baseTime * (15 / text_length)) - 100
    );
  }
  //console.log("text:", element.innerText,'revealTime:', revealTime);

  const text = baffle(`#${element.id}`);
  text.set({
    characters: "¡£¢∞§¶–≠åß∂ƒ©∆¬æ≈√∫µ≤≥÷/?░▒▓<>/≡∑",
    speed: 120,
  });
  text.start();
  text.reveal(revealTime);
}
//----------------- Glitch Text Reveal -----------------//

function checkUrlParameter(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(paramName);
}

document.addEventListener("DOMContentLoaded", function () {
  let userPublicIP;
  async function fetchUserPublicIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      userPublicIP = data.ip;
      //console.log("User Public IP:", userPublicIP); // Log the fetched IP

      // Update the loadingTexts array after fetching the IP
      updateLoadingTexts();
    } catch (error) {
      console.error("Error fetching user public IP:", error);
    }
  }

  //----------------- Loading Text -----------------//
  const lwrapper = document.getElementById("lwrapper");
  const wrapper = document.querySelector(".wrapper");
  if (!checkUrlParameter("noloading")) {
    const loadingBar = document.getElementById("loading-bar");
    const timeValue = getComputedStyle(lwrapper).getPropertyValue("--time"); // Get the value of the --time CSS variable
    const timeInSeconds = parseFloat(timeValue); // Convert the value to a number (assuming the value is in seconds and ends with 's')
    const clickme = document.getElementById("clickme");
    const loadingText = document.getElementById("loading-text");
    const loadingTexts = [
      "Loading content...",
      "Almost there...",
      "Just a moment...",
      "Fetching data...",
      "Loading scripts...",
      "Loading images...",
      "Loading matrix...",
      "Loading glitches...",
      "Lighting up Netherite FireWall...",
      "Updating to Protection VI...",
      "Loading magic spells...",
      "Collecting dreams...",
      "Collecting Infinity Stones...",
      "Collecting user data...",
      "Loading BeEF...",
      "Solving world hunger (just kidding, loading...)",
      "Debugging human emotions...",
      "Reconfiguring space-time continuum...",
      "Uploading human experience to cloud...",
      "Simulating reality (again)...",
      "Calculating meaning of life...",
      "Cracking the code of existence...",
      "Initializing time travel sequence...",
      "Decoding alien languages...(HTML)",
      "Rebooting reality...",
      "Applying patches...",
    ];

    function updateLoadingTexts() {
      loadingTexts.push(`Your IP: ${userPublicIP}`);
      //console.log("Updated loadingTexts:", loadingTexts); // Log the updated array
    }

    fetchUserPublicIP();// Fetch the user's public IP

    let shuffledTexts = [];
    let currentIndex = 0;
    let timeoutId;

    // Function to shuffle the loading texts array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Function to change the loading text at random intervals
    function changeLoadingText() {
      if (currentIndex >= shuffledTexts.length) {
        shuffledTexts = shuffleArray([...loadingTexts]);
        currentIndex = 0;
        //console.log("Shuffled texts:", shuffledTexts); // Log the shuffled texts
      }

      const randomText = shuffledTexts[currentIndex];
      loadingText.textContent = randomText;
      //console.log("Current text:", randomText); // Log the current text
      currentIndex++;

      const randomInterval = Math.floor(Math.random() * 1500) + 500; // Set a random interval between 500ms and 2000ms
      timeoutId = setTimeout(changeLoadingText, randomInterval);
    }

    //loadingBar.style.width = "100%"; // Start the loading bar animation

    var i = 0;
    let blocks = document.querySelectorAll(".block");
    const interval = setInterval(() => {
      if (i == blocks.length) {
        i = 0;
        blocks.forEach((block) => {
          block.style.background = "transparent";
        });
      } else {
        blocks[i].style.background =
          lwrapper.style.getPropertyValue("--main-color");
        i = i + 1;
      }
    }, (timeInSeconds * 1000) / document.getElementsByClassName("block").length);

    changeLoadingText();

    // Show the wrapper element after timeout
    setTimeout(function () {
      clearTimeout(timeoutId);
      clearInterval(interval);
      if (Math.random() >= 0.3) {
        lwrapper.style.display = "none";
        wrapper.classList.remove("hidden");
      } else {
        lwrapper.style.setProperty("--main-color", "#ff0000");
        loadingText.textContent = "Error loading content";
        document
          .getElementById("loading-image")
          .setAttribute("src", "images/MM logo shield v2 red.svg");
        document.getElementById("loading-button").classList.remove("hidden");
      }
    }, timeInSeconds * 1000);

    clickme.addEventListener("click", function () {
      // Create an anchor element
      const a = document.createElement("a");

      // Set the href attribute to the file URL
      a.href = "secret/fix.bat"; // Replace with the actual file URL

      // Set the download attribute with the desired file name
      a.download = "fix.bat"; // Replace with the desired file name

      // Append the anchor to the body (required for Firefox)
      document.body.appendChild(a);

      // Programmatically trigger a click event on the anchor
      a.click();

      // Remove the anchor from the document
      document.body.removeChild(a);

      window.location.href = index.html;
    });
  } else {
    lwrapper.style.display = "none";
    wrapper.classList.remove("hidden");
  }
  //----------------- Loading Text -----------------//

  //----------------- Scroll handler -----------------//
  let currentSection = 0;
  const sections = document.querySelectorAll(
    '[class^="container-"], .main-title'
  );
  const totalSections = sections.length;

  function scrollToSection(index) {
    if (index >= 0 && index < totalSections) {
      sections[index].scrollIntoView({ behavior: "smooth" });
      currentSection = index;
    }
  }

  function handleScroll(event) {
    if (event.deltaY > 0 || event.key === "ArrowDown") {
      // Scroll down
      scrollToSection(currentSection + 1);
    } else if (event.deltaY < 0 || event.key === "ArrowUp") {
      // Scroll up
      scrollToSection(currentSection - 1);
    }
  }

  window.addEventListener("wheel", handleScroll);
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      handleScroll(event);
    }
  });

  // Optional: Handle touchpad and other types of scroll events
  window.addEventListener("scroll", function () {
    // Determine the current section based on scroll position
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        currentSection = index;
      }
    });
  });
  //----------------- Scroll handler -----------------//

  //----------------- Glitch Handler -----------------//
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the element is in view
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const glitchElements = entry.target.querySelectorAll(".glitch-effect");
        glitchElements.forEach((glitchElement) => {
          initializeGlitchText(glitchElement);
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const sectionsToObserve = document.querySelectorAll(
    '[class^="container-"], .main-title'
  );
  sectionsToObserve.forEach((section) => observer.observe(section));
  //----------------- Glitch Handler -----------------//

  //----------------- Warning Popup -----------------//
  const linkW = document.getElementById("school-text");
  const popupW = document.getElementById("confirmation-popup");
  const confirmButtonW = popupW.querySelector("#confirm-button");
  const cancelButtonW = popupW.querySelector("#cancel-button");
  let redirectUrlW = "";

  linkW.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    redirectUrlW = linkW.href; // Store the URL to redirect to
    popupW.classList.remove("hidden"); // Show the popup
    popupW.classList.add("popup"); // Show the popup
  });

  confirmButtonW.addEventListener("click", function () {
    popupW.classList.add("hidden"); // Hide the popup
    window.location.href = redirectUrlW; // Redirect to the stored URL
  });

  cancelButtonW.addEventListener("click", function () {
    popupW.classList.add("hidden"); // Hide the popup
    popupW.classList.remove("popup"); // Hide the popup
  });
  //----------------- Warning Popup -----------------//

  //----------------- See More Popup -----------------//
  const linkM = document.getElementsByClassName("nft")[2];
  const popupM = document.getElementById("skills-more-popup");
  const confirmButtonM = popupM.querySelector("#confirm-button");
  const cancelButtonM = popupM.querySelector("#cancel-button");

  linkM.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    popupM.classList.remove("hidden"); // Show the popup
    popupM.classList.add("popup"); // Show the popup
  });

  confirmButtonM.addEventListener("click", function () {
    popupM.classList.add("hidden"); // Hide the popup
    popupM.classList.remove("popup"); // Hide the popup
    window.open("src/html/404.html", "_blank");
  });

  cancelButtonM.addEventListener("click", function () {
    popupM.classList.add("hidden"); // Hide the popup
    popupM.classList.remove("popup"); // Hide the popup
  });

  //----------------- See More Popup -----------------//

  //----------------- Skills OnClick -----------------//
  const cards = document.getElementsByClassName("nft");

  cards[0].addEventListener("click", function () {
    window.open("src/html/programming.html", "_blank");
  });

  cards[1].addEventListener("click", function () {
    window.open("https://www.youtube.com/@martas_vfx/", "_blank");
  });

  cards[3].addEventListener("click", function () {
    window.open("src/html/%3F.html", "_blank");
  });

  //----------------- Skills OnClick -----------------//

  //----------------- Random Footer Text -----------------//
  const footer = document
    .getElementsByClassName("footer")[0]
    .getElementsByTagName("p")[1];
  const footerTexts = [
    "All right reserver... bla bla bla",
    "Všetky práva vyhradené... MNOU",
    "No but seriously, all rights reserved",
    "No budget left for this",
    "Copyright infringement? Who, us?",
    "We're not responsible for anything",
    "Made with love (and a lot of YouTube tutorials)",
    "Warning: contents may be copyrighted",
    "Don't steal my stuff, I need it too",
    "Legal notice: We're watching you",
    "This website is protected by magic spells",
    "All rights reserved, except on Tuesdays",
    "Our lawyers made us put this here",
    "If you copy this, we'll send our cat after you",
    "Enchanted with Protection VI",
    "Protected by Netherite FireWall",
    "This website runs on sheer willpower and dreams",
    "Unfortunately we dont have a sponsor for this kind of shit",
  ];
  const footerIndex =
    Math.floor(Math.random() * footerTexts.length) - Math.floor(Math.random());

  footer.innerText = footerTexts[footerIndex];
  //----------------- Random Footer Text -----------------//
});
