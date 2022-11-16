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
import { rectangle, triangle } from '@jscad/modeling/src/primitives'
import { degToRad } from '@jscad/modeling/src/utils'

export class Deg120x3 {
  woodThickness: number
  thickness: number
  height: number
  triangle: Geom3
  rectangle1: Geom3
  rectangle2: Geom3
  rectangle3: Geom3
  //   subtract: Geom3[]

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.triangle = this.setTriangle()
    this.rectangle1 = this.setRectangle1()
    this.rectangle2 = this.setRectangle2()
    this.rectangle3 = this.setRectangle3()
  }

  private setTriangle() {
    const s = this.woodThickness + this.thickness * 2
    const t2d = triangle({ type: 'SSS', values: [s, s, s] })
    const t3d = extrudeLinear({ height: this.height }, t2d)

    const s2 = this.woodThickness
    const t2d2 = triangle({ type: 'SSS', values: [s2, s2, s2] })
    const t3d2 = extrudeLinear({ height: this.height }, t2d2)
    return subtract(t3d, translate([2, 1], t3d2))
  }

  private setRectangle1() {
    // First rectangle
    const length = this.woodThickness * 2
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [-length / 2, -width / 2]

    // First subtract
    const length2 = this.woodThickness * 2
    const width2 = this.woodThickness
    const size2: [number, number] = [length2, width2]
    const center2: [number, number] = [
      -length2 / 2,
      -width2 / 2 - this.thickness,
    ]

    const first = rotateZ(
      degToRad(90),
      extrudeLinear({ height: this.height }, rectangle({ size, center }))
    )

    const second = rotateZ(
      degToRad(90),
      extrudeLinear(
        { height: this.height },
        rectangle({ size: size2, center: center2 })
      )
    )

    return subtract(first, second)
  }

  private setRectangle2() {
    // First rectangle
    const length = this.woodThickness * 2
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [length / 2, -width / 2]

    // First subtract
    const length2 = this.woodThickness * 2
    const width2 = this.woodThickness
    const size2: [number, number] = [length2, width2]
    const center2: [number, number] = [
      length2 / 2,
      -width2 / 2 - this.thickness,
    ]

    const first = rotateZ(
      degToRad(150),
      extrudeLinear({ height: this.height }, rectangle({ size, center }))
    )

    const second = rotateZ(
      degToRad(150),
      extrudeLinear(
        { height: this.height },
        rectangle({ size: size2, center: center2 })
      )
    )

    return subtract(first, second)
  }

  private setRectangle3() {
    // First rectangle
    const length = this.woodThickness * 2
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [-length - this.thickness, 0]

    // First subtract
    const length2 = this.woodThickness * 2
    const width2 = this.woodThickness
    const size2: [number, number] = [length2, width2]
    const center2: [number, number] = [-length2 - this.thickness, 0]

    const first = rotateZ(
      degToRad(210),
      extrudeLinear({ height: this.height }, rectangle({ size, center }))
    )

    const second = rotateZ(
      degToRad(210),
      extrudeLinear(
        { height: this.height },
        rectangle({ size: size2, center: center2 })
      )
    )

    return subtract(first, second)
  }

  public getUnion() {
    const mainBlock = union(
      this.triangle,
      this.rectangle1,
      this.rectangle2,
      this.rectangle3
    )
    // const without = subtract(mainBlock, this.subtract)
    return mainBlock
  }
}
