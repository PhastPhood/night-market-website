import * as React from 'react';

import Lantern from './Lantern';
import {VerletObject,
    Gravity,
    MouseAttractor,
    DistanceConstraint,
    VerletSystem} from '../utils/verlet';
import {
    HEADER_HEIGHT,
    ROPE_RIGHT_ANCHOR_OFFSETS, 
    LANTERN_ANCHOR_OFFSETS,
    LANTERN_OFFSET,
    LANTERN_SIZES,
    NUM_ITERATIONS,
    GRAVITY,
    MOUSE_ATTRACTOR_STRENGTH,
    MOUSE_ATTRACTOR_RADIUS,
    SEGMENT_LENGTH,
    ROPE_MASS} from '../utils/constants';

class Rope {
  leftPoints: VerletObject[] = [];
  leftSegmentConstraints: DistanceConstraint[] = [];
  rightPoints: VerletObject[] = [];
  rightSegmentConstraints: DistanceConstraint[] = [];
  lanternAnchorPoint: VerletObject;
  lanternTop: VerletObject;
  lanternCenter: VerletObject;
  lanternBottom: VerletObject;
  lanternConstraints: DistanceConstraint[] = [];
  ropeDef: RopeDefinition;

  addToVerletSystem(system: VerletSystem) {
    system.objects.push(this.lanternAnchorPoint);
    system.objects.push(this.lanternTop);
    system.objects.push(this.lanternCenter);
    system.objects.push(this.lanternBottom);
    for (let i = 0; i < this.leftPoints.length; i++) {
      system.objects.push(this.leftPoints[i]);
    }
    for (let i = 0; i < this.rightPoints.length; i++) {
      system.objects.push(this.rightPoints[i]);
    }
    for (let i = 0; i < this.leftSegmentConstraints.length; i++) {
      system.constraints.push(this.leftSegmentConstraints[i]);
    }
    for (let i = 0; i < this.rightSegmentConstraints.length; i++) {
      system.constraints.push(this.rightSegmentConstraints[i]);
    }
    for (let i = 0; i < this.lanternConstraints.length; i++) {
      system.constraints.push(this.lanternConstraints[i]);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    const lanternX = this.lanternAnchorPoint.x;
    const lanternY = this.lanternAnchorPoint.y;
    context.moveTo(lanternX, lanternY);
    let dRX = this.rightPoints[this.rightPoints.length - 1].x - lanternX;
    let dRY = this.rightPoints[this.rightPoints.length - 1].y - lanternY;
    let distanceR = Math.sqrt(dRX * dRX + dRY * dRY);
    let dLX = this.rightPoints[this.leftPoints.length - 1].x - lanternX;
    let dLY = this.rightPoints[this.leftPoints.length - 1].y - lanternY;
    let distanceL = Math.sqrt(dLX * dLX + dLY * dLY);
    const furtherDistance = Math.max(distanceR, distanceL);
    const maxAlpha = 0.3;
    const minAlpha = 0.02;
    let prevA = maxAlpha;
    let prevX = lanternX;
    let prevY = lanternY;
    for(let i = 0; i < this.leftPoints.length; i++) {
      let pX = this.leftPoints[i].x;
      let pY = this.leftPoints[i].y;
      let gradient = context.createLinearGradient(prevX, prevY, pX, pY);
      const dX = pX - lanternX;
      const dY = pY - lanternY;
      const a = (1 - Math.sqrt(dX * dX + dY * dY)/furtherDistance)
          * (maxAlpha - minAlpha) + minAlpha;
      gradient.addColorStop(0, 'rgba(255, 255, 255, ' + prevA + ')');
      gradient.addColorStop(1, 'rgba(255, 255, 255, ' + a + ')');
      prevA = a;
      context.beginPath();
      context.strokeStyle = 'rgba(255, 255, 255, ' + a + ')';
      context.moveTo(prevX, prevY);
      context.lineTo(pX, pY);
      context.stroke();
      prevX = pX;
      prevY = pY;
    }
    prevX = lanternX;
    prevY = lanternY;
    context.moveTo(this.lanternAnchorPoint.x, this.lanternAnchorPoint.y);
    for(let i = 0; i < this.rightPoints.length; i++) {
      let pX = this.rightPoints[i].x;
      let pY = this.rightPoints[i].y;
      const dX = pX - lanternX;
      const dY = pY - lanternY;
      const a = (1 - Math.sqrt(dX * dX + dY * dY)/furtherDistance)
          * (maxAlpha - minAlpha) + minAlpha;
      context.beginPath();
      context.strokeStyle = 'rgba(255, 255, 255, ' + a + ')';
      context.moveTo(prevX, prevY);
      context.lineTo(pX, pY);
      context.stroke();
      prevX = pX;
      prevY = pY;
    }

    context.beginPath();
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.arc(this.lanternTop.x, this.lanternTop.y, 3, 0, 2 * Math.PI);
    context.arc(this.lanternBottom.x, this.lanternBottom.y, 3, 0, 2 * Math.PI);
    context.stroke();
  }
}

interface RopeDefinition {
  anchor0X: number;
  anchor0Y: number;
  anchor1X: number;
  anchor1Y: number;
  lowX: number;
  lowY: number;
  a: number;
}

interface IntermediateRopeDefinition {
  anchorRightX: number;
  anchorRightY: number;
  lanternX: number;
  lanternY: number;
}

class LanternSystem {
  verletSystem: VerletSystem;
  ropes: Rope[];
  stageWidth: number;
  mouseAttractor: MouseAttractor;

