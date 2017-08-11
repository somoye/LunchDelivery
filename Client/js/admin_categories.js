function getCategorisList() {
    makeGetReq("categories/", {}, function (response) {
        var sortedList = response.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)} );
        $('.categories-table tbody').html(null);
        $.each(sortedList, function(i) {
            $('<tr>' + 
            '<td>' + sortedList[i].id + '</td>' +
            '<td>' + sortedList[i].name + '</td>' +
            '<td>' + sortedList[i].imageUrl + '</td>' +
            '<td>' + '<a href="#" class="btn btn-danger delete-category">Delete</a>' + '</td>' +
            '</tr>'
            ).appendTo('.categories-table tbody');

            var categoryId = sortedList[i].id;
            $(".delete-category").click(function() {
                deleteCategory(categoryId) 
            })
        })
        console.log(response);
    })
};

function deleteCategory(categoryId) {
    makeDeleteReq("categories/" + categoryId, getCategorisList());
};

getCategorisList();

function addCategory(name) {
    makePostReq("categories/", {
        "name": name
    }, getCategorisList())
}

$(".add-category").click(function() {
    var name = $('input:text[name=name]').val();

    addCategory(name);
})
