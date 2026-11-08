import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightMin({ size = 24, ...props }: IconProps) {
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
      <path d="M8 16H16"/>
      <path d="M13 8C13 8.55 12.5523 9 12 9C11.4477 9 11 8.55 11 8C11 7.45 11.4477 7 12 7C12.5523 7 13 7.45 13 8ZM23 16C23 16.55 22.552 17 22 17C21.448 17 21 16.55 21 16C21 15.45 21.448 15 22 15C22.552 15 23 15.45 23 16ZM3 16C3 16.55 2.5523 17 2 17C1.4477 17 1 16.55 1 16C1 15.45 1.4477 15 2 15C2.5523 15 3 15.45 3 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7.5 10.5C7.5 11.05 7.0523 11.5 6.5 11.5C5.9477 11.5 5.5 11.05 5.5 10.5C5.5 9.95 5.9477 9.5 6.5 9.5C7.0523 9.5 7.5 9.95 7.5 10.5ZM18.5 10.5C18.5 11.05 18.0523 11.5 17.5 11.5C16.9477 11.5 16.5 11.05 16.5 10.5C16.5 9.95 16.9477 9.5 17.5 9.5C18.0523 9.5 18.5 9.95 18.5 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
