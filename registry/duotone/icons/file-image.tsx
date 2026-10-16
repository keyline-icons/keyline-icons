import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileImage({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8V18C21 20.7614 18.7614 23 16 23H8C5.2386 23 3 20.7614 3 18V6C3 3.2386 5.2386 1 8 1H14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 8L14 2M14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M6 16L9.2355 12.7645C9.6921 12.3079 10.3895 12.1948 10.967 12.4835L18 16"/>
      <path d="M10.5 7C10.5 7.8284271247 9.8284271247 8.5 9 8.5C8.1715728753 8.5 7.5 7.8284271247 7.5 7C7.5 6.1715728753 8.1715728753 5.5 9 5.5C9.8284271247 5.5 10.5 6.1715728753 10.5 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
