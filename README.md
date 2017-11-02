# Bamazon

## Description
```
  This application uses the command-line interface (CLI), Node.js, and MySQL to present the user with a 
  storefront. The user has the option of viewing the items that are curently being sold, selecting an item to 
  buy, and changing the quantity of an item if the stock is lower than the user wants. The application uses 
  MySQL to create/update a database of current inventory. 

  The application uses/runs the following functions:

    1. "propmtForProducts()"
    2. "promptForID()"
    3. "promptForQty()"
    4. "userChangeQty()"
    5. "orderMoreThings()"
    6. "updateInventory()"


  Each function is explained below

```

- - -
### "promptForProducts()"

    This function prompts the user for the option of viewing the products that are currently being sold. This 
    prompt accepts a yes/no response. If the user chooses: 

      1. Yes: The user will be able to see the items' ID #, the name, and the price of the item
      2. No: The user function will run promptForID()

- - -

### "promptForID()"
    This function prompts the user for the id # (of the item they would like to purchase). Once the user enters
    a value, the function will validate that the user has entered a numerical value and that the value is greater
    than 0 (item id #'s begin at 1). Once validated, the function will run promptForQty()

- - -

### "promptForQty()"

    This function prompts the user to enter the quantity of the item they would like to buy. The function will
    validate that the user has entered a valid numerical value greater than 0. Once validated, the function will
    query the database for the item the user entered and it will check the current stock for this item. If the 
    current stock quantity is:

      1. Lower than what the user request: The user will be notified that the stock is low and will be given the
      option to change the quantity of the item. ( This is done via the "userChangeQty()" function )
      2. Zero ( 0 ): The user will be notified that the item is out of stock and will be given the option to start
      a new order via the function "orderMoreThings()"
      3. Greater than the user's request: The user will be notified that the order has been placed. The user will
      also be told the total for this order & the stock quantity will be updated to reflect the purchased item(s)

- - -
### "userChangeQty()"

    This function prompts the user to change the quantity of an item that is either OUT of stock or whose stock
    is lower than the amount they want.
    
      1. If the user decides to change the quantity: The function will run "promptForQty()". The current item is 
      still selected but the user has the option to change only the quantity they want
      2. If the user decides not to change the quantiy: The function will run "orderMoreThings()" to allow the 
      user the option of ordering more things or to end their shopping session

- - -

### "orderMoreThings()"

    This function prompts the to confirm if they would like to keep shopping. 

      1. If so: The function will run "promptForProducts()" to allow the user to view the items again
      2. If not: The user will be told "thank you & goodbye" and the shopping session will end

- - -

### "updateInventory()"

    This function updates the current stock quantity, in the database,  based on what quantity of a product the
     user selected to purchase. The function will display the total cost of the item(s) purchased and give the user
     the option to continue shopping via "orderMoreThings()"

- - -

## Notes

  * This application is runs from the command terminal via "bamazonCustomer.js"

- - -

## System Requirements

You will need the following:
  * Node_modules
  * Inquirer
  * MySQL
  
- - -

### Creator: Arturo Salmeron
**Date: November 02, 2017**
