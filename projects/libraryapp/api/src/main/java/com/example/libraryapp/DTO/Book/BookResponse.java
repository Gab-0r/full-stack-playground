package com.example.libraryapp.DTO.Book;

import com.example.libraryapp.Model.Book;

import java.time.Year;

public class BookResponse {

    private Long id;
    private String title;
    private String author;
    private String isbn;
    private Year publicationYear;

    public BookResponse(Book book){
        this.setId(book.getId());
        this.setTitle(book.getTitle());
        this.setAuthor(book.getAuthor());
        this.setIsbn(book.getIsbn());
        this.setPublicationYear(book.getPublicationYear());
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Year getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(Year publicationYear) {
        this.publicationYear = publicationYear;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
