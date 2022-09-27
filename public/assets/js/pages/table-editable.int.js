$(function() {
    // editing existing fields
    var e = {};
    $(".table-edits tr").editable({
        dropdowns: {
            gender: ["Male", "Female"]
        },
        keyboard: true,
        dblclick: false,
        button: true,
        maintainWidth: true,
        buttonSelector: ".edit,.save-tbl-btn, .cancel-changes",


        edit: function(t) {

            $(".edit i", this).removeClass("bx-edit-alt").addClass("bx-save").attr("title", "Save").parent().siblings().removeClass('d-none');
            $('.edit').addClass('d-none');

        },
        save: function(t) {
            $(".edit i", this).removeClass("bx-save").addClass("bx-edit-alt").attr("title", "Edit"), this in e && (e[this].destroy(), delete e[this]);
            $(".save-tbl-btn", this).addClass("d-none").siblings('.cancel-changes').addClass('d-none'), this in e && (e[this].destroy(), delete e[this]);
            $('.edit').removeClass('d-none');

        },
        cancel: function(t) {
            $(".edit i", this).removeClass("bx-save").addClass("bx-edit-alt").attr("title", "Edit"), this in e && (e[this].destroy(), delete e[this]);
            $(".cancel-changes", this).addClass('d-none').siblings('.save-tbl-btn').addClass('d-none'), this in e && (e[this].destroy(), delete e[this]);
            $('.edit').removeClass('d-none');

        }
    })

    // creating new fields

    $('body').on('click', '.add-field', function() {
        // $(this).addClass('d-none');
        $(this).slideToggle();
        var currentIndex = $('.table-editable tbody tr').last().index();
        var cloneItem = $('.cloneCharges');

        //this area clones the new input fields
        $(cloneItem).eq(0).clone(true).appendTo('.table-editable tbody').removeClass('d-none');
        $('.table-editable tbody tr').last().children('.categoryIndex').text(currentIndex + 1);
        // $(cloneItem).eq(clickedIndex).removeClass('d-none');
    });

    $('body').on('click', '.cancel-new-category', function() {
        $(this).parent().parent().remove();
        $('.table-editable .add-field').slideToggle()
    });


});