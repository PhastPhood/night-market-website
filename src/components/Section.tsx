import * as React from 'react';

export default function Section(props: React.HTMLAttributes<HTMLDivElement>) {
  /*
  componentDidUnmount() {
    window.removeEventListener('resize', this.updateSizes);
  }

  updateSizes() {
    const __this = this;
    window.requestAnimationFrame(function() {
      if (__this.sectionRef != null) {
        const backgroundElement = document.getElementById("AppBackground");
        let backgroundHeight:number = 0;
        if (backgroundElement != null) {
          console.log(backgroundElement.clientHeight);
          backgroundHeight = backgroundElement.clientHeight;
        } else {
          backgroundHeight = window.innerHeight;
        }

        const coords = getElementCoords(__this.sectionRef);
        
        __this.setState({
            pageBackgroundHeight: backgroundHeight,
            sectionTop: coords.top,
            sectionBottom: coords.bottom});
      }
    });
  }*/
  return (
    <section
        className={"Section" + (props.className ? " " + props.className : "")}>
      {props.children}
    </section>
  );
}
