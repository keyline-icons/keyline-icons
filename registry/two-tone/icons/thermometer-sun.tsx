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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.5 5C13.5 2.7909 15.2909 1 17.5 1C19.7091 1 21.5 2.7909 21.5 5L21.5 13.7251C22.4634 14.7459 23 16.0964 23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 16.0964 12.5366 14.7459 13.5 13.7251L13.5 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5 5C14.5 3.3431 15.8431 2 17.5 2C19.1569 2 20.5 3.3431 20.5 5L20.5 13.7251C20.5 13.9803 20.5976 14.2258 20.7727 14.4114C21.5609 15.2466 22 16.3516 22 17.5C22 19.9853 19.9853 22 17.5 22C15.0147 22 13 19.9853 13 17.5C13 16.3516 13.4391 15.2466 14.2273 14.4114C14.4024 14.2258 14.5 13.9803 14.5 13.7251L14.5 5ZM10.5 12.4495C10.3355 12.4831 10.1679 12.5 10 12.5C8.6193 12.5 7.5 11.3807 7.5 10C7.5 8.6193 8.6193 7.5 10 7.5C10.1679 7.5 10.3355 7.5169 10.5 7.5505M5.4038 14.5962L4.3431 15.6569M3.5 10L2 10M5.4038 5.4038L4.3431 4.3431M10 3.5L10 2" fill="none"/>
      <path d="M19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
