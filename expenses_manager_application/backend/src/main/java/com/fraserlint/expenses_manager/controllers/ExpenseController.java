package com.fraserlint.expenses_manager.controllers;

import com.fraserlint.expenses_manager.entities.Expense;
import com.fraserlint.expenses_manager.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // Update a specific expense by its ID
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        Optional<Expense> updatedExpense = expenseService.updateExpense(id, expenseDetails);

        if (updatedExpense.isPresent()) {
            return ResponseEntity.ok(updatedExpense.get());  // 200 OK with updated entity
        } else {
            return ResponseEntity.notFound().build();  // 404 if not found
        }
    }

    // Delete a specific expense by its ID
    @DeleteMapping("/{id}")
    public void deleteExpenseById(@PathVariable Long id) {
        expenseService.deleteById(id);
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
