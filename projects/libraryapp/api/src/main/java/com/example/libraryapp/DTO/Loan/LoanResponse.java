package com.example.libraryapp.DTO.Loan;

import com.example.libraryapp.DTO.Book.BookResponse;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Loan;

import java.time.LocalDate;

public class LoanResponse {

    private Long id;
    private BookResponse book;
    private MemberSummary member;
    private LocalDate loanDate;
    private LocalDate returnDate;
    private Boolean returned;

    public LoanResponse(Loan loan, BookResponse book, MemberSummary member){
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

    public BookResponse getBook() {
        return book;
    }

    public void setBook(BookResponse book) {
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
