import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SerialPortOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18.7872 18.7872C18.3806 18.9256 17.9467 19 17.4987 19L6.5013 19C4.6658 19 3.066 17.7508 2.6208 15.9702L1.1208 9.9701C0.4897 7.446 2.3984 5.0008 5 5ZM19.8971 15.6544L10.9498 6.7071C10.7688 6.5262 10.6569 6.2762 10.6569 6C10.6569 5.4477 11.1046 5 11.6569 5L12 5L18.9987 5C21.601 5 23.5104 7.4456 22.8792 9.9702L21.5681 15.2146C21.4511 15.6371 21.0639 15.9473 20.6042 15.9473C20.3281 15.9473 20.0781 15.8354 19.8971 15.6544Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.9639 17.9639C17.8118 17.9877 17.6564 18 17.4987 18L6.5013 18C5.1247 18 3.9248 17.0631 3.5909 15.7276L2.0909 9.7276C1.6175 7.8342 3.0496 6 5.0013 6L6 6M2 2L22 22"/>
    </svg>
  )
}
