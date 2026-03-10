package com.example.libraryapp.Repository;

import com.example.libraryapp.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b from Book b LEFT JOIN b.loans l WHERE l.returned is NULL OR l.returned = true")
    List<Book> findAvailableBooks();

}
