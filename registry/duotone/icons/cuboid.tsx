import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cuboid({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.2929 7.2929L7 2.5858C7.3751 2.2107 7.8838 2 8.4142 2L21 2C21.5523 2 22 2.4477 22 3L22 15.5858C22 16.1162 21.7893 16.6249 21.4142 17L16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22L4 22C2.8954 22 2 21.1046 2 20L2 8C2 7.7348 2.1054 7.4804 2.2929 7.2929Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2 9L2 8C2 7.7348 2.1054 7.4804 2.2929 7.2929L7 2.5858C7.3751 2.2107 7.8838 2 8.4142 2L21 2C21.5523 2 22 2.4477 22 3L22 3.4142L16.7071 8.7071C16.5196 8.8946 16.2652 9 16 9L2 9Z" fill="currentColor"/>
    </svg>
  )
}
