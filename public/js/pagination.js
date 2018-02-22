var pages = parseInt($("#max_page").val());
var page = parseInt($("#current_page").val());
console.log(page + "/" + pages);
document.getElementById('pagination').innerHTML = createPagination(pages, page);

function createPagination(pages, page) {
    var str = '<ul>';
    var active;
    var pageCutLow = page - 1;
    var pageCutHigh = page + 1;
    // Show the Previous button only if you are on a page other than the first
    if (page > 1) {
        str += '<li class="page-item previous no"><a class="previous_page">Previous</a></li>';
    }
    // Show all the pagination elements if there are less than 6 pages total
    if (pages < 6) {
        for (var p = 1; p <= pages; p++) {
            active = page == p ? "active" : "no";
            str += '<li class="'+active+'"><a class="specific_page">'+ p +'</a></li>';
        }
    }
    // Use "..." to collapse pages outside of a certain range
    else {
        // Show the very first page followed by a "..." at the beginning of the
        // pagination section (after the Previous button)
        if (page > 2) {
            str += '<li class="no page-item"><a class="specific_page">1</a></li>';
            if (page > 3) {
                str += '<li class="out-of-range"><a>...</a></li>';
            }
        }
        // Determine how many pages to show after the current page index
        if (page === 1) {
            pageCutHigh += 2;
        } else if (page === 2) {
            pageCutHigh += 1;
        }
        // Determine how many pages to show before the current page index
        if (page === pages) {
            pageCutLow -= 2;
        } else if (page === pages-1) {
            pageCutLow -= 1;
        }
        // Output the indexes for pages that fall inside the range of pageCutLow
        // and pageCutHigh
        for (var p = pageCutLow; p <= pageCutHigh; p++) {
            if (p === 0) {
                p += 1;
            }
            if (p > pages) {
                continue
            }
            active = page == p ? "active" : "no";
            str += '<li class="page-item '+active+'"><a class="specific_page">'+ p +'</a></li>';
        }
        // Show the very last page preceded by a "..." at the end of the pagination
        // section (before the Next button)
        if (page < pages-1) {
            if (page < pages-2) {
                str += '<li class="out-of-range"><a>...</a></li>';
            }
            str += '<li class="page-item no"><a class="specific_page">'+pages+'</a></li>';
        }
    }
    // Show the Next button only if you are on a page other than the last
    if (page < pages) {
        str += '<li class="next_page page-item next no"><a class="next_page">Next</a></li>';
    }
    str += '</ul>';
    // Return the pagination string to be outputted in the pug templates
    document.getElementById('pagination').innerHTML = str;
    return str;
}

$(".next_page").click(function(event){
        var max = parseInt($("#max_page").val());
        console.log("max page: " + max);
        var url = window.location.href;
        var page = url.split("page=")[1];
        console.log(page);
        var next_page_number = parseInt(page) + 1;
        if (next_page_number > max){
            next_page_number = max;
        }
        console.log("next page: "+ next_page_number);
        var new_url = url.split("page=")[0] + "page=" + next_page_number;
        console.log("new url: " + new_url);
        window.location = new_url;
    }
)


$(".previous_page").click(function(event){
        var url = window.location.href;
        var page = url.split("page=")[1];
        console.log(page);
        var previous_page_number = parseInt(page) - 1;
        if(previous_page_number < 0){
            previous_page_number = 0;
        }
        console.log("next page: "+ previous_page_number);
        var new_url = url.split("page=")[0] + "page=" + previous_page_number;
        console.log("new url: " + new_url);
        window.location = new_url;
    }
)

$(".specific_page").click(function(event){
    var page = parseInt($(this).text());
    console.log(page);
    var url = window.location.href;
    var new_url = url.split("page=")[0] + "page=" + page;
    window.location = new_url;
})