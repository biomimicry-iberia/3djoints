import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union, subtract } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import {
  translate,
  rotateZ,
  translateX,
  translateY,
  translateZ,
} from '@jscad/modeling/src/operations/transforms'
import { circle, rectangle, triangle } from '@jscad/modeling/src/primitives'
import { degToRad } from '@jscad/modeling/src/utils'

const getCylinder = (radius: number, height: number) => {
  const circunference = circle({ radius: radius })
  const cylinder = extrudeLinear({ height }, circunference)
  return cylinder
}

const getRectangle = (
  size: [number, number],
  height: number,
  center: [number, number] = [0, 0]
) => {
  const r = rectangle({ size, center })
  const rect = extrudeLinear({ height }, r)
  return rect
}
export class Hinge {
  woodThickness: number
  thickness: number
  height: number
  diameter: number
  tolerance = 0.4
  base: Geom3
  middle: Geom3

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.diameter = woodThickness + thickness * 2
    this.base = this.setBase()
    this.middle = this.setMiddle()
  }

  private setBase() {
    const baseCylinder = getCylinder(this.diameter / 2, 5)

    // Rectangle
    const rLength = 1.5 * this.diameter
    const rWidth = this.diameter
    let baseRectangle = getRectangle([rLength, rWidth], 5)
    baseRectangle = translateX(this.diameter / 1.5, baseRectangle)
    let rectangleToRemove = getRectangle([this.diameter, this.woodThickness], 5)
    rectangleToRemove = translateX(this.diameter, rectangleToRemove)
    baseRectangle = subtract(baseRectangle, rectangleToRemove)

    let base = union(baseCylinder, baseRectangle)
    let baseTop = translateZ(this.height * 2, base)

    const unionCylinder = getCylinder(this.diameter / 4, this.height * 3)

    return union(base, baseTop, unionCylinder)
  }

  private setMiddle() {
    let baseCylinder = getCylinder(this.diameter / 2, 5 - this.tolerance * 2)

    // Rectangle
    const rLength = 1.5 * this.diameter
    const rWidth = this.diameter
    let baseRectangle = getRectangle([rLength, rWidth], 5 - this.tolerance * 2)
    baseRectangle = translateX(this.diameter / 1.5, baseRectangle)
    let rectangleToRemove = getRectangle(
      [this.diameter, this.woodThickness],
      5 - this.tolerance * 2
    )
    rectangleToRemove = translateX(this.diameter, rectangleToRemove)
    baseRectangle = subtract(baseRectangle, rectangleToRemove)

    let base = union(baseCylinder, baseRectangle)
    const middleCylinder = getCylinder(
      this.diameter / 4 + this.tolerance * 1.5,
      5 - this.tolerance * 2
    )
    base = subtract(base, middleCylinder)

    let middle = translateZ(this.height + this.tolerance, base)

    return union(middle)
  }

  public getUnion() {
    const mainBlock = union(this.base, this.middle)
    // const without = subtract(mainBlock, this.subtract)
    return mainBlock
  }
}
