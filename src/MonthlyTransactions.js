export const MonthlyTransactions=(month)=>{



    const storedIncome = JSON.parse(localStorage.getItem("incomes")) || [];
    const storedExpense = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedUser =
      JSON.parse(localStorage.getItem("ebcfinance-user")) || null;

    setIncomes(storedIncome);
    setExpenses(storedExpense);
    setUser(storedUser);

    const thisMonthIncome = incomes.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return month === form.month;
    });
    setIncomeByMonth(thisMonthIncome);

    const thisMonthExpenses = expenses?.filter(function (item) {
      const date = new Date(item.date);
      const month = date.toLocaleDateString("en-US", {
        month: "long",
      });

      return month === form.month;
    });
    setExpensesByMonth(thisMonthExpenses);

    const totalExpenses = storedExpense.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    const totalIncomes = storedIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );

    const addThisMonthIncome = thisMonthIncome.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalIncomeAmountThisMonth(addThisMonthIncome);

    const addThisMonthExpenses = thisMonthExpenses.reduce(
      (sum, each) => sum + (each?.amount || 0),
      0
    );
    setTotalExpensesAmountThisMonth(addThisMonthExpenses);

    setTotalIncome(totalIncomes);

    setTotalExpenses(totalExpenses);
}