package com.fraserlint.expenses_manager.controllers;

import com.fraserlint.expenses_manager.entities.Expense;
import com.fraserlint.expenses_manager.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Add a new expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    // Get a specific expense by its ID
    @GetMapping("/{id}")
    public Optional<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.findById(id);
    }

    // Get expenses for a specific week
    @GetMapping("/week")
    public List<Expense> getExpensesForWeek(@RequestParam("start") String startDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        return expenseService.getExpensesForWeek(startDate);
    }

    // Get expenses for a specific month
    @GetMapping("/month")
    public List<Expense> getExpensesForMonth(@RequestParam("start") String startDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        return expenseService.getExpensesForMonth(startDate);
    }

    // Get expenses for the current tax year
    @GetMapping("/taxyear")
    public List<Expense> getExpensesForTaxYear() {
        return expenseService.getExpensesForTaxYear(LocalDate.now());
    }
}
