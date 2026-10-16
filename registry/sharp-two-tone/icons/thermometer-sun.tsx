import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ThermometerSun({ size = 24, ...props }: IconProps) {
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
      <path d="M13.5 5C13.5 2.7909 15.2909 1 17.5 1C19.7091 1 21.5 2.7909 21.5 5L21.5 13.7251C22.4634 14.7459 23 16.0964 23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 16.0964 12.5366 14.7459 13.5 13.7251L13.5 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5 5C14.5 3.3431 15.8431 2 17.5 2C19.1569 2 20.5 3.3431 20.5 5L20.5 14.1459C21.4545 14.9996 22 16.2195 22 17.5C22 19.9853 19.9853 22 17.5 22C15.0147 22 13 19.9853 13 17.5C13 16.2195 13.5455 14.9996 14.5 14.1459L14.5 5ZM11.1286 12.4121L10.2144 12.4908C10.1431 12.4969 10.0716 12.5 10 12.5C8.6193 12.5 7.5 11.3807 7.5 10C7.5 8.6193 8.6193 7.5 10 7.5C10.1679 7.5 10.3355 7.5169 10.5 7.5505L11.3 7.7138M5.6967 14.3033L5.4038 14.5962L4.3431 15.6569L4.0503 15.9497M4.5 10L3.5 10L2 10L1 10M5.6967 5.6967L5.4038 5.4038L4.3431 4.3431L4.0503 4.0503M10 4.5L10 3.5L10 2L10 1" fill="none"/>
      <path d="M19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
