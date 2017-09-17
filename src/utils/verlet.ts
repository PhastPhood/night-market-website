class VerletObject {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  mass: number;
  isStatic: boolean;
  
  constructor(x: number, y: number, mass: number, isStatic?: boolean) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.mass = mass;
    if (mass <= 0 || isStatic) {
      this.isStatic = true;
    }
  }

  integrate() {
    if (this.isStatic) {
      return;
    }
    
    const newPositionX = (this.x - this.lastX) + this.x;
    const newPositionY = (this.y - this.lastY) + this.y;

    this.lastX = this.x;
    this.lastY = this.y;
    this.x = newPositionX;
    this.y = newPositionY;
  }
}

interface Force {
  applyForce: (verletObject: VerletObject) => void;
}

class Gravity implements Force {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  applyForce(verletObject: VerletObject) {
    if (verletObject.isStatic) {
      return;
    }

    verletObject.x += this.x;
    verletObject.y += this.y;
  }
}

class MouseAttractor implements Force {
  strength: number;
  radius: number;
  radiusSquared: number;
  mouseX: number;
  mouseY: number;

  constructor(strength: number, radius: number) {
    this.strength = strength;
    this.radius = radius;
    this.radiusSquared = radius * radius;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  setMouseCoordinates(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  applyForce(verletObject: VerletObject) {
    if (verletObject.isStatic) {
       return;
    }
    
    const dX = verletObject.lastX - this.mouseX;
    const dY = verletObject.lastY - this.mouseY;

    let distance = dX * dX + dY * dY;

    if (distance > this.radiusSquared) {
      return;
    }

    distance = Math.sqrt(distance);
    const multiplier = this.strength * (1 - (distance / this.radius));

    if (distance < 1) {
      return;
    }
    
    const nX = dX / distance;
    const nY = dY / distance;

    verletObject.x -= nX * multiplier;
    verletObject.y -= nY * multiplier;
  }
}

interface Constraint {
  satisfyConstraint: () => void;
}

class DistanceConstraint implements Constraint {
  object1: VerletObject;
  object2: VerletObject;

  distance: number;

  constructor(object1: VerletObject, object2: VerletObject, distance:number) {
    this.object1 = object1;
    this.object2 = object2;
    this.distance = distance;
  }

  satisfyConstraint() {
    const dX = this.object1.x - this.object2.x;
    const dY = this.object1.y - this.object2.y;

    const l = Math.sqrt(dX * dX + dY * dY);

    const dL = (this.distance - l) / l;

    const totalTranslationX = dX * dL;
    const totalTranslationY = dY * dL;

    const totalMass = this.object1.mass + this.object2.mass;

    if (!this.object1.isStatic && !this.object2.isStatic) {
      const relativeMass1 = this.object1.mass/totalMass;
      const relativeMass2 = this.object2.mass/totalMass;
      
      this.object1.x += totalTranslationX * relativeMass2;
      this.object1.y += totalTranslationY * relativeMass2;
  
      this.object2.x -= totalTranslationX * relativeMass1;
      this.object2.y -= totalTranslationY * relativeMass1;
    } else if (this.object1.isStatic) {
      this.object2.x -= totalTranslationX;
      this.object2.y -= totalTranslationY;
    } else if (this.object2.isStatic) {
      this.object1.x += totalTranslationX;
      this.object1.y += totalTranslationY;
    }
  }
}

class VerletSystem {
  objects: VerletObject[];
  constraints: Constraint[];
  forces: Force[];

  iterations: number;

  constructor(iterations: number) {
    this.iterations = iterations;
    this.constraints = [];
    this.objects = [];
    this.forces = [];
  }

  step() {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].integrate();
      for (let j = 0; j < this.forces.length; j++) {
        this.forces[j].applyForce(this.objects[i]);
      }
    }
    for (let i = 0; i < this.iterations; i++) {
      for (let j = 0; j < this.constraints.length; j++) {
        this.constraints[j].satisfyConstraint();
      }
    }
  }
}

export {VerletObject,
    Force,
    Gravity,
    MouseAttractor,
    Constraint,
    DistanceConstraint,
    VerletSystem}
