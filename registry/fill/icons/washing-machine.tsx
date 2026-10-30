import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WashingMachine({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1L17 1C19.2092 1 21 2.7908 21 5L21 19C21 21.2092 19.2092 23 17 23L7 23C4.7908 23 3 21.2092 3 19L3 5C3 2.7908 4.7908 1 7 1ZM17 14C17 11.2386 14.7614 9 12 9C9.2386 9 7 11.2386 7 14C7 16.7614 9.2386 19 12 19C14.7614 19 17 16.7614 17 14ZM12 5C11.4477 5 11 5.4477 11 6C11 6.5523 11.4477 7 12 7L16 7C16.5523 7 17 6.5523 17 6C17 5.4477 16.5523 5 16 5L12 5ZM9 6C9 5.4477 8.5523 5 8 5C7.4477 5 7 5.4477 7 6C7 6.5523 7.4477 7 8 7C8.5523 7 9 6.5523 9 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
