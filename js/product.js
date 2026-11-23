$(document).ready(function () {
    var links = $(".product .seeMore");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var filters = $(link).data("filters");

        //makes it so that multiple filters can be searched (each filter seperated by ",")
        var parts = String(filters).split(",");
        for (var j = 0; j < parts.length; j++) {
            parts[j] = encodeURIComponent(parts[j].trim());
        }

        link.href = "gallery.html?filter=" + parts.join(",");
    }
});