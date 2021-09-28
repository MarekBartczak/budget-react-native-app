class FixedExpense {
  constructor(
    id,
    date,
    paidDate,
    title,
    recipient,
    isPaid,
    cost,
    interval,
    description,
    history
    // bankAccountNumber
  ) {
    this.id = id;
    this.date = date;
    this.paidDate = paidDate;
    this.title = title;
    this.recipient = recipient;
    this.isPaid = isPaid;
    this.cost = cost;
    this.interval = interval;
    this.description = description;
    this.history = history;
    // this.bankAccountNumber = bankAccountNumber;
  }
}

export default FixedExpense;
