package com.example.libraryapp.DTO.Member;

import com.example.libraryapp.Model.Member;

public class MemberSummary {

    private Long id;
    private String name;

    public MemberSummary(Member member){
        this.setId(member.getId());
        this.setName(member.getName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
