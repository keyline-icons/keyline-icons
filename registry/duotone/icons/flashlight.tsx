import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flashlight({ size = 24, ...props }: IconProps) {
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
      <path d="M17 18.9268C15.8 18.7841 14.6337 18.4349 13.5528 17.8944C12.3764 17.3062 11.0792 17 9.7639 17L4 17C2.3431 17 1 15.6569 1 14L1 10C1 8.3431 2.3431 7 4 7L9.7639 7C11.0792 7 12.3764 6.6938 13.5528 6.1056C14.6337 5.5651 15.8 5.2159 17 5.0732L17 18.9268Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 5.0732C17.4102 5.0244 17.823 5 18.2361 5L20 5C21.6569 5 23 6.3431 23 8L23 16C23 17.6569 21.6569 19 20 19L18.2361 19C17.823 19 17.4102 18.9756 17 18.9268L17 5.0732ZM12 13L10 13C9.4477 13 9 12.5523 9 12C9 11.4477 9.4477 11 10 11L12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
