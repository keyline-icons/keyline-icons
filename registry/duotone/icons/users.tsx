import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Users({ size = 24, ...props }: IconProps) {
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
      <path d="M8 13H10C13.866 13 17 16.134 17 20C17 21.1046 16.1046 22 15 22H3C1.89543 22 1 21.1046 1 20C1 16.134 4.13401 13 8 13ZM13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 4C17.6569 4 19 5.3431 19 7C19 8.6569 17.6569 10 16 10M18.3333 14.4713C20.554 15.409 22 17.589 22 20C22 20.5523 21.5523 21 21 21"/>
    </svg>
  )
}
