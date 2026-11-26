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
      <path d="M10.872 10.8724C10.956 11.2347 11 11.6122 11 12C11 14.7614 8.761 17 6 17C3.239 17 1 14.7614 1 12C1 9.2386 3.239 7 6 7C6.388 7 6.765 7.0441 7.128 7.1277L10.872 10.8724ZM16.657 13V11H17.657H23V13H22V15.3431V16.3431H20V15.3431V13H17.657H16.657Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 12C10 14.2091 8.209 16 6 16C3.791 16 2 14.2091 2 12C2 9.7909 3.791 8 6 8C8.209 8 10 9.7909 10 12ZM10 12H12M12 12L1.707 1.7071M12 12L22.293 22.2929"/>
    </svg>
  )
}
