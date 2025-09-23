
$(document).ready(function(){
  let currentSlide = 0;
  const slides = $(".slide");
  const totalSlides = slides.length;

  // Generate dots dynamically
  for (let i = 0; i < totalSlides; i++) {
    $(".slider-dots").append("<span></span>");
  }
  const dots = $(".slider-dots span");
  dots.eq(0).addClass("active");

  function showSlide(index){
    slides.removeClass("active").eq(index).addClass("active");
    dots.removeClass("active").eq(index).addClass("active");
  }

  $(".next").click(function(){
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  $(".prev").click(function(){
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  dots.click(function(){
    currentSlide = $(this).index();
    showSlide(currentSlide);
  });

  // Auto play
  setInterval(function(){
    $(".next").click();
  }, 10000);
});


// ======================================================================
// Pricing Section with carousel 

$(document).ready(function(){
  const $track = $(".pricing-track");
  const $dots = $(".pricing-dots");
  const totalCards = $(".pricing-card").length;
  let currentIndex = 0;
  let startX = 0;
  let endX = 0;
  let cardsToShow = getCardsToShow();
  let maxIndex = Math.ceil(totalCards - cardsToShow);

  // Calculate how many cards to show based on screen
function getCardsToShow(){
  if(window.innerWidth < 768) return 1;   // mobile → 1 card
  if(window.innerWidth < 1024) return 2.5; // tablet → 2.5 cards
  return 3.5; // desktop → 3.5 cards
}

  // Recalculate on resize
  $(window).on("resize", function(){
    cardsToShow = getCardsToShow();
    maxIndex = Math.ceil(totalCards - cardsToShow);
    if(currentIndex > maxIndex) currentIndex = maxIndex;
    generateDots();
    updateCarousel();
  });

  function generateDots(){
    $dots.empty();
    for(let i=0; i<=maxIndex; i++){
      $dots.append(`<span data-index="${i}"></span>`);
    }
    $dots.find(`span[data-index="${currentIndex}"]`).addClass("active");
  }

function updateCarousel(){
  const trackWidth = $(".pricing-carousel").width() + 20;
  const cardWidth = trackWidth / cardsToShow;
  $track.css("transform", `translateX(-${currentIndex * cardWidth}px)`);
  $dots.find("span").removeClass("active");
  $dots.find(`span[data-index="${currentIndex}"]`).addClass("active");
}

  $(".pricing-next").click(function(){
    if(currentIndex < maxIndex){
      currentIndex++;
      updateCarousel();
    }
  });

  $(".pricing-prev").click(function(){
    if(currentIndex > 0){
      currentIndex--;
      updateCarousel();
    }
  });

  $dots.on("click", "span", function(){
    currentIndex = $(this).data("index");
    updateCarousel();
  });

  // Swipe/drag events
  $track.on("mousedown touchstart", function(e){
    startX = e.pageX || e.originalEvent.touches[0].pageX;
  });

  $track.on("mouseup touchend", function(e){
    endX = e.pageX || (e.changedTouches ? e.changedTouches[0].pageX : 0);
    let diff = endX - startX;
    if(Math.abs(diff) > 50){
      if(diff < 0 && currentIndex < maxIndex){
        currentIndex++;
      } else if(diff > 0 && currentIndex > 0){
        currentIndex--;
      }
      updateCarousel();
    }
  });

  // Init
  generateDots();
  updateCarousel();
});



// ===================================================
// COST CALCULATOR
$(document).ready(function(){
  function calculateCost(){
    let destination = $("#destination option:selected").data("price");
    let carType = $("#carType").val();
    let carMultiplier = $("#carType option:selected").data("multiplier");

    if(destination && carMultiplier){
      let price = destination * carMultiplier;
      $("#calculatedPrice").text(price + " AED");

      // Update Car Image
      let carImg = "assets/img/placeholder-car.png";
      if(carType === "rangeRover") carImg = "assets/img/rangover.webp";
      if(carType === "corolla") carImg = "assets/img/crolla.webp";
      if(carType === "attrage") carImg = "assets/img/mitsubishi.webp";

      $("#carPreview").attr("src", carImg).addClass("active");
    }
  }

  // Trigger calculation on form submit
  $("#tripCalculator").on("submit", function(e){
    e.preventDefault();
    calculateCost();
  });

  // Also run once when the page loads
  calculateCost();
});
