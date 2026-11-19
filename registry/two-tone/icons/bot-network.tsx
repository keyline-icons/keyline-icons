import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotNetwork({ size = 24, ...props }: IconProps) {
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
      <path d="M5 7C5 5.3431 6.3431 4 8 4L16 4C17.6569 4 19 5.3431 19 7L19 11C19 12.6569 17.6569 14 16 14L8 14C6.3431 14 5 12.6569 5 11ZM1 18C1 16.8954 1.8954 16 3 16L7 16C8.1046 16 9 16.8954 9 18L9 21C9 22.1046 8.1046 23 7 23L3 23C1.8954 23 1 22.1046 1 21ZM15 18C15 16.8954 15.8954 16 17 16L21 16C22.1046 16 23 16.8954 23 18L23 21C23 22.1046 22.1046 23 21 23L17 23C15.8954 23 15 22.1046 15 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 7C6 5.8954 6.8954 5 8 5L16 5C17.1046 5 18 5.8954 18 7L18 11C18 12.1046 17.1046 13 16 13L8 13C6.8954 13 6 12.1046 6 11ZM12 5V2M4 9H6M18 9H20M9 13L5 17M15 13L19 17M2 18C2 17.4477 2.4477 17 3 17L7 17C7.5523 17 8 17.4477 8 18L8 21C8 21.5523 7.5523 22 7 22L3 22C2.4477 22 2 21.5523 2 21ZM16 18C16 17.4477 16.4477 17 17 17L21 17C21.5523 17 22 17.4477 22 18L22 21C22 21.5523 21.5523 22 21 22L17 22C16.4477 22 16 21.5523 16 21Z"/>
      <path d="M11 9C11 9.5523 10.5523 10 10 10C9.4477 10 9 9.5523 9 9C9 8.4477 9.4477 8 10 8C10.5523 8 11 8.4477 11 9ZM15 9C15 9.5523 14.5523 10 14 10C13.4477 10 13 9.5523 13 9C13 8.4477 13.4477 8 14 8C14.5523 8 15 8.4477 15 9Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
