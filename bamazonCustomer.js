//---------------------------  Global Variables   -----------------------------
//Setting these two Global variables as I will be using them in several functions 

	var userItem;
	var userQty;

// Also requiring the node packages:  inquirer and mysql
	var inquirer  = require("inquirer");
	var mysql = require("mysql"); 
//------------------------------------------------------------------------------


//---------------------     Connecting to DataBase    ---------------------------- 
//Establishing my connection's parameters for the bamazon database
	var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "185454",
		database: "bamazon_db"
	});

	//And connecting to the database while also welcoming the user via the command line
	connection.connect(function(err){
		//catching any errors
		if(err) throw err;
		// welcoming the user
		console.log("\n\n                    Welcome to Bamazon!! \n\n");
		// prompting the user to see if they would like to view the current products
		promptForProducts();
	})
//------------------------------------------------------------------------------



//----------------------   promptForProducts  ----------------------------------------
// This function prompts the user for the option of viewing the products 
	function promptForProducts(){
		// Using inquirer to establish a confirm-prompt for the user
		inquirer.prompt([
			{
				type:'confirm',
				name:"products",
				message:"Would you like to view our products? "
			}
		]).then(function(answer){
			// If the user answeres "Yes", then we ...
			if(answer.products){
				// query the database for all the products
				connection.query("SELECT * FROM products", function(err,results){
					if (err) throw err;
					// console the name of the three (3) things the user will be given
					console.log( "\n| id |  Product Name  | Price | \n");
					
					// Loop through the results to acquire & console the id, name , & price
					for (var i=0; i < results.length; i++){
			
						console.log( "| " + results[i].id +
							" |" + results[i].product_name +
							"| " + results[i].price +" |");
					}
					console.log("\n");

					// after logging all items, prompt the user for the id of item they 
					// would like to buy
					promptForID();

				});
			}
			else{

				//If the user does not want to see the products before buying,  prompt 
				// the user for the id of item they would like to buy
				promptForID();
			}

		}); // end of then()

	} // end of promptForProducts()
//------------------------------------------------------------------------------




//-----------------------------  promptForID()  ---------------------------------
// This function Prompts the user of the item id #
	function promptForID(){
		inquirer.prompt([
			{
				type:'input',
				name:"itemID",
				message:"Enter ID # of the item you would like to buy: ",
				// before proceeding to get the item information, we need to validate
				// the that user entered a numerical # that is greater than 0 
				// (item id's start at 1)
				validate: function(userValue){
					if(!isNaN(userValue)&& userValue >0){
						return true;
					}
					else {
						console.log("\n\n ***     Please enter a valid numerical item #     ***\n\n");
						return false;
					}
				}
			}
		]).then(function(answer){
			// once we validate the user's input, change the global variable "userItem"
			userItem = answer.itemID;

			// prompt the user for the amount of this item that they would like to buy
			promptForQty();
		}) // end of them()
	} //end of promptForID()
//------------------------------------------------------------------------------


//-----------------------------  promptForQty()  ---------------------------------
// This function prompts the user for the Quantity of an item they would like to buy
function promptForQty(){
	inquirer.prompt([

		{
			type:'input',
			name:"howMany",
			message: "How many units of this item would you like to purchase?",
			// The quanitity must be a numerical value greater than 0
			validate: function(userValue){
				if(!isNaN(userValue) && userValue >0){
					return true;
				}
				else {
					console.log("\n\n ***     Please enter a valid quantity."
						+ " ( greater than 0 )     ***\n\n");
					return false;
				}
			}

		}

	]).then(function(answers){
		// Once validated, update the global variable to reflect the quantity entered
		userQty = answers.howMany;

		//query the database and all information related to the item ID #
		connection.query("SELECT * FROM products WHERE id =" + userItem, function(err,results){
			if (err) throw err;

			// make a variable for the current stock quantity and the price 
			var actualQty = results[0].stock_quantity;
			var itemPrice = results[0].price;

			// check if the user's quantity request is in stock. Let there is less than the request
			if(actualQty< userQty && actualQty !=0){
				console.log("\n\n*** There is not enough of this item to complete your purchase. \n\n" 
					+ "The current quantity of <<<   "+ results[0].product_name 
					+ " >>> in stock is: " + results[0].stock_quantity + " *** \n\n");
				

				// If the item is not in stock, allow the user to change the Qty via userChangeQty()
				userChangeQty(results[0].product_name);
			}

			// If there is absolutely NO Stock, let the user know
			else if(actualQty==0){
				console.log("\n\n****   Regretably, this item is no longer in stock.    ****\n\n");
				
				//then prompt the user to order more things via OrderMoreThings()
				orderMoreThings();

			}
			else{

				// If the quantity requested IS in stock and available, update the database
				// to reflect the decrease in stock. Do this with updateInventory()
				updateInventory(userItem,userQty,actualQty,itemPrice);
			}

		})
	})
}; //end of promptUser()
//------------------------------------------------------------------------------




//-----------------------   Three (3) Helper Functions   --------------------------
// Below are the three (3) helper functions that will either allow the user to 
// to change the quantity of items they would like to order, order more things,
// or that will update the inventory to reflect what the user has ordered

	// This function prompts the user to change the quantity of an item that is either
	// OUT of stock, or is the stock is lower than the amount they want
		function userChangeQty(prodName){
			inquirer.prompt([
				{
					type: "confirm",
					name: "repeat",
					message:"Would you like to change your quantity of "+ prodName + " ?"

				}
			]).then(function(answer){
				if(answer.repeat){
					promptForQty();
				}
				else{
					orderMoreThings();
				}

			});
		};
	// End of userChangeQty()



	// This function prompts the user to continue to order more things. If not, the process ends
		function orderMoreThings(){
			inquirer.prompt([
				{
					type: "confirm",
					name: "moreThings",
					message:"Would you like to place another order?"

				}
			]).then(function(answer){
				if(answer.moreThings){
					promptForProducts();
				}
				else{
					console.log("\n\n     Thank you for shopping at Bamazon! Have a great day!\n\n");
					process.exit();
				}

			});
		};
	// End of orderMoreThings()


	//This function updates the current inventory based on what product the user selected
	// the function takes in the item id #, the amount the user wants to buy, the amount
	// that is actaully in stock, and the price of the item
		function updateInventory(itemID,userQty, actualQty,price){
			
			// subtract the quanitity the user ordered from the quantity in stock
			var set = actualQty - userQty;
			// calculate the total based on price and quantity ordered
			var total = price*userQty;
			
			connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity:set},{id:itemID}], function(err,results){
				if (err) throw err;
				
				// log the user's successfull order and the total coset
				console.log("\n\n ****     Your order has been placed. Your total is $" + total+ "     *** \n\n");
				
				//ask the user if they would like to orderMoreThings()
				orderMoreThings();
			});
		}
	// End of updateInventory()
//------------------------------------------------------------------------------	