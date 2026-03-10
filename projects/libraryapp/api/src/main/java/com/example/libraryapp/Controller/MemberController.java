package com.example.libraryapp.Controller;


import com.example.libraryapp.DTO.Member.MemberRequest;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Member;
import com.example.libraryapp.Service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    @GetMapping("")
    public List<Member> all(){
        return service.findAll();
    }

    @GetMapping("/summaries")
    public List<MemberSummary> allSummaries(){
        return service.findAllSummaries();
    }

    @GetMapping("/{id}")
    public Member one(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/summaries/{id}")
    public MemberSummary oneSummary(@PathVariable Long id){
        return service.findSummaryById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Member save(@RequestBody MemberRequest memberRequest){
        return service.save(memberRequest);
    }

    @PatchMapping("/{id}")
    public Member update(@PathVariable Long id, @RequestBody Member member){
        return service.update(id, member);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        service.deleteById(id);
    }

}
