function getCategorisList() {
    makeGetReq("categories/", {}, function (response) {
        var sortedList = response.sort(function (a, b) {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        });
        $('.categories-table tbody').html(null);
        $.each(sortedList, function (i) {
            var tr = $('<tr>' +
                '<td>' + sortedList[i].id + '</td>' +
                '<td contenteditable="false" class="name">' + sortedList[i].name + '</td>' +
                '<td>' + sortedList[i].imageUrl + '<input type="file" name="pic" accept="image/*">' + '</td>' +
                '<td>' + '<a href="#" class="btn btn-default edit-category">Edit</a>' + '<div style="display: none;" class="btn-group" role="group">' + 
                '<a href="#" class="btn btn-secondary btn-default save-category">Save</a>' +
                '<a href="#" class="btn btn-secondary btn-default cancel">Cancel</a>' + '</div>' + '</td>' +
                '<td>' + '<a href="#" class="btn btn-danger delete-category">Delete</a>' + '</td>' +
                '</tr>'
            ).appendTo('.categories-table tbody');
            var a = tr.find('.delete-category');

            var categoryId = sortedList[i].id;
            a.click(function () {
                deleteCategory(categoryId)
            });

            var editBtn = tr.find('.edit-category');
            editBtn.click(function () {
                var currentItem = $(this).parents('tr').find('td').filter("[contenteditable]");
                if ($(this).is(":visible")) {
                    $(this).hide();
                    $(this).next().show();
                    currentItem.prop('contenteditable', true)
                }
            });

            var saveBtn = tr.find('.save-category');
            saveBtn.click(function () {
                var currentItem = $(this).parents('tr').find('td').filter("[contenteditable]");
                if ($(this).is(":visible")) {
                    $(this).parent().hide();
                    $(this).parent().prev().show();
                    editCategory(categoryId, currentItem.text())
                    currentItem.prop('contenteditable', false)
                }
            });

            var cancelBtn = tr.find('.cancel');
            cancelBtn.click(function () {
                var currentItem = $(this).parents('tr').find('td').filter("[contenteditable]");
                if ($(this).is(":visible")) {
                    $(this).parent().hide();
                    $(this).parent().prev().show();
                    currentItem.prop('contenteditable', false)
                }
            });
        })
    })
};

getCategorisList();

$(".add-category").click(function () {
    var name = $('input:text[name=name]').val();
    addCategory(name);
})

function addCategory(name) {
    makePostReq("categories/", {
        "name": name
    }, getCategorisList())
};

function editCategory(categoryId, name) {
    makePostReq("categories/" + categoryId, {
        "name": name
    });
};

function deleteCategory(categoryId) {
    makeDeleteReq("categories/" + categoryId, getCategorisList());
};