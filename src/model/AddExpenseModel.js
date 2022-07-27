export class AddExpenseModel{
  
      constructor(description, categoryId, expenseDate, price, userId) {
        this.description = description;
        this.categoryId = categoryId;
        this.expenseDate = expenseDate;
        this.price = price;
        this.userId = userId;
      }

}