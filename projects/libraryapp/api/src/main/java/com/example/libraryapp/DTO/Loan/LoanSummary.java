package com.example.libraryapp.DTO.Loan;

import com.example.libraryapp.DTO.Book.BookSummary;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Loan;

import java.time.LocalDate;

public class LoanSummary {

    private Long id;
    private BookSummary book;
    private MemberSummary member;
    private LocalDate loanDate;
    private LocalDate returnDate;
    private Boolean returned;

    public LoanSummary(Loan loan, BookSummary book, MemberSummary member){
        this.setId(loan.getId());
        this.setBook(book);
        this.setMember(member);
        this.setLoanDate(loan.getLoanDate());
        this.setReturnDate(loan.getReturnDate());
        this.setReturned(loan.getReturned());
    }

    public Boolean getReturned() {
        return returned;
    }

    public void setReturned(Boolean returned) {
        this.returned = returned;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookSummary getBook() {
        return book;
    }

    public void setBook(BookSummary book) {
        this.book = book;
    }

    public MemberSummary getMember() {
        return member;
    }

    public void setMember(MemberSummary member) {
        this.member = member;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

}
