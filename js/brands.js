$("#Brands").ready(function(){
    getBrands();
});

function btn_insertBrandClick(){
    $("#i_insertDevice").addClass('fa-spin');
    insertBrand();
};

function getBrands(){
    $.ajax({
        url:"http://localhost:1337/getBrands",
        type:"GET",
        success: function(res){
            $("#pe_brands").remove();
            $("#pe_brands_container").append('<div id="pe_brands" class="row"></div>   ');
            $.each(res, function(index,row){                
                $("#pe_brands").append(row.BrandID+') <strong>'+row.Name+'</strong><br>'+row.Description+'<br><br><a href="'+row.Website+'">'+row.Website+'</a><br><br><br><br>');
            });         
        },
        error:function(error){
            console.log("getBrands error");
        }
    });
};

function getBrandsByTextSearch(searchstring){
    $("#pe_brands").addClass("animated fadeOut");
    $("#pe_brands").remove();
    $("#pe_brands_container").append('<div id="pe_brands" class="row"></div>');
    var data = {"searchstring": searchstring};
    data = JSON.stringify(data);
    $.ajax({
        url:"http://localhost:1337/getBrandsByTextSearch",
        type:"POST",
        data: data,
        success: function(res){
            if(res[0].length>0){
                $.each(res[0], function(index,row){
                    $("#pe_brands").append(row.BrandID+') <strong>'+row.Name+'</strong><br>'+row.Description+'<br><br><a href="'+row.Website+'">'+row.Website+'</a><br><br><br><br>');
                });
            }else{
                $("#pe_brands").append('<h4>No brand found... :( </h4>');
            }            
            $("#i_getBrands").removeClass('fa-spin');
        },
        error:function(error){
            $("#pe_brands").append('<h4>Oh no! Something gone wrong :S</h4><small>'+error.statusText+' '+error.status+', try later...</small>');
            $("#i_getBrands").removeClass('fa-spin');
        }
    });
};

function insertBrand(){
    var data = { 
        "name" : document.getElementById("name").value, 
        "desc" : document.getElementById("desc").value,
        "webs" : document.getElementById("webs").value
    };
    data = JSON.stringify(data);
    $.ajax({
        url:"http://localhost:1337/insertBrand",
        type:"POST",
        data: data,
        success: function(res){
            getBrands();
            $("#i_insertBrand").removeClass('fa-spin');
        },
        error:function(error){
            console.log(error);
            $("#i_insertBrand").removeClass('fa-spin');
        }
    });
}

var last_searchstring_length
$("#search")[0].addEventListener("keyup", function(){
    var searchstring = document.getElementById("search").value;    
    if(searchstring.length < last_searchstring_length || last_searchstring_length <= 3){
        if(searchstring.length>=3){
            getBrandsByTextSearch(searchstring);
        }else{
            if(last_searchstring_length > 2){
               getBrands(); 
            }            
        }
    }    
    last_searchstring_length = searchstring.length
});