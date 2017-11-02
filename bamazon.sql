DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("One Plus 5","Electronics",500, 2),
("Gateway 1 TB Laptop i7", "Electronics", 750, 5),
("Sticky Note Dispenser", "Supplies", 10, 50),
("Pentel 7mm Blank Gel Pen", "Supplies", 17, 100),
("Bic Highlighters", "Supplies", 5, 75),
("Famous Amous Chocolate Chip Cookies", "Groceries", 2, 80),
("Ritter Sport Butter Biscuit", "Groceries", 60, 45),
("White Athletic/Polo Shirt", "Clothing", 30, 55),
("Vivo Barefoot Boots", "Shoes", 200, 35),
("Nike Air Force Ones", "Shoes", 100, 10);

select * from products;

