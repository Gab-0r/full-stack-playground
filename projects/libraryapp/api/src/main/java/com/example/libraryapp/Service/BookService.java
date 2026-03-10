package com.example.libraryapp.Service;

import com.example.libraryapp.DTO.Book.BookRequest;
import com.example.libraryapp.DTO.Book.BookSummary;
import com.example.libraryapp.Model.Book;
import com.example.libraryapp.Repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository repository;

    public List<Book> findAll(){
        return repository.findAll();
    }

    public List<BookSummary> findAllBookSummaries(){
        return repository.findAll().stream()
                .map(BookSummary::new)
                .collect(Collectors.toList());
    }

    public Book findById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public BookSummary findSummaryById(Long id){
        return repository.findById(id).map(BookSummary::new)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book update(Long id, Book book){
        return repository.findById(id).map(existing -> {
            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setIsbn(book.getIsbn());
            existing.setPublicationYear(book.getPublicationYear());
            return existing;
        }).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public BookSummary save(BookRequest bookRequest){
        Book book = Book.from(bookRequest);
        return new BookSummary(repository.save(book));
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public List<Book> findAvailableBooks(){
        return repository.findAvailableBooks();
    }
}
