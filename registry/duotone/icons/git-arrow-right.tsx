import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19.2071 15.5L20.8535 17.1464C21.0488 17.3417 21.0488 17.6583 20.8535 17.8536L19.2071 19.5M6 21L6 9M18 11.5L18 10C18 7.7909 16.2091 6 14 6L13 6M20 17.5L16 17.5C14.3431 17.5 13 18.8431 13 20.5L13 21"/>
    </svg>
  )
}
