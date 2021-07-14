class FixedExpense {
  constructor(id, date, paidDate, title, recipient, isPaid, cost, interval) {
    this.id = id;
    this.date = date;
    this.paidDate = paidDate;
    this.title = title;
    this.recipient = recipient;
    this.isPaid = isPaid;
    this.cost = cost;
    this.interval = interval;
  }
}

export default FixedExpense;
