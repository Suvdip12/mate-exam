import React from "react";

function Footer() {
  return (
    <footer className="mt-6 border-t bg-background p-4 pt-8 text-center font-sans text-xs uppercase tracking-widest text-muted-foreground md:p-8">
      <p>
        &copy; 2026 University of Kalyani Board. All Rights Reserved. | Built by{" "}
        <a
          href="https://codernandan.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4 hover:text-foreground"
        >
          CoderNandan
        </a>
      </p>
    </footer>
  );
}

export default Footer;
