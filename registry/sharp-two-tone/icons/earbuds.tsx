import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Earbuds({ size = 24, ...props }: IconProps) {
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
      <path d="M11 19L11 7C11 4.2386 8.7614 2 6 2C3.2386 2 1 4.2386 1 7C1 9.376 2.672 11.4238 5 11.899L5 19C5 20.6569 6.3431 22 8 22C9.6569 22 11 20.6569 11 19ZM13 19C13 20.6569 14.3431 22 16 22C17.6569 22 19 20.6569 19 19L19 11.899C21.328 11.4238 23 9.376 23 7C23 4.2386 20.7614 2 18 2C15.2386 2 13 4.2386 13 7L13 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 19L10 7C10 4.7909 8.2091 3 6 3C3.7909 3 2 4.7909 2 7C2 9.2091 3.7909 11 6 11L6 19C6 20.1046 6.8954 21 8 21C9.1046 21 10 20.1046 10 19ZM14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 11C20.2091 11 22 9.2091 22 7C22 4.7909 20.2091 3 18 3C15.7909 3 14 4.7909 14 7L14 19ZM6 17L10 17M14 17L18 17" fill="none"/>
      <path d="M7 7C7 7.5523 6.5523 8 6 8C5.4477 8 5 7.5523 5 7C5 6.4477 5.4477 6 6 6C6.5523 6 7 6.4477 7 7ZM19 7C19 7.5523 18.5523 8 18 8C17.4477 8 17 7.5523 17 7C17 6.4477 17.4477 6 18 6C18.5523 6 19 6.4477 19 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
