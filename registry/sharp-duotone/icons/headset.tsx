import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headset({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10C3 8.4812 4.4812 7 6 7L8 7C8.5523 7 9 7.4477 9 8L9 18C9 18.5523 8.5523 19 8 19L6 19C4.4812 19 3 17.5188 3 16L3 10ZM21 10C21 8.4812 19.5188 7 18 7L16 7C15.4477 7 15 7.4477 15 8L15 18C15 18.5523 15.4477 19 16 19L18 19C19.5188 19 21 17.5188 21 16L21 10Z" fill="currentColor" stroke="none"/>
      <path d="M4 10C4 5.5817 7.5817 2 12 2C16.4183 2 20 5.5817 20 10M18 18L18 22L11 22" strokeOpacity="0.4"/>
    </svg>
  )
}
