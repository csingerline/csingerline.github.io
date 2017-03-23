$(document).ready(function () {

    loadItems();

});



//Click  Add Dollar, Quarter,  Dime, or Nickel

// 100 for 1 dollar 25 for quart ... etc and divide by 100 for better accuarcy.
// or work with local variable and just display.

$('#addDollar').click(function(event) {
    var totalCash = $('#totalCash');
    totalCash.val(parseFloat(totalCash.val()) + 1);
    var newT = Math.round(totalCash.val());
    totalCash.val() == newT;
    });

$('#addQuarter').click(function (event) {
    var totalCash = $('#totalCash');
    Math.round(totalCash.val(parseFloat(totalCash.val()) + .25),2);
});

$('#addDime').click(function (event) {
    var totalCash = $('#totalCash');
    Math.round(totalCash.val(parseFloat(totalCash.val()) + .1),2);
});

$('#addNickel').click(function (event) {
    var totalCash = $('#totalCash');
    Math.round(totalCash.val(parseFloat(totalCash.val()) + 5 / 100),2);
});




//Change Return

//.on('click',function(event) ... etc deprecated for .click
///.on('hover', ... etc more usable


$('#changeReturn').click(function (event) {

    $('#changeBox').empty();

    var totalCash = $('#totalCash');
    var cents = totalCash.val();
    var change = totalCash.val() * 100;
    console.log(change);
    var quarters = change / 25;
    quarters = Math.floor(quarters);
    //Floor rounds down
    Math.

    change = change - quarters * 25;
    console.log(change);
    var dimes = Math.floor(change / 10);
    change = change - dimes * 10;

    console.log(change);

    var nickels = Math.floor(change / 5);
    change = change - nickels * 5;
    console.log(change);

    var pennies = Math.floor(change / 1);

    //var totalQuarter = (cents / quarter);
    //cents = (cents - (totalQuarter * -.25));
    
    //var totalDime = (cents / dime);
    //cents = (cents - (totalDime * -.1));

    //var totalNickel = (cents / nickel);
    //cents = (cents - (totalNickel * -.05));

    //var totalPenny = (cents / penny);
    //cents = (cents - (totalPenny * -.01));

    $('#changeBox').append("Quarters: " + quarters + ", Dimes: " + dimes + ", Nickels: " + nickels + ", Pennies: " + pennies);

    $('#totalCash').val(0);

    $('#item').val('');
    $('#purchaseMessage').empty();
});






function loadItems() {
    // we need to clear the previous content so we don't append to it
    // set up to clear quantities everytime reloaded                                clearWeatherTable();
    // grab the the tbody element that will hold the rows of contact information
    var contentRows = $('#contentRows');
    var enterQ1 = $('#enterQ1')

    $.ajax({
        type: 'GET',
        
        url: "http://localhost:8080/items",
        success: function (data, status) {

            //Add Quantity Left

            var q1 = data[0].quantity
            enterQ1.append(q1);
            var q2 = data[1].quantity
            enterQ2.append(q2);
            var q3 = data[2].quantity
            enterQ3.append(q3);
            var q4 = data[3].quantity
            enterQ4.append(q4);
            var q5 = data[4].quantity
            enterQ5.append(q5);
            var q6 = data[5].quantity
            enterQ6.append(q6);
            var q7 = data[6].quantity
            enterQ7.append(q7);
            var q8 = data[7].quantity
            enterQ8.append(q8);
            var q9 = data[8].quantity
            enterQ9.append(q9);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                .attr({ class: 'list-group-item list-group-item-danger' })
                .text('Error calling web service.  Please try again later.'));
        }
    });
}


//Clickable Divs

$('#div1row1').click(function (event) {
    $('#item').val(1);
});

$('#div2row1').click(function (event) {
    $('#item').val(2);
});

$('#div3row1').click(function (event) {
    $('#item').val(3);
});

$('#div1row2').click(function (event) {
    $('#item').val(4);
});

$('#div2row2').click(function (event) {
    $('#item').val(5);
});

$('#div3row2').click(function (event) {
    $('#item').val(6);
});

$('#div1row3').click(function (event) {
    $('#item').val(7);
});

$('#div2row3').click(function (event) {
    $('#item').val(8);
});

$('#div3row3').click(function (event) {
    $('#item').val(9);
});

$('#makePurchasebtn').click(function (event) {
    var totalCash = $('#totalCash');
    var itemNumber = $('#item');
    purchaseItem(totalCash.val(), itemNumber.val());
});
// set up for candy purchase

function clickToBuy(itemNumber) {


    $('#makePurchasebtn').click(function (event) {
        var totalCash = $('#totalCash');
        
        purchaseItem(totalCash.val(), itemNumber);
    });

};

function purchaseItem(totalCash, itemNumber) {
    // we need to clear the previous content so we don't append to it
    // set up to clear quantities everytime reloaded                                clearWeatherTable();
    // grab the the tbody element that will hold the rows of contact information
    var contentRows = $('#contentRows');
    var purchaseMessage = $('#purchaseMessage');
    var purchase = $('#makePurchasebtn');
    var change = $('#changeBox');

    $.ajax({
        type: 'GET',

        url: "http://localhost:8080/money/"+totalCash +"/item/"+itemNumber,
        success: function (data, status) {
            
            $('#purchaseMessage').empty();
            purchaseMessage.append("Thank you!!!");

            $('#changeBox').empty();
            if (data.quarters > 0){
                change.append("Quarters: " + data.quarters);
            }
            if (data.dimes > 0) {
                change.append("Dimes: " + data.dimes);
            }
            if (data.nickels > 0) {
                change.append("Nickels: " + data.nickels);
            }
            if (data.pennies > 0) {
                change.append("Pennies: " + data.pennies);
            }
        },
        error: function (data) {

            if (data.status == 422) {
                $('#purchaseMessage').empty();
               
                
                purchaseMessage.append(data.responseJSON.message);
                $('#changeBox').val(0);
            }
            else {
            $('#errorMessages')

                .append($('<li>')
                .attr({ class: 'list-group-item list-group-item-danger' })
                .text('Error calling web service.  Please try again later.'));
        }  }
    });
}






// processes validation errors for the given input.  returns true if there
// are validation errors, false otherwise
function checkAndDisplayValidationErrors(input) {
    // clear displayed error message if there are any
    $('#errorMessages').empty();
    // check for HTML5 validation errors and process/display appropriately
    // a place to hold error messages
    var errorMessages = [];

    // loop through each input and check for validation errors
    input.each(function () {
        // Use the HTML5 validation API to find the validation errors
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    // put any error messages in the errorMessages div
    if (errorMessages.length > 0) {
        $.each(errorMessages, function (index, message) {
            $('#errorMessages').append($('<li>').attr({ class: 'list-group-item list-group-item-danger' }).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }

    
}








