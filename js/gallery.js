$(document).ready(function () {
    var buttons = $(".galleryFilters button");
    var allButton = $("#filterAll");
    var filterButtons = buttons.not(allButton);
    var items = $(".galleryItem");

    //the id of the button where "filter-" is replaced with ""
    //gets the needed filter
    function tagOf(button) {
        return button.id.replace("filter-", "");
    }

    //tags of all filter buttons that are active
    function getSelectedTags() {
        var selected = [];
        for (var i = 0; i < filterButtons.length; i++) {
            if ($(filterButtons[i]).hasClass("active")) {
                selected.push(tagOf(filterButtons[i]));
            }
        }
        return selected;
    }

    function applyFilters() {
        var selected = getSelectedTags();

        //if no filter is selected, "All" will automatically be active
        if (selected.length === 0) {
            allButton.addClass("active");
            items.show();
            return;
        }

        allButton.removeClass("active");

        //shows photo if it has the tag
        for (var i = 0; i < items.length; i++) {
            var itemTags = String($(items[i]).data("tag"));
            var match = false;

            for (var j = 0; j < selected.length; j++) {
                if (itemTags.indexOf(selected[j]) !== -1) {
                    match = true;
                }
            }

            if (match) {
                $(items[i]).show();
            } else {
                $(items[i]).hide();
            }
        }
    }

    buttons.click(function () {
        if (this.id === "filterAll") {
            buttons.removeClass("active");
            allButton.addClass("active");
        } else {
            $(this).toggleClass("active");
        }
        applyFilters();
    });

    //for the product page, so that the page can be opened with pre-selected filters
    var query = window.location.search;
    var requested = [];
    var start = query.indexOf("filter=");

    if (start !== -1) {
        var value = query.substring(start + 7).split("&")[0];
        requested = decodeURIComponent(value).split(",");
    }

    for (var i = 0; i < filterButtons.length; i++) {
        if (requested.indexOf(tagOf(filterButtons[i])) !== -1) {
            $(filterButtons[i]).addClass("active");
        }
    }

    applyFilters();
});
