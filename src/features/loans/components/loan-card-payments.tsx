import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toCurrencyFromCents } from "@/utils/currency";

type LoanCardPaymentProps = {
  payment: {
    id: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    loanId: string;
  };
};

const LoanCardPayment = ({ payment }: LoanCardPaymentProps) => {
  return (
    <Card key={payment.id} className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Loan payment</CardTitle>
            <CardDescription>
              {new Date(payment.createdAt).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </div>
          <span className="text-sm font-medium" style={{ color: "#27500A" }}>
            +{toCurrencyFromCents(+payment.amount)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LoanCardPayment;
