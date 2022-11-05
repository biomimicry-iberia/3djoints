import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { union } from '@jscad/modeling/src/operations/booleans'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import { rectangle } from '@jscad/modeling/src/primitives'

export class Deg90 {
  woodThickness: number
  height: number
  topBar: Geom3
  rightBar: Geom3
  bottomBar: Geom3
  leftBar: Geom3

  constructor(woodThickness: number, height: number) {
    this.woodThickness = woodThickness
    this.height = height
    this.topBar = this.setTopBar()
    this.rightBar = this.setRightBar()
    this.leftBar = this.setTopBar()
    this.bottomBar = this.setTopBar()
  }

  private setTopBar() {
    const thickness = 2
    const length = 3 * this.woodThickness + thickness * 2
    const position: [number, number] = [length / 2, thickness / 2]

    return extrudeLinear(
      { height: 10 },
      rectangle({ size: [length, thickness], center: position })
    )
  }

  private setRightBar() {
    const thickness = 2
    const length = 3 * this.woodThickness + thickness * 2
    const position: [number, number] = [length / 2, thickness / 2]

    return extrudeLinear(
      { height: 10 },
      rectangle({ size: [length, thickness], center: position })
    )
  }

  private setBottomBar() {
    const thickness = 2
    const length = 3 * this.woodThickness + thickness * 2
    const position: [number, number] = [length / 2, thickness / 2]

    return extrudeLinear(
      { height: 10 },
      rectangle({ size: [length, thickness], center: position })
    )
  }

  private setLeftBar() {
    const thickness = 2
    const length = 3 * this.woodThickness + thickness * 2
    const position: [number, number] = [length / 2, thickness / 2]

    return extrudeLinear(
      { height: 10 },
      rectangle({ size: [length, thickness], center: position })
    )
  }

  public getUnion() {
    return union(this.topBar, this.rightBar, this.leftBar, this.bottomBar)
  }

  //   Top bar

  //   extrudeLinear(
  //     { height: 2 },
  //     rectangle({ size: [2, 22], center: [1, 11] })
  //   ),
  //   extrudeLinear(
  //     { height: 2 },
  //     rectangle({ size: [2, 22], center: [13, 11] })
  //   ),
  //   extrudeLinear(
  //     { height: 2 },
  //     rectangle({ size: [20, 2], center: [24, 13] })
  //   )
}
