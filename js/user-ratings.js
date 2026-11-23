$(document).ready(function () {
    var STORAGE_KEY = "site_local_reviews";

    var form = $("#reviewForm");
    if (form.length === 0) {
        return;
    }

    var nameInput = document.getElementById("reviewName");
    var commentInput = document.getElementById("reviewComment");
    var errorMessage = document.getElementById("errorMessage");
    var reviewPost = document.querySelector(".reviewPost");
    var averageScore = document.getElementById("averageScore");
    var averageStars = document.getElementById("averageStars");
    var averageCount = document.getElementById("averageCount");

    //gets reviews
    var reviews = [];
    try {
        reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        reviews = [];
    }

   //needed so html is not returned
    function escapeHTML(text) {
        return $("<div>").text(text).html();
    }

    function repeatStar(n) {
        var s = "";
        for (var i = 0; i < n; i++) {
            s += "★";
        }
        return s;
    }

    //gold and gray stars
    function starsHTML(rating) {
        return "<span>" + repeatStar(rating) + "</span>" + '<span class="empty">' + repeatStar(5 - rating) + "</span>";
    }

    //shows reviews
    function renderReviews() {
        var html = "";

        for (var i = 0; i < reviews.length; i++) {
            var review = reviews[i];

            html += '<article>' + '<div class="review-header">' + '<span class="reviewer-name">' + escapeHTML(review.name) + '</span>' + '</div>' + '<div class="review-stars">' + starsHTML(review.rating) + '</div>' + '<p class="review-text">' + escapeHTML(review.comment) + '</p>' + '</article>';
        }

        reviewPost.innerHTML = html;
    }

    //summary of reviews box
    function updateSummary() {
        var total = reviews.length;
        var sum = 0;

        for (var i = 0; i < total; i++) {
            sum += reviews[i].rating;
        }

        var average = 0;
        if (total > 0) {
            average = sum / total;
        }

        averageScore.textContent = average.toFixed(1);
        averageStars.style.setProperty("--rating", average);

        if (total === 0) {
            averageCount.textContent = "No reviews yet";
        } else if (total === 1) {
            averageCount.textContent = "Based on 1 review";
        } else {
            averageCount.textContent = "Based on " + total + " reviews";
        }
    }

    //adding a review
    form.submit(function (e) {
        e.preventDefault();

        var checked = form.find('input[name="rating"]:checked');
        var comment = commentInput.value.trim();

        //wont work if no rating or comment
        if (checked.length === 0 || !comment) {
            errorMessage.style.display = "block";
            return;
        }

        var reviewer = nameInput.value.trim();
        if (!reviewer) {
            reviewer = "Anonymous";
        }

        reviews.push({
            name: reviewer,
            rating: parseInt(checked.val(), 10),
            comment: comment
        });

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        } catch (err) {}

        form[0].reset();
        errorMessage.style.display = "none";
        renderReviews();
        updateSummary();
    });

    //hides error message on default (when something is changed or if form is cleared)
    form.on("input", function () {
        errorMessage.style.display = "none";
    });
    form.on("reset", function () {
        errorMessage.style.display = "none";
    });

    renderReviews();
    updateSummary();
});
