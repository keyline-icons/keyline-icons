import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileSignature({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 2L4 2L4 22L20 22L20 8L14 2ZM14 2L14 8L20 8M7.2147 13.8955L8 13.7228C10.1818 13.2431 10.4242 11.324 10.6666 12.2835C10.9091 13.2431 11.3939 14.2026 12.1212 13.9627C12.8485 13.7228 13.0909 12.5234 13.5757 13.2431C14.0606 13.9627 15.2728 13.9627 16 13.9627L17 13.9627M7 18L17 18"/>
    </svg>
  )
}
