export class EditExpenseModel{
    constructor(id, description, categoryId, expenseDate, price, userId) {
        this.id = id;
        this.description = description;
        this.categoryId = categoryId;
        this.expenseDate = expenseDate;
        this.price = price;
        this.userId = userId;
      }
}