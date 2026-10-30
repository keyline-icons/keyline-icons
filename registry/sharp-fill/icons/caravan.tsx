import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Caravan({ size = 24, ...props }: IconProps) {
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
      <path d="M5.171 19L2 19C1.4477 19 1 18.5523 1 18L1 4C1 3.4477 1.4477 3 2 3L19 3C19.5523 3 20 3.4477 20 4L20 13L23 13L23 15L20 15L20 18C20 18.5523 19.5523 19 19 19L10.829 19C10.4049 20.1987 9.2715 21 8 21C6.7285 21 5.5951 20.1987 5.171 19ZM9 18C9 17.4477 8.5523 17 8 17C7.4477 17 7 17.4477 7 18C7 18.5523 7.4477 19 8 19C8.5523 19 9 18.5523 9 18ZM3 7L3 13L6 13C6.5523 13 7 12.5523 7 12L7 8C7 7.4477 6.5523 7 6 7L3 7ZM9 13.1C10.9635 13.5021 12.4979 15.0365 12.9 17L16 17L16 8C16 7.4477 15.5523 7 15 7L10 7C9.4477 7 9 7.4477 9 8L9 13.1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
