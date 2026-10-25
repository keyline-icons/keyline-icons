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
      <path d="M17 18.9268C15.8 18.7841 14.6337 18.4349 13.5528 17.8944C12.3764 17.3063 11.0792 17 9.7639 17L2 17C1.4477 17 1 16.5523 1 16L1 8C1 7.4477 1.4477 7 2 7L9.7639 7C11.0792 7 12.3764 6.6938 13.5528 6.1056C14.6337 5.5651 15.8 5.2159 17 5.0732L17 18.9268Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 5.0732C17.4102 5.0244 17.823 5 18.2361 5L22 5C22.5523 5 23 5.4477 23 6L23 18C23 18.5523 22.5523 19 22 19L18.2361 19C17.823 19 17.4102 18.9756 17 18.9268L17 5.0732ZM9 11L13 11L13 13L9 13L9 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
