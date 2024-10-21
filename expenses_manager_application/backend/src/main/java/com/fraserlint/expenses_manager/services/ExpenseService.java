package com.fraserlint.expenses_manager.services;

import com.fraserlint.expenses_manager.entities.Expense;
import com.fraserlint.expenses_manager.repos.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Add a new expense
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Find expense by ID
    public Optional<Expense> findById(Long id) {
        return expenseRepository.findById(id); // Using Optional to handle potential null values
    }

    // Get expenses for a specific date range
    public List<Expense> getExpensesForRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    // Calculate expenses for a specific week
    public List<Expense> getExpensesForWeek(LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);
        return getExpensesForRange(weekStart, weekEnd);
    }

    // Calculate expenses for a specific month
    public List<Expense> getExpensesForMonth(LocalDate monthStart) {
        LocalDate monthEnd = monthStart.with(TemporalAdjusters.lastDayOfMonth());
        return getExpensesForRange(monthStart, monthEnd);
    }

    // Calculate expenses for the British tax year
    public List<Expense> getExpensesForTaxYear(LocalDate today) {
        LocalDate startTaxYear = (today.getMonthValue() >= 4 && today.getDayOfMonth() >= 6)
                ? LocalDate.of(today.getYear(), 4, 6)
                : LocalDate.of(today.getYear() - 1, 4, 6);
        LocalDate endTaxYear = startTaxYear.plusYears(1).minusDays(1);
        return getExpensesForRange(startTaxYear, endTaxYear);
    }
}
