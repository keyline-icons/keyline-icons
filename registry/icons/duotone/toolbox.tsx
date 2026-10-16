import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toolbox({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.7071 7.8787C4.2697 7.3161 5.0328 7 5.8284 7L18.1716 7C18.9672 7 19.7303 7.3161 20.2929 7.8787L22.1213 9.7071C22.6839 10.2697 23 11.0328 23 11.8284L23 18C23 20.2091 21.2091 22 19 22L5 22C2.7909 22 1 20.2091 1 18L1 11.8284C1 11.0328 1.3161 10.2697 1.8787 9.7071L3.7071 7.8787Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 14L20 14M8 12L8 16M16 12L16 16M8 8L8 5C8 3.8954 8.8954 3 10 3L14 3C15.1046 3 16 3.8954 16 5L16 8"/>
    </svg>
  )
}
