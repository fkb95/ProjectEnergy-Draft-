$("#Devices").ready(function(){
    getDevices();
    getBrandsForDevice();
});


function btn_getDevicesClick(){
    $("#i_getDevices").addClass('fa-spin');
    getDevices();
};

function btn_insertDeviceClick(){
    $("#i_insertDevice").addClass('fa-spin');
    insertDevice();
};

function getBrandsForDevice(){
    $.ajax({
        url:"php/getBrands.php",
        type:"GET",
        success: function(res){
            res = JSON.parse(res);
            $("#device_brand option").remove();
            $("#device_brand").append('<option id="brand_0">Nothing</option>');
            $.each(res, function(index,row){                
                $("#device_brand").append('<option brandid="'+row.BrandID+'">'+row.Name+'</option>');
            });         
        },
        error:function(error){
            console.log("getBrands error");
        }
    });
};

function getCategories(){
    $.ajax({
        url:"php/getCategories.php",
        type:"GET",
        success: function(res){
            res = JSON.parse(res);
            $("#category option").remove();
            $("#category").append('<option id="category_0">Nothing</option>');
            $.each(res, function(index,row){
                $("#category").append('<option categoryid="'+row.CategoryID+'">'+row.Name+'</option>');                        
            });                      
        },
        error:function(error){
            console.log("getCategories error");
        }
    });
};

function getDevices(){
    $("#pe_products").addClass("animated fadeOut");
    $("#pe_products").remove();
    $("#pe_device_container").append('<div id="pe_products" class="row"></div>');    
    $.ajax({
        url:"php/getDevices.php",
        type:"GET",
        cache: false,
        success: function(res){
            res = JSON.parse(res);
            if(res.length>0){
                $.each(res, function(index,row){
                    $("#pe_products").append(buildCard(row));
                });
            }else{
                $("#pe_products").append('<h4>No products here... :( </h4>');
            }            
            $("#i_getDevices").removeClass('fa-spin');
        },
        error:function(error){
            $("#pe_products").append('<h4>Oh no! Something gone wrong :S</h4><small>'+error.statusText+' '+error.status+', try later...</small>');
            $("#i_getDevices").removeClass('fa-spin');
        }
    });
};

function getDeviceByID(deviceid){
    var data = {"deviceid": deviceid};
    //data = JSON.stringify(data);
    $.ajax({
        url:"php/getDeviceByID.php",
        type:"POST",
        data: data,
        success: function(res){            
            res = JSON.parse(res);
            res = res[0];
            $("#modal_deviceSpecifics").ready(function(){
                $("#pe_deviceSpefics").remove();
                $("#modal_deviceSpecifics .modal-content").append('<div class="modal-body" id="pe_deviceSpefics"></div>');
                $("#pe_deviceSpefics").append(
                    '<div class="modal-header-custom">'+
                        '<p class="modal-title">'+res.Brand+' '+res.Name+'</p>'+
                    '</div>'+
                    '<div class="row modal-table-container">'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Category</div>'+
                                '<div class="table-element value">'+res.Category+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Brand</div>'+
                                '<div class="table-element value">'+res.Brand+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Name</div>'+
                                '<div class="table-element value">'+res.Name+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Description</div>'+
                                '<div class="table-element value">'+res.Description+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Consumption</div>'+
                                '<div class="table-element value">'+res.kHw+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Resistence</div>'+
                                '<div class="table-element value">'+res.Resistence+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Min Watts</div>'+
                                '<div class="table-element value">'+res.minWatt+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Max Watts</div>'+
                                '<div class="table-element value">'+res.maxWatt+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Volts</div>'+
                                '<div class="table-element value">'+res.Volts+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Ampere</div>'+
                                '<div class="table-element value">'+res.Ampere+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Website</div>'+
                                '<div class="table-element value"><a href="'+res.Website+'">'+res.Website+'</a></div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-xs-12 col-sm-6 no-padding">'+
                            '<div class="table-container">'+
                                '<div class="table-element field">Motto</div>'+
                                '<div class="table-element value">'+res.BrandDescription+'</div>'+
                            '</div>'+
                        '</div>'+
                  '</div>'+
                  '<div class="modal-footer-custom">'+
                        '<button class="modal-button" type="button" data-dismiss="modal">Close</button>'+
                  '</div>');
            });            
        },
        error:function(error){
            
        }
    });
};

function getDevicesByTextSearch(searchstring){
    $("#pe_products").addClass("animated fadeOut");
    $("#pe_products").remove();
    $("#pe_device_container").append('<div id="pe_products" class="row"></div>');
    var data = {"searchstring": searchstring};
    $.ajax({
        url:"php/getDevicesByTextSearch.php",
        type:"POST",
        data: data,
        success: function(res){
            res = JSON.parse(res);
            if(res.length>0){
                $.each(res, function(index,row){
                    $("#pe_products").append(buildCard(row));
                });
            }else{
                $("#pe_products").append('<h4>No products here... :( </h4>');
            }            
            $("#i_getDevices").removeClass('fa-spin');
        },
        error:function(error){
            $("#pe_products").append('<h4>Oh no! Something gone wrong :S</h4><small>'+error.statusText+' '+error.status+', try later...</small>');
            $("#i_getDevices").removeClass('fa-spin');
        }
    });
};

