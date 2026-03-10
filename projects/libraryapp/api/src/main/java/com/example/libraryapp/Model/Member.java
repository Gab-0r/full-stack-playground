package com.example.libraryapp.Model;


import com.example.libraryapp.DTO.Member.MemberRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table( name = "members")
public class Member {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private LocalDate membershipDate;


    public static Member from(MemberRequest memberRequest){
        Member member = new Member();
        member.setEmail(memberRequest.getEmail());
        member.setName(memberRequest.getName());
        member.setMembershipDate(LocalDate.now());
        return member;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getMembershipDate() {
        return membershipDate;
    }

    public void setMembershipDate(LocalDate membershipDate) {
        this.membershipDate = membershipDate;
    }
}
