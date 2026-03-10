package com.example.libraryapp.Service;

import com.example.libraryapp.DTO.Book.BookSummary;
import com.example.libraryapp.DTO.Loan.LoanRequest;
import com.example.libraryapp.DTO.Loan.LoanSummary;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Book;
import com.example.libraryapp.Model.Loan;
import com.example.libraryapp.Model.Member;
import com.example.libraryapp.Repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {


    private final LoanRepository repository;
    private final BookService bookService;
    private final MemberService memberService;


    public Loan findById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public LoanSummary findSummaryById(Long id){
        Loan loan = repository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
        BookSummary book = new BookSummary(loan.getBook());
        MemberSummary member = new MemberSummary(loan.getMember());
        return new LoanSummary(loan, book, member);
    }


    public List<Loan> findAll(){
        return repository.findAll();
    }

    public List<LoanSummary> findAllSummaries(){
        return repository.findAll().stream().map(loan -> {
            BookSummary book = new BookSummary(loan.getBook());
            MemberSummary member = new MemberSummary(loan.getMember());
            return new LoanSummary(loan, book, member);
        }).collect(Collectors.toList());
    }

    public Loan save(LoanRequest loanRequest){
        Member member = memberService.findById(loanRequest.getMemberId());
        Book book = bookService.findById(loanRequest.getBookId());
        List<Book> availableBooks = bookService.findAvailableBooks();
        if (availableBooks.contains(book)){
            throw new RuntimeException("Book is not available for loan");
        }
        else {
            return repository.save(Loan.from(book, member));
        }
    }

    public Loan update(Long id, Loan loan){
        return repository.findById(id).map(existing -> {
            existing.setBook(loan.getBook());
            existing.setMember(loan.getMember());
            existing.setLoanDate(loan.getLoanDate());
            existing.setReturnDate(loan.getReturnDate());
            existing.setReturned(loan.getReturned());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

}
