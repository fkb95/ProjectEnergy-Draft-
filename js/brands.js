$("#Brands").ready(function(){
    getBrands();
});

function btn_insertBrandClick(){
    $("#i_insertDevice").addClass('fa-spin');
    insertBrand();
};

function getBrands(){
    $.ajax({
        url:"phpc/getBrands.php",
        type:"GET",
        success: function(res){
            res = JSON.parse(res);
            $("#pe_brands").remove();
            $("#pe_brands_container").append('<div id="pe_brands" class="row row-brand-container"></div>   ');
            $.each(res, function(index,row){
                $("#pe_brands").append(buildBrand(row));
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
    $("#pe_brands_container").append('<div id="pe_brands" class="row row-brand-container"></div>');
    var data = {"searchstring": searchstring};
    $.ajax({
        url:"phpc/getBrandsByTextSearch.php",
        type:"POST",
        data: data,
        success: function(res){
            res = JSON.parse(res);
            if(res.length>0){
                $.each(res, function(index,row){
                    $("#pe_brands").append(buildBrand(row));
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
    $.ajax({
        url:"phpc/insertBrand.php",
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

function buildBrand(brand){
    var brand='<div class="col-xs-12 col-sm-6 col-md-4 no-padding">'+
                    '<div class="brand-element"><a href="'+brand.Website+'">'+brand.Name+'</a></div>'+
                '</div>';
    return brand;
}