  constructor(stageWidth: number,
      numIterations: number,
      accelerationX: number,
      accelerationY: number,
      mouseAttractorStrength: number,
      mouseAttractorRadius: number) {
    this.verletSystem = new VerletSystem(numIterations);
    this.mouseAttractor = new MouseAttractor(mouseAttractorStrength, mouseAttractorRadius);
    this.verletSystem.forces.push(new Gravity(accelerationX, accelerationY), this.mouseAttractor);
    this.ropes = [];
  }

  draw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.ropes.length; i++) {
      this.ropes[i].draw(context);
    }
  }

  addRope(ropeDef: RopeDefinition, segmentLength: number, mass: number, lanternHeight: number) {
    let r = new Rope();

    const leftLength = ropeDef.a * Math.sinh((ropeDef.lowX - ropeDef.anchor0X)/ropeDef.a);
    const rightLength = ropeDef.a * Math.sinh((ropeDef.anchor1X - ropeDef.lowX)/ropeDef.a);

    const numSegmentsLeft = Math.ceil(leftLength/segmentLength);
    const numSegmentsRight = Math.ceil(rightLength/segmentLength);

    let n = Math.max(numSegmentsLeft, numSegmentsRight);
    r.lanternAnchorPoint = new VerletObject(ropeDef.lowX, ropeDef.lowY, mass);
    let lastPointLeft: VerletObject = r.lanternAnchorPoint;
    let lastPointRight: VerletObject = r.lanternAnchorPoint;
    let segmentScale = 0.95;
    for(let i = 0; i < n; i++) {
      const segmentX = ropeDef.a * Math.asinh((i + 1) * segmentLength/ropeDef.a);
      if (i < numSegmentsLeft) {
        let leftX: number;
        let leftY: number;
        let lanternMass = mass;
        if (i == numSegmentsLeft - 1) {
          leftX = ropeDef.anchor0X;
          leftY = ropeDef.anchor0Y;
          lanternMass = 0;
        } else {
          leftX = ropeDef.lowX - segmentX;
          leftY = ropeDef.lowY - (ropeDef.a * Math.cosh(segmentX/ropeDef.a) - ropeDef.a);
        }
        let dx = leftX - lastPointLeft.x;
        let dy = leftY - lastPointLeft.y;
        let actualSegmentLength = Math.sqrt(dx * dx + dy * dy) * segmentScale;
        const newPointLeft = new VerletObject(leftX, leftY, lanternMass);
        r.leftPoints.push(newPointLeft);
        r.leftSegmentConstraints.push(new DistanceConstraint(lastPointLeft, newPointLeft, actualSegmentLength));
        lastPointLeft = newPointLeft;
      }
      if (i < numSegmentsRight) {
        let rightX: number;
        let rightY: number;
        let lanternMass = mass;
        if (i == numSegmentsRight - 1) {
          rightX = ropeDef.anchor1X;
          rightY = ropeDef.anchor1Y;
          lanternMass = 0;
        } else {
          rightX = ropeDef.lowX + segmentX;
          rightY = ropeDef.lowY - (ropeDef.a * Math.cosh(segmentX/ropeDef.a) - ropeDef.a);
        }
        let dx = rightX - lastPointRight.x;
        let dy = rightY - lastPointRight.y;
        let actualSegmentLength = Math.sqrt(dx * dx + dy * dy) * segmentScale;
        const newPointRight = new VerletObject(rightX, rightY, lanternMass);
        r.rightPoints.push(newPointRight);
        r.rightSegmentConstraints.push(new DistanceConstraint(lastPointRight, newPointRight, actualSegmentLength));
        lastPointRight = newPointRight;
      }
    }
    
    r.ropeDef = ropeDef;
    
    r.lanternTop = new VerletObject(ropeDef.lowX, ropeDef.lowY + LANTERN_OFFSET, mass/4);
    r.lanternCenter = new VerletObject(ropeDef.lowX, ropeDef.lowY + LANTERN_OFFSET + lanternHeight/2, mass/2);
    r.lanternBottom = new VerletObject(ropeDef.lowX, ropeDef.lowY + LANTERN_OFFSET + lanternHeight, mass/4);
    r.lanternConstraints.push(new DistanceConstraint(r.lanternAnchorPoint, r.lanternTop, LANTERN_OFFSET));
    r.lanternConstraints.push(new DistanceConstraint(r.lanternTop, r.lanternBottom, lanternHeight));
    r.lanternConstraints.push(new DistanceConstraint(r.lanternTop, r.lanternCenter, lanternHeight/2));
    r.lanternConstraints.push(new DistanceConstraint(r.lanternCenter, r.lanternBottom, lanternHeight/2));
    this.ropes.push(r);

    r.addToVerletSystem(this.verletSystem);
  }
}

