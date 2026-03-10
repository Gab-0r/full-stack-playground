package com.example.libraryapp.DTO.Book;

import com.example.libraryapp.Model.Book;

public class BookSummary {

    private Long id;
    private String title;
    private String author;

    public BookSummary(Book book){
        this.setId(book.getId());
        this.setTitle(book.getTitle());
        this.setAuthor(book.getAuthor());
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
