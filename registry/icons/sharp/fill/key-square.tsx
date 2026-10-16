import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeySquare({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2929 13.7929L1.2929 17.7929C1.1054 17.9804 1 18.2348 1 18.5L1 22C1 22.5523 1.4477 23 2 23L5.5 23C5.7652 23 6.0196 22.8946 6.2071 22.7071L7.4142 21.5L9.5 21.5C10.0523 21.5 10.5 21.0523 10.5 20.5L10.5 19L12 19C12.5523 19 13 18.5523 13 18L13 15.9142L13.9142 15L22 15C22.5523 15 23 14.5523 23 14L23 2C23 1.4477 22.5523 1 22 1L10 1C9.4477 1 9 1.4477 9 2L9 10.0858L5.2929 13.7929ZM14 8.5858L16.5858 6L18 7.4142L15.4142 10L14 8.5858Z" fill="currentColor"/>
    </svg>
  )
}
