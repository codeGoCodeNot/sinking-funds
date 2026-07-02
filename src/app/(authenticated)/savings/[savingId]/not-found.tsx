import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { homePagePath } from "@/path";
import Link from "next/link";

const notFound = () => {
  return (
    <Placeholder
      label="Saving not found"
      button={
        <Button asChild variant="outline">
          <Link href={homePagePath()}>Go back to Home page</Link>
        </Button>
      }
    />
  );
};
export default notFound;
