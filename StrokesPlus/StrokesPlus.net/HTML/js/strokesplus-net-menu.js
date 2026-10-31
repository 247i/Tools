var skipNextContextMenu = false;

$(function() {

    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {
        //2 == right button
        if(e.button === 2 && $(e.target).parents(".custom-menu").length > 0) {
            //skipNextContextMenu = true;
            e.preventDefault();
        } else {
            if(document.getElementById("custom-menu").style.display != "none") {
                // If the clicked element is not the menu
                if (!$(e.target).parents(".custom-menu").length > 0) {
                    e.preventDefault();
                    menuHide();
                }
            }
        }
    });

    /*
    $(document).bind("mouseup", function (e) {
        //2 == right button
        if(e.button === 2 && $(e.target).parents(".custom-menu").length > 0) {
            e.preventDefault();
            $(e.target).click();
        }
    });
    */

    $(document).bind("contextmenu", function (e) {
        //2 == right button
        if(e.button === 2 && $(e.target).parents(".custom-menu").length > 0) {
            e.preventDefault();
            $(e.target).click();
        }
    });       

    // If the menu element is clicked
    $(document).on('click', ".custom-menu li", function(){
        
        var callback = $(this).data("callback");
        if (callback) {
            var fn = window[callback];
            if (typeof fn === 'function') {
                fn($(this).data('menudata'));
            }
        } else {
            window.OnContextMenuItemClick($(this).data('menudata'));
        }   

        // Hide it AFTER the action was triggered
        menuHide();
    });
});

function menuHide() {
    $(".custom-menu").hide(0);
    // Clear action list Category active class if no categories expanded, added on contextmenu event
    if($(`#accordion_${window.currentSection.ActionList.Id} .card-header[aria-expanded='true']`).length > 0) {
        $(`#accordion_${window.currentSection.ActionList.Id} .card-header`).removeClass('active');
    }
    window.OnContextMenuItemClick = null;
}

function menutest(msg) {
    alert(msg);
}