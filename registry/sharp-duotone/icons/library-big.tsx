import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LibraryBig({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22L2 22C1.4477 22 1 21.5523 1 21L1 3C1 2.4477 1.4477 2 2 2L6 2L6 22ZM11.675 3.5406L16.0007 2.0543C16.1053 2.0183 16.2152 2 16.3257 2C16.7528 2 17.1327 2.2712 17.2714 2.675L22.9457 19.1887C22.9817 19.2933 23 19.4031 23 19.5137C23 19.9407 22.7288 20.3206 22.325 20.4594L17.9993 21.9457C17.8947 21.9817 17.7848 22 17.6743 22C17.2472 22 16.8673 21.7288 16.7286 21.325L11.0543 4.8113C11.0183 4.7067 11 4.5969 11 4.4863C11 4.0593 11.2712 3.6794 11.675 3.5406Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M8 2L12 2C12.5523 2 13 2.4477 13 3L13 21C13 21.5523 12.5523 22 12 22L8 22L8 2Z" fill="currentColor"/>
    </svg>
  )
}
