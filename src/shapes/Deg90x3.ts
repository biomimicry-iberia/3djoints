import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union, subtract } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import { rotateZ } from '@jscad/modeling/src/operations/transforms'
import { rectangle } from '@jscad/modeling/src/primitives'
import { degToRad } from '@jscad/modeling/src/utils'

export class Deg90x3 {
  woodThickness: number
  thickness: number
  height: number
  horizontal: Geom3
  vertical: Geom3
  subtract: Geom3[]

  constructor(woodThickness: number, height: number, thickness: number) {
    this.woodThickness = woodThickness
    this.thickness = thickness
    this.height = height
    this.horizontal = this.setHorizontal()
    this.vertical = this.setVertical()
    this.subtract = this.setSubtract()
  }

  private setHorizontal() {
    const length = 5 * this.woodThickness + this.thickness * 2
    const width = this.woodThickness + this.thickness * 2
    const size: [number, number] = [length, width]
    const center: [number, number] = [length / 2, width / 2]

    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setVertical() {
    const length = this.woodThickness + this.thickness * 2
    const width = this.woodThickness * 2 + this.thickness
    const size: [number, number] = [length, width]
    const center: [number, number] = [
      length * 1.5 + this.thickness / 2,
      width / 2,
    ]

    return extrudeLinear({ height: this.height }, rectangle({ size, center }))
  }

  private setSubtract() {
    const length = 2 * this.woodThickness
    const width = this.woodThickness
    const size: [number, number] = [length, width]

    // Center first
    const center1: [number, number] = [length / 2, width / 2 + 2]
    const center2: [number, number] = [
      length * 2.5 - this.thickness / 2,
      width / 2 + 2,
    ]

    const center3: [number, number] = [
      length / 2 + this.thickness,
      -width * 2.5 - this.thickness,
    ]

    return [
      extrudeLinear(
        { height: this.height },
        rectangle({ size, center: center1 })
      ),
      extrudeLinear(
        { height: this.height },
        rectangle({ size, center: center2 })
      ),
      rotateZ(
        degToRad(90),
        extrudeLinear(
          { height: this.height },
          rectangle({ size, center: center3 })
        )
      ),
    ]
  }

  public getUnion() {
    const mainBlock = union(this.horizontal, this.vertical)
    const without = subtract(mainBlock, this.subtract)
    return without
  }
}
