package com.example.libraryapp.Controller;


import com.example.libraryapp.DTO.Loan.LoanRequest;
import com.example.libraryapp.DTO.Loan.LoanSummary;
import com.example.libraryapp.Model.Loan;
import com.example.libraryapp.Service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @GetMapping("")
    public List<Loan> all(){
        return loanService.findAll();
    }

    @GetMapping("/summaries")
    public List<LoanSummary> allSummaries(){
        return loanService.findAllSummaries();
    }

    @GetMapping("/{id}")
    public Loan one(@PathVariable Long id){
        return loanService.findById(id);
    }

    @GetMapping("/summaries/{id}")
    public LoanSummary oneSummary(@PathVariable Long id){
        return loanService.findSummaryById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Loan save(@RequestBody LoanRequest loanRequest){
        return loanService.save(loanRequest);
    }

    @PatchMapping("/{id}")
    public Loan update(@PathVariable Long id, @RequestBody Loan loan){
        return loanService.update(id, loan);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        loanService.deleteById(id);
    }

}
