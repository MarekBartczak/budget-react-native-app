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
    description
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
  }
}

export default FixedExpense;
