import * as React from 'react';

export default function Section(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
        className={"Section" + (props.className ? " " + props.className : "")}>
      {props.children}
    </section>
  );
}
