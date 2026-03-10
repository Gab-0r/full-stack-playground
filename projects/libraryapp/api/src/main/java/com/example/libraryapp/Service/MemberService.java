package com.example.libraryapp.Service;

import com.example.libraryapp.DTO.Member.MemberRequest;
import com.example.libraryapp.DTO.Member.MemberSummary;
import com.example.libraryapp.Model.Member;
import com.example.libraryapp.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository repository;

    public Member findById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public MemberSummary findSummaryById(Long id){
        return repository.findById(id).map(MemberSummary::new)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public List<Member> findAll(){
        return repository.findAll();
    }

    public List<MemberSummary> findAllSummaries(){
        return repository.findAll().stream()
                .map(MemberSummary::new)
                .collect(Collectors.toList());
    }

    public Member save(MemberRequest memberRequest){
        Member member = Member.from(memberRequest);
        return repository.save(member);
    }

    public Member update(Long id, Member member){
        return repository.findById(id).map(existing -> {
            existing.setName(member.getName());
            existing.setEmail(member.getEmail());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

}
