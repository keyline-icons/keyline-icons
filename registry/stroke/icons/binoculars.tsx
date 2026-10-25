import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Binoculars({ size = 24, ...props }: IconProps) {
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
      <path d="M5 8L4.8198 8C4.3431 8 3.9327 8.3365 3.8392 8.8039L2.0194 17.9029C2.0065 17.9675 2 18.0332 2 18.099L2 19C2 19.5523 2.4477 20 3 20L6.7273 20C6.8779 20 7 19.8779 7 19.7273C7 18.221 8.221 17 9.7273 17C9.8779 17 10 16.8779 10 16.7273L10 9C10 8.4477 9.5523 8 9 8M5 8L5 5C5 4.4477 5.4477 4 6 4L8 4C8.5523 4 9 4.4477 9 5L9 8M5 8L9 8M19 8L19.1802 8C19.6569 8 20.0673 8.3365 20.1608 8.8039L21.9806 17.9029C21.9935 17.9675 22 18.0332 22 18.099L22 19C22 19.5523 21.5523 20 21 20L17.2727 20C17.1221 20 17 19.8779 17 19.7273C17 18.221 15.779 17 14.2727 17C14.1221 17 14 16.8779 14 16.7273L14 9C14 8.4477 14.4477 8 15 8M19 8L19 5C19 4.4477 18.5523 4 18 4L16 4C15.4477 4 15 4.4477 15 5L15 8M19 8L15 8M10 10L14 10M14 14L10 14" fill="none"/>
    </svg>
  )
}
