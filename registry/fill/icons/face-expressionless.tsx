import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceExpressionless({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM8 9.5C7.4477 9.5 7 9.9477 7 10.5C7 11.0523 7.4477 11.5 8 11.5L10 11.5C10.5523 11.5 11 11.0523 11 10.5C11 9.9477 10.5523 9.5 10 9.5L8 9.5ZM14 9.5C13.4477 9.5 13 9.9477 13 10.5C13 11.0523 13.4477 11.5 14 11.5L16 11.5C16.5523 11.5 17 11.0523 17 10.5C17 9.9477 16.5523 9.5 16 9.5L14 9.5ZM9 15C8.4477 15 8 15.4477 8 16C8 16.5523 8.4477 17 9 17L15 17C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15L9 15Z" fill="currentColor"/>
    </svg>
  )
}
