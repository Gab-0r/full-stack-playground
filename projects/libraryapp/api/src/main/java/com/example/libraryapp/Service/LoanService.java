package com.example.libraryapp.Service;

import com.example.libraryapp.DTO.Book.BookResponse;
import com.example.libraryapp.DTO.Loan.LoanRequest;
import com.example.libraryapp.DTO.Loan.LoanResponse;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Book;
import com.example.libraryapp.Model.Loan;
import com.example.libraryapp.Model.Member;
import com.example.libraryapp.Repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanService {


    private final LoanRepository repository;
    private final BookService bookService;
    private final MemberService memberService;


    public Loan findById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public LoanResponse findSummaryById(Long id){
        Loan loan = repository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
        BookResponse book = new BookResponse(loan.getBook());
        MemberSummary member = new MemberSummary(loan.getMember());
        return new LoanResponse(loan, book, member);
    }

    public List<LoanResponse> findAll(){
        return repository.findAll().stream().map(loan -> {
            BookResponse book = new BookResponse(loan.getBook());
            MemberSummary member = new MemberSummary(loan.getMember());
            return new LoanResponse(loan, book, member);
        }).collect(Collectors.toList());
    }

    public LoanResponse save(LoanRequest loanRequest){
        Member member = memberService.findById(loanRequest.getMemberId());
        Book book = bookService.findById(loanRequest.getBookId());
        log.info("Book to loan: {}", book);
        List<Book> availableBooks = bookService.findAvailableBooks();
        log.info("Available books to loan {}", availableBooks);
        System.out.println(book);
        System.out.println(availableBooks);
        if (!availableBooks.contains(book)){
            throw new RuntimeException("Book is not available for loan");
        }
        else {
            Loan loan = Loan.from(book, member);
            repository.save(loan);
            return new LoanResponse(loan, new BookResponse(loan.getBook()), new MemberSummary(loan.getMember()));
        }
    }

    public LoanResponse update(Long id, Loan loan){
        return repository.findById(id).map(existing -> {
            existing.setBook(loan.getBook());
            existing.setMember(loan.getMember());
            existing.setLoanDate(loan.getLoanDate());
            existing.setReturnDate(loan.getReturnDate());
            existing.setReturned(loan.getReturned());
            Loan updatedLoan =  repository.save(existing);
            return new LoanResponse(updatedLoan,
                    new BookResponse(updatedLoan.getBook()),
                    new MemberSummary(updatedLoan.getMember()));
        }).orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

}
