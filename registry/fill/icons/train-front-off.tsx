import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrainFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1715 19L7 19C4.7909 19 3 17.2091 3 15L3 5C2.9992 4.4323 3.1197 3.8709 3.3535 3.3535L5 5.0001L5 7.5001C5 7.7729 5.2188 7.9954 5.4916 8L8 8L18.6465 18.6466C18.1291 18.8803 17.5678 19.0008 17 19.0001L16.1715 19ZM10 13.5C10 12.6716 9.3284 12 8.5 12C7.6716 12 7 12.6716 7 13.5C7 14.3284 7.6716 15 8.5 15C9.3284 15 10 14.3284 10 13.5ZM5.5238 1.2812C5.9936 1.0948 6.4946 0.9994 7 1L17 1C19.2091 1 21 2.7909 21 5L21 15C21.0006 15.5054 20.9052 16.0064 20.7188 16.4762L12.2426 8L19 8L19 5C19 3.8954 18.1046 3 17 3L7.2426 3L5.5238 1.2812Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 5L2 5M7 18L5 22M17 18L19 22M20 5L22 5M2 2L22 22" fill="none"/>
    </svg>
  )
}
