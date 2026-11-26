import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Replace({ size = 24, ...props }: IconProps) {
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
      <path d="M12 7H21M17.707 10.2929L21 7L17.707 3.7071M12 17H3M6.293 20.2929L3 17L6.293 13.7071"/>
      <path d="M6 3C8.209 3 10 4.7909 10 7C10 9.2091 8.209 11 6 11C3.791 11 2 9.2091 2 7C2 4.7909 3.791 3 6 3ZM15 13H21C21.552 13 22 13.4477 22 14V20C22 20.5523 21.552 21 21 21H15C14.448 21 14 20.5523 14 20V14C14 13.4477 14.448 13 15 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
