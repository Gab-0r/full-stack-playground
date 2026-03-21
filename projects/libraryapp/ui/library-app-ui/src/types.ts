export interface Member {
  name: string;
  email: string;
  membershipDate: string;
  id: number;
}

export type MemberSummary = Pick<Member, "id" | "name">

export interface Book {
    author: string,
    id: number,
    isb: string | null,
    publicationYear: string | null,
    title: string
}

export interface Loan {  
  id: number;
  loanDate: string;
  returnDate: string | null;
  returned: boolean;
  member: MemberSummary;
  book : Book;
}