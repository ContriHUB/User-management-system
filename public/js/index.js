$("#add_user").submit(function(event){
    alert("Data insert successfully");
})
$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray();
    var data={}
    $.map(unindexed_array,function(n,i){
data[n['name']]=n['value']
    })
    var request={
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})
if(window.location.pathname=="/"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")
        var request={
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE",
        }
        if(confirm("Do you really want to remove this record?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully");
                location.reload()
            })
        }
    })
}

$('tbody tr').each(function () {
    const statusCell = $(this).find('td:eq(4)'); 
    const status = statusCell.text().trim();
    if (status == 'Inactive')
    {
        // for hovering actions use moseover and mouseset
        $(this).on('mouseover', function () {
            $(this).css('background-color', 'red');
          }).on('mouseout', function () {
            $(this).css('background-color', ''); 
          });
    }
  });