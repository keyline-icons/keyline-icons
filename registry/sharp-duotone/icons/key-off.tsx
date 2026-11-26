import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 12.12V13H10.9C10.437 15.2822 8.419 17 6 17C3.239 17 1 14.7614 1 12C1 9.2386 3.239 7 6 7C6.334 7 6.66 7.0326 6.975 7.095L12 12.12ZM16.657 13V11H17.657H23V13H22V15.3431V16.3431H20V15.3431V13H17.657H16.657Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.7071L22.293 22.2929"/>
    </svg>
  )
}
