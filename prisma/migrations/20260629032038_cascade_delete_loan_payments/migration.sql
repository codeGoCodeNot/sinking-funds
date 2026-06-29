-- DropForeignKey
ALTER TABLE "LoanPayment" DROP CONSTRAINT "LoanPayment_loanId_fkey";

-- AddForeignKey
ALTER TABLE "LoanPayment" ADD CONSTRAINT "LoanPayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