function generateRopeDefinition(startingRopeDef:IntermediateRopeDefinition): RopeDefinition {
  const h = startingRopeDef.lanternY - startingRopeDef.anchorRightY;
  const w = Math.abs(startingRopeDef.anchorRightX - startingRopeDef.lanternX);
  
  let a = w * w / (2 * h);

  for (let i: number = 0; i < 5; i++) {
    const fPrime = Math.cosh(w/a) - w * Math.sinh(w/a)/a - 1;
    a = a - (a * Math.cosh(w/a) - a - h)/fPrime;
  }

  let anchorLeftX = 0;
  let anchorLeftY = Math.cosh(startingRopeDef.lanternX/a) * a - a;
  if (anchorLeftY > startingRopeDef.lanternY) {
    anchorLeftX =
        startingRopeDef.lanternX - (a * Math.acosh((startingRopeDef.lanternY + a)/a));
    anchorLeftY = 0;
  } else {
    anchorLeftY = startingRopeDef.lanternY - anchorLeftY;
  }

  return {anchor0X: anchorLeftX,
      anchor0Y: anchorLeftY,
      anchor1X: startingRopeDef.anchorRightX,
      anchor1Y: startingRopeDef.anchorRightY,
      lowX: startingRopeDef.lanternX,
      lowY: startingRopeDef.lanternY,
      a: a};
}

interface LanternState {
  lanternSystem: LanternSystem;
}

export default class Lanterns extends React.Component<{}, LanternState> {
  _isMounted: boolean = false;
  _previousTimestamp: number;
  _canvas: HTMLCanvasElement | null;
  _context: CanvasRenderingContext2D | null;

  constructor(props: {}) {
    super(props);
    this.step = this.step.bind(this);
    this.setCanvas = this.setCanvas.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    if (canvas !== null) {
      this._context = canvas.getContext('2d');
      this.handleWindowResize();
    }
  }

