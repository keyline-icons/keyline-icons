import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CopyX({ size = 24, ...props }: IconProps) {
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
      <path d="M15.8284 4C15.4046 2.8015 14.2714 2 13 2L5 2C3.3432 2 2 3.3432 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284" fill="none"/>
      <path d="M11 7L19 7C21.2091 7 23 8.7909 23 11L23 19C23 21.2091 21.2091 23 19 23L11 23C8.7909 23 7 21.2091 7 19L7 11C7 8.7909 8.7909 7 11 7ZM16.4142 15L18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12C19 11.4477 18.5523 11 18 11C17.7348 11 17.4804 11.1054 17.2929 11.2929L15 13.5858L12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.4477 11 11 11.4477 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.5858 15L11.2929 17.2929C11.1054 17.4804 11 17.7348 11 18C11 18.5523 11.4477 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071L15 16.4142L17.2929 18.7071C17.4804 18.8946 17.7348 19 18 19C18.5523 19 19 18.5523 19 18C19 17.7348 18.8946 17.4804 18.7071 17.2929L16.4142 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
