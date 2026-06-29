import Link from "next/link";

type HeadingProps = {
  title: string;
  description?: string;
  descriptionHref?: string;
  descriptionLinkLabel?: string;
};

const Heading = ({
  title,
  description,
  descriptionHref,
  descriptionLinkLabel,
}: HeadingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && descriptionHref && descriptionLinkLabel && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}{" "}
          <Link
            href={descriptionHref}
            className="text-foreground hover:underline"
          >
            {descriptionLinkLabel} →
          </Link>
        </p>
      )}
    </div>
  );
};

export default Heading;
