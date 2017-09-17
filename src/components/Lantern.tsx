import * as React from 'react';

import {LANTERN_SIZES, GLOW_SIZES} from '../utils/constants';

interface LanternProps {
  lanternVariation: number,
  lanternTopX: number,
  lanternTopY: number,
  lanternBottomX: number,
  lanternBottomY: number
}

export default function Lantern(props: LanternProps) {
  const paperSrc = 'img/lantern' + props.lanternVariation + '.svg';
  const glowSrc = 'img/lanternglow' + props.lanternVariation + '.png';
  const transformX = props.lanternTopX;
  const transformY = props.lanternTopY;
  const rotation = Math.atan2(
      props.lanternBottomX - props.lanternTopX,
      props.lanternBottomY - props.lanternTopY);
  const lanternStyle = {
    transform: 'translate(' + transformX + 'px, '
        + transformY + 'px) rotateY(0deg) rotate('
        + -rotation + 'rad)',
  };
  const lanternWidth = LANTERN_SIZES[props.lanternVariation][0];
  const lanternHeight = LANTERN_SIZES[props.lanternVariation][1];
  const paperStyle = {
    width: lanternWidth,
    height: lanternHeight,
    transform: 'translate(-' + lanternWidth/2 + 'px, 0px)'
  };
  const glowWidth = GLOW_SIZES[props.lanternVariation][0];
  const glowHeight = GLOW_SIZES[props.lanternVariation][1];
  const glowStyle = {
    width: glowWidth,
    height: glowHeight,
    transform: 'translate(-' + glowWidth/2 + 'px, ' + (lanternHeight - glowHeight)/2 + 'px)'
  };
  const lanternClass = 'Lantern Lantern__Variation' + props.lanternVariation;

  return (
    <div className={lanternClass} style={lanternStyle}>
      <img src={glowSrc} style={glowStyle} className="Lantern__Glow"/>
      <img src={paperSrc} style={paperStyle} className="Lantern__Paper"/>
    </div>
  );
}