function insertDevice(){
    var name = document.getElementById("device_name").value;
    var desc = document.getElementById("device_desc").value;
    var brand = $('#device_brand').find('option:selected', this).attr('brandid');
    var category = $('#category').find('option:selected', this).attr('categoryid');
    var minwatt = parseFloat(document.getElementById("minwatt").value);
    var maxwatt = parseFloat(document.getElementById("maxwatt").value);
    var khw = parseFloat(document.getElementById("khw").value);
    var volts = parseFloat(document.getElementById("volts").value);
    var ampere = parseFloat(document.getElementById("ampere").value);
    var resistence = parseFloat(document.getElementById("resistence").value);
    var data = { 
        "name" : name, 
        "desc" : desc,
        "brand" : brand, 
        "category" : category,
        "minwatt" : minwatt,
        "maxwatt" : maxwatt,
        "khw" : khw,
        "volts" : volts,
        "ampere" : ampere,
        "resistence" : resistence
    };
    $.ajax({
        url:"php/insertDevice.php",
        type:"POST",
        data: data,
        success: function(res){
            getDevices();
            $("#i_insertDevices").removeClass('fa-spin');
        },
        error:function(error){
            console.log(error);
            $("#i_insertDevices").removeClass('fa-spin');
        }
    });
}

function deleteDeviceByID(deviceid){
    var data = { "deviceid" : deviceid};
    $.ajax({
        url:"php/deleteDeviceByID.php",
        type:"POST",
        data: data,
        success: function(res){
            getDevices();
        },
        error:function(error){
            console.log(error);
        }
    });
}

$("#btn_modal_insertDevice").click(function(){
    getBrands();
    getCategories();
})

$(document).on("click", ".pe_product_delete", function () {
     $("#modal_deleteDeviceByID .form-group").remove();
    var DeviceID = $(this).data('id');
    var Name = $(this).data('name');
     $("#modal_deleteDeviceByID .form-horizontal").append(
        '<div class="form-group">'+
            '<h3>Do you really want to delete '+Name+' ?</h3>'+
            '<button id="btn_insertDevice" data-dismiss="modal" class="btn btn-primary btn-lg" onclick="deleteDeviceByID('+DeviceID+')">Yes</button>'+
            '<button type="button" class="btn btn-default btn-lg" data-dismiss="modal">No</button>'+
        '</div>');
});

var last_searchstring_length
$("#device_search")[0].addEventListener("keyup", function(){
    var searchstring = document.getElementById("device_search").value;    
    if(searchstring.length < last_searchstring_length || last_searchstring_length <= 3){
        if(searchstring.length>=3){
            getDevicesByTextSearch(searchstring);
        }else{
            if(last_searchstring_length > 2){
               getDevices(); 
            }            
        }
    }    
    last_searchstring_length = searchstring.length
});

function buildCard(device){
    var cardclass = "";
    switch (device.RootCategoryID){
        case "1":
            cardclass="electronic"
            break;
        case "2":
            cardclass="computer"
            break;
        case "3":
            cardclass="console"
            break;
        default:
            cardclass=""
    };
    var card ='<div class="col-xs-12 col-sm-6 col-md-4 hvr-grow">'+
                    '<div class="card-container '+cardclass+'">'+
                        '<div class="card">'+
                            '<div class="card-title">'+device.Brand+' '+device.Name+'</div>'+
                            '<div class="card-divider-big '+cardclass+'"></div>'+
                            '<div class="card-info">Brand: '+device.Brand+'</div>'+
                            '<div class="card-divider-small '+cardclass+'"></div>'+
                            '<div class="card-info">Category: '+device.Category+'</div>'+
                            '<div class="card-divider-small '+cardclass+'"></div>'+
                            '<div class="card-info">Description: '+device.Description+'</div>'+
                            '<div class="card-divider-small '+cardclass+'"></div>'+
                            '<div class="card-info">Consumption: '+device.kHw+'</div>'+
                            '<div class="card-divider-small '+cardclass+'"></div>'+
                            '<button class="card-button '+cardclass+'" type="button" data-toggle="modal"  data-backdrop="static" data-target=".product"  onclick="getDeviceByID('+device.DeviceID+')">More Info</button>'+                                                                                          
                            //'<i class="pe_product_delete hvr-grow fa fa-times fa-lg" data-toggle="modal" data-target="#modal_deleteDeviceByID" data-id="'+device.DeviceID+'" data-name="'+device.Name+'"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    return card;
}