  handleWindowResize() {
    if (this.state == null || this.state.lanternSystem === undefined) {
      const windowWidth = window.innerWidth;
      let lanternSystem = new LanternSystem(windowWidth, NUM_ITERATIONS, 0, GRAVITY, MOUSE_ATTRACTOR_STRENGTH, MOUSE_ATTRACTOR_RADIUS);
      let ropeAnchorPoints: number[][] = [];
      let lanternAnchorPoints: number[][] = [];
      const halfWindowWidth = windowWidth/2;
      for (let i = 0; i < ROPE_RIGHT_ANCHOR_OFFSETS.length; i++) {
        ropeAnchorPoints[i] = [halfWindowWidth + ROPE_RIGHT_ANCHOR_OFFSETS[i], 0];
        lanternAnchorPoints[i] = [halfWindowWidth + LANTERN_ANCHOR_OFFSETS[i][0], HEADER_HEIGHT + LANTERN_ANCHOR_OFFSETS[i][1]];
      }

      let maxX = 0;
      let maxY = 0;
      for (let i = 0; i < ropeAnchorPoints.length; i++) {
        const intermediateRopeDef: IntermediateRopeDefinition = {
            anchorRightX: ropeAnchorPoints[i][0],
            anchorRightY: ropeAnchorPoints[i][1],
            lanternX: lanternAnchorPoints[i][0],
            lanternY: lanternAnchorPoints[i][1]}
        let ropeDef: RopeDefinition = generateRopeDefinition(intermediateRopeDef);
        lanternSystem.addRope(ropeDef, SEGMENT_LENGTH, ROPE_MASS, LANTERN_SIZES[i][1]);
        if (ropeAnchorPoints[i][0] > maxX) {
          maxX = ropeAnchorPoints[i][0];
        }
        if (lanternAnchorPoints[i][1] > maxY) {
          maxY = lanternAnchorPoints[i][1];
        }
      }
      
      console.log(this._context);
      if (this._canvas !== null && this._context !== null) {
        const context: any = this._context;
        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        let canvasWidth: number = Math.min(maxX * 1.2, windowWidth);
        let canvasHeight: number = maxY * 1.2;
        let canvasScaledWidth = canvasWidth;
        let canvasScaledHeight = canvasHeight;
        let ratio = 1;
        if (devicePixelRatio !== backingStoreRatio) {
          ratio = devicePixelRatio / backingStoreRatio;
          canvasScaledWidth = canvasWidth * ratio;
          canvasScaledHeight = canvasHeight * ratio;
        }
        this._canvas.width = canvasScaledWidth;
        this._canvas.height = canvasScaledHeight;
        this._canvas.style.width = canvasWidth + 'px';
        this._canvas.style.height = canvasHeight + 'px';
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(ratio, ratio);
      }

      this.setState({lanternSystem: lanternSystem});
    } else {
      
    }
  }

  handleMouseMove(e: MouseEvent) {
    if (this.state !== undefined && this.state.lanternSystem !== undefined) {
      this.state.lanternSystem.mouseAttractor.setMouseCoordinates(e.clientX, e.clientY);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    window.requestAnimationFrame(this.step);
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    this._previousTimestamp = performance.now();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  draw() {
    if (this._canvas !== null && this._context !== null && this.state !== undefined) {
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this.state.lanternSystem.draw(this._context);
    }
  }

  step(timestamp: number) {
    const delta: number = timestamp - this._previousTimestamp;
    this._previousTimestamp = timestamp;

    if (this._isMounted) {
      if (delta > 0 && this.state !== undefined) {
        this.state.lanternSystem.verletSystem.step();
        this.forceUpdate();
      }

      if (delta > 0 && this._context != null) {
        this.draw();
      }

      window.requestAnimationFrame(this.step);
    }
  }

  render() {
    const lanterns = this.state != undefined ? this.state.lanternSystem.ropes.map(
        (rope: Rope, index: number) => 
            <Lantern key={index}
                lanternVariation={index}
                lanternTopX={rope.lanternTop.x}
                lanternTopY={rope.lanternTop.y}
                lanternBottomX={rope.lanternBottom.x}
                lanternBottomY={rope.lanternBottom.y}/>) : "";
    return (
      <aside className="Lanterns">
        {lanterns}
        <canvas className="Lanterns__Canvas"
            id="LanternsCanvas"
            ref={(canvas: HTMLCanvasElement) => this.setCanvas(canvas)}/>
      </aside>
    );
  }
}
