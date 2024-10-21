package com.fraserlint.expenses_manager.repos;

import com.fraserlint.expenses_manager.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Find expenses between the two dates
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
