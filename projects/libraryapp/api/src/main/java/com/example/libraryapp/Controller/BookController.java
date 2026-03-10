package com.example.libraryapp.Controller;
import com.example.libraryapp.DTO.Book.BookRequest;
import com.example.libraryapp.DTO.Book.BookSummary;
import com.example.libraryapp.Model.Book;
import com.example.libraryapp.Service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;


    @GetMapping("")
    public List<Book> all(){
        return service.findAll();
    }

    @GetMapping("/summaries")
    public List<BookSummary> findAllSummaries(){
        return service.findAllBookSummaries();
    }

    @GetMapping("/{id}")
    public Book findOne(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/summaries/{id}")
    public BookSummary findOneSummary(@PathVariable Long id){
        return service.findSummaryById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public BookSummary save(@RequestBody BookRequest bookRequest){
        return service.save(bookRequest);
    }

    @PatchMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book book){
        return service.update(id, book);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        service.deleteById(id);
    }

    @GetMapping("")
    public List<Book> allAvailableBooks(){
        return service.findAvailableBooks();
    }

}
