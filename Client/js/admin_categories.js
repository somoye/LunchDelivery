function getCategorisList() {
    makeGetReq("categories/", {}, function (response) {
        var sortedList = response.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)} );
        $('.categories-table tbody').html(null);
        $.each(sortedList, function(i) {
            $('<tr>' + 
            '<td>' + sortedList[i].id + '</td>' +
            '<td>' + sortedList[i].name + '</td>' +
            '<td>' + sortedList[i].imageUrl + '</td>' +
            '</tr>'
            ).appendTo('.categories-table tbody');
        })
        
        console.log(sortedList)
    })
};

getCategorisList();

function addCategory(id, name, url) {
    makePostReq("categories/", {
        "imageUrl": url, 
        "id": id, 
        "name": name
    }, getCategorisList())
}

$(".add-category").click(function() {

    var id = $('input[name=id]').val();
    var name = $('input:text[name=name]').val();
    var url = $('input[name=img-url]').val();

    addCategory(id, name, url);